import React, { useState } from 'react';
import { Sprout, Menu, X, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Banner from './components/Banner';
import ChatSection from './components/ChatSection';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0]">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-xl text-white">
                <Sprout size={24} />
              </div>
              <span className="font-tahoma text-2xl font-bold tracking-tight text-stone-900">
                AgroAyuda<span className="text-emerald-600 italic">SV</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-bold uppercase tracking-widest text-stone-600 hover:text-emerald-600 transition-colors">Inicio</a>
              <a href="#asistente" className="text-sm font-bold uppercase tracking-widest text-stone-600 hover:text-emerald-600 transition-colors">Asistente IA</a>
              <a href="#contacto" className="text-sm font-bold uppercase tracking-widest text-stone-600 hover:text-emerald-600 transition-colors">Contacto</a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-stone-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-20 z-30 bg-white p-6 font-sans"
          >
            <div className="flex flex-col gap-6">
              <a href="#" className="text-xl font-tahoma text-stone-900" onClick={() => setIsMenuOpen(false)}>Inicio</a>
              <a href="#asistente" className="text-xl font-tahoma text-stone-900" onClick={() => setIsMenuOpen(false)}>Asistente IA</a>
              <a href="#contacto" className="text-xl font-tahoma text-stone-900" onClick={() => setIsMenuOpen(false)}>Contacto</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Banner Section */}
        <Banner />

        {/* Chatbot Section */}
        <section id="asistente" className="py-12 md:py-20 bg-stone-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 text-center">
            <h2 className="font-tahoma text-4xl sm:text-5xl text-stone-900 mb-4">Asistente Agrícola Inteligente</h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg">
              Sube tus documentos técnicos para un análisis personalizado o consulta directamente sobre tus cultivos.
            </p>
          </div>
          <ChatSection />
        </section>

        {/* Info Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800&h=600" 
                  alt="Cultivos en El Salvador" 
                  className="rounded-[40px] shadow-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Nuestra Misión</span>
                <h2 className="font-tahoma text-4xl sm:text-5xl text-stone-900 mb-8 leading-tight">
                  Impulsando el corazón de nuestra <span className="italic text-emerald-600">agricultura</span>.
                </h2>
                <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                  AgroAyuda SV tiene como objetivo analizar y fortalecer el apoyo a los procesos agrícolas a través de un asistente inteligente. Mediante el uso de Inteligencia Artificial Generativa, buscamos transformar la manera en que los agricultores interactúan con la información técnica para optimizar sus cultivos y asegurar la prosperidad de nuestra tierra.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-3xl font-tahoma text-emerald-600 mb-1">100%</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Local</p>
                  </div>
                  <div>
                    <p className="text-3xl font-tahoma text-emerald-600 mb-1">24/7</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Asistencia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="bg-stone-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-600 p-2 rounded-xl">
                  <Sprout size={20} />
                </div>
                <span className="font-tahoma text-2xl font-bold tracking-tight">
                  AgroAyuda<span className="text-emerald-600 italic">SV</span>
                </span>
              </div>
              <p className="text-stone-400 max-w-sm mb-8 leading-relaxed">
                Empoderando al sector agrícola de El Salvador con herramientas digitales de vanguardia.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-emerald-500">Contacto</h5>
              <div className="space-y-4 text-sm text-stone-400">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-emerald-600" />
                  <span>+503 76145407</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-emerald-600" />
                  <span>chatbotagricola1@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-emerald-600" />
                  <span>San Salvador, El Salvador</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10 text-center text-[10px] text-stone-500 uppercase tracking-[0.2em]">
            <p>© 2026 AgroAyuda El Salvador. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
