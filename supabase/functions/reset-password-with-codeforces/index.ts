import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, codeforces_handle, submission_id, new_password } = await request.json()
    if (!email || !codeforces_handle || !submission_id || !new_password || new_password.length < 8) {
      throw new Error('Email, Codeforces handle, compilation-error submission, and an 8-character password are required.')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    const normalizedHandle = codeforces_handle.trim().toLowerCase()
    const { data: verification } = await supabase
      .from('codeforces_verifications')
      .select('user_id, codeforces_handle')
      .ilike('codeforces_handle', codeforces_handle.trim())
      .maybeSingle()

    const { data: profileLink } = verification ? { data: null } : await supabase
      .from('profiles')
      .select('id, codeforces_handle')
      .ilike('codeforces_handle', codeforces_handle.trim())
      .maybeSingle()
    const linkedAccount = verification || (profileLink && {
      user_id: profileLink.id,
      codeforces_handle: profileLink.codeforces_handle
    })

    if (!linkedAccount || linkedAccount.codeforces_handle.trim().toLowerCase() !== normalizedHandle) {
      throw new Error('This Codeforces handle is not linked to a verified CPWING account.')
    }

    const { data: account, error: accountError } = await supabase.auth.admin.getUserById(linkedAccount.user_id)
    if (accountError || account.user?.email?.toLowerCase() !== email.trim().toLowerCase()) {
      throw new Error('The email and Codeforces handle do not match.')
    }

    const response = await fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(codeforces_handle)}&from=1&count=100`)
    const result = await response.json()
    const submission = result.status === 'OK' && result.result.find((item: { id: number; verdict: string; creationTimeSeconds: number; problem?: { contestId?: number; index?: string } }) => String(item.id) === String(submission_id))
    const isRecent = submission && submission.creationTimeSeconds >= Math.floor(Date.now() / 1000) - (24 * 60 * 60)
    if (!submission || !isRecent || submission.verdict !== 'COMPILATION_ERROR' || submission.problem?.contestId !== 4 || submission.problem?.index !== 'A') {
      throw new Error('A recent compilation-error submission for Watermelon (4A) is required.')
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(linkedAccount.user_id, { password: new_password })
    if (updateError) throw updateError

    return new Response(JSON.stringify({ message: 'Password changed successfully.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unable to change password.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
