import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/projects');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const downloads = [
  { id: 'diarashine', url: 'https://oreodigi.com/wp-content/uploads/2025/12/Diaralogo-2.jpg', filename: 'diarashine.jpg' },
  { id: 'rydap', url: 'https://oreodigi.com/wp-content/uploads/2025/12/rydap.jpg', filename: 'rydap.jpg' },
  { id: 'anabolic', url: 'https://oreodigi.com/wp-content/uploads/2025/12/anabolic.jpg', filename: 'anabolic.jpg' },
  { id: 'chabhi', url: 'https://oreodigi.com/wp-content/uploads/2025/03/chabhi.jpg', filename: 'chabhi.jpg' },
  { id: 'solaris', url: 'https://oreodigi.com/wp-content/uploads/2025/12/solaris.jpg', filename: 'solaris.jpg' },
  { id: 'scolakidz', url: 'https://oreodigi.com/wp-content/uploads/2025/12/ScolaKidz1.jpg', filename: 'scolakidz.jpg' },
  { id: 'lifezila', url: 'https://oreodigi.com/wp-content/uploads/2021/09/LIFEZILA.jpg', filename: 'lifezila.jpg' },
  { id: 'mommade', url: 'https://oreodigi.com/wp-content/uploads/2025/03/mommade.jpg', filename: 'mommade.jpg' },
  { id: 'archanna-gupta', url: 'https://oreodigi.com/wp-content/uploads/2025/12/archna-gupta.jpg', filename: 'archanna-gupta.jpg' },
  { id: 'workpunkt', url: 'https://oreodigi.com/wp-content/uploads/2025/03/workpunt2-1.jpg', filename: 'workpunkt.jpg' },
  { id: 'aadhar', url: 'https://oreodigi.com/wp-content/uploads/2021/09/aadhar.jpg', filename: 'aadhar.jpg' },
  { id: 'shinefood', url: 'https://oreodigi.com/wp-content/uploads/2025/12/Shine1.jpg', filename: 'shinefood.jpg' },
  { id: 'thestoreytellers', url: 'https://oreodigi.com/wp-content/uploads/2025/12/TST-Logo.jpg', filename: 'thestoreytellers.jpg' },
  { id: 'visa-origins', url: 'https://oreodigi.com/wp-content/uploads/2021/09/Untitled-2-copy.jpg', filename: 'visa-origins.jpg' },
  { id: 'uniora', url: 'https://oreodigi.com/wp-content/uploads/2025/03/uniora.jpg', filename: 'uniora.jpg' },
  { id: 'printmadly', url: 'https://oreodigi.com/wp-content/uploads/2025/03/printmadly-1.jpg', filename: 'printmadly.jpg' },
  // Additional projects from oreodigi
  { id: 'glowoneskin', url: 'https://oreodigi.com/wp-content/uploads/2025/12/glowskin1.jpg', filename: 'glowoneskin.jpg' },
  { id: 'hardikoldscrap', url: 'https://oreodigi.com/wp-content/uploads/2025/12/Hardik-1.jpg', filename: 'hardikoldscrap.jpg' },
  { id: 'admitworks', url: 'https://oreodigi.com/wp-content/uploads/2025/12/Admit-1.jpg', filename: 'admitworks.jpg' },
  { id: 'spacelyt', url: 'https://oreodigi.com/wp-content/uploads/2025/03/space.jpg', filename: 'spacelyt.jpg' },
  { id: 'deeyaan', url: 'https://oreodigi.com/wp-content/uploads/2025/03/deeyan-1.jpg', filename: 'deeyaan.jpg' },
  { id: 'nirvanainterio', url: 'https://oreodigi.com/wp-content/uploads/2025/12/Nirvana.jpg', filename: 'nirvanainterio.jpg' },
  { id: 'homevik', url: 'https://oreodigi.com/wp-content/uploads/2025/12/homevik.jpg', filename: 'homevik.jpg' },
  { id: 'launchleap', url: 'https://oreodigi.com/wp-content/uploads/2025/12/Launch-Leap1.jpg', filename: 'launchleap.jpg' },
  { id: 'padmani', url: 'https://oreodigi.com/wp-content/uploads/2025/03/padmani.jpg', filename: 'padmani.jpg' },
  { id: 'mumbaingsb', url: 'https://oreodigi.com/wp-content/uploads/2025/03/mumbaingsb.jpg', filename: 'mumbaingsb.jpg' },
  { id: 'mobilexprs', url: 'https://oreodigi.com/wp-content/uploads/2025/03/mobile-2.jpg', filename: 'mobilexprs.jpg' },
  { id: 'pro-kalakaar', url: 'https://oreodigi.com/wp-content/uploads/2025/03/pro-kalaakar.jpg', filename: 'pro-kalakaar.jpg' },
  { id: 'urban-necter', url: 'https://oreodigi.com/wp-content/uploads/2025/03/urban-necter.jpg', filename: 'urban-necter.jpg' },
  { id: 'thrushive', url: 'https://oreodigi.com/wp-content/uploads/2025/03/thrushive.jpg', filename: 'thrushive.jpg' },
  { id: 'unidekho', url: 'https://oreodigi.com/wp-content/uploads/2025/03/unidekho.jpg', filename: 'unidekho.jpg' },
  { id: 'ashirwad', url: 'https://oreodigi.com/wp-content/uploads/2025/03/ashirwad.jpg', filename: 'ashirwad.jpg' },
  { id: 'simple-vedas', url: 'https://oreodigi.com/wp-content/uploads/2023/02/simple-vedas-logo-.jpg', filename: 'simple-vedas.jpg' },
  { id: 'sg-remedies', url: 'https://oreodigi.com/wp-content/uploads/2023/02/Sgremedies-.jpg', filename: 'sg-remedies.jpg' },
  { id: 'print-jelly', url: 'https://oreodigi.com/wp-content/uploads/2021/09/print-jelly.jpg', filename: 'print-jelly.jpg' }
];

async function downloadAll() {
  console.log(`Starting download of ${downloads.length} logos/project images...`);
  let successCount = 0;
  
  for (const item of downloads) {
    const dest = path.join(outDir, item.filename);
    try {
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Referer': 'https://oreodigi.com/our-works/'
        }
      });
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`[OK] Saved ${item.filename} (${buffer.byteLength} bytes)`);
        successCount++;
      } else {
        console.error(`[FAIL] ${item.url} responded with ${res.status}`);
      }
    } catch (e) {
      console.error(`[ERR] ${item.filename}:`, e.message);
    }
  }
  
  console.log(`\nFinished: ${successCount}/${downloads.length} downloaded successfully.`);
}

downloadAll();
