import fs from 'fs';

const html = fs.readFileSync('temp_https___oreodigi_com_our_work_.html', 'utf8');

const regex = /<div class="project-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;

let match;
const list = [];
while ((match = regex.exec(html)) !== null) {
  const block = match[0];
  const link = block.match(/href="([^"]+)"/i)?.[1] || '';
  const img = block.match(/<img[^>]+src="([^">]+)"/i)?.[1] || '';
  const title = block.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
  const subtitle = block.match(/<span class="subtitle">([\s\S]*?)<\/span>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
  
  list.push({ link, img, title, subtitle });
}

console.log(`Extracted ${list.length} items:`);
list.forEach((item, idx) => {
  console.log(`${idx + 1}. Link: ${item.link}`);
  console.log(`   Img: ${item.img}`);
  console.log(`   Title: ${item.title}`);
  console.log(`   Subtitle: ${item.subtitle}`);
});
