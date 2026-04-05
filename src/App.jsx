import React, { useState } from "react";
import jsPDF from "jspdf";

export default function App() {
  const defaultLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_the_Ministry_of_Social_Affairs_of_the_Republic_of_Indonesia.svg/960px-Logo_of_the_Ministry_of_Social_Affairs_of_the_Republic_of_Indonesia.svg.png";

  const [kop] = useState({
    kementerian: "KEMENTERIAN SOSIAL REPUBLIK INDONESIA",
    dirjen: "DIREKTORAT JENDERAL PERLINDUNGAN DAN JAMINAN SOSIAL",
    direktorat: "DIREKTORAT PERLINDUNGAN SOSIAL NON KEBENCANAAN",
    alamat: "Jl. Salemba Raya No. 28 Jakarta Pusat"
  });

  const [rhk, setRhk] = useState("");
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");

  const [p2k2, setP2k2] = useState({
    kelompok: "",
    lokasi: "",
    jumlah: "",
    modul: "",
    sesi: ""
  });

  const [hasil, setHasil] = useState("");

  const generateLaporan = () => {
    let tambahan = "";

    if (rhk === "2") {
      tambahan = `
Kegiatan dilaksanakan pada kelompok ${p2k2.kelompok || "-"} yang bertempat di rumah ${p2k2.lokasi || "-"}.
Kegiatan ini diikuti oleh ${p2k2.jumlah || "-"} KPM dengan materi ${p2k2.modul || "-"} pada ${p2k2.sesi || "-"}.
`;
    }

    const text = `
A. PENDAHULUAN
Kegiatan ini merupakan bagian dari Program Keluarga Harapan (PKH) untuk meningkatkan kesejahteraan masyarakat.

B. KEGIATAN
Dilaksanakan pada tanggal ${tanggal || "-"} kegiatan ${judul || "-"}.
${tambahan}

C. HASIL
Kegiatan berjalan dengan baik dan memberikan dampak positif bagi peserta.

D. PENUTUP
Demikian laporan ini dibuat sebagai pertanggungjawaban pelaksanaan kegiatan.
`;

    setHasil(text);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // LOGO
    doc.addImage(defaultLogo, "PNG", 15, 10, 20, 20);

    // KOP
    doc.setFont("Times", "Bold");
    doc.setFontSize(12);
    doc.text(kop.kementerian, 105, 15, { align: "center" });
    doc.text(kop.dirjen, 105, 22, { align: "center" });
    doc.text(kop.direktorat, 105, 28, { align: "center" });

    doc.setFontSize(8);
    doc.setFont("Times", "Normal");
    doc.text(kop.alamat, 105, 34, { align: "center" });

    // GARIS
    doc.line(15, 38, 195, 38);
    doc.line(15, 40, 195, 40);

    // JUDUL
    doc.setFont("Times", "Bold");
    doc.setFontSize(12);
    doc.text("LAPORAN PELAKSANAAN TUGAS", 105, 50, { align: "center" });

    // ISI
    doc.setFont("Times", "Normal");
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(hasil, 180);
    doc.text(lines, 15, 60);

    doc.save(`Laporan_RHK_${rhk}.pdf`);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Times New Roman" }}>
      
      {/* KOP TAMPILAN */}
      <div style={{ textAlign: "center", borderBottom: "3px solid black", marginBottom: 20 }}>
        <img src={defaultLogo} width="60" />
        <h3>{kop.kementerian}</h3>
        <h4>{kop.dirjen}</h4>
        <h4>{kop.direktorat}</h4>
        <p>{kop.alamat}</p>
      </div>

      <h3>APLIKASI LAPORAN PKH</h3>

      <select onChange={(e) => setRhk(e.target.value)}>
        <option>Pilih RHK</option>
        <option value="1">RHK 1</option>
        <option value="2">RHK 2 (P2K2)</option>
        <option value="3">RHK 3</option>
      </select>

      <br /><br />

      <input placeholder="Judul Kegiatan"
        onChange={(e) => setJudul(e.target.value)} />

      <br /><br />

      <input type="date"
        onChange={(e) => setTanggal(e.target.value)} />

      <br /><br />

      {rhk === "2" && (
        <div>
          <h4>Detail P2K2</h4>

          <input placeholder="Nama Kelompok"
            onChange={(e)=>setP2k2({...p2k2, kelompok:e.target.value})} />

          <br />

          <input placeholder="Di rumah siapa"
            onChange={(e)=>setP2k2({...p2k2, lokasi:e.target.value})} />

          <br />

          <input placeholder="Jumlah KPM"
            onChange={(e)=>setP2k2({...p2k2, jumlah:e.target.value})} />

          <br />

          <input placeholder="Modul"
            onChange={(e)=>setP2k2({...p2k2, modul:e.target.value})} />

          <br />

          <input placeholder="Sesi"
            onChange={(e)=>setP2k2({...p2k2, sesi:e.target.value})} />
        </div>
      )}

      <br />

      <button onClick={generateLaporan}>GENERATE LAPORAN</button>

      <button onClick={downloadPDF} style={{ marginLeft: 10 }}>
        DOWNLOAD PDF
      </button>

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {hasil}
      </pre>
    </div>
  );
}
