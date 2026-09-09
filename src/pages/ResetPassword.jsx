import { useEffect, useState } from 'react'
import { KeyRound, LoaderCircle, Save } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true)
      else setError('This reset link is invalid or has expired. Request a new one.')
    })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    if (password !== confirmation) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) setError(updateError.message)
    else {
      setMessage('Your password has been updated. You can now sign in.')
      setTimeout(() => navigate('/login', { replace: true }), 1200)
    }
    setLoading(false)
  }

  return (
    <div className="container auth-page animate-fade-in">
      <div className="auth-panel glass-panel">
        <div className="auth-heading">
          <span className="auth-icon"><KeyRound size={22} /></span>
          <p className="eyebrow">CPWING ACCOUNT SECURITY</p>
          <h1>Choose a new password</h1>
          <p>Use at least 8 characters for your new password.</p>
        </div>
        {ready ? <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="new-password">New password</label>
          <input id="new-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete="new-password" />
          <label htmlFor="confirm-password">Confirm new password</label>
          <input id="confirm-password" type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required minLength={8} autoComplete="new-password" />
          {error && <p className="form-message form-error">{error}</p>}
          {message && <p className="form-message form-success">{message}</p>}
          <button className="btn-primary auth-submit" type="submit" disabled={loading}>{loading ? <LoaderCircle className="spin" size={18} /> : <Save size={18} />} {loading ? 'Updating...' : 'Update password'}</button>
        </form> : <p className="form-message form-error">{error}</p>}
        <Link className="auth-back" to="/login">Return to sign in</Link>
      </div>
    </div>
  )
}

export default ResetPassword
