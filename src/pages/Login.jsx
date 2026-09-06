import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, LoaderCircle, LogIn, UserPlus } from 'lucide-react'
import { supabase } from '../lib/supabase'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (result.error) {
      setError(result.error.message)
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

  return (
    <div className="container auth-page animate-fade-in">
      <div className="auth-panel glass-panel">
        <div className="auth-heading">
          <span className="auth-icon"><LogIn size={22} /></span>
          <p className="eyebrow">CPWING STUDENT ACCESS</p>
          <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
          <p>Sign in to view your student profile and contest progress.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
          {error && <p className="form-message form-error">{error}</p>}
          {message && <p className="form-message form-success">{message}</p>}
          <button className="btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="spin" size={18} /> : mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
            {mode === 'login' ? 'Sign in' : 'Create account'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <button className="auth-switch" type="button" onClick={switchMode}>
          {mode === 'login' ? 'New to CPWING? Create an account' : 'Already have an account? Sign in'}
        </button>
        <Link className="auth-back" to="/">Return to homepage</Link>
      </div>
    </div>
  )
}

export default Login