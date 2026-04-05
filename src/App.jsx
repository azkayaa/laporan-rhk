import React, { useState } from "react";

const kegiatanList = [
  { rhk: 1, nama: "Edukasi Penyaluran Bansos" },
  { rhk: 2, nama: "Pertemuan P2K2" },
  { rhk: 3, nama: "Verifikasi Komitmen" },
  { rhk: 4, nama: "Graduasi KPM" },
  { rhk: 5, nama: "Pemutakhiran Data" },
  { rhk: 6, nama: "Respon Kasus" },
  { rhk: 7, nama: "Laporan Bulanan" },
  { rhk: 8, nama: "TLHP & Koordinasi" },
  { rhk: 9, nama: "Publikasi Media Sosial" },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [isi, setIsi] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAI = async () => {
    if (!selected) return alert("Pilih kegiatan dulu!");

    setLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `Buat laporan kegiatan ${selected.nama} PKH tanggal ${tanggal} di ${lokasi}`
      })
    });

    const data = await res.json();

    const text =
      data.choices?.[0]?.message?.content || "Gagal generate";

    setIsi(text);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🤖 Generator Laporan PKH AI</h2>

      <select onChange={(e) => setSelected(kegiatanList[e.target.value])}>
        <option>Pilih Kegiatan</option>
        {kegiatanList.map((k, i) => (
          <option key={i} value={i}>
            RHK {k.rhk} - {k.nama}
          </option>
        ))}
      </select>

      <br /><br />

      <input type="date" onChange={(e) => setTanggal(e.target.value)} />
      <br />
      <input placeholder="Lokasi" onChange={(e) => setLokasi(e.target.value)} />

      <br /><br />

      <button onClick={generateAI}>
        {loading ? "Loading..." : "🤖 Generate AI"}
      </button>

      <pre>{isi}</pre>
    </div>
  );
}
