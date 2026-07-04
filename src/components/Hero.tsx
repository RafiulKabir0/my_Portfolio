import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { usePortfolio } from '../context/PortfolioContext';
import { Download, ChevronRight, Mail } from 'lucide-react';

const Hero = () => {
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
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <p className="text-accent font-medium mb-4 tracking-wider">WELCOME TO MY WORLD</p>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Hi, I'm <span className="text-gradient block mt-2">{portfolioData.personal.name}</span>
            </h1>
            
            <div className="text-2xl md:text-3xl font-semibold text-slate-600 mb-6 h-[40px]">
              <TypeAnimation
                sequence={[
                  'Software Engineering Student',
                  2000,
                  'Learning Programming',
                  2000,
                  'Exploring AI & Tech',
                  2000,
                  'Problem Solver',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            
            <p className="text-slate-500 text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {portfolioData.personal.bio}
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link 
                to="projects" 
                smooth={true} 
                className="px-8 py-3 bg-accent text-white font-semibold rounded-full hover:shadow-neon transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                View Projects <ChevronRight size={20} />
              </Link>
              <Link 
                to="contact" 
                smooth={true} 
                className="px-8 py-3 border border-gray-600 text-slate-900 font-semibold rounded-full hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                Contact Me <Mail size={20} />
              </Link>
              <a 
                href={portfolioData.personal.resumeUrl?.startsWith('data:') ? '#' : portfolioData.personal.resumeUrl}
                download={portfolioData.personal.resumeFileName || "Rafiul_Kabir_Resume.pdf"}
                target="_blank"
                rel="noreferrer"
                onClick={handleDownload}
                className="px-8 py-3 border border-gray-600 text-slate-900 font-semibold rounded-full hover:border-accent hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                Resume <Download size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="relative w-full aspect-square rounded-full border-2 border-accent/30 p-4 animate-[spin_10s_linear_infinite]">
              <div className="w-full h-full rounded-full border border-accent/20 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
            </div>
            <img 
              src={portfolioData.personal.profileImage} 
              alt={portfolioData.personal.name} 
              className="absolute inset-0 w-[90%] h-[90%] m-auto rounded-full object-cover shadow-premium border-4 border-slate-200"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
