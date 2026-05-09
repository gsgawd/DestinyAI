export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'API Key is missing from environment variables' });
    }

    const { name, place, time, dayNight } = req.body;

    if (!name || !place || !time || !dayNight) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = `Act as an expert Vedic Astrologer. Analyze the following birth details:
Name: ${name}
Birth Place: ${place}
Birth Time: ${time} (${dayNight})

Provide the analysis in a strict JSON format with the following keys, containing only text strings (no nested objects, use bullet points where asked):
"vedic_chart": "Identify Ascendant, Moon sign, and Sun sign.",
"planets": "3 short bullet points focusing on Health.",
"dasha": "3 short bullet points focusing on Core Strengths.",
"career": "3 short bullet points focusing on 5-Year Career Forecast.",
"wealth": "3 short bullet points focusing on 5-Year Wealth Forecast.",
"supporting": "3 short bullet points focusing on Areas for Caution."

Return ONLY valid JSON.`;

    try {
        const fetch = (await import('node-fetch')).default || globalThis.fetch;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    responseMimeType: "application/json"
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API Error:", errorText);
            return res.status(response.status).json({ error: `API request failed with status ${response.status}` });
        }

        const data = await response.json();
        let textResult = data.candidates[0].content.parts[0].text;
        
        // Clean markdown backticks if returned
        textResult = textResult.replace(/```json\n?|\n?```/g, '');
        const resultJson = JSON.parse(textResult);

        return res.status(200).json(resultJson);
    } catch (error) {
        console.error("Serverless Function Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
