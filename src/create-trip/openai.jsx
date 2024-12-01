import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ success: false, error: 'API key is missing in environment variables' });
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is set
    });

    const openai = new OpenAIApi(configuration);

    try {
      const aiResponse = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const tripPlan = aiResponse.data.choices[0].text.trim();
      res.status(200).json({ success: true, tripPlan });
    } catch (error) {
      console.error('Error with OpenAI API:', error);

      // Check for specific error types and provide more info
      const errorMessage =
        error.response?.data?.error?.message || 'Failed to generate trip plan due to server error';
      res.status(500).json({ success: false, error: errorMessage });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
