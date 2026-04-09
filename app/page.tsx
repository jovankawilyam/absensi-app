// Buat halaman root Next.js (App Router)
// Ketika user membuka "/"
// Langsung redirect ke "/login"
// Gunakan next/navigation redirect
// Jangan ada UI, hanya redirect saja

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}