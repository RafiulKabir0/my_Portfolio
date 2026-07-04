import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { staggerContainer, fadeIn } from '../animations/motion';
import { Github } from 'lucide-react';

const Projects = () => {
  const { data: portfolioData } = usePortfolio();
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeIn('down', 'tween', 0.2, 1)} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Featured <span className="text-accent">Projects</span></h2>
            <div className="w-20 h-1 bg-accent mx-auto" />
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Showcasing some of my recent work in software development and programming.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <motion.div 
                key={project.title}
                variants={fadeIn('up', 'spring', index * 0.2, 1)}
                className="glass-card group overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Floating Tech Stack badges over image */}
                  <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="bg-black/60 backdrop-blur-md text-xs font-semibold text-accent px-3 py-1 rounded-full border border-accent/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-slate-500 mb-6 flex-grow">{project.description}</p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <a 
                      href={project.github} 
                      className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-accent hover:bg-gray-100 px-4 py-2 rounded-lg transition-all"
                    >
                      <Github size={18} /> Code
                    </a>
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

export default Projects;
