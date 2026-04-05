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

  const generateIsi = () => {
    if (!selected) return alert("Pilih kegiatan dulu!");
    setIsi(`Kegiatan ${selected.nama} telah dilaksanakan pada tanggal ${tanggal} di ${lokasi}. Kegiatan berjalan dengan baik dan sesuai ketentuan.`);
  };

  const downloadPDF = () => {
    if (!selected) return alert("Pilih kegiatan dulu!");

    const doc = new jsPDF();

    doc.text("KEMENTERIAN SOSIAL REPUBLIK INDONESIA", 20, 20);
    doc.text(`Kegiatan: ${selected.nama}`, 20, 40);
    doc.text(`Tanggal: ${tanggal}`, 20, 50);
    doc.text(`Lokasi: ${lokasi}`, 20, 60);

    doc.text("Isi:", 20, 80);
    doc.text(isi || "-", 20, 90, { maxWidth: 170 });

    doc.save(`RHK ${selected.rhk} - ${selected.nama}.pdf`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Generator Laporan PKH</h2>

      <select onChange={(e)=>setSelected(kegiatanList[e.target.value])}>
        <option>Pilih Kegiatan</option>
        {kegiatanList.map((k,i)=>(
          <option key={i} value={i}>
            RHK {k.rhk} - {k.nama}
          </option>
        ))}
      </select>

      <br/><br/>

      <input type="date" onChange={e=>setTanggal(e.target.value)} />
      <br/>
      <input placeholder="Lokasi" onChange={e=>setLokasi(e.target.value)} />

      <br/><br/>

      <button onClick={generateIsi}>Buat Isi</button>
      <button onClick={downloadPDF}>Download PDF</button>

      <pre>{isi}</pre>
    </div>
  );
}
