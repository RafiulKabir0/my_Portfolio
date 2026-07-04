import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function fixTextPrimary(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixTextPrimary(fullPath);
    } else if (file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace text-primary with text-white
      let newContent = content.replace(/text-primary/g, 'text-white');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log("Fixed text-primary in " + file);
      }
    }
  }
}

fixTextPrimary(srcDir);
console.log('Finished fixing text-primary.');
