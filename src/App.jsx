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

  const randUnique = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const generate = () => {
    const umum = [
      "Program Keluarga Harapan merupakan program pemerintah dalam meningkatkan kesejahteraan masyarakat.",
      "PKH bertujuan untuk meningkatkan kualitas hidup keluarga penerima manfaat.",
      "Pelaksanaan PKH dilakukan secara berkelanjutan untuk memastikan bantuan tepat sasaran.",
      "Pendamping PKH memiliki peran penting dalam mendukung keberhasilan program.",
      "Kegiatan ini merupakan bagian dari implementasi program perlindungan sosial."
    ];

    const kegiatanArr = [
      "Kegiatan dilaksanakan secara partisipatif dan interaktif.",
      "Pendamping memberikan arahan secara langsung kepada peserta.",
      "Peserta mengikuti kegiatan dengan tertib dan penuh perhatian.",
      "Diskusi berjalan aktif antara pendamping dan peserta.",
      "Kegiatan berlangsung dalam suasana kondusif."
    ];

    const hasilArr = [
      "Peserta menunjukkan pemahaman yang baik terhadap materi.",
      "Terjadi peningkatan kesadaran KPM.",
      "Kegiatan memberikan dampak positif bagi peserta.",
      "Peserta mampu memahami materi dengan baik.",
      "Kegiatan berjalan dengan lancar tanpa kendala."
    ];

    const u = randUnique(umum, 3);
    const k = randUnique(kegiatanArr, 3);
    const h = randUnique(hasilArr, 3);

    const text = `
A. Pendahuluan

1. Umum  
${u[0]} ${u[1]} ${u[2]}

2. Maksud dan Tujuan  
a. ${u[0]}  
b. ${u[1]}  
c. ${u[2]}  

3. Ruang Lingkup  
Kegiatan dilaksanakan di Desa ${desa || "-"} kelompok ${kelompok || "-"} dengan jumlah ${jumlah || "-"} KPM.

4. Dasar  
a) Pedoman PKH  
b) Kebijakan Kementerian Sosial  
c) Rencana kerja pendamping  

B. Kegiatan yang Dilaksanakan Beserta Dokumentasi  

Kegiatan dilaksanakan di rumah ${lokasi || "-"} pada tanggal ${tanggal || "-"}.

${k[0]}  
${k[1]}  
${k[2]}  

C. Hasil yang Dicapai  

${h[0]}  
${h[1]}  
${h[2]}  

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

    doc.setFontSize(12);
    doc.text("KEMENTERIAN SOSIAL REPUBLIK INDONESIA", 105, 15, { align: "center" });
    doc.text("LAPORAN KEGIATAN PKH", 105, 25, { align: "center" });

    doc.line(10, 30, 200, 30);

    let y = 40;
    const paragraphs = hasil.split("\n");

    paragraphs.forEach((p) => {
      const lines = doc.splitTextToSize(p, 180);
      doc.text(lines, 15, y);
      y += lines.length * 6;
    });

    // FOTO MASUK PDF
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
      <h2>APLIKASI LAPORAN PKH (FINAL RAPI)</h2>

      <input placeholder="Judul" onChange={(e)=>setJudul(e.target.value)} />
      <input type="date" onChange={(e)=>setTanggal(e.target.value)} />

      <select onChange={(e)=>setDesa(e.target.value)}>
        <option>Pilih Desa</option>
        <option>Kebonsari</option>
        <option>Karangrejo</option>
        <option>Karanggadung</option>
        <option>Tegalretno</option>
      </select>

      <input placeholder="Kelompok" onChange={(e)=>setKelompok(e.target.value)} />
      <input placeholder="Jumlah KPM" onChange={(e)=>setJumlah(e.target.value)} />
      <input placeholder="Lokasi" onChange={(e)=>setLokasi(e.target.value)} />

      <br /><br />

      📸 Upload Foto: <input type="file" onChange={handleImage} />
      <br />
      ✍️ Upload TTD: <input type="file" onChange={handleTTD} />

      <br /><br />

      <button onClick={generate}>⚡ GENERATE</button>
      <button onClick={downloadPDF} style={{ marginLeft: 10 }}>
        📄 DOWNLOAD PDF
      </button>

      <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>
        {hasil}
      </pre>

      {/* 🔥 PREVIEW FOTO */}
      <div>
        {images.map((img, i) => (
          <img key={i} src={img} alt="" width="200" style={{ margin: 5 }} />
        ))}
      </div>
    </div>
  );
}
