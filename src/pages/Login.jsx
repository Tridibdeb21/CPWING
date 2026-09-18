import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ExternalLink, KeyRound, LoaderCircle, LogIn } from 'lucide-react'
import { supabase } from '../lib/supabase'

const verificationProblem = {
  name: 'Watermelon (4A)',
  url: 'https://codeforces.com/problemset/problem/4/A',
  contestId: 4,
  index: 'A'
}

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState(location.state?.verificationRequired ? 'signup' : 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [forgotHandle, setForgotHandle] = useState('')
  const [forgotStatus, setForgotStatus] = useState('not-verified')
  const [forgotBaselineIds, setForgotBaselineIds] = useState(null)
  const [forgotSubmissionId, setForgotSubmissionId] = useState(null)
  const [profile, setProfile] = useState({ full_name: '', student_id: '', department: '', batch: '', codeforces_handle: '' })
  const [codeforcesStatus, setCodeforcesStatus] = useState('not-verified')
  const [verificationBaselineIds, setVerificationBaselineIds] = useState(null)
  const [verificationSubmissionId, setVerificationSubmissionId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const updateProfile = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value })
    if (event.target.name === 'codeforces_handle') {
      setCodeforcesStatus('not-verified')
      setVerificationBaselineIds(null)
      setVerificationSubmissionId(null)
    }
  }

  const fetchCodeforcesSubmissions = async (handle) => {
    let result
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=10`)
      result = await response.json()
      if (result.status === 'OK') return result.result
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 2000))
    }
    throw new Error(result.comment || 'Codeforces could not verify this handle.')
  }

  const handleForgotVerification = async () => {
    setLoading(true)
    setError('')
    setMessage('')
    setForgotStatus('checking')

    try {
      const submissions = await fetchCodeforcesSubmissions(forgotHandle)
      if (!forgotBaselineIds) {
        setForgotBaselineIds(submissions.map((item) => item.id))
        setForgotStatus('ready')
        setMessage(`Verification started. Submit a new compilation error for ${verificationProblem.name}, then check again.`)
        return
      }

      const submission = submissions.find((item) => !forgotBaselineIds.includes(item.id)
        && item.verdict === 'COMPILATION_ERROR'
        && item.problem?.contestId === verificationProblem.contestId
        && item.problem?.index === verificationProblem.index)

      if (!submission) throw new Error(`Submit a new compilation error for ${verificationProblem.name} after starting verification.`)
      setForgotSubmissionId(submission.id)
      setForgotStatus('verified')
      setMessage('Codeforces verified. You can now set your new password.')
    } catch (verificationError) {
      setForgotStatus('not-verified')
      setError(verificationError.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCodeforcesVerification = async () => {
    setLoading(true)
    setError('')
    setMessage('')
    setCodeforcesStatus('checking')

    try {
      const submissions = await fetchCodeforcesSubmissions(profile.codeforces_handle)
      if (!verificationBaselineIds) {
        setVerificationBaselineIds(submissions.map((item) => item.id))
        setCodeforcesStatus('ready')
        setMessage(`Verification started. Now submit a new compilation error for ${verificationProblem.name}, then click Verify Codeforces again.`)
        return
      }

      const submission = submissions.find((item) => !verificationBaselineIds.includes(item.id)
        && item.verdict === 'COMPILATION_ERROR'
        && item.problem?.contestId === verificationProblem.contestId
        && item.problem?.index === verificationProblem.index)

      if (!submission) {
        throw new Error(`No new compilation-error submission was found for ${verificationProblem.name}. Submit a new one after starting verification, then try again.`)
      }

      setCodeforcesStatus('verified')
      setVerificationSubmissionId(submission.id)
      setMessage('Codeforces verified. You can now submit the final registration.')
    } catch (verificationError) {
      setCodeforcesStatus('not-verified')
      setError(verificationError.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
        navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
        return
      }

      if (mode === 'forgot') {
        if (forgotStatus !== 'verified') throw new Error('Verify your Codeforces compilation error first.')

        const { error: resetError } = await supabase.functions.invoke('reset-password-with-codeforces', {
          body: {
            email,
            codeforces_handle: forgotHandle,
            submission_id: forgotSubmissionId,
            new_password: newPassword
          }
        })

        if (resetError) {
          let detail = resetError.message
          if (resetError.context) {
            try {
              const body = await resetError.context.json()
              detail = body.error || body.message || detail
            } catch {
              detail = resetError.message
            }
          }
          throw new Error(detail)
        }

        setMessage('Password changed successfully. You can now sign in.')
        setMode('login')
        setPassword('')
        setNewPassword('')
        setForgotHandle('')
        setForgotStatus('not-verified')
        setForgotBaselineIds(null)
        setForgotSubmissionId(null)
        return
      }

      if (codeforcesStatus !== 'verified') {
        throw new Error('Verify your Codeforces compilation error before submitting registration.')
      }

      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) throw signUpError

      if (!data.session) {
        throw new Error('Email confirmation is still enabled in Supabase. Disable Confirm email in Authentication settings, then try again.')
      }

      const { error: profileError } = await supabase.functions.invoke('verify-codeforces', {
        body: {
          full_name: profile.full_name,
          student_id: profile.student_id,
          department: profile.department,
          batch: profile.batch,
          codeforces_handle: profile.codeforces_handle,
          submission_id: verificationSubmissionId
        }
      })

      if (profileError) {
        throw new Error(`Verification succeeded, but the profile could not be saved: ${profileError.message}`)
      }

      navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    const nextMode = mode === 'login' ? 'signup' : 'login'
    setMode(nextMode)
    setCodeforcesStatus('not-verified')
    setVerificationBaselineIds(null)
    setVerificationSubmissionId(null)
    setError('')
    setMessage('')
  }

  const openForgotPassword = () => {
    setMode('forgot')
    setForgotStatus('not-verified')
    setForgotBaselineIds(null)
    setForgotSubmissionId(null)
    setError('')
    setMessage('')
  }

  return (
    <div className="container auth-page animate-fade-in">
      <div className="auth-panel glass-panel">
        <div className="auth-heading">
          <span className="auth-icon"><LogIn size={22} /></span>
          <p className="eyebrow">CPWING STUDENT ACCESS</p>
          <h1>{mode === 'login' ? 'Welcome back' : mode === 'forgot' ? 'Reset your password' : 'Create your account'}</h1>
          <p>{mode === 'login' ? 'Sign in to view your student profile and contest progress.' : mode === 'forgot' ? 'Verify your Codeforces account before changing your password.' : 'Enter your information, submit the required compilation error, then finish registration.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <>
              <label htmlFor="full_name">Full name</label>
              <input id="full_name" name="full_name" value={profile.full_name} onChange={updateProfile} required autoComplete="name" />
              <label htmlFor="student_id">Student ID</label>
              <input id="student_id" name="student_id" value={profile.student_id} onChange={updateProfile} required />
              <label htmlFor="department">Department</label>
              <input id="department" name="department" value={profile.department} onChange={updateProfile} required />
              <label htmlFor="batch">Batch</label>
              <input id="batch" name="batch" value={profile.batch} onChange={updateProfile} required />
              <label htmlFor="codeforces_handle">Codeforces handle</label>
              <input id="codeforces_handle" name="codeforces_handle" value={profile.codeforces_handle} onChange={updateProfile} required autoComplete="username" />

              <div className="dashboard-empty-state">
                <strong>Required: submit a compilation error for {verificationProblem.name}</strong>
                <span>Submit a deliberate syntax error to this exact problem using the Codeforces handle above, then click the final button below.</span>
                <strong className={`codeforces-verification-status codeforces-status-${codeforcesStatus}`}>
                  {codeforcesStatus === 'verified' ? 'Codeforces verified' : codeforcesStatus === 'checking' ? 'Checking Codeforces submission...' : codeforcesStatus === 'ready' ? 'Verification started - submit a new error' : 'Codeforces not verified'}
                </strong>
              </div>

              <a className="btn-secondary" href={verificationProblem.url} target="_blank" rel="noreferrer"><ExternalLink size={18} /> Open {verificationProblem.name}</a>
              <button className="btn-secondary" type="button" onClick={handleCodeforcesVerification} disabled={loading || !profile.codeforces_handle}>
                <CheckCircle2 size={18} /> {codeforcesStatus === 'checking' ? 'Checking...' : verificationBaselineIds ? 'Verify Codeforces' : 'Start verification'}
              </button>
            </>
          )}

          {mode === 'forgot' && (
            <>
              <label htmlFor="forgot_codeforces_handle">Codeforces handle</label>
              <input id="forgot_codeforces_handle" value={forgotHandle} onChange={(event) => { setForgotHandle(event.target.value); setForgotStatus('not-verified'); setForgotBaselineIds(null); setForgotSubmissionId(null) }} required />

              <div className="dashboard-empty-state">
                <strong>Verify with a new compilation error for {verificationProblem.name}</strong>
                <span>Start verification, submit a new compilation error from this handle, then click Verify Codeforces again.</span>
                <strong className={`codeforces-verification-status codeforces-status-${forgotStatus}`}>
                  {forgotStatus === 'verified' ? 'Codeforces verified' : forgotStatus === 'checking' ? 'Checking Codeforces submission...' : forgotStatus === 'ready' ? 'Verification started - submit a new error' : 'Codeforces not verified'}
                </strong>
              </div>

              <a className="btn-secondary" href={verificationProblem.url} target="_blank" rel="noreferrer"><ExternalLink size={18} /> Open {verificationProblem.name}</a>
              <button className="btn-secondary" type="button" onClick={handleForgotVerification} disabled={loading || !forgotHandle}>
                <CheckCircle2 size={18} /> {forgotStatus === 'checking' ? 'Checking...' : forgotBaselineIds ? 'Verify Codeforces' : 'Start verification'}
              </button>
            </>
          )}

          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />

          {mode !== 'forgot' && (
            <>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
            </>
          )}

          {mode === 'forgot' && (
            <>
              <label htmlFor="new_password">New password</label>
              <input id="new_password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required minLength={8} autoComplete="new-password" />
            </>
          )}

          {error && <p className="form-message form-error">{error}</p>}
          {message && <p className="form-message form-success">{message}</p>}

          <button className="btn-primary auth-submit" type="submit" disabled={loading || (mode === 'signup' && codeforcesStatus !== 'verified') || (mode === 'forgot' && forgotStatus !== 'verified')}>
            {loading ? <LoaderCircle className="spin" size={18} /> : mode === 'login' ? <LogIn size={18} /> : mode === 'forgot' ? <KeyRound size={18} /> : <CheckCircle2 size={18} />}
            {mode === 'login' ? 'Sign in' : mode === 'forgot' ? 'Change password' : codeforcesStatus === 'verified' ? 'Create account' : 'Verify Codeforces first'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {mode === 'login' && (
          <button className="auth-switch" type="button" onClick={openForgotPassword}>Forgot password?</button>
        )}
        {mode !== 'forgot' && (
          <button className="auth-switch" type="button" onClick={switchMode}>
            {mode === 'login' ? 'New to CPWING? Create an account' : 'Already have an account? Sign in'}
          </button>
        )}
        {mode === 'forgot' && (
          <button className="auth-switch" type="button" onClick={() => { setMode('login'); setError(''); setMessage('') }}>Back to sign in</button>
        )}
        <Link className="auth-back" to="/">Return to homepage</Link>
      </div>
    </div>
  )
}

export default Login
