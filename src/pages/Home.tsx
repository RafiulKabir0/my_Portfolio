import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Volunteer from '../components/Volunteer';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main className="bg-primary min-h-screen relative overflow-hidden">
      {/* Global Background Particles / Noise could go here if needed */}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Certifications />
      <Volunteer />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
