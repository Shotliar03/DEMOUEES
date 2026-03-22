import React from 'react';
import { Article } from '../constants/articles';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface Props {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: Props) {
  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-stone-50 w-full max-w-4xl max-h-[90vh] rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-stone-900 hover:bg-white transition-colors shadow-sm"
          >
            <X size={24} />
          </button>

          <div className="overflow-y-auto flex-1">
            <div className="h-64 sm:h-80 w-full relative">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent" />
            </div>

            <div className="px-6 sm:px-12 pb-12 -mt-12 relative">
              <span className="inline-block bg-emerald-600 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-6">
                {article.category}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 mb-8 leading-[1.1]">
                {article.title}
              </h2>
              
              <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-700 prose-p:leading-relaxed">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
