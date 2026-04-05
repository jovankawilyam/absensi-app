"use client";

import { useState } from "react";

export default function Home() {
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const url = "https://script.google.com/macros/s/AKfycbwbcKli8fUJdTyhfTUiuHcu5gifPiAmXeI8ccjQ3jFV5Ae-KPvfwr1SjkjHirxPJ76lBg/exec";

  const kirim = async () => {
    if (!nama) {
      setInfo("Nama wajib diisi!");
      return;
    }

    setLoading(true);
    setInfo("");

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({ nama, status }),
      });

      const data = await res.json();

      if (data.status === "exists") {
        setInfo("Kamu sudah absen hari ini ❌");
      } else {
        setInfo("Absensi berhasil ✅");
        setNama(""); // reset form
      }
    } catch (err) {
      setInfo("Server error!");
    }

    setLoading(false);
  };

  return (
    <main className="container">
      <div className="card">
        <h2>Absensi</h2>

        <input
          type="text"
          placeholder="Masukkan nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Sakit">Sakit</option>
        </select>

        <button onClick={kirim} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>

        <p className="info">{info}</p>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .card {
          width: 90%;
          max-width: 350px;
          background: black;
          padding: 24px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        h2 {
          text-align: center;
        }

        input, select, button {
          width: 100%;
          padding: 14px;
          margin-top: 12px;
          border-radius: 12px;
          border: 1px solid #ddd;
        }

        button {
          background: #667eea;
          color: white;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }

        .info {
          text-align: center;
          margin-top: 12px;
        }
      `}</style>
    </main>
  );
}