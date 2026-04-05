import React, { useState } from "react";
import jsPDF from "jspdf";

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

  // 🔥 GENERATE AI
  const generateAI = async () => {
    if (!selected) return alert("Pilih kegiatan dulu!");

    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: `
Buat laporan resmi PKH dengan format:

A. Pendahuluan
B. Kegiatan
C. Hasil
D. Penutup

Kegiatan: ${selected.nama}
Tanggal: ${tanggal}
Lokasi: ${lokasi}
`
        })
      });

      const data = await res.json();
      setIsi(data.result || "Gagal generate");

    } catch (err) {
      setIsi("Error koneksi");
    }

    setLoading(false);
  };

  // 🔥 DOWNLOAD PDF
  const downloadPDF = () => {
    if (!selected) return alert("Pilih kegiatan dulu!");

    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("KEMENTERIAN SOSIAL REPUBLIK INDONESIA", 20, 20);

    doc.setFontSize(10);
    doc.text(`Kegiatan: ${selected.nama}`, 20, 40);
    doc.text(`Tanggal: ${tanggal}`, 20, 50);
    doc.text(`Lokasi: ${lokasi}`, 20, 60);

    doc.text("Isi Laporan:", 20, 80);
    doc.text(isi || "-", 20, 90, { maxWidth: 170 });

    doc.save(`RHK-${selected.rhk}.pdf`);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
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
      <input
        placeholder="Lokasi"
        onChange={(e) => setLokasi(e.target.value)}
      />

      <br /><br />

      <button onClick={generateAI}>
        {loading ? "Loading..." : "🤖 Generate AI"}
      </button>

      <button onClick={downloadPDF} style={{ marginLeft: 10 }}>
        📄 Download PDF
      </button>

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {isi}
      </pre>
    </div>
  );
}
