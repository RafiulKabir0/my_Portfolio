import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../animations/motion';
import { FileText, Download } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Resume = () => {
  const { data: portfolioData } = usePortfolio();
  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = portfolioData.personal.resumeUrl;
    const fileName = portfolioData.personal.resumeFileName || 'Rafiul_Kabir_Resume.pdf';
    
    if (!url || url === '/resume.pdf' || url.trim() === '') {
      e.preventDefault();
      alert("No resume uploaded yet! Please upload your PDF resume from the Admin Panel -> Profile section.");
      return;
    }

    if (url.startsWith('data:')) {
      e.preventDefault();
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      } catch (err) {
        console.error("Failed to download resume", err);
        alert("There was an error downloading the resume. The file might be corrupted or too large.");
      }
    }
    // External links use the native anchor tag behavior
  };

  return (
    <section id="resume" className="py-20 relative bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <motion.div variants={fadeIn('down', 'tween', 0.2, 1)} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">My <span className="text-accent">Resume</span></h2>
            <div className="w-20 h-1 bg-accent mx-auto" />
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Download my latest resume to see a detailed overview of my skills, education, and experience.</p>
          </motion.div>

          <motion.div variants={fadeIn('up', 'spring', 0.3, 1)} className="glass-card max-w-2xl mx-auto p-8 relative group">
            <div className="absolute inset-0 bg-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <FileText size={64} className="mx-auto text-slate-500 mb-6 group-hover:text-accent transition-colors duration-500 relative z-10" />
            
            <h3 className="text-2xl font-bold text-slate-900 mb-6 relative z-10">{portfolioData.personal.resumeFileName || 'Rafiul_Kabir_Resume.pdf'}</h3>
            
            <a 
              href={portfolioData.personal.resumeUrl?.startsWith('data:') ? '#' : portfolioData.personal.resumeUrl}
              download={portfolioData.personal.resumeFileName || "Rafiul_Kabir_Resume.pdf"}
              target="_blank"
              rel="noreferrer"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:border-accent hover:bg-accent/10 hover:text-white text-slate-900 font-semibold rounded-full transition-all duration-300 cursor-pointer relative z-10"
            >
              <Download size={20} /> Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
