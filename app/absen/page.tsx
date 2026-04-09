// Ini adalah server component untuk proteksi halaman absen

// Tugas:
// - Ambil cookies dari next/headers
// - Ambil token dari cookies

// Jika token tidak ada:
// - redirect ke "/login"

// Jika token ada:
// - verifikasi menggunakan jsonwebtoken

// Jika token invalid:
// - redirect ke "/login"

// Jika valid:
// - render component AbsenClient

// Import AbsenClient dari "./AbsenClient"

// Jangan ubah logic absensi yang sudah ada
// Ini hanya wrapper untuk proteksi

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

import AbsenClient from "./AbsentClient";
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret_in_production";

function getCookieFromHeader(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp("(^|; )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

export default async function Page() {
  const hdrs = await headers()
  const cookieHeader = hdrs.get("cookie")
  const token = getCookieFromHeader(cookieHeader, "token")

  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("Token verify failed", err);
    redirect("/login");
  }

  return <AbsenClient />;
}
