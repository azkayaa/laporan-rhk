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
            content: "Buat laporan PKH resmi, singkat, rapi, bahasa formal."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500 // 🔥 biar hemat
      })
    });

    const data = await response.json();

    const hasil = data.choices?.[0]?.message?.content || "Gagal";

    res.status(200).json({ result: hasil });

  } catch (err) {
    res.status(500).json({ result: "Gagal generate AI" });
  }
}
