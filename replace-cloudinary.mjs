import fs from 'fs';
import path from 'path';

const CDN_HOSTNAME = 'vz-53d1011b-a2d.b-cdn.net';
const SRC_DIR = './src';
const MAP_FILE = './bunny-upload-map.csv';
const EXTENSIONS = ['.jsx', '.tsx', '.js', '.ts', '.html', '.css'];

const csv = fs.readFileSync(MAP_FILE, 'utf8').trim().split('\n').slice(1);
const nameToGuid = {};
for (const line of csv) {
  const [filename, guid] = line.split(',');
  const base = filename.replace(/\.[^.]+$/, '');
  nameToGuid[base] = guid;
  nameToGuid[filename] = guid;
}

console.log(`Loaded ${csv.length} video mappings`);

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

// Match Cloudinary video URLs with optional transforms like q_auto,f_auto
const CLOUDINARY_RE = /https?:\/\/res\.cloudinary\.com\/[^\/\s"')]+\/video\/upload\/(?:[^\/\s"')]+\/)*([^\/\s"')]+?)\.(?:mp4|webm|mov|m4v)(?=["'\s)\`])/gi;

let totalReplacements = 0;
let unmatchedUrls = new Set();
const files = walk(SRC_DIR);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let fileReplacements = 0;

  const newContent = content.replace(CLOUDINARY_RE, (fullMatch, videoName) => {
    const guid = nameToGuid[videoName];
    if (!guid) {
      unmatchedUrls.add(fullMatch);
      return fullMatch;
    }
    fileReplacements++;
    return `https://${CDN_HOSTNAME}/${guid}/play_720p.mp4`;
  });

  if (fileReplacements > 0) {
    fs.writeFileSync(file, newContent);
    console.log(`  ✓ ${file} — ${fileReplacements} replacement(s)`);
    totalReplacements += fileReplacements;
  }
}

console.log(`\nTotal replacements: ${totalReplacements}`);
if (unmatchedUrls.size) {
  console.log(`\n⚠ ${unmatchedUrls.size} Cloudinary URL(s) had no mapping:`);
  for (const u of unmatchedUrls) console.log(`  - ${u}`);
}
