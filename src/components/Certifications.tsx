import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { staggerContainer, fadeIn } from '../animations/motion';
import { Award } from 'lucide-react';

const Certifications = () => {
  const { data: portfolioData } = usePortfolio();
  return (
    <section id="certifications" className="py-20 relative bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeIn('down', 'tween', 0.2, 1)} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Achievements & <span className="text-accent">Certifications</span></h2>
            <div className="w-20 h-1 bg-accent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.certifications.map((cert, index) => (
              <motion.div 
                key={cert.title}
                variants={fadeIn('up', 'spring', index * 0.2, 1)}
                className="glass-card p-6 relative group overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 text-slate-900 transform group-hover:scale-110 group-hover:text-accent/10 transition-all duration-500">
                  <Award size={120} />
                </div>
                
                <div className="relative z-10 flex items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-lg text-accent">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-accent transition-colors">{cert.title}</h3>
                    <p className="text-slate-500 font-medium">{cert.issuer}</p>
                    <p className="text-slate-400 text-sm mt-2">Issued: {cert.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
