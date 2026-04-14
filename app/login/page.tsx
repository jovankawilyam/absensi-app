"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e?.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        // Login sukses -> redirect ke /absen
        router.push('/absen')
        return
      }

      // failure
      const data = await res.json().catch(() => ({}))
      alert(data.message || 'Login gagal')
    } catch (err) {
      // log untuk debugging
      console.error('Login error', err)
      alert('Terjadi error saat mengirim data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <Image src="/logo.png" alt="Logo" width={120} height={120} className="logo-luar" />

      <form onSubmit={submit} className="card">
        <h2 className="title">LOGIN</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #6d3914, #d7bda6);
          gap: 1rem;
          padding: 2rem;
        }

        .logo-luar {
          width: 120px;
          height: auto;
          max-width: 150px;
        }

        .card {
          width: 100%;
          max-width: 360px;
          background: #b7957f;
          padding: 28px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .title {
          text-align: center;
          color: #4c2b08;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          font-weight: bold;
          font-size: 1.6rem;
          margin: 0;
        }

        input {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: 3px solid #4c2b08;
          box-sizing: border-box;
          font-size: 1rem;
        }

        button {
          width: 100%;
          padding: 14px;
          margin-top: 6px;
          border-radius: 10px;
          background: #4c2b08;
          color: #d7bda6;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover:not(:disabled) {
          background: #6d3914;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        input:focus {
          outline: none;
          border-color: #6d3914;
          box-shadow: 0 0 0 3px rgba(109,57,20,0.2);
        }

        @media (max-width: 480px) {
          .logo-luar { width: 100px }
          .card { padding: 18px }
          .title { font-size: 1.2rem }
        }
      `}</style>
    </main>
  )
}

