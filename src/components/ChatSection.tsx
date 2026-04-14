import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Upload, X, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getGeminiResponse } from '../services/gemini';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function ChatSection() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: '¡Hola! Soy tu asistente agrícola. Puedes subir un documento PDF para que lo analice o simplemente preguntarme sobre cultivos en El Salvador.' }] }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior
      });
    }
  };

  // Auto-scroll on new messages or loading state
  useEffect(() => {
    const timeoutId = setTimeout(() => scrollToBottom('smooth'), 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  // Initial scroll to bottom
  useEffect(() => {
    scrollToBottom('auto');
  }, []);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        setPdfBase64(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfFile(null);
    setPdfUrl(null);
    setPdfBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const pdfData = pdfBase64 ? { data: pdfBase64, mimeType: 'application/pdf' } : undefined;
    const responseText = await getGeminiResponse(input, messages, pdfData);
    
    const modelMessage: Message = { role: 'model', parts: [{ text: responseText }] };
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <div className="bg-white rounded-[32px] shadow-xl border border-stone-200 overflow-hidden flex flex-col h-[500px] md:h-[650px]">
        
        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-white"
          style={{ scrollbarGutter: 'stable' }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] md:max-w-[75%] p-4 md:p-5 rounded-3xl text-sm md:text-base leading-relaxed shadow-sm font-tahoma",
                  msg.role === 'user' 
                    ? "bg-emerald-600 text-white rounded-tr-none" 
                    : "bg-stone-100 text-stone-900 rounded-tl-none"
                )}
              >
                <div className="prose prose-sm md:prose-base max-w-none prose-p:leading-relaxed prose-headings:font-tahoma prose-emerald">
                  <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-stone-100 p-4 rounded-3xl rounded-tl-none flex items-center gap-3 text-emerald-600 font-tahoma">
                <Loader2 size={18} className="animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest">Analizando...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-stone-100 bg-white shrink-0">
          <AnimatePresence>
            {pdfFile && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-4 flex items-center gap-2 bg-emerald-50 p-2 px-3 rounded-xl border border-emerald-100 w-fit"
              >
                <FileText className="text-emerald-600" size={16} />
                <span className="text-xs font-bold text-emerald-900 truncate max-w-[200px]">{pdfFile.name}</span>
                <button 
                  onClick={removeFile}
                  className="p-1 hover:bg-emerald-200 rounded-full text-emerald-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-3 items-center"
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-4 rounded-2xl bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-emerald-600 border border-stone-200 transition-all flex items-center justify-center shrink-0"
              title="Subir PDF"
            >
              <Upload size={20} />
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta agrícola..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-sm md:text-base font-tahoma focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg shadow-emerald-200 shrink-0"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
