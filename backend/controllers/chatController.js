// Chatbot response controller

const axios = require("axios");

exports.chat = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const apiKey = process.env.GEMINI_API_KEY;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            }
        );

        const reply =
            response.data.candidates[0].content.parts[0].text;

        res.json({
            reply
        });

    } catch (error) {
        console.log(error.response?.data || error);
    }
};
