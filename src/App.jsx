import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Send, 
  Download, 
  Plus, 
  Trash2, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronRight,
  ListPlus, 
  Calendar, 
  Clock, 
  Building2, 
  Upload, 
  RefreshCcw, 
  Camera, 
  PenTool, 
  Hash, 
  Type, 
  FileSearch, 
  ClipboardCheck, 
  Bold, 
  Italic, 
  List, 
  Eraser, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Table as TableIcon, 
  ImagePlus, 
  Sparkles, 
  Zap, 
  FileDown, 
  RotateCcw, 
  FileBadge
} from 'lucide-react';

// API Key untuk Gemini (Disediakan oleh environment pada runtime)
const apiKey = "";

// Data RHK (Kategori dan Butir Kegiatan)
const RHK_DATA = [
  { id: 1, title: "RHK 1: Edukasi & Monitoring Bansos", kegiatan: ["1. Melakukan edukasi dan sosialisasi pencairan secara tunai dan non tunai", "2. Melaksanakan Supervisi Permasalahan Bantuan Sosial", "3. Melaksanakan Monitoring/Pemantauan Penyaluran Bantuan Sosial"] },
  { id: 2, title: "RHK 2: Melaksanakan P2K2", kegiatan: [
        "1. Modul 1: Pengasuhan dan Pendidikan Anak - Sesi 1: Menjadi orang tua yang lebih baik",
        "2. Modul 1: Pengasuhan dan Pendidikan Anak - Sesi 2: Memahami perilaku anak",
        "3. Modul 1: Pengasuhan dan Pendidikan Anak - Sesi 3: Memahami cara anak usia dini belajar",
        "4. Modul 1: Pengasuhan dan Pendidikan Anak - Sesi 4: Membantu anak sukses di sekolah",
        "5. Modul 2: Pengelolaan Keuangan dan Perencanaan Usaha - Sesi 1: Mengelola keuangan keluarga",
        "6. Modul 2: Pengelolaan Keuangan dan Perencanaan Usaha - Sesi 2: Cermat meminjam dan menabung",
        "7. Modul 2: Pengelolaan Keuangan dan Perencanaan Usaha - Sesi 3: Memulai usaha",
        "8. Modul 3: Kesehatan dan Gizi - Sesi 1: Pentingnya 1000 Hari Pertama Kehidupan (HPK)",
        "9. Modul 3: Kesehatan dan Gizi - Sesi 2: Keselamatan dan gizi ibu hamil",
        "10. Modul 3: Kesehatan dan Gizi - Sesi 3: Kesehatan dan gizi balita",
        "11. Modul 4: Perlindungan Anak - Sesi 1: Upaya Pencegahan Kekerasan & Perlakuan Salah pada Anak",
        "12. Modul 4: Perlindungan Anak - Sesi 2: Penelantaran & Eksploitasi Terhadap Anak",
        "13. Modul 5: Kesejahteraan Sosial - Sesi 1: Pelayanan Bagi Penyandang Disabilitas Berat",
        "14. Modul 5: Kesejahteraan Sosial - Sesi 2: Pentingnya Kesejahteraan Lanjut Usia",
        "15. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 1: Permasalahan Sosial",
        "16. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 2: Mendukung Ibu Hamil Mengakses Informasi",
        "17. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 3: Mendukung Perawatan Sehari-hari Ibu Hamil",
        "18. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 4: Mendukung Ibu dan Ayah Stimulasi Janin",
        "19. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 5: Pemenuhan Kesejahteraan Bayi Baru Lahir",
        "20. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 6: Stimulasi pada Bayi baru lahir",
        "21. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 7: Stimulasi pada Bayi Usia 6 - 12 bulan",
        "22. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 8: Stimulasi pada Anak Usia 1-2 tahun",
        "23. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 9: Stimulasi pada Anak Usia 2-6 tahun",
        "24. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 10: Pemanfaatan Bantuan Sosial Gizi",
        "25. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 11: Praktik Cuci Tangan Pakai Sabun",
        "26. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 12: Pemanfaatan Jamban Sehat",
        "27. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 13: Pemetaan Potensi Diri & Lingkungan",
        "28. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 14: Mengakses Sistem Rujukan Stunting",
        "29. Modul 6: Pencegahan dan Penanganan Stunting - Sesi 15: Komitmen Rencana Tindak Lanjut"  ] },
  { id: 3, title: "RHK 3: Verifikasi & Pendampingan", kegiatan: ["1. Melaksanakan Verifikasi Komitmen Pendidikan, Kesehatan dan Kesos", "2. Melakukan pendampingan, mediasi, dan fasilitasi KPM PKH"] },
  { id: 4, title: "RHK 4: Graduasi & Pemberdayaan", kegiatan: ["1. Melakukan usulan KPM Graduasi mandiri dan Pemberdayaan PPSE"] },
  { id: 5, title: "RHK 5: Pemutakhiran Data & Verivali", kegiatan: ["1. Melaksanakan Pemutakhiran Data", "2. Melaksanakan proses bisnis PKH yang meliputi verifikasi validasi calon penerima bantuan sosial"] },
  { id: 6, title: "RHK 6: Respon Kasus & Pengaduan", kegiatan: ["1. Melaksanakan Respon Kasus/Pengaduan/Kebencanaan/Kerentanan"] },
  { id: 7, title: "RHK 7: Pelaporan", kegiatan: ["1. Membuat laporan bulanan pelaksanaan PKH dan laporan lainnya"] },
  { id: 8, title: "RHK 8: TLHP & Koordinasi", kegiatan: ["1. Melaksanakan Tindak Lanjut Hasil Pemeriksaan (TLHP)", "2. Melakukan sosialisasi kebijakan dan bisnis proses PKH kepada aparat pemerintah tingkat kecamatan, desa/kelurahan, KPM PKH, dan masyarakat umum secara berkala melalui Pertemuan atau media sosial dll", "3. Mengikuti Rapat Koordinasi, Sosialisasi Kebijakan Proses Bisnis PKH dan Penguatan Kapasitas SDM", "4. Tugas Lainnya (Penugasan lainnya program Kementrian Sosial)"] },
  { id: 9, title: "RHK 9: Publikasi Media Sosial", kegiatan: ["1. Berperan aktif dalam memanfaatkan, menggunakan, melibatkan dan menyebarkan Media Sosial untuk menyampaikan semua program di Kementerian Sosial"] }
];

const SeamlessTextarea = ({ value, onChange, placeholder, className = "" }) => {
  const textareaRef = useRef(null);
  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };
  useEffect(() => { adjustHeight(); }, [value]);
  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={3}
      className={`w-full resize-none overflow-hidden bg-transparent border-none focus:ring-0 p-0 text-slate-700 leading-relaxed transition-all placeholder:text-slate-300 text-justify min-h-[80px] ${className}`}
    />
  );
};

const App = () => {
  const defaultLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_the_Ministry_of_Social_Affairs_of_the_Republic_of_Indonesia.svg/960px-Logo_of_the_Ministry_of_Social_Affairs_of_the_Republic_of_Indonesia.svg.png";

  const [kop, setKop] = useState({
    kementerian: 'KEMENTERIAN SOSIAL REPUBLIK INDONESIA',
    dirjen: 'DIREKTORAT JENDERAL PERLINDUNGAN DAN JAMINAN SOSIAL',
    direktorat: 'DIREKTORAT PERLINDUNGAN SOSIAL NON KEBENCANAAN',
    alamat: 'Jl. Salemba Raya No. 28 Jakarta Pusat 10430 Telp. (021) 3103591 http://www.kemsos.go.id'
  });
  
  const [kopLogo, setKopLogo] = useState(defaultLogo); 
  const [reportTitle, setReportTitle] = useState('LAPORAN PELAKSANAAN TUGAS');
  const [eventDate, setEventDate] = useState('');
  const [selectedRhkId, setSelectedRhkId] = useState(null); 

  const [signatureImg, setSignatureImg] = useState(null);
  const [signerName, setSignerName] = useState('Arif Heruwanto');
  const [signerNip, setSignerNip] = useState('1992040420250211082');
  const [signerTitle, setSignerTitle] = useState('Pengelola Layanan Operasional');
  const [signerCity, setSignerCity] = useState('Kebumen');

  const [content, setContent] = useState({
    gambaranUmum: '',
    maksudTujuan: '',
    ruangLingkup: '',
    dasar: '',
    kegiatan: '',
    tableB: null, // State untuk tabel pada BAB B
    hasil: '',
    simpulanSaran: '',
    penutup: ''
  });

  // Lampiran State
  const [dasarSuratFile, setDasarSuratFile] = useState(null);
  const [notulenFile, setNotulenFile] = useState(null);
  const [jadwalFile, setJadwalFile] = useState(null);
  const [absensiFile, setAbsensiFile] = useState(null);
  const [images, setImages] = useState([]); 
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDocGenerating, setIsDocGenerating] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState({});
  const [isCaptioning, setIsCaptioning] = useState({});
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [jsPdfLoaded, setJsPdfLoaded] = useState(false);
  const [expandedRhk, setExpandedRhk] = useState(null);

  useEffect(() => {
    const loadScripts = () => {
      // Memuat script jsPDF dan Autotable secara berurutan agar fungsi tabel tersedia di PDF
      if (!window.jspdf) {
        const script1 = document.createElement('script');
        script1.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        script1.onload = () => {
          const script2 = document.createElement('script');
          script2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js";
          script2.onload = () => { setJsPdfLoaded(true); };
          document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
      } else {
        setJsPdfLoaded(true);
      }
    };
    loadScripts();
  }, []);

  const handleContentChange = (field, value) => setContent(prev => ({ ...prev, [field]: String(value) }));

  // Handlers untuk Tabel B
  const handleTableAction = (action, payload) => {
    const tb = content.tableB;
    if (!tb) return;
    let newHeaders = [...tb.headers];
    let newRows = tb.rows.map(r => [...r]);

    switch(action) {
      case 'UPDATE_HEADER':
        newHeaders[payload.cIdx] = payload.value;
        break;
      case 'UPDATE_CELL':
        newRows[payload.rIdx][payload.cIdx] = payload.value;
        break;
      case 'ADD_ROW':
        newRows.push(Array(newHeaders.length).fill(''));
        break;
      case 'REMOVE_ROW':
        newRows.splice(payload.rIdx, 1);
        break;
      case 'ADD_COL':
        newHeaders.push(`Kolom ${newHeaders.length + 1}`);
        newRows = newRows.map(r => [...r, '']);
        break;
      case 'REMOVE_COL':
        newHeaders.splice(payload.cIdx, 1);
        newRows = newRows.map(r => { r.splice(payload.cIdx, 1); return r; });
        break;
      default: break;
    }
    setContent({...content, tableB: { headers: newHeaders, rows: newRows }});
  };

  const formatDateID = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const handleClearForm = () => {
    setReportTitle('LAPORAN PELAKSANAAN TUGAS');
    setEventDate('');
    setSelectedRhkId(null);
    setContent({
      gambaranUmum: '',
      maksudTujuan: '',
      ruangLingkup: '',
      dasar: '',
      kegiatan: '',
      tableB: null,
      hasil: '',
      simpulanSaran: '',
      penutup: ''
    });
    setDasarSuratFile(null);
    setNotulenFile(null);
    setJadwalFile(null);
    setAbsensiFile(null);
    setImages([]);
    showStatus('success', 'Seluruh isian laporan telah dikosongkan.');
  };

  const callAiWithRetry = async (prompt, systemPrompt, maxRetries = 5) => {
    const delays = [1000, 2000, 4000, 8000, 16000];
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: {
              temperature: 0.3,
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  reportTitle: { type: "STRING" },
                  gambaranUmum: { type: "STRING" },
                  maksudTujuan: { type: "STRING" },
                  ruangLingkup: { type: "STRING" },
                  dasar: { type: "STRING" },
                  kegiatan: { type: "STRING" },
                  hasil: { type: "STRING" },
                  simpulanSaran: { type: "STRING" },
                  penutup: { type: "STRING" }
                },
                required: ["reportTitle", "gambaranUmum", "maksudTujuan", "ruangLingkup", "dasar", "kegiatan", "hasil", "simpulanSaran", "penutup"]
              }
            }
          })
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        let textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textResponse) throw new Error("Gagal mengambil data dari AI.");
        
        // Ekstraksi JSON yang lebih robust
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          textResponse = jsonMatch[0];
        } else {
          textResponse = textResponse.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
        }
        return JSON.parse(textResponse);
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(res => setTimeout(res, delays[i]));
      }
    }
  };

  const compressImage = (dataUrl, maxWidth = 1000, quality = 0.6) => {
    if (!dataUrl || !dataUrl.startsWith('data:')) return Promise.resolve(dataUrl);
    return new Promise((resolve) => {
      const img = new Image();
      if (typeof dataUrl === 'string' && dataUrl.startsWith('http')) img.crossOrigin = "anonymous";
      img.src = dataUrl;
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let w = img.width; let h = img.height;
          if (w > maxWidth) { h = (maxWidth / w) * h; w = maxWidth; }
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } catch (e) { resolve(dataUrl); }
      };
      img.onerror = () => resolve(dataUrl);
    });
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setSignatureImg(reader.result); showStatus('success', 'Tanda tangan berhasil diunggah'); };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, { id: Date.now() + Math.random(), url: reader.result, name: file.name, caption: '' }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const updateImageCaption = (id, caption) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, caption: String(caption) } : img));
  };

  const handleFileUpload = (e, target) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'dasarSurat') setDasarSuratFile(reader.result);
        if (target === 'notulen') setNotulenFile(reader.result);
        if (target === 'jadwal') setJadwalFile(reader.result);
        if (target === 'absensi') setAbsensiFile(reader.result);
        showStatus('success', `Berhasil mengunggah ${target}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertTextWithAI = async (activityText, rhkId) => {
    const clean = String(activityText).replace(/^[0-9]+\.\s*/, '').trim();
    setIsAiGenerating(true);
    setSelectedRhkId(rhkId); 

    const systemPrompt = `Anda adalah Asisten Tenaga Ahli Pendamping PKH (Program Keluarga Harapan) dari Kementerian Sosial RI. Tugas Anda adalah menyusun narasi laporan dinas yang SANGAT FORMAL, terstruktur, komprehensif, dan menggunakan Bahasa Indonesia baku (EYD). Hindari penggunaan daftar poin (bullet points) yang terlalu singkat; sebaliknya, susunlah menjadi paragraf-paragraf deskriptif yang mengalir dan logis layaknya laporan resmi pemerintahan. PASTIKAN OUTPUT HANYA BERUPA OBJEK JSON VALID TANPA TEKS TAMBAHAN.`;
    
    const userPrompt = `Buatlah draf narasi laporan pelaksanaan tugas lapangan secara rinci untuk kegiatan berikut: "${clean}".
    
Berikan output dalam format JSON dengan panduan pengisian sebagai berikut:
- reportTitle: Judul laporan kegiatan (Huruf Kapital Semua, ringkas, merepresentasikan kegiatan).
- gambaranUmum: Latar belakang umum mengapa kegiatan ini dilaksanakan secara konseptual.
- maksudTujuan: Maksud dan tujuan spesifik diadakannya kegiatan lapangan ini.
- ruangLingkup: Sasaran KPM (Keluarga Penerima Manfaat), cakupan wilayah, atau batasan kegiatan.
- dasar: Dasar hukum pelaksanaan, SOP PKH, atau rujukan surat tugas yang relevan.
- kegiatan: Uraian kronologis, detail proses, dan interaksi saat pelaksanaan kegiatan di lapangan.
- hasil: Output nyata, kendala (jika ada simulasi logis), dan capaian dari kegiatan.
- simpulanSaran: Kesimpulan akhir pelaksanaan dan rekomendasi untuk tindak lanjut ke depannya.
- penutup: Kalimat penutup laporan resmi kedinasan.`;

    try {
      const data = await callAiWithRetry(userPrompt, systemPrompt);
      setReportTitle(String(data.reportTitle || "LAPORAN PELAKSANAAN TUGAS"));
      setContent({...content, ...data});
      showStatus('success', 'AI berhasil menyusun laporan komprehensif!');
      const el = document.getElementById('bab-a');
      if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    } catch (err) {
      showStatus('error', `AI Gagal: ${err.message}`);
    } finally { setIsAiGenerating(false); }
  };

  const refineTextWithAI = async (field) => {
    const currentText = content[field];
    if (!currentText || currentText.trim() === '') {
      showStatus('error', 'Isi teks terlebih dahulu sebelum diperhalus.');
      return;
    }
    setIsRefining(prev => ({ ...prev, [field]: true }));
    try {
      const systemPrompt = "Anda adalah asisten editor naskah dinas Kementerian Sosial RI. Perbaiki teks berikut menjadi bahasa Indonesia baku (EYD), sangat formal, terstruktur, dan cocok untuk laporan kedinasan pemerintahan. Jangan menambahkan informasi baru yang tidak ada, cukup perbaiki tata bahasa, kosa kata, dan susunan kalimatnya agar lebih profesional. Berikan HANYA teks hasil perbaikannya saja, tanpa basa-basi atau tanda kutip.";
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: currentText }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { temperature: 0.3 }
        })
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const result = await response.json();
      let textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textResponse) throw new Error("Gagal mengambil data dari AI.");
      
      handleContentChange(field, textResponse.trim());
      showStatus('success', 'Teks berhasil diperhalus! ✨');
    } catch (error) {
      showStatus('error', `Gagal memperhalus teks: ${error.message}`);
    } finally {
      setIsRefining(prev => ({ ...prev, [field]: false }));
    }
  };

  const generateCaptionWithAI = async (imgId, imgUrl) => {
    setIsCaptioning(prev => ({ ...prev, [imgId]: true }));
    try {
      const base64Data = imgUrl.split(',')[1];
      const mimeType = imgUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];

      const systemPrompt = "Anda adalah asisten pembuat laporan kegiatan sosial (PKH Kementerian Sosial). Berikan 1 kalimat keterangan foto (caption) yang sangat formal dan deskriptif berdasarkan gambar ini. Keterangan harus relevan dengan kegiatan penyaluran bantuan sosial, edukasi P2K2, atau rapat koordinasi. Jangan gunakan kutipan. Singkat, padat, dan jelas.";
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: "Buatkan caption formal untuk foto kegiatan ini." },
              { inlineData: { mimeType: mimeType, data: base64Data } }
            ]
          }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { temperature: 0.4 }
        })
      });
      
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const result = await response.json();
      let textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textResponse) throw new Error("Gagal membuat caption.");
      
      updateImageCaption(imgId, textResponse.trim());
      showStatus('success', 'Caption gambar berhasil dibuat! ✨');
    } catch (error) {
      showStatus('error', `Gagal membuat caption: ${error.message}`);
    } finally {
      setIsCaptioning(prev => ({ ...prev, [imgId]: false }));
    }
  };

  /**
   * PDF Generator
   */
  const generatePDFBlob = async () => {
    if (!jsPdfLoaded || !window.jspdf) throw new Error("Pustaka PDF belum siap.");
    if (!eventDate) throw new Error("Tanggal laporan wajib diisi!");
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    
    const margin = 20; 
    const pageWidth = doc.internal.pageSize.getWidth(); 
    const contentWidth = pageWidth - (margin * 2); 
    let currentY = 20;

    const addJustifiedText = (text, fontSize = 10, fontStyle = 'normal') => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', fontStyle);
      const paragraphs = String(text || "-").split('\n');
      
      paragraphs.forEach(p => {
        if (!p.trim()) {
          currentY += 5; 
          if (currentY > 275) { doc.addPage(); currentY = 20; }
          return;
        }
        
        const lines = doc.splitTextToSize(p, contentWidth);
        const blockHeight = lines.length * 5.5; 
        
        if (currentY + blockHeight > 275) {
          doc.addPage();
          currentY = 20;
        }
        
        doc.text(p, margin, currentY, { align: 'justify', maxWidth: contentWidth });
        currentY += blockHeight;
      });
    };

    if (kopLogo) { try { const cLogo = await compressImage(kopLogo, 400, 0.8); doc.addImage(cLogo, 'PNG', margin, 15, 22, 22); } catch(e){} }
    doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.text(kop.kementerian, pageWidth/2, 18, {align: 'center'});
    doc.setFontSize(10); doc.text(kop.dirjen, pageWidth/2, 24, {align: 'center'});
    doc.text(kop.direktorat, pageWidth/2, 29, {align: 'center'});
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.text(kop.alamat, pageWidth/2, 34, {align: 'center'});
    currentY = 38; doc.setLineWidth(0.6); doc.line(margin, currentY, pageWidth-margin, currentY);
    doc.setLineWidth(0.2); doc.line(margin, currentY + 0.8, pageWidth-margin, currentY + 0.8);
    currentY += 15;

    doc.setFontSize(13); doc.setFont('helvetica', 'bold'); doc.text('LAPORAN TENTANG', pageWidth/2, currentY, {align: 'center'});
    currentY += 8;
    const titleLines = doc.splitTextToSize(reportTitle.toUpperCase(), contentWidth - 30);
    titleLines.forEach(l => { doc.text(l, pageWidth/2, currentY, {align: 'center'}); currentY += 6; });
    currentY += 4;
    doc.setFontSize(10); doc.setFont('helvetica', 'italic'); doc.text(`Tanggal Laporan: ${formatDateID(eventDate)}`, pageWidth/2, currentY, {align: 'center'});
    currentY += 15;

    const addSectionTitle = (letter, title) => {
      if (currentY > 260) { doc.addPage(); currentY = 20; }
      doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.text(`${letter}. ${title}`, margin, currentY);
      currentY += 8; 
    };

    // BAB A
    addSectionTitle('A', 'PENDAHULUAN');
    addJustifiedText(`1. Gambaran Umum\n${content.gambaranUmum}\n\n2. Maksud dan Tujuan\n${content.maksudTujuan}\n\n3. Ruang Lingkup\n${content.ruangLingkup}\n\n4. Dasar Hukum\n${content.dasar}`, 10, 'normal');
    currentY += 5;

    // BAB B
    addSectionTitle('B', 'KEGIATAN YANG DILAKSANAKAN');
    addJustifiedText(String(content.kegiatan).trim(), 10, 'normal');
    currentY += 2; // Jarak rapat dengan tabel
    
    // Inject Table BAB B if exists
    if (content.tableB) {
      // Menghubungkan fungsi autotable secara manual jika tidak otomatis terhubung
      if (typeof doc.autoTable !== 'function' && window.jspdf.jsPDF.API.autoTable) {
        doc.autoTable = window.jspdf.jsPDF.API.autoTable;
      }
      
      if (typeof doc.autoTable === 'function') {
        doc.autoTable({
          startY: currentY,
          head: [content.tableB.headers],
          body: content.tableB.rows,
          theme: 'grid',
          // Menghilangkan warna background biru (fillColor 255 = putih), warna teks hitam, garis hitam
          headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold', lineWidth: 0.1, lineColor: [0, 0, 0] },
          styles: { font: 'helvetica', fontSize: 9, cellPadding: 3, textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] },
          margin: { left: margin, right: margin }
        });
        currentY = doc.lastAutoTable.finalY + 10;
      }
    }

    // BAB C, D, E
    addSectionTitle('C', 'HASIL YANG DICAPAI');
    addJustifiedText(content.hasil, 10, 'normal');
    currentY += 5;
    
    addSectionTitle('D', 'SIMPULAN DAN SARAN');
    addJustifiedText(content.simpulanSaran, 10, 'normal');
    currentY += 5;
    
    addSectionTitle('E', 'PENUTUP');
    addJustifiedText(content.penutup, 10, 'normal');

    // Signature
    currentY += 10; if (currentY > 230) { doc.addPage(); currentY = 20; }
    const sigX = pageWidth - margin - 35;
    doc.setFontSize(10); doc.text(`${signerCity}, ${formatDateID(eventDate)}`, sigX, currentY, { align: 'center' });
    currentY += 6; doc.text(signerTitle, sigX, currentY, { align: 'center' });
    currentY += 5;
    if (signatureImg) { try { const s = await compressImage(signatureImg, 400, 0.7); doc.addImage(s, 'JPEG', sigX - 17.5, currentY, 35, 18); currentY += 20; } catch(e) { currentY += 20; } } else { currentY += 20; }
    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.text(signerName || '....................', sigX, currentY, { align: 'center' });
    if (signerNip) { currentY += 6; doc.setFontSize(10); doc.text(`NIP. ${signerNip}`, sigX, currentY, { align: 'center' }); }

    // Lampiran
    let lampIdx = 1;
    const addFileAttachmentPdf = (fileData, title) => {
      if (!fileData) return;
      doc.addPage();
      doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.text(`LAMPIRAN ${lampIdx}: ${title.toUpperCase()}`, pageWidth/2, 20, {align: 'center'});
      lampIdx++;
      try {
        const props = doc.getImageProperties(fileData);
        const imgW = 160; const imgH = (props.height * imgW) / props.width;
        const finalH = Math.min(imgH, 240);
        doc.addImage(fileData, props.fileType || 'JPEG', (pageWidth - imgW) / 2, 35, imgW, finalH);
      } catch(e) { doc.text("[Gagal memuat berkas lampiran]", margin, 40); }
    };

    addFileAttachmentPdf(dasarSuratFile, "Dasar Surat");
    addFileAttachmentPdf(jadwalFile, "Jadwal P2K2");
    addFileAttachmentPdf(absensiFile, "Absensi");
    addFileAttachmentPdf(notulenFile, "Notulen");

    if (images.length > 0) {
      doc.addPage(); doc.setFontSize(12); doc.setFont('helvetica', 'bold');
      doc.text(`LAMPIRAN ${lampIdx}: FOTO KEGIATAN`, pageWidth/2, 20, {align: 'center'});
      lampIdx++; currentY = 35;
      for (const img of images) {
        if (currentY + 100 > 285) { doc.addPage(); currentY = 20; }
        try {
          const comp = await compressImage(img.url, 1000, 0.5);
          const imgW = 140; const imgH = 78.75;
          doc.addImage(comp, 'JPEG', (pageWidth - imgW) / 2, currentY, imgW, imgH);
          currentY += imgH + 6; doc.setFontSize(10); doc.setFont('helvetica', 'italic');
          doc.text(`Ket: ${img.caption || '-'}`, pageWidth/2, currentY, {align: 'center'});
          currentY += 15;
        } catch (e) {}
      }
    }
    return doc.output('blob');
  };

  /**
   * DOC (RTF) Generator
   */
  const generateDOCBlob = async () => {
    if (!eventDate) throw new Error("Tanggal laporan wajib diisi!");
    const base64ToHex = (base64) => {
      try {
        const raw = window.atob(base64.split(',')[1]);
        let hex = '';
        for (let i = 0; i < raw.length; i++) {
          const h = raw.charCodeAt(i).toString(16);
          hex += (h.length === 1 ? '0' + h : h);
        }
        return hex;
      } catch (e) { return ""; }
    };
    
    let rtf = "{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}";
    rtf += "{\\colortbl ;\\red0\\green0\\blue0;}";
    rtf += "\\paperw11906\\paperh16838\\margl1134\\margr1134\\margt1134\\margb1134 ";
    
    const cleanForRtf = (text) => {
      if (!text) return "";
      return String(text).replace(/\\/g, "\\\\").replace(/{/g, "\\{").replace(/}/g, "\\}").replace(/\n/g, "\\par ");
    };
    
    // Header
    rtf += "{\\ql\\qc\\f0\\fs24\\b " + cleanForRtf(kop.kementerian) + "\\b0\\par ";
    rtf += "\\fs20\\b " + cleanForRtf(kop.dirjen) + "\\b0\\par ";
    rtf += "\\b " + cleanForRtf(kop.direktorat) + "\\b0\\par ";
    rtf += "\\b0 " + cleanForRtf(kop.alamat) + "\\par\\ql\\line\\par}";
    rtf += "{\\ql\\qc\\f0\\fs26\\b LAPORAN TENTANG\\b0\\par ";
    rtf += "\\fs22\\b " + cleanForRtf(reportTitle.toUpperCase()) + "\\b0\\par ";
    rtf += "\\i Tanggal: " + formatDateID(eventDate) + "\\i0\\par\\par}";
    
    const addBabRtf = (title, body, extraRtf = "") => {
      // Memisahkan teks dengan extraRtf (Tabel) agar tabel dapat di-render dengan sempurna di MS Word
      rtf += "{\\f0\\fs22\\b " + title + "\\b0\\par\\pard\\qj " + cleanForRtf(String(body).trim()) + (extraRtf ? "\\par " : "\\par\\par}");
      if (extraRtf) {
        rtf += extraRtf + "}";
      }
    };

    addBabRtf("A. PENDAHULUAN", "1. Gambaran Umum\\par " + content.gambaranUmum + "\\par\\par 2. Maksud dan Tujuan\\par " + content.maksudTujuan + "\\par\\par 3. Ruang Lingkup\\par " + content.ruangLingkup + "\\par\\par 4. Dasar Hukum\\par " + content.dasar);
    
    // Table RTF builder
    let tableB_Rtf = "";
    if (content.tableB && content.tableB.headers.length > 0) {
      tableB_Rtf += "\\par ";
      const totalTwips = 9638; 
      const colTwips = Math.floor(totalTwips / content.tableB.headers.length);
      
      const buildRowRtf = (rowData, isHeader) => {
         let rowStr = "\\trowd \\trgaph108\\trleft0 ";
         for(let i=0; i<content.tableB.headers.length; i++) {
             rowStr += `\\clbrdrt\\brdrs\\brdrw10 \\clbrdrl\\brdrs\\brdrw10 \\clbrdrb\\brdrs\\brdrw10 \\clbrdrr\\brdrs\\brdrw10 \\cellx${(i+1)*colTwips} `;
         }
         for(let i=0; i<content.tableB.headers.length; i++) {
             const cellText = rowData[i] || '';
             rowStr += `\\pard\\intbl \\ql ${isHeader ? '\\b ' : ''}${cleanForRtf(cellText)}${isHeader ? '\\b0 ' : ''}\\cell `;
         }
         rowStr += "\\row \n";
         return rowStr;
      };
      
      tableB_Rtf += buildRowRtf(content.tableB.headers, true);
      content.tableB.rows.forEach(r => { tableB_Rtf += buildRowRtf(r, false); });
      tableB_Rtf += "\\pard \\qj \\par "; // reset format to normal paragraph
    }

    addBabRtf("B. KEGIATAN YANG DILAKSANAKAN", content.kegiatan, tableB_Rtf);
    addBabRtf("C. HASIL YANG DICAPAI", content.hasil);
    addBabRtf("D. SIMPULAN DAN SARAN", content.simpulanSaran);
    addBabRtf("E. PENUTUP", content.penutup);
    
    // Signature
    rtf += "{\\qr\\f0\\fs20 " + cleanForRtf(signerCity) + ", " + formatDateID(eventDate) + "\\par ";
    rtf += cleanForRtf(signerTitle) + "\\par\\par\\par\\par ";
    rtf += "\\b " + cleanForRtf(signerName) + "\\b0\\par ";
    if (signerNip) rtf += "NIP. " + cleanForRtf(signerNip) + "\\par}";
    
    // Attachments
    let lIdx = 1;
    const addFileAttachmentRtf = (fileData, label) => {
      if (!fileData) return;
      rtf += "\\page {\\ql\\qc\\f0\\fs24\\b LAMPIRAN " + lIdx + ": " + label.toUpperCase() + "\\b0\\par\\par ";
      const hex = base64ToHex(fileData);
      if (hex) rtf += "{\\pict\\jpegblip\\picw5000\\pich4000 " + hex + "}\\par ";
      rtf += "}"; lIdx++;
    };
    addFileAttachmentRtf(dasarSuratFile, "Dasar Surat");
    addFileAttachmentRtf(jadwalFile, "Jadwal P2K2");
    addFileAttachmentRtf(absensiFile, "Absensi");
    addFileAttachmentRtf(notulenFile, "Notulen");
    if (images.length > 0) {
      rtf += "\\page {\\ql\\qc\\f0\\fs24\\b LAMPIRAN " + lIdx + ": FOTO KEGIATAN\\b0\\par\\par ";
      for (const img of images) {
        const hex = base64ToHex(img.url);
        if (hex) rtf += "{\\pict\\jpegblip\\picw5000\\pich2800 " + hex + "}\\par {\\i Ket: " + cleanForRtf(img.caption || "-") + "\\i0\\par\\par }";
      }
      rtf += "}";
    }
    rtf += "}";
    return new Blob([rtf], { type: 'application/msword' });
  };

  const showStatus = (type, text) => { setStatusMsg({ type, text: String(text) }); setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000); };

  const getFormattedFileName = (ext) => {
    const rhkNum = selectedRhkId || "X";
    const cleanTitle = reportTitle.toUpperCase().replace(/[/\\?%*:|"<>]/g, '-').trim();
    return `RHK ${rhkNum}_${cleanTitle} -- ${eventDate}.${ext}`;
  };

  const AIEnhanceButton = ({ onClick, isProcessing }) => (
    <button onClick={onClick} disabled={isProcessing} className="ml-2 inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-indigo-100 transition-colors border border-indigo-100 disabled:opacity-50">
      {isProcessing ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
      {isProcessing ? 'Memproses...' : '✨ Perhalus'}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-6 text-sm">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl"><Building2 size={28} /></div>
            <div>
              <h1 className="text-lg font-black tracking-tighter uppercase leading-none mb-1 text-indigo-900">PSNK Report Pro</h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Kementerian Sosial RI</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             {isAiGenerating && (
               <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl text-indigo-600 font-bold animate-pulse">
                 <Sparkles size={16} /> <span className="text-xs">AI menyusun...</span>
               </div>
             )}
             <button onClick={handleClearForm} className="bg-rose-50 text-rose-600 px-4 py-2.5 rounded-xl text-xs font-black hover:bg-rose-100 transition-all flex items-center gap-2 border border-rose-100 shadow-sm">
               <RotateCcw size={16} /> HAPUS ISIAN
             </button>
             <button onClick={async () => {
              if (!eventDate) { showStatus('error', 'Tanggal laporan wajib diisi!'); return; }
              setIsGenerating(true);
              try {
                const blob = await generatePDFBlob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url; 
                link.download = getFormattedFileName('pdf');
                link.click();
                showStatus('success', 'PDF Berhasil Dibuat!');
              } catch (err) { showStatus('error', err.message); } finally { setIsGenerating(false); }
            }} disabled={isGenerating || isAiGenerating} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50">
              {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />} PDF
            </button>
            <button onClick={async () => {
              if (!eventDate) { showStatus('error', 'Tanggal laporan wajib diisi!'); return; }
              setIsDocGenerating(true);
              try {
                const blob = await generateDOCBlob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url; 
                link.download = getFormattedFileName('doc');
                link.click();
                showStatus('success', 'Word DOC Berhasil Dibuat!');
              } catch (err) { showStatus('error', err.message); } finally { setIsDocGenerating(false); }
            }} disabled={isDocGenerating || isAiGenerating} className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-black shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50">
              {isDocGenerating ? <Loader2 className="animate-spin" size={16} /> : <FileDown size={16} />} WORD (DOC)
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 sticky top-24 h-fit">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><Sparkles size={14} className="text-indigo-500" /> Auto-Fill AI</h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                {RHK_DATA.map((rhk) => (
                  <div key={rhk.id} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                    <button onClick={() => setExpandedRhk(expandedRhk === rhk.id ? null : rhk.id)} className={`w-full flex items-center justify-between p-3 text-[10px] font-bold transition-all ${expandedRhk === rhk.id ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-50 text-slate-700'}`}>
                      <span className="truncate pr-2">{rhk.title}</span>
                      {expandedRhk === rhk.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    {expandedRhk === rhk.id && (
                      <div className="bg-slate-50 p-2.5 space-y-1.5 animate-in slide-in-from-top-2">
                        {rhk.kegiatan.map((kg, idx) => (
                          <button key={idx} disabled={isAiGenerating} onClick={() => insertTextWithAI(kg, rhk.id)} className="group w-full text-left px-3 py-2 text-[9px] text-slate-600 hover:text-indigo-700 hover:bg-white rounded-xl transition-all leading-tight bg-white/50 shadow-sm flex items-center justify-between disabled:opacity-50">
                            <span>• {kg}</span><Zap size={10} className="text-indigo-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 sticky top-[540px]">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><PenTool size={14}/> Tanda Tangan</h3>
              <div className="space-y-4">
                <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl py-6 cursor-pointer hover:bg-slate-50 transition-all">
                  {signatureImg ? <img src={signatureImg} className="h-12 object-contain" /> : <><PenTool size={20} className="text-slate-300 mb-1" /><span className="text-[9px] font-bold text-slate-400 uppercase">Upload Scan TTD</span></>}
                  <input type="file" accept="image/*" className="hidden" onChange={handleSignatureUpload} />
                </label>
                <div className="space-y-2">
                   <input value={signerCity} onChange={e => setSignerCity(e.target.value)} placeholder="Kota" className="w-full p-2.5 text-[10px] border rounded-xl bg-slate-50 focus:bg-white outline-none transition-all" />
                   <input value={signerName} onChange={e => setSignerName(e.target.value)} placeholder="Nama Terang" className="w-full p-2.5 text-xs border rounded-xl bg-slate-50 focus:bg-white outline-none transition-all" />
                   <input value={signerNip} onChange={e => setSignerNip(e.target.value)} placeholder="NIP" className="w-full p-2.5 text-xs border rounded-xl bg-slate-50 focus:bg-white outline-none transition-all" />
                   <input value={signerTitle} onChange={e => setSignerTitle(e.target.value)} placeholder="Jabatan" className="w-full p-2.5 text-[10px] border rounded-xl bg-slate-50 focus:bg-white outline-none transition-all" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 min-h-[900px]">
              <div className="mb-12 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block text-indigo-600">Tajuk Laporan (TENTANG)</label>
                  <textarea value={reportTitle} onChange={e => setReportTitle(e.target.value)} rows={2} className="w-full text-2xl font-black border-b-2 border-slate-50 focus:border-indigo-600 p-0 outline-none pb-2 transition-all resize-none bg-transparent" />
                </div>
                <div>
                    <label className={`text-[10px] font-black uppercase block mb-2 flex items-center gap-1 ${!eventDate ? "text-rose-600" : "text-slate-400"}`}>
                      <Calendar size={12}/> Tanggal Laporan* {!eventDate && "(Wajib)"}
                    </label>
                    <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className={`w-full max-w-xs p-3 text-xs rounded-2xl border bg-slate-50 outline-none focus:ring-2 ${!eventDate ? "border-rose-300 ring-rose-50" : "border-slate-100 ring-indigo-50"}`} />
                </div>
              </div>

              <div className="space-y-12 animate-in fade-in duration-700">
                <section id="bab-a" className="space-y-6 pt-6 border-t border-slate-100">
                  <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs shadow-lg shadow-indigo-100">A</span> PENDAHULUAN
                  </h2>
                  <div className="grid gap-8 pl-10">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
                        1. Gambaran Umum
                        <AIEnhanceButton onClick={() => refineTextWithAI('gambaranUmum')} isProcessing={isRefining['gambaranUmum']} />
                      </label>
                      <SeamlessTextarea value={content.gambaranUmum} onChange={e => handleContentChange('gambaranUmum', e.target.value)} className="p-5 border border-slate-100 rounded-3xl bg-slate-50/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
                        2. Maksud & Tujuan
                        <AIEnhanceButton onClick={() => refineTextWithAI('maksudTujuan')} isProcessing={isRefining['maksudTujuan']} />
                      </label>
                      <SeamlessTextarea value={content.maksudTujuan} onChange={e => handleContentChange('maksudTujuan', e.target.value)} className="p-5 border border-slate-100 rounded-3xl bg-slate-50/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
                        3. Ruang Lingkup
                        <AIEnhanceButton onClick={() => refineTextWithAI('ruangLingkup')} isProcessing={isRefining['ruangLingkup']} />
                      </label>
                      <SeamlessTextarea value={content.ruangLingkup} onChange={e => handleContentChange('ruangLingkup', e.target.value)} className="p-5 border border-slate-100 rounded-3xl bg-slate-50/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
                        4. Dasar Hukum
                        <AIEnhanceButton onClick={() => refineTextWithAI('dasar')} isProcessing={isRefining['dasar']} />
                      </label>
                      <SeamlessTextarea value={content.dasar} onChange={e => handleContentChange('dasar', e.target.value)} className="p-5 border border-slate-100 rounded-3xl bg-slate-50/30" />
                    </div>
                  </div>
                </section>

                <section id="bab-b" className="space-y-6 pt-10 border-t border-slate-100">
                  <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs shadow-lg shadow-indigo-100">B</span> KEGIATAN YANG DILAKSANAKAN
                    <AIEnhanceButton onClick={() => refineTextWithAI('kegiatan')} isProcessing={isRefining['kegiatan']} />
                  </h2>
                  <div className="pl-10 space-y-2">
                    <SeamlessTextarea value={content.kegiatan} onChange={e => handleContentChange('kegiatan', e.target.value)} placeholder="Detail kegiatan..." className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50/30" />
                    
                    {!content.tableB ? (
                      <button onClick={() => setContent({...content, tableB: { headers: ['No', 'Uraian Kegiatan', 'Hasil/Keterangan'], rows: [['1', '', '']] }})} className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-4 py-3 rounded-xl hover:bg-slate-50 transition-all border border-slate-200 shadow-sm mt-2">
                        <TableIcon size={16} /> TAMBAHKAN TABEL DATA
                      </button>
                    ) : (
                      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 animate-in fade-in duration-300 mt-2">
                         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"><TableIcon size={16}/> Tabel Kegiatan</h4>
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleTableAction('ADD_COL')} className="text-[10px] font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 px-3 py-2 rounded-lg transition-all">Tambah Kolom</button>
                              <button onClick={() => setContent({...content, tableB: null})} className="text-[10px] font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-2 rounded-lg flex items-center gap-1 transition-all"><Trash2 size={12}/> Hapus Tabel</button>
                            </div>
                         </div>
                         <div className="overflow-x-auto rounded-xl border border-slate-200">
                            <table className="w-full text-sm text-left border-collapse">
                              <thead>
                                 <tr>
                                    {content.tableB.headers.map((h, cIdx) => (
                                      <th key={cIdx} className="border-b border-r border-slate-200 p-2 bg-white relative group">
                                        <input value={h} onChange={e => handleTableAction('UPDATE_HEADER', {cIdx, value: e.target.value})} className="w-full bg-transparent font-bold text-slate-800 outline-none text-xs uppercase tracking-wide" placeholder="Nama Kolom" />
                                        {content.tableB.headers.length > 1 && (
                                          <button onClick={() => handleTableAction('REMOVE_COL', {cIdx})} className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover:opacity-100 text-rose-500 hover:bg-rose-100 p-1 rounded transition-all"><Trash2 size={12}/></button>
                                        )}
                                      </th>
                                    ))}
                                    <th className="border-b border-slate-200 bg-white w-10"></th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {content.tableB.rows.map((row, rIdx) => (
                                   <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="border-b border-r border-slate-100 p-2 relative group">
                                          <textarea value={cell} onChange={e => handleTableAction('UPDATE_CELL', {rIdx, cIdx, value: e.target.value})} className="w-full bg-transparent outline-none resize-none h-auto overflow-hidden text-sm" rows={1} placeholder="..." />
                                        </td>
                                      ))}
                                      <td className="border-b border-slate-100 p-2 align-middle text-center">
                                        {content.tableB.rows.length > 1 && (
                                           <button onClick={() => handleTableAction('REMOVE_ROW', {rIdx})} className="text-rose-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={14}/></button>
                                        )}
                                      </td>
                                   </tr>
                                 ))}
                              </tbody>
                            </table>
                         </div>
                         <button onClick={() => handleTableAction('ADD_ROW')} className="w-full py-2.5 border-2 border-dashed border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2 transition-all">
                           <Plus size={14}/> Tambah Baris
                         </button>
                      </div>
                    )}
                  </div>
                </section>

                <section id="bab-c" className="space-y-6 pt-10 border-t border-slate-100">
                  <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs shadow-lg shadow-indigo-100">C</span> HASIL YANG DICAPAI
                    <AIEnhanceButton onClick={() => refineTextWithAI('hasil')} isProcessing={isRefining['hasil']} />
                  </h2>
                  <div className="pl-10 space-y-2">
                    <SeamlessTextarea value={content.hasil} onChange={e => handleContentChange('hasil', e.target.value)} className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50/30" />
                  </div>
                </section>

                <section id="bab-d" className="space-y-6 pt-10 border-t border-slate-100">
                  <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs shadow-lg shadow-indigo-100">D</span> SIMPULAN DAN SARAN
                    <AIEnhanceButton onClick={() => refineTextWithAI('simpulanSaran')} isProcessing={isRefining['simpulanSaran']} />
                  </h2>
                  <div className="pl-10 space-y-2">
                    <SeamlessTextarea value={content.simpulanSaran} onChange={e => handleContentChange('simpulanSaran', e.target.value)} className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50/30" />
                  </div>
                </section>

                <section id="bab-e" className="space-y-6 pt-10 border-t border-slate-100">
                  <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs shadow-lg shadow-indigo-100">E</span> PENUTUP
                    <AIEnhanceButton onClick={() => refineTextWithAI('penutup')} isProcessing={isRefining['penutup']} />
                  </h2>
                  <div className="pl-10 space-y-2">
                    <SeamlessTextarea value={content.penutup} onChange={e => handleContentChange('penutup', e.target.value)} className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50/30" />
                  </div>
                </section>

                <section id="lampiran" className="space-y-8 pt-10 border-t border-slate-100">
                  <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs shadow-lg shadow-indigo-100">L</span> LAMPIRAN DOKUMEN
                  </h2>
                  <div className="pl-10 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4 border-slate-100">
                        <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2"><FileBadge size={14}/> 1. Dasar Surat (Lampiran)</label>
                        <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-blue-50 rounded-2xl py-8 cursor-pointer hover:bg-blue-50 transition-all">
                           {dasarSuratFile ? <img src={dasarSuratFile} className="h-32 object-contain" /> : <><Upload size={24} className="text-blue-300 mb-2" /><span className="text-[10px] font-bold text-slate-400 uppercase">Upload Dasar Surat</span></>}
                           <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'dasarSurat')} />
                        </label>
                        {dasarSuratFile && <button onClick={() => setDasarSuratFile(null)} className="w-full text-[10px] font-bold text-rose-500 hover:text-rose-700 flex items-center justify-center gap-1 uppercase tracking-tighter"><Trash2 size={12}/> Hapus</button>}
                      </div>
                      <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4 border-slate-100">
                        <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2"><FileSearch size={14}/> 2. Jadwal P2K2 (Lampiran)</label>
                        <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-indigo-50 rounded-2xl py-8 cursor-pointer hover:bg-indigo-50 transition-all">
                           {jadwalFile ? <img src={jadwalFile} className="h-32 object-contain" /> : <><Upload size={24} className="text-indigo-300 mb-2" /><span className="text-[10px] font-bold text-slate-400 uppercase">Upload Jadwal</span></>}
                           <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'jadwal')} />
                        </label>
                        {jadwalFile && <button onClick={() => setJadwalFile(null)} className="w-full text-[10px] font-bold text-rose-500 hover:text-rose-700 flex items-center justify-center gap-1 uppercase tracking-tighter"><Trash2 size={12}/> Hapus</button>}
                      </div>
                      <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4 border-slate-100">
                        <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2"><ClipboardCheck size={14}/> 3. Absensi (Lampiran)</label>
                        <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-emerald-50 rounded-2xl py-8 cursor-pointer hover:bg-emerald-50 transition-all">
                           {absensiFile ? <img src={absensiFile} className="h-32 object-contain" /> : <><Upload size={24} className="text-emerald-300 mb-2" /><span className="text-[10px] font-bold text-slate-400 uppercase">Upload Absensi</span></>}
                           <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'absensi')} />
                        </label>
                        {absensiFile && <button onClick={() => setAbsensiFile(null)} className="w-full text-[10px] font-bold text-rose-500 hover:text-rose-700 flex items-center justify-center gap-1 uppercase tracking-tighter"><Trash2 size={12}/> Hapus</button>}
                      </div>
                      <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4 border-slate-100">
                        <label className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2"><FileText size={14}/> 4. Notulen (Lampiran)</label>
                        <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-amber-50 rounded-2xl py-8 cursor-pointer hover:bg-amber-50 transition-all">
                           {notulenFile ? <img src={notulenFile} className="h-32 object-contain" /> : <><Upload size={24} className="text-amber-300 mb-2" /><span className="text-[10px] font-bold text-slate-400 uppercase">Upload Notulen</span></>}
                           <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'notulen')} />
                        </label>
                        {notulenFile && <button onClick={() => setNotulenFile(null)} className="w-full text-[10px] font-bold text-rose-500 hover:text-rose-700 flex items-center justify-center gap-1 uppercase tracking-tighter"><Trash2 size={12}/> Hapus</button>}
                      </div>
                    </div>
                    <div className="bg-indigo-50/30 p-8 rounded-[3rem] border border-indigo-100 shadow-inner">
                      <h4 className="text-xs font-black text-indigo-700 uppercase flex items-center gap-2 mb-6"><Camera size={18} /> 5. Galeri Dokumentasi (16:9)</h4>
                      <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-3xl py-12 cursor-pointer hover:bg-white bg-white/50 mb-8 transition-all">
                        <Plus size={48} className="text-indigo-300 mb-3" />
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                      <div className="grid grid-cols-1 gap-12">
                        {images.map((img) => (
                          <div key={img.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-indigo-50 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                            <div className="relative group rounded-2xl overflow-hidden aspect-video bg-slate-100 border">
                                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                                <button onClick={() => setImages(images.filter(i => i.id !== img.id))} className="absolute top-4 right-4 bg-rose-500 text-white p-3 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all active:scale-90"><Trash2 size={20} /></button>
                            </div>
                            <div className="relative">
                              <textarea value={img.caption} onChange={(e) => updateImageCaption(img.id, e.target.value)} placeholder="Keterangan foto..." className="w-full p-4 text-xs border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white h-24 resize-none outline-none transition-all shadow-inner" />
                              <button 
                                onClick={() => generateCaptionWithAI(img.id, img.url)}
                                disabled={isCaptioning[img.id]}
                                className="absolute bottom-3 right-3 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all shadow-sm disabled:opacity-50"
                              >
                                {isCaptioning[img.id] ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                                {isCaptioning[img.id] ? 'Menganalisis...' : '✨ Auto Caption'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; } .no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default App;
