import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import * as Icons from 'lucide-react';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer = () => {
  const { data: portfolioData } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-slate-200 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <Link to="home" smooth={true} className="cursor-pointer inline-block mb-2">
            <span className="text-2xl font-bold text-slate-900">RK<span className="text-accent">.</span></span>
          </Link>
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} {portfolioData.personal.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center space-x-4 flex-wrap justify-center gap-y-4">
          {portfolioData.socials?.map((social) => {
            const IconComponent = (Icons as any)[social.icon] || Icons.Globe;
            return (
              <a 
                key={social.id}
                href={social.url} 
                target="_blank" 
                rel="noreferrer"
                title={social.platform}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent transition-all duration-300"
              >
                <IconComponent size={18} />
              </a>
            );
          })}
          
          <Link 
            to="home" 
            smooth={true} 
            className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer ml-4"
          >
            <ArrowUp size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
