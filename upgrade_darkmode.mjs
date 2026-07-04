import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

const replacements = [
  { from: /bg-white(?! dark:bg-slate-900)/g, to: 'bg-white dark:bg-slate-900' },
  { from: /bg-slate-50\/50(?! dark:bg-slate-900\/50)/g, to: 'bg-slate-50/50 dark:bg-slate-900/50' },
  { from: /bg-slate-50(?! dark:bg-slate-950)(?!\/)/g, to: 'bg-slate-50 dark:bg-slate-950' },
  { from: /bg-secondary\/50(?! dark:bg-slate-900\/50)/g, to: 'bg-secondary/50 dark:bg-slate-900/50' },
  { from: /bg-secondary(?! dark:bg-slate-900)(?!\/)/g, to: 'bg-secondary dark:bg-slate-900' },
  { from: /text-slate-900(?! dark:text-white)/g, to: 'text-slate-900 dark:text-white' },
  { from: /text-slate-800(?! dark:text-slate-100)/g, to: 'text-slate-800 dark:text-slate-100' },
  { from: /text-slate-700(?! dark:text-slate-200)/g, to: 'text-slate-700 dark:text-slate-200' },
  { from: /text-slate-600(?! dark:text-slate-300)/g, to: 'text-slate-600 dark:text-slate-300' },
  { from: /text-slate-500(?! dark:text-slate-400)/g, to: 'text-slate-500 dark:text-slate-400' },
  { from: /text-slate-400(?! dark:text-slate-500)/g, to: 'text-slate-400 dark:text-slate-500' },
  { from: /border-slate-200\/60(?! dark:border-slate-700\/60)/g, to: 'border-slate-200/60 dark:border-slate-700/60' },
  { from: /border-slate-200(?! dark:border-slate-700)(?!\/)/g, to: 'border-slate-200 dark:border-slate-700' },
  { from: /border-slate-100(?! dark:border-slate-800)/g, to: 'border-slate-100 dark:border-slate-800' },
  { from: /bg-slate-100(?! dark:bg-slate-800)/g, to: 'bg-slate-100 dark:bg-slate-800' },
  { from: /bg-primary\/50(?! dark:bg-slate-950\/50)/g, to: 'bg-primary/50 dark:bg-slate-950/50' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      for (const { from, to } of replacements) {
        content = content.replace(from, to);
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated dark mode styles in ${file}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Finished dark mode upgrade.');
