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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-[32px] shadow-xl border border-stone-200 overflow-hidden flex flex-col md:flex-row h-[600px]">
        
        {/* Left Column: PDF Context & Viewer */}
        <div className="w-full md:w-1/3 bg-stone-50 p-6 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <FileText className="text-white" size={18} />
            </div>
            <h3 className="font-tahoma text-lg font-bold text-stone-900">Contexto PDF</h3>
          </div>
          
          {/* Reader Area (Top) */}
          <div className={cn(
            "flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden bg-white mb-4",
            pdfFile ? "border-emerald-500" : "border-stone-300"
          )}>
            <AnimatePresence mode="wait">
              {pdfFile && pdfUrl ? (
                <motion.div 
                  key="file"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col"
                >
                  <div className="flex items-center justify-between p-2 bg-emerald-50 border-b border-emerald-100">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="text-emerald-600 shrink-0" size={14} />
                      <span className="text-[10px] font-bold text-emerald-900 truncate">{pdfFile.name}</span>
                    </div>
                    <button 
                      onClick={removeFile}
                      className="p-1 hover:bg-emerald-200 rounded-lg text-emerald-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <object 
                    data={pdfUrl} 
                    type="application/pdf"
                    className="flex-1 w-full border-none"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-stone-50">
                      <FileText size={32} className="text-stone-300 mb-2" />
                      <p className="text-stone-600 text-[10px] mb-4 leading-tight">
                        Previsualización bloqueada por seguridad.
                      </p>
                      <a 
                        href={pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2"
                      >
                        Abrir PDF
                      </a>
                    </div>
                  </object>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-6"
                >
                  <FileText className="text-stone-300 mx-auto mb-2" size={32} />
                  <p className="text-xs text-stone-400">Ningún documento cargado</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Upload Button (Bottom) */}
          <div className="shrink-0">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm",
                pdfFile 
                  ? "bg-stone-200 text-stone-600 hover:bg-stone-300" 
                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100"
              )}
            >
              <Upload size={16} />
              {pdfFile ? "Cambiar Documento" : "Subir Guía Técnica"}
            </button>
            <p className="text-[10px] text-stone-400 text-center mt-3">
              Formatos aceptados: PDF (Máx. 20MB)
            </p>
          </div>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex w-full",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm font-tahoma",
                    msg.role === 'user' 
                      ? "bg-emerald-600 text-white rounded-tr-none" 
                      : "bg-stone-100 text-stone-900 rounded-tl-none"
                  )}
                >
                  <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-tahoma prose-emerald">
                    <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-100 p-4 rounded-3xl rounded-tl-none flex items-center gap-3 text-emerald-600 font-tahoma">
                  <Loader2 size={18} className="animate-spin" />
                  <span className="text-xs font-bold uppercase tracking-widest">Analizando...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-stone-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta agrícola..."
                className="flex-1 bg-stone-50 border-stone-200 rounded-2xl px-6 py-4 text-sm font-tahoma focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-emerald-600 text-white px-6 rounded-2xl hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg shadow-emerald-200"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
