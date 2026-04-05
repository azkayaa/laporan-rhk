import React, { useState } from "react";
import jsPDF from "jspdf";

export default function App() {
  const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_the_Ministry_of_Social_Affairs_of_the_Republic_of_Indonesia.svg/960px-Logo_of_the_Ministry_of_Social_Affairs_of_the_Republic_of_Indonesia.svg.png";

  const [rhk, setRhk] = useState("");
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [desa, setDesa] = useState("");
  const [kelompok, setKelompok] = useState("");
  const [jumlah, setJumlah] = useState("");

  const [images, setImages] = useState([]);

  const [hasil, setHasil] = useState("");

  const generate = () => {
    const text = `
A. PENDAHULUAN

Kegiatan ini merupakan bagian dari pelaksanaan Program Keluarga Harapan (PKH) yang bertujuan meningkatkan kesejahteraan masyarakat serta memastikan bantuan sosial tepat sasaran.

B. KEGIATAN

Kegiatan ${judul} dilaksanakan pada tanggal ${tanggal} di Desa ${desa}, kelompok ${kelompok} dengan jumlah ${jumlah} KPM.

Kegiatan dilaksanakan dengan pendekatan edukatif dan partisipatif. Seluruh peserta mengikuti kegiatan dengan baik.

C. HASIL

Kegiatan berjalan lancar dan memberikan dampak positif terhadap pemahaman KPM.

D. PENUTUP

Demikian laporan ini dibuat sebagai pertanggungjawaban pelaksanaan kegiatan.
`;

    setHasil(text);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImages([...images, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();

    // LOGO
    doc.addImage(logo, "PNG", 15, 10, 20, 20);

    // KOP
    doc.setFont("Times", "Bold");
    doc.setFontSize(12);
    doc.text("KEMENTERIAN SOSIAL REPUBLIK INDONESIA", 105, 15, { align: "center" });
    doc.text("DIREKTORAT JENDERAL PERLINDUNGAN DAN JAMINAN SOSIAL", 105, 22, { align: "center" });
    doc.text("DIREKTORAT PERLINDUNGAN SOSIAL NON KEBENCANAAN", 105, 28, { align: "center" });

    doc.setFontSize(8);
    doc.setFont("Times", "Normal");
    doc.text("Jl. Salemba Raya No.28 Jakarta", 105, 34, { align: "center" });

    doc.line(15, 38, 195, 38);
    doc.line(15, 40, 195, 40);

    // JUDUL
    doc.setFontSize(12);
    doc.setFont("Times", "Bold");
    doc.text("LAPORAN PELAKSANAAN TUGAS", 105, 50, { align: "center" });

    // ISI
    doc.setFont("Times", "Normal");
    doc.setFontSize(11);

    let y = 60;
    const lines = doc.splitTextToSize(hasil, 180);
    doc.text(lines, 15, y);

    y += lines.length * 6 + 10;

    // FOTO
    images.forEach((img) => {
      doc.addPage();
      doc.addImage(img, "JPEG", 20, 40, 160, 90);
    });

    // TTD
    doc.text(`Kebumen, ${tanggal}`, 140, 250);
    doc.text("Pengelola Layanan Operasional", 140, 258);
    doc.text("Arif Heruwanto", 140, 280);
    doc.text("NIP. 1992040420250211082", 140, 288);

    doc.save(`RHK_${rhk}_${judul}.pdf`);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Times New Roman" }}>
      <h2>APLIKASI LAPORAN DINAS PKH</h2>

      <input placeholder="Judul Kegiatan" onChange={(e) => setJudul(e.target.value)} />
      <input type="date" onChange={(e) => setTanggal(e.target.value)} />
      <input placeholder="Desa" onChange={(e) => setDesa(e.target.value)} />
      <input placeholder="Kelompok" onChange={(e) => setKelompok(e.target.value)} />
      <input placeholder="Jumlah KPM" onChange={(e) => setJumlah(e.target.value)} />

      <select onChange={(e) => setRhk(e.target.value)}>
        <option>Pilih RHK</option>
        <option value="1">RHK 1</option>
        <option value="2">RHK 2</option>
        <option value="3">RHK 3</option>
        <option value="4">RHK 4</option>
        <option value="5">RHK 5</option>
        <option value="6">RHK 6</option>
        <option value="7">RHK 7</option>
        <option value="8">RHK 8</option>
        <option value="9">RHK 9</option>
      </select>

      <br /><br />

      <input type="file" onChange={handleImage} />

      <br /><br />

      <button onClick={generate}>GENERATE</button>
      <button onClick={downloadPDF}>DOWNLOAD PDF</button>

      <pre style={{ whiteSpace: "pre-wrap" }}>{hasil}</pre>
    </div>
  );
}
