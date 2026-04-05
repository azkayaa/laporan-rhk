import React, { useState } from "react";
import jsPDF from "jspdf";

export default function App() {
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
Kegiatan ini dilaksanakan pada kelompok ${p2k2.kelompok} yang bertempat di rumah ${p2k2.lokasi}. 
Kegiatan diikuti oleh ${p2k2.jumlah} KPM dengan materi ${p2k2.modul} pada ${p2k2.sesi}.
`;
    }

    const text = `
LAPORAN KEGIATAN

A. PENDAHULUAN

Kegiatan ini dilaksanakan sebagai bagian dari Program Keluarga Harapan (PKH) dalam rangka meningkatkan kesejahteraan masyarakat serta memastikan bantuan sosial tersalurkan secara tepat sasaran.

Adapun tujuan dari kegiatan ini adalah untuk memberikan pemahaman, pendampingan serta memastikan kepatuhan KPM terhadap ketentuan program.

B. KEGIATAN

Pada tanggal ${tanggal}, telah dilaksanakan kegiatan ${judul}.

${tambahan}

Kegiatan dilaksanakan secara langsung dengan pendekatan persuasif dan edukatif kepada KPM. Seluruh peserta mengikuti kegiatan dengan baik dan menunjukkan antusiasme tinggi.

C. HASIL

Hasil dari kegiatan ini menunjukkan bahwa KPM memahami materi yang disampaikan dan mampu menerapkan dalam kehidupan sehari-hari. Selain itu, kegiatan ini juga meningkatkan kesadaran KPM terhadap pentingnya kepatuhan terhadap program bantuan sosial.

D. KESIMPULAN

Kegiatan berjalan dengan lancar dan memberikan dampak positif bagi KPM. Diharapkan kegiatan ini dapat terus dilaksanakan secara berkelanjutan.

E. PENUTUP

Demikian laporan ini dibuat sebagai bentuk pertanggungjawaban pelaksanaan tugas.
`;

    setHasil(text);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Times", "Normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(hasil, 180);
    doc.text(lines, 15, 15);

    doc.save(`Laporan_RHK_${rhk}.pdf`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>APLIKASI LAPORAN PKH</h2>

      <select onChange={(e) => setRhk(e.target.value)}>
        <option value="">Pilih RHK</option>
        <option value="1">RHK 1</option>
        <option value="2">RHK 2 (P2K2)</option>
        <option value="3">RHK 3</option>
      </select>

      <br /><br />

      <input
        placeholder="Judul Kegiatan"
        onChange={(e) => setJudul(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        onChange={(e) => setTanggal(e.target.value)}
      />

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

      <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>
        {hasil}
      </pre>
    </div>
  );
}
