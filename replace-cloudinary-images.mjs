import fs from 'fs';
import path from 'path';

const CDN_HOST = 'queenie-works-images.b-cdn.net';
const SRC_DIR = './src';
const EXTENSIONS = ['.jsx', '.tsx', '.js', '.ts', '.html', '.css'];

function walk(dir) {
  const results = [];
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) results.push(...walk(full));
    else if (EXTENSIONS.includes(path.extname(full))) results.push(full);
  }
  return results;
}

// Match Cloudinary image URLs, capture the filename with extension
const CLOUDINARY_IMG_RE = /https?:\/\/res\.cloudinary\.com\/[^\/\s"')]+\/image\/upload\/(?:[^\/\s"')]+\/)*([^\/\s"')]+\.(?:png|jpg|jpeg|avif|webp))(?=["'\s)\`])/gi;

let totalReplacements = 0;
const files = walk(SRC_DIR);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let fileReplacements = 0;

  const newContent = content.replace(CLOUDINARY_IMG_RE, (fullMatch, filename) => {
    fileReplacements++;
    return `https://${CDN_HOST}/${filename}`;
  });

  if (fileReplacements > 0) {
    fs.writeFileSync(file, newContent);
    console.log(`  ✓ ${file} — ${fileReplacements} replacement(s)`);
    totalReplacements += fileReplacements;
  }
}

console.log(`\nTotal replacements: ${totalReplacements}`);
