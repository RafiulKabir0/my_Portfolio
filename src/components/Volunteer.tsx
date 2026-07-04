import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../animations/motion';
import { HeartHandshake } from 'lucide-react';

const Volunteer = () => {
  return (
    <section id="volunteer" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          <motion.div variants={fadeIn('down', 'tween', 0.2, 1)} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Volunteer & <span className="text-accent">Clubs</span></h2>
            <div className="w-20 h-1 bg-accent mx-auto" />
          </motion.div>

          <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="flex items-start gap-6 max-w-3xl mx-auto">
            <div className="hidden md:flex flex-shrink-0 bg-white p-4 rounded-2xl border border-slate-200 items-center justify-center">
               <HeartHandshake size={40} className="text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Member of Software Engineering Club</h3>
              <p className="text-accent font-medium mb-4">Daffodil International University</p>
              <p className="text-slate-500 leading-relaxed">
                Active member of the Software Engineering Club at DIU. I participate in departmental seminars, coding workshops, and collaborative projects, helping to build a supportive learning environment for fellow software engineering students.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Volunteer;
