"use client";

import { useState } from "react";
import Image from "next/image";
import bg from "../public/logo.png";


export default function Home() {
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const url = "https://script.google.com/macros/s/AKfycbxMWGCg5BQ2h7IDnJncDSABDKG0VMflY0DHdmz0LBY5J34RPyLsTQNn-TDf-_YD5Ur32Q/exec";

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
      <img src="/logo.png" alt="Logo" className="logo-luar" />
      <div className="card">
        <h2 className="title">ABSENSI</h2>
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
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #6d3914, #d7bda6);
          gap: 1rem;
        }

        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-luar {
          width: 120px;
          height: auto;
          max-width: 150px;
        }

        .title {
          text-align: center;
          color: #4c2b08;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          font-weight: bold;
          font-size: 2rem;
          margin: 0;
        }

        .card {
          width: 90%;
          max-width: 350px;
          background: #b7957f;
          padding: 24px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        input, select, button {
          width: 100%;
          padding: 14px;
          margin-top: 12px;
          border-radius: 10px;
          border: 3px solid #4c2b08;
          box-sizing: border-box;
        }

        button {
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

        input:focus, select:focus {
          outline: none;
          border-color: #6d3914;
          box-shadow: 0 0 0 3px rgba(109,57,20,0.2);
        }

        .info {
          text-align: center;
          margin-top: 20px;
          color: #4c2b08; 
          font-weight: bold;
          min-height: 1.5rem;
        }

        @media (max-width: 480px) {
          .logo-luar {
            width: 100px;
          }
          .title {
            font-size: 1.5rem;
          }
          .container {
            padding: 1rem;
            gap: 0.5rem;
          }
        }
      `}</style>
    </main>
  );
}
