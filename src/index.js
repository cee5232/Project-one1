import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    const response = await fetch(url);
    const siteData = await response.json();
    
    const analysis = {
      name: siteData.name || 'HAX Site Analyzer',
      description: siteData.description || 'No description available',
      logo: siteData.metadata?.logo || '/default-logo.png',
      theme: siteData.metadata?.theme || 'Default',
      created: siteData.metadata?.created || 'Unknown',
      lastUpdated: siteData.metadata?.updated || 'Unknown',
      pages: siteData.items || []
    };

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze site' });
  }
});

app.listen(port, () => {
  console.log(`Site analyzer running at http://localhost:${port}`);
});