import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, KeyRound, LoaderCircle, LogIn, UserPlus } from 'lucide-react'
import { supabase } from '../lib/supabase'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileFields, setProfileFields] = useState({ full_name: '', student_id: '', codeforces_handle: '', department: '', batch: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (mode === 'signup' && Object.values(profileFields).some((value) => !value.trim())) {
      setError('Name, student ID, Codeforces handle, department, and batch are required.')
      setLoading(false)
      return
    }

    const result = mode === 'recovery'
      ? await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
      : mode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { data: profileFields } })

    if (result.error) {
      setError(result.error.message)
    } else if (mode === 'recovery') {
      setMessage('Password reset instructions have been sent to your email.')
    } else if (mode === 'login') {
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
    } else {
      setMessage('Account created. Check your email to confirm your account.')
      setMode('login')
    }

    setLoading(false)
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
    setError('')
    setMessage('')
  }

  const showRecovery = () => {
    setMode('recovery')
    setError('')
    setMessage('')
  }

  return (
    <div className="container auth-page animate-fade-in">
      <div className="auth-panel glass-panel">
        <div className="auth-heading">
          <span className="auth-icon"><LogIn size={22} /></span>
          <p className="eyebrow">CPWING STUDENT ACCESS</p>
          <h1>{mode === 'login' ? 'Welcome back' : mode === 'recovery' ? 'Reset your password' : 'Create your account'}</h1>
          <p>{mode === 'recovery' ? 'Enter your email and we will send you a secure reset link.' : 'Sign in to view your student profile and contest progress.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          {mode !== 'recovery' && <><label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></>}
          {mode === 'signup' && <div className="signup-profile-fields">
            {[
              ['full_name', 'Full name', 'Your full name'],
              ['student_id', 'Student ID', 'Your university ID'],
              ['codeforces_handle', 'Codeforces handle', 'Your Codeforces username'],
              ['department', 'Department', 'Your department'],
              ['batch', 'Batch', 'Your batch']
            ].map(([name, label, placeholder]) => <label key={name} htmlFor={name}>{label}<input id={name} name={name} value={profileFields[name]} onChange={(event) => setProfileFields({ ...profileFields, [name]: event.target.value })} placeholder={placeholder} required /></label>)}
          </div>}
          {error && <p className="form-message form-error">{error}</p>}
          {message && <p className="form-message form-success">{message}</p>}
          <button className="btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="spin" size={18} /> : mode === 'login' ? <LogIn size={18} /> : mode === 'recovery' ? <KeyRound size={18} /> : <UserPlus size={18} />}
            {mode === 'login' ? 'Sign in' : mode === 'recovery' ? 'Send reset link' : 'Create account'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {mode === 'login' && <button className="auth-switch" type="button" onClick={showRecovery}>Forgot your password?</button>}
        {mode !== 'recovery' && <button className="auth-switch" type="button" onClick={switchMode}>
          {mode === 'login' ? 'New to CPWING? Create an account' : 'Already have an account? Sign in'}
        </button>}
        {mode === 'recovery' && <button className="auth-switch" type="button" onClick={() => { setMode('login'); setError(''); setMessage('') }}>Back to sign in</button>}
        <Link className="auth-back" to="/">Return to homepage</Link>
      </div>
    </div>
  )
}

export default Login