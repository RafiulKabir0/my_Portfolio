import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

const replacements = [
  { from: /text-gray-400/g, to: 'text-gray-600' },
  { from: /text-gray-300/g, to: 'text-gray-700' },
  { from: /text-gray-200/g, to: 'text-gray-800' },
  { from: /bg-white\/5/g, to: 'bg-gray-50/50' },
  { from: /border-gray-800/g, to: 'border-gray-200' },
  { from: /hover:text-white/g, to: 'hover:text-accent' },
  { from: /bg-primary\/40/g, to: 'bg-primary/40' }, // This relies on primary being white, which it is now.
  { from: /border-white\/10/g, to: 'border-gray-200' },
  { from: /bg-white\/10/g, to: 'bg-gray-100' },
  { from: /bg-primary\/95/g, to: 'bg-primary/80' }
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

processDirectory(srcDir);
console.log('Done replacing theme classes.');
