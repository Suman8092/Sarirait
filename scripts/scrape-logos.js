import fs from 'fs';

async function fetchLogos() {
  const urls = [
    'https://oreodigi.com/our-works/',
    'https://oreodigi.com/our-work/',
    'https://oreodigi.com/'
  ];

  for (const url of urls) {
    console.log(`\n=== Fetching ${url} ===`);
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        }
      });
      console.log(`Status: ${res.status}`);
      if (!res.ok) continue;
      const html = await res.text();
      fs.writeFileSync(`temp_${url.replace(/[^a-zA-Z0-9]/g, '_')}.html`, html);

      // Find all img tags
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      let match;
      const images = [];
      while ((match = imgRegex.exec(html)) !== null) {
        images.push(match[0]);
      }
      console.log(`Total images found: ${images.length}`);
      
      // Let's filter for project or case study or logo images
      images.forEach(img => {
        if (/wp-content\/uploads/i.test(img)) {
          console.log(img);
        }
      });
    } catch (err) {
      console.error(`Error fetching ${url}:`, err.message);
    }
  }
}

fetchLogos();
