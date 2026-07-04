import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { staggerContainer, fadeIn } from '../animations/motion';

const About = () => {
  const { data: portfolioData } = usePortfolio();
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          <motion.div variants={fadeIn('up', 'tween', 0.2, 1)}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">About <span className="text-accent">Me</span></h2>
            <div className="w-20 h-1 bg-accent mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn('right', 'tween', 0.3, 1)} className="text-slate-600 leading-relaxed text-lg space-y-6">
              <p>
                Hello! I am <span className="text-slate-900 font-semibold">{portfolioData.personal.name}</span>, a passionate Software Engineering student based in {portfolioData.personal.location}.
              </p>
              <p>
                My journey in technology is driven by an insatiable curiosity about how things work behind the scenes. I am constantly training and expanding my knowledge base to stay ahead in the rapidly evolving AI revolution.
              </p>
              <p>
                Whether it's writing efficient C programs, delving into cybersecurity fundamentals, or exploring modern web technologies, I approach every challenge with a problem-solving mindset.
              </p>
            </motion.div>

            <motion.div variants={fadeIn('left', 'tween', 0.4, 1)} className="grid grid-cols-2 gap-6">
              <div className="bg-primary/50 p-6 rounded-xl border border-slate-200 hover:border-accent/30 transition-colors">
                <h3 className="text-accent text-3xl font-bold mb-2">02+</h3>
                <p className="text-sm text-slate-500">Projects Completed</p>
              </div>
              <div className="bg-primary/50 p-6 rounded-xl border border-slate-200 hover:border-accent/30 transition-colors">
                <h3 className="text-accent text-3xl font-bold mb-2">90%</h3>
                <p className="text-sm text-slate-500">AI Awareness</p>
              </div>
              <div className="bg-primary/50 p-6 rounded-xl border border-slate-200 hover:border-accent/30 transition-colors">
                <h3 className="text-accent text-3xl font-bold mb-2">3rd</h3>
                <p className="text-sm text-slate-500">Semester SE Student</p>
              </div>
              <div className="bg-primary/50 p-6 rounded-xl border border-slate-200 hover:border-accent/30 transition-colors">
                <h3 className="text-accent text-3xl font-bold mb-2">100%</h3>
                <p className="text-sm text-slate-500">Dedication to Learn</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
