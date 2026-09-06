import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ImagePlus, Save, UserRound } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/useAuth'

const emptyProfile = {
  full_name: '',
  student_id: '',
  department: '',
  batch: '',
  codeforces_handle: '',
  avatar_url: '',
  github_url: '',
  linkedin_url: '',
  skills: '',
  interests: ''
}

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(emptyProfile)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)

  useEffect(() => {
    const loadProfile = async () => {
      const { data, error: loadError } = await supabase.from('profiles').select('full_name, student_id, department, batch, codeforces_handle, avatar_url, github_url, linkedin_url, skills, interests').eq('id', user.id).maybeSingle()
      if (loadError) setError(loadError.message)
      if (data) setProfile(data)
      setLoading(false)
    }

    loadProfile()
  }, [user.id])

  const updateField = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    let avatarUrl = profile.avatar_url
    if (avatarFile) {
      const extension = avatarFile.name.split('.').pop().toLowerCase()
      const filePath = `${user.id}/${crypto.randomUUID()}.${extension}`
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatarFile, { upsert: false, contentType: avatarFile.type })
      if (uploadError) {
        setError(uploadError.message)
        setSaving(false)
        return
      }
      const { data: publicUrl } = supabase.storage.from('avatars').getPublicUrl(filePath)
      avatarUrl = publicUrl.publicUrl
    }

    const { error: saveError } = await supabase.from('profiles').upsert({ ...profile, avatar_url: avatarUrl, id: user.id, updated_at: new Date().toISOString() })
    if (saveError) setError(saveError.message)
    else {
      setProfile({ ...profile, avatar_url: avatarUrl })
      setAvatarFile(null)
      setMessage('Profile saved successfully.')
    }
    setSaving(false)
  }

  if (loading) return <div className="container auth-loading">Loading your profile...</div>

  return (
    <div className="container auth-page animate-fade-in">
      <div className="auth-panel glass-panel">
        <div className="auth-heading">
          <span className="auth-icon"><UserRound size={22} /></span>
          <p className="eyebrow">STUDENT PROFILE</p>
          <h1>Your information</h1>
          <p>Keep these details up to date for your CPWING profile.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="full_name">Full name</label>
          <input id="full_name" name="full_name" value={profile.full_name} onChange={updateField} required />
          <label htmlFor="student_id">Student ID</label>
          <input id="student_id" name="student_id" value={profile.student_id} onChange={updateField} required />
          <label htmlFor="department">Department</label>
          <input id="department" name="department" value={profile.department} onChange={updateField} />
          <label htmlFor="batch">Batch</label>
          <input id="batch" name="batch" value={profile.batch} onChange={updateField} />
          <label htmlFor="codeforces_handle">Codeforces handle</label>
          <input id="codeforces_handle" name="codeforces_handle" value={profile.codeforces_handle} onChange={updateField} placeholder="Enter your Codeforces handle" required />
          <label htmlFor="avatar_file">Profile image from your device</label>
          <input id="avatar_file" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => setAvatarFile(event.target.files?.[0] ?? null)} />
          {(avatarFile || profile.avatar_url) && <div className="profile-avatar-preview"><img src={avatarFile ? URL.createObjectURL(avatarFile) : profile.avatar_url} alt="Profile preview" /><span>{avatarFile ? avatarFile.name : 'Current profile image'}</span></div>}
          <label htmlFor="github_url">GitHub profile</label>
          <input id="github_url" name="github_url" type="url" value={profile.github_url} onChange={updateField} placeholder="https://github.com/username" />
          <label htmlFor="linkedin_url">LinkedIn profile</label>
          <input id="linkedin_url" name="linkedin_url" type="url" value={profile.linkedin_url} onChange={updateField} placeholder="https://linkedin.com/in/username" />
          <label htmlFor="skills">Skills</label>
          <input id="skills" name="skills" value={profile.skills} onChange={updateField} placeholder="C++, graphs, dynamic programming" />
          <label htmlFor="interests">Interests</label>
          <textarea id="interests" name="interests" value={profile.interests} onChange={updateField} rows={3} placeholder="What do you enjoy learning?" />
          {error && <p className="form-message form-error">{error}</p>}
          {message && <p className="form-message form-success">{message}</p>}
          <button className="btn-primary auth-submit" type="submit" disabled={saving}><Save size={18} /> {saving ? 'Saving...' : 'Save profile'}</button>
        </form>
        <Link className="auth-back" to="/dashboard"><ArrowLeft size={16} /> Back to dashboard</Link>
      </div>
    </div>
  )
}

export default Profile