import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// POST /api/login
// Expects JSON body: { username, password }
// If credentials match (admin / 123) issues a JWT (1 hour) and sets it as an
// httpOnly cookie at path "/". On failure returns 401 with an error message.

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production'

export async function POST(request) {
	try {
		const body = await request.json()
		const { username, password } = body || {}

		if (!username || !password) {
			return NextResponse.json(
				{ message: 'Username and password are required' },
				{ status: 400 }
			)
		}

		// Simple credential check (as requested)
		if (!(username === 'admin' && password === '123')) {
			return NextResponse.json(
				{ message: 'Invalid username or password' },
				{ status: 401 }
			)
		}

		// Create JWT (expires in 1 hour)
		const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' })

		// Set cookie (httpOnly)
		const res = NextResponse.json({ success: true, message: 'Logged in' })
		// maxAge in seconds (1 hour)
		res.cookies.set('token', token, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
		})

		return res
	} catch (err) {
		return NextResponse.json(
			{ message: 'Invalid request' , error: err?.message ?? String(err) },
			{ status: 400 }
		)
	}
}

export const runtime = 'nodejs'