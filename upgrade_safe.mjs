import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

const classMap = {
  'bg-white': 'dark:bg-slate-900',
  'bg-slate-50/50': 'dark:bg-slate-950/50',
  'bg-slate-50': 'dark:bg-slate-950',
  'bg-secondary/50': 'dark:bg-slate-900/50',
  'bg-secondary': 'dark:bg-slate-900',
  'text-slate-900': 'dark:text-white',
  'text-slate-800': 'dark:text-slate-100',
  'text-slate-700': 'dark:text-slate-200',
  'text-slate-600': 'dark:text-slate-300',
  'text-slate-500': 'dark:text-slate-400',
  'text-slate-400': 'dark:text-slate-500',
  'border-slate-200/60': 'dark:border-slate-700/60',
  'border-slate-200': 'dark:border-slate-700',
  'border-slate-100': 'dark:border-slate-800',
  'bg-slate-100': 'dark:bg-slate-800',
  'bg-primary/50': 'dark:bg-slate-950/50',
};

function upgradeDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      upgradeDirectory(fullPath);
    } else if (file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Match className="...", className={'...'}, className={`...`}
      // The regex captures the quote or tick, and everything inside it.
      // We will replace content inside the quotes.
      let newContent = content.replace(/className=(["'`])(.*?)(["'`])/g, (match, p1, classes, p3) => {
        // Handle potential template literal variables like ${...}
        // Actually, splitting by space is fine, ${...} will just be treated as a single token.
        // It's safer to just do a naive replace inside the string block.
        
        let newClasses = classes;
        for (const [light, dark] of Object.entries(classMap)) {
           // If the exact light class exists as a distinct word
           const regex = new RegExp(`\\b${light.replace(/\//g, '\\/')}\\b`, 'g');
           if (regex.test(classes)) {
              // Check if the dark class already exists to avoid duplicates
              if (!classes.includes(dark)) {
                 // Append the dark class after the light class
                 newClasses = newClasses.replace(regex, `${light} ${dark}`);
              }
           }
        }
        return `className=${p1}${newClasses}${p3}`;
      });

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log("Upgraded " + file);
      }
    }
  }
}

upgradeDirectory(srcDir);
console.log('Finished safe dark mode upgrade.');
