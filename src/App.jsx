import React, { useState } from "react";
import jsPDF from "jspdf";

export default function App() {
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [desa, setDesa] = useState("");
  const [kelompok, setKelompok] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [rhk, setRhk] = useState("");

  const [hasil, setHasil] = useState("");
  const [images, setImages] = useState([]);
  const [ttd, setTtd] = useState(null);

  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generate = () => {
    const desaList = ["Kebonsari", "Karangrejo", "Karanggadung", "Tegalretno"];
    const kelompokList = ["Kenanga", "Melati", "Mawar", "Anggrek"];

    const fixDesa = desa || rand(desaList);
    const fixKelompok = kelompok || rand(kelompokList);
    const fixJumlah = jumlah || Math.floor(Math.random() * 20 + 10);

    const kalimat = [
      "Program Keluarga Harapan merupakan program strategis pemerintah.",
      "PKH bertujuan meningkatkan kesejahteraan masyarakat.",
      "Pendamping memiliki peran penting dalam pelaksanaan program.",
      "Kegiatan dilakukan secara berkelanjutan.",
      "Pendamping memberikan edukasi kepada KPM."
    ];

    const kegiatanKalimat = [
      "Kegiatan dilaksanakan secara partisipatif.",
      "Peserta mengikuti kegiatan dengan antusias.",
      "Pendamping memberikan arahan langsung.",
      "Diskusi berjalan interaktif.",
      "Seluruh peserta aktif mengikuti kegiatan."
    ];

    const hasilKalimat = [
      "Kegiatan memberikan dampak positif.",
      "Peserta memahami materi dengan baik.",
      "Terjadi peningkatan kesadaran KPM.",
      "Kegiatan berjalan lancar.",
      "Tidak terdapat kendala berarti."
    ];

    const paragraf = () =>
      `${rand(kalimat)} ${rand(kalimat)} ${rand(kalimat)} ${rand(kalimat)}`;

    const kegiatanParagraf = () =>
      `${rand(kegiatanKalimat)} ${rand(kegiatanKalimat)} ${rand(kegiatanKalimat)}`;

    const hasilParagraf = () =>
      `${rand(hasilKalimat)} ${rand(hasilKalimat)} ${rand(hasilKalimat)}`;

    let pembukaRhk = "";

    if (rhk === "2") {
      pembukaRhk = `
Kegiatan P2K2 dilaksanakan di rumah ${lokasi || "salah satu KPM"} 
di Desa ${fixDesa} kelompok ${fixKelompok} 
dengan jumlah ${fixJumlah} KPM yang hadir secara lengkap.
`;
    } else {
      pembukaRhk = "Kegiatan merupakan bagian dari pelaksanaan tugas pendamping PKH.";
    }

    const text = `
A. Pendahuluan

1. Umum  
${paragraf()}  
${paragraf()}

2. Maksud dan Tujuan  
a. ${rand(kalimat)}  
b. ${rand(kalimat)}  
c. ${rand(kalimat)}  

3. Ruang Lingkup  
Kegiatan dilaksanakan di Desa ${fixDesa} kelompok ${fixKelompok} dengan jumlah ${fixJumlah} KPM.

4. Dasar  
a) Pedoman PKH  
b) Kebijakan Kementerian Sosial  
c) Rencana kerja pendamping  

B. Kegiatan yang Dilaksanakan Beserta Dokumentasi  

${pembukaRhk}

Kegiatan dilaksanakan pada tanggal ${tanggal || "-"} dengan judul ${judul || "-"}.

${kegiatanParagraf()}  
${kegiatanParagraf()}  
${kegiatanParagraf()}  

C. Hasil yang Dicapai  

${hasilParagraf()}  
${hasilParagraf()}  

D. Simpulan dan Saran  

Simpulan  
Kegiatan berjalan dengan baik dan memberikan dampak positif.

Saran  
Perlu kegiatan berkelanjutan guna meningkatkan kualitas program.

E. Penutup  

Demikian laporan ini dibuat sebagai pertanggungjawaban pelaksanaan kegiatan.
`;

    setHasil(text);
  };

  // 📸 Upload Foto
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImages([...images, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  // ✍️ Upload TTD
  const handleTTD = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTtd(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("Times", "Normal");

    // KOP
    doc.setFontSize(12);
    doc.text("KEMENTERIAN SOSIAL REPUBLIK INDONESIA", 105, 15, { align: "center" });
    doc.text("LAPORAN KEGIATAN PKH", 105, 25, { align: "center" });

    doc.line(10, 30, 200, 30);

    // ISI
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(hasil, 180);

    let y = 40;
    lines.forEach((line) => {
      doc.text(line, 15, y);
      y += 6;
    });

    // FOTO
    images.forEach((img) => {
      doc.addPage();
      doc.addImage(img, "JPEG", 20, 40, 160, 90);
    });

    // TTD
    doc.text(`Kebumen, ${tanggal || "-"}`, 140, 250);
    doc.text("Pendamping PKH", 140, 258);

    if (ttd) {
      doc.addImage(ttd, "PNG", 140, 260, 40, 20);
    }

    doc.text("Arif Heruwanto", 140, 285);

    doc.save(`RHK_${rhk}_${judul}.pdf`);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Times New Roman" }}>
      <h2>APLIKASI LAPORAN PKH (FINAL PERFECT)</h2>

      <input placeholder="Judul Kegiatan" onChange={(e)=>setJudul(e.target.value)} />
      <input type="date" onChange={(e)=>setTanggal(e.target.value)} />

      <select onChange={(e)=>setDesa(e.target.value)}>
        <option value="">Pilih Desa</option>
        <option>Kebonsari</option>
        <option>Karangrejo</option>
        <option>Karanggadung</option>
        <option>Tegalretno</option>
      </select>

      <input placeholder="Kelompok" onChange={(e)=>setKelompok(e.target.value)} />
      <input placeholder="Jumlah KPM" onChange={(e)=>setJumlah(e.target.value)} />
      <input placeholder="Lokasi (rumah siapa)" onChange={(e)=>setLokasi(e.target.value)} />

      <select onChange={(e)=>setRhk(e.target.value)}>
        <option>Pilih RHK</option>
        <option value="1">RHK 1</option>
        <option value="2">RHK 2 (P2K2)</option>
        <option value="3">RHK 3</option>
        <option value="4">RHK 4</option>
        <option value="5">RHK 5</option>
        <option value="6">RHK 6</option>
        <option value="7">RHK 7</option>
        <option value="8">RHK 8</option>
        <option value="9">RHK 9</option>
      </select>

      <br /><br />

      📸 Upload Foto: <input type="file" onChange={handleImage} /><br />
      ✍️ Upload TTD: <input type="file" onChange={handleTTD} /><br /><br />

      <button onClick={generate}>⚡ GENERATE</button>
      <button onClick={downloadPDF} style={{ marginLeft: 10 }}>
        📄 DOWNLOAD PDF
      </button>

      <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>
        {hasil}
      </pre>
    </div>
  );
}
