import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

const problem = { contestId: 4, index: 'A' }

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authorization = request.headers.get('Authorization')
    if (!authorization?.startsWith('Bearer ')) throw new Error('Authentication is required.')

    const body = await request.json()
    const { full_name, student_id, department, batch, codeforces_handle, submission_id } = body
    if (![full_name, student_id, department, batch, codeforces_handle, submission_id].every(Boolean)) {
      throw new Error('Complete profile details and a Codeforces submission are required.')
    }

    const handle = String(codeforces_handle).trim()
    const submissionId = String(submission_id)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    const token = authorization.slice('Bearer '.length)
    const { data: userData, error: userError } = await supabase.auth.getUser(token)
    if (userError || !userData.user) throw new Error('Your session is no longer valid.')

    const response = await fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=100`)
    const result = await response.json()
    const submission = result.status === 'OK'
      ? result.result.find((item: { id: number; verdict: string; creationTimeSeconds: number; problem?: { contestId?: number; index?: string } }) => String(item.id) === submissionId)
      : null
    const isRecent = submission && submission.creationTimeSeconds >= Math.floor(Date.now() / 1000) - (24 * 60 * 60)
    if (!submission || !isRecent || submission.verdict !== 'COMPILATION_ERROR' || submission.problem?.contestId !== problem.contestId || submission.problem?.index !== problem.index) {
      throw new Error('A recent compilation-error submission for Watermelon (4A) is required.')
    }

    const { error: completeError } = await supabase.rpc('complete_verified_codeforces', {
      p_user_id: userData.user.id,
      p_full_name: String(full_name).trim(),
      p_student_id: String(student_id).trim(),
      p_department: String(department).trim(),
      p_batch: String(batch).trim(),
      p_codeforces_handle: handle
    })
    if (completeError) throw completeError

    return new Response(JSON.stringify({ message: 'Codeforces verified successfully.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unable to verify Codeforces.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
