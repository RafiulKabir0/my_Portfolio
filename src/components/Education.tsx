import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { staggerContainer, fadeIn } from '../animations/motion';
import { GraduationCap, Calendar } from 'lucide-react';

const Education = () => {
  const { data: portfolioData } = usePortfolio();
  return (
    <section id="education" className="py-20 relative bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeIn('down', 'tween', 0.2, 1)} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Education <span className="text-accent">Timeline</span></h2>
            <div className="w-20 h-1 bg-accent mx-auto" />
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-purple-500 to-transparent" />

            <div className="space-y-12">
              {portfolioData.education.map((edu, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn(index % 2 === 0 ? 'right' : 'left', 'tween', 0.2 * index, 1)}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[-8px] md:left-1/2 md:-ml-[10px] w-5 h-5 rounded-full bg-primary border-4 border-accent shadow-neon z-10" />

                  <div className={`ml-8 md:ml-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="glass-card p-6 hover:shadow-neon transition-shadow duration-300 relative overflow-hidden group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-500 opacity-0 group-hover:opacity-20 blur transition duration-500" />
                      
                      <div className="flex items-center gap-2 text-accent mb-2">
                        <GraduationCap size={20} />
                        <h3 className="text-xl font-bold text-slate-900">{edu.degree}</h3>
                      </div>
                      
                      <h4 className="text-lg text-slate-600 font-medium mb-3">{edu.institution}</h4>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 bg-white inline-block px-3 py-1 rounded-full">
                        <Calendar size={14} />
                        <span>{edu.duration}</span>
                      </div>
                      
                      <p className="text-slate-500 leading-relaxed">
                        {edu.details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
