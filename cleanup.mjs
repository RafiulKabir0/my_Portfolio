import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function cleanDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      cleanDirectory(fullPath);
    } else if (file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove all dark utility classes
      let cleaned = content.replace(/\s+dark:[^\s"']+/g, '');
      
      if (content !== cleaned) {
        fs.writeFileSync(fullPath, cleaned, 'utf8');
        console.log("Cleaned " + file);
      }
    }
  }
}

cleanDirectory(srcDir);
console.log('Finished cleaning up messy dark mode classes.');
