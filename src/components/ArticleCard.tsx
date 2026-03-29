import React from 'react';
import { Article } from '../constants/articles';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200 group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl text-stone-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-stone-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="flex items-center text-emerald-600 font-bold text-xs uppercase tracking-widest gap-2">
          Leer guía completa <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}
