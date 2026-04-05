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

  // 🔥 GENERATE TANPA AI
  const generateManual = () => {
    if (!selected) return alert("Pilih kegiatan dulu!");

    const teks = `
A. PENDAHULUAN
Kegiatan ${selected.nama} merupakan bagian dari pelaksanaan Program Keluarga Harapan (PKH) yang bertujuan meningkatkan kesejahteraan masyarakat.

B. KEGIATAN
Kegiatan dilaksanakan pada tanggal ${tanggal || "-"} bertempat di ${lokasi || "-"} dengan melibatkan KPM PKH dan pihak terkait.

C. HASIL
Kegiatan berjalan dengan baik dan lancar sesuai dengan ketentuan yang berlaku serta memberikan dampak positif bagi peserta.

D. PENUTUP
Demikian laporan ini dibuat sebagai bentuk pertanggungjawaban pelaksanaan kegiatan.
`;

    setIsi(teks);
  };

  // 🔥 PDF
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
      <h2>📄 Generator Laporan PKH (Gratis)</h2>

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

      <button onClick={generateManual}>
        ⚡ Buat Laporan Otomatis
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
