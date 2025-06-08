import React from 'react';

const containerStyle = {
  maxWidth: 900,
  margin: '4rem auto',
  padding: '0 1rem',
  color: '#6b7280',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: 12,
  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
  padding: '2rem',
  marginBottom: '2rem',
};

const headingStyle = {
  fontSize: 48,
  fontWeight: 800,
  color: '#111827',
  marginBottom: '1rem',
};

const labelStyle = {
  fontSize: 14,
  fontWeight: 700,
  color: '#374151',
  marginBottom: 6,
  display: 'block',
};

const valueStyle = {
  fontSize: 18,
  fontWeight: 600,
  color: '#111827',
  marginBottom: '1.25rem',
};

const btnStyle = {
  display: 'inline-block',
  backgroundColor: '#111827',
  color: 'white',
  padding: '0.75rem 2rem',
  fontWeight: 700,
  fontSize: 16,
  borderRadius: 12,
  cursor: 'pointer',
  border: 'none',
  transition: 'background-color 0.3s ease',
  userSelect: 'none',
};

const btnHoverStyle = {
  backgroundColor: '#343541',
};

export default function ProfilePage({ user, onLogout, onBack }) {
  return (
    <main style={containerStyle}>
      <button
        style={{ ...btnStyle, marginBottom: '2rem' }}
        onClick={onBack}
        aria-label="Back to dashboard"
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#343541')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
      >
        ← Back to Dashboard
      </button>
      <section style={cardStyle} aria-label="User profile details">
        <h1 style={headingStyle}>Profile</h1>
        <div>
          <label style={labelStyle}>Username</label>
          <p style={valueStyle}>{user.username}</p>
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <p style={valueStyle}>{user.email}</p>
        </div>
        <button
          style={btnStyle}
          onClick={onLogout}
          aria-label="Logout"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#343541')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
        >
          Logout
        </button>
      </section>
    </main>
  );
}
