export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Buat laporan kegiatan PKH yang formal dan rapi."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    // 🔥 ambil hasil text
    const hasil = data.choices?.[0]?.message?.content || "Gagal ambil hasil AI";

    res.status(200).json({ result: hasil });

  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "Gagal generate AI" });
  }
}
