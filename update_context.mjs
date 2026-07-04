import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src', 'components');

const files = fs.readdirSync(srcDir);

for (const file of files) {
  if (file.endsWith('.tsx') && file !== 'Hero.tsx') {
    const fullPath = path.join(srcDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    if (content.includes("import { portfolioData } from '../data/portfolioData';")) {
      // Replace import
      content = content.replace(
        "import { portfolioData } from '../data/portfolioData';",
        "import { usePortfolio } from '../context/PortfolioContext';"
      );

      // Inject hook inside the functional component.
      // E.g., `const Navbar = () => {`
      const componentName = file.replace('.tsx', '');
      const regex = new RegExp(`const ${componentName} = \\(.*?\\) => \\{`);
      
      content = content.replace(regex, (match) => {
        return `${match}\n  const { data: portfolioData } = usePortfolio();`;
      });

      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}
console.log('Finished component updates');
