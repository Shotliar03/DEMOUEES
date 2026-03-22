import React, { useState } from 'react';
import { Sprout, Leaf, Wheat, Search, Menu, X, ChevronRight, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTICLES, Article } from './constants/articles';
import ArticleCard from './components/ArticleCard';
import ArticleModal from './components/ArticleModal';
import Chatbot from './components/Chatbot';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-xl">
                <Sprout className="text-white" size={24} />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                AgroAyuda <span className="text-emerald-600 italic">SV</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-stone-600 hover:text-emerald-600 transition-colors">Inicio</a>
              <a href="#articulos" className="text-sm font-medium text-stone-600 hover:text-emerald-600 transition-colors">Guías de Cultivo</a>
              <a href="#nosotros" className="text-sm font-medium text-stone-600 hover:text-emerald-600 transition-colors">Sobre Nosotros</a>
              <button className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all shadow-sm">
                Contactar Técnico
              </button>
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
            className="md:hidden fixed inset-0 top-20 z-30 bg-white p-6"
          >
            <div className="flex flex-col gap-6">
              <a href="#" className="text-xl font-serif text-stone-900" onClick={() => setIsMenuOpen(false)}>Inicio</a>
              <a href="#articulos" className="text-xl font-serif text-stone-900" onClick={() => setIsMenuOpen(false)}>Guías de Cultivo</a>
              <a href="#nosotros" className="text-xl font-serif text-stone-900" onClick={() => setIsMenuOpen(false)}>Sobre Nosotros</a>
              <button className="bg-emerald-600 text-white px-6 py-4 rounded-2xl font-bold">
                Contactar Técnico
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/seed/agriculture-sv/1920/1080" 
              alt="Campo salvadoreño"
              className="w-full h-full object-cover brightness-[0.85]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <span className="inline-block bg-emerald-600/90 backdrop-blur text-white text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6">
                Agricultura Sostenible en El Salvador
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl text-white mb-8 leading-[1.1]">
                Cosechando el <span className="italic text-emerald-400">futuro</span> de nuestra tierra.
              </h1>
              <p className="text-stone-200 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl">
                Accede a guías técnicas especializadas para el cultivo de granos básicos adaptadas al clima y suelo de El Salvador.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#articulos"
                  className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  Explorar Guías <ChevronRight size={20} />
                </a>
                <button className="bg-transparent border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                  Ver Pronóstico del Tiempo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features / Stats */}
        <section className="py-12 bg-stone-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="text-emerald-500" size={24} />
                </div>
                <h4 className="font-serif text-2xl mb-2">Técnicas Modernas</h4>
                <p className="text-stone-400 text-sm">Implementación de sistemas de riego y manejo integrado de plagas.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mb-4">
                  <Wheat className="text-emerald-500" size={24} />
                </div>
                <h4 className="font-serif text-2xl mb-2">Granos Básicos</h4>
                <p className="text-stone-400 text-sm">Especialización en Maíz, Frijol y Arroz, pilares de nuestra dieta.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mb-4">
                  <Sprout className="text-emerald-500" size={24} />
                </div>
                <h4 className="font-serif text-2xl mb-2">Asesoría con IA</h4>
                <p className="text-stone-400 text-sm">Chatbot inteligente disponible 24/7 para resolver tus dudas inmediatas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section id="articulos" className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-6">Guías de Cultivo Especializadas</h2>
                <p className="text-stone-600 text-lg">
                  Información técnica detallada para maximizar el rendimiento de tus cosechas en territorio salvadoreño.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-3 rounded-full border border-stone-300 hover:bg-stone-200 transition-colors">
                  <Search size={20} className="text-stone-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ARTICLES.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  onClick={() => setSelectedArticle(article)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Support Section */}
        <section id="nosotros" className="bg-emerald-900 py-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
             <Sprout size={400} className="rotate-12 translate-x-1/2" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h2 className="font-serif text-4xl sm:text-5xl mb-8 leading-tight">
                ¿Necesitas apoyo técnico personalizado en tu parcela?
              </h2>
              <p className="text-emerald-100 text-lg mb-12 leading-relaxed">
                Nuestro equipo de agrónomos está listo para visitarte. Ofrecemos análisis de suelo, recomendaciones de fertilización y planes de manejo fitosanitario.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center">
                    <Phone size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-300 uppercase font-bold tracking-wider">Llámanos</p>
                    <p className="font-bold">+503 2222-0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center">
                    <Mail size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-300 uppercase font-bold tracking-wider">Escríbenos</p>
                    <p className="font-bold">contacto@agroayuda.sv</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-600 p-2 rounded-xl">
                  <Sprout className="text-white" size={20} />
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                  AgroAyuda <span className="text-emerald-600 italic">SV</span>
                </span>
              </div>
              <p className="text-stone-500 max-w-sm mb-8 leading-relaxed">
                Empoderando al agricultor salvadoreño con tecnología y conocimiento técnico para una producción más eficiente y sostenible.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-stone-900 mb-6 uppercase text-xs tracking-widest">Enlaces Rápidos</h5>
              <ul className="space-y-4 text-sm text-stone-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Inicio</a></li>
                <li><a href="#articulos" className="hover:text-emerald-600 transition-colors">Guías de Cultivo</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Calendario de Siembra</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Precios de Mercado</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-stone-900 mb-6 uppercase text-xs tracking-widest">Ubicación</h5>
              <div className="flex items-start gap-3 text-sm text-stone-500">
                <MapPin size={18} className="text-emerald-600 shrink-0" />
                <p>San Salvador, El Salvador.<br />Edificio Century Tower, Nivel 4.</p>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400 font-medium">
            <p>© 2026 AgroAyuda El Salvador. Todos los derechos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-stone-600">Privacidad</a>
              <a href="#" className="hover:text-stone-600">Términos</a>
              <a href="#" className="hover:text-stone-600">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <ArticleModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
      <Chatbot />
    </div>
  );
}
