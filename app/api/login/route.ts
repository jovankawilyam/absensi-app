import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// POST /api/login
// Expects JSON body: { username, password }

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production'

// --- TAMBAH ADMIN DI SINI ---
const ALLOWED_ADMINS = [
    { user: 'admin', pass: '123' },
    { user: 'budi', pass: 'kopi123' }, // Admin baru 1
    { user: 'siti', pass: 'rahasia' }  // Admin baru 2
];
// ----------------------------

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { username, password } = body || {}

        if (!username || !password) {
            return NextResponse.json(
                { message: 'Username and password are required' },
                { status: 400 }
            )
        }

        // Cari apakah user & password ada yang cocok di daftar ALLOWED_ADMINS
        const validUser = ALLOWED_ADMINS.find(
            (admin) => admin.user === username && admin.pass === password
        );

        // Jika tidak ditemukan yang cocok
        if (!validUser) {
            return NextResponse.json(
                { message: 'Invalid username or password' },
                { status: 401 }
            )
        }

        // Create JWT (expires in 1 hour)
        // Pakai validUser.user supaya lebih dinamis sesuai siapa yang login
        const token = jwt.sign({ username: validUser.user }, JWT_SECRET, { expiresIn: '1h' })

        // Set cookie (httpOnly)
        const res = NextResponse.json({ success: true, message: 'Logged in' })
        
        res.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60, // 1 hour
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        })

        return res
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);

        return NextResponse.json(
            { message: 'Invalid request', error: errorMessage },
            { status: 400 }
        );
    }
}

export const runtime = 'nodejs'