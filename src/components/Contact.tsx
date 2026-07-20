import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { staggerContainer, fadeIn } from '../animations/motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const { data: portfolioData } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // No need to check formUrl since we are using local backend!

    setIsSubmitting(true);
    
    try {
      // Use local custom backend to send email directly
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        alert("Thanks for reaching out! Your message has been sent successfully.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(data.error || "Oops! There was a problem sending your message. Check backend configuration.");
      }
    } catch (err) {
      alert("Network error: Could not connect to the local backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-primary/80 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeIn('down', 'tween', 0.2, 1)} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Get In <span className="text-accent">Touch</span></h2>
            <div className="w-20 h-1 bg-accent mx-auto" />
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Have a project in mind or just want to say hi? Feel free to reach out.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={fadeIn('right', 'tween', 0.3, 1)} className="space-y-8">
              <div className="glass-card p-6 flex items-start gap-4">
                <div className="bg-white p-4 rounded-xl text-accent border border-slate-200">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Email</h3>
                  <a href={`mailto:${portfolioData.personal.email}`} className="text-slate-500 hover:text-accent transition-colors">
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 flex items-start gap-4">
                <div className="bg-white p-4 rounded-xl text-accent border border-slate-200">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Phone</h3>
                  <p className="text-slate-500">{portfolioData.personal.phone}</p>
                </div>
              </div>

              <div className="glass-card p-6 flex items-start gap-4">
                <div className="bg-white p-4 rounded-xl text-accent border border-slate-200">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Location</h3>
                  <p className="text-slate-500">{portfolioData.personal.location}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn('left', 'tween', 0.4, 1)}>
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-500 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-accent transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-500 mb-2">Your Email</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-accent transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-500 mb-2">Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Hello Rafiul, I would like to..."
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-accent text-white font-bold rounded-lg hover:shadow-neon transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <Send size={20} className={isSubmitting ? 'animate-pulse' : ''} /> 
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
