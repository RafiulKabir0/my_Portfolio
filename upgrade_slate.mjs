import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

const replacements = [
  { from: /text-gray-900/g, to: 'text-slate-900' },
  { from: /text-gray-800/g, to: 'text-slate-800' },
  { from: /text-gray-700/g, to: 'text-slate-600' }, // Soften the mid-tones
  { from: /text-gray-600/g, to: 'text-slate-500' }, // Soften the sub-text
  { from: /text-gray-500/g, to: 'text-slate-400' },
  { from: /bg-gray-50\/50/g, to: 'bg-white' }, // We use pure white for cards
  { from: /border-gray-200/g, to: 'border-slate-200/60' }, // Faint elegant border
  { from: /shadow-glass/g, to: 'shadow-premium' } // Assure all cards use premium shadow
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const { from, to } of replacements) {
        newContent = newContent.replace(from, to);
      }
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

// Also update index.html to use slate instead of gray
const htmlPath = path.join(process.cwd(), 'index.html');
if (fs.existsSync(htmlPath)) {
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  let newHtmlContent = htmlContent.replace(/text-gray-800/g, 'text-slate-800');
  if (htmlContent !== newHtmlContent) {
    fs.writeFileSync(htmlPath, newHtmlContent, 'utf8');
    console.log(`Updated: index.html`);
  }
}

processDirectory(srcDir);
console.log('Done upgrading to slate palette.');
