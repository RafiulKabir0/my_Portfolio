import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { staggerContainer, fadeIn } from '../animations/motion';

const Skills = () => {
  const { data: portfolioData } = usePortfolio();
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeIn('down', 'tween', 0.2, 1)} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Technical <span className="text-accent">Skills</span></h2>
            <div className="w-20 h-1 bg-accent mx-auto" />
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Technologies and core competencies I am currently mastering.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                variants={fadeIn('up', 'spring', index * 0.1, 1)}
                className="glass-card p-6 group hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-accent transition-colors">{skill.name}</h3>
                  <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded">{skill.category}</span>
                </div>
                
                <div className="w-full bg-gray-800 rounded-full h-2.5 mb-1 overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-accent h-2.5 rounded-full relative"
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white blur-[2px]" />
                  </motion.div>
                </div>
                <div className="text-right text-xs text-slate-400 mt-2">{skill.level}% Proficiency</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
