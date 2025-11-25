'use client';

import { useState } from 'react';
import { Wand2, Copy, Check, Instagram, Twitter, Linkedin } from 'lucide-react';
import toast from 'react-hot-toast';
export default function MarketingGenerator() {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [copied, setCopied] = useState(false);

  // Fake AI Generation Logic
  const handleGenerate = () => {
    setLoading(true);
    setGeneratedContent('');
    
    // Simulate AI "thinking" time (1.5 seconds)
    setTimeout(() => {
      const sampleText = `🚀 Boost your sales with our new collection! \n\nCheck out the amazing deals we have for you. #Business #Growth #Sale`;
      
      // Simulate "Typing Effect"
      let i = 0;
      const interval = setInterval(() => {
        setGeneratedContent((prev) => prev + sampleText.charAt(i));
        i++;
        if (i > sampleText.length - 1) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 30); // Speed of typing
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast.success('Post copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT: Input Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Wand2 className="text-purple-600" size={20} />
          AI Content Wizard
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Product / Topic</label>
            <input 
              type="text" 
              placeholder="e.g. Summer Coffee Sale" 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Platform</label>
            <div className="flex gap-4">
              {['instagram', 'twitter', 'linkedin'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex-1 py-3 rounded-lg border flex justify-center items-center gap-2 transition ${
                    platform === p 
                      ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  {p === 'instagram' && <Instagram size={18} />}
                  {p === 'twitter' && <Twitter size={18} />}
                  {p === 'linkedin' && <Linkedin size={18} />}
                  <span className="capitalize">{p}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tone</label>
            <select className="w-full p-3 border border-slate-300 rounded-lg outline-none">
              <option>Professional</option>
              <option>Fun & Witty</option>
              <option>Urgent (Sale)</option>
            </select>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-purple-600 text-white font-bold py-4 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Magic...
              </>
            ) : (
              <>
                <Wand2 size={20} />
                Generate Content
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT: Preview Card */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-blue-50 rounded-xl -z-10" />
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg mt-6 lg:mt-0 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                {platform === 'instagram' && <Instagram size={20} />}
                {platform === 'twitter' && <Twitter size={20} />}
                {platform === 'linkedin' && <Linkedin size={20} />}
              </div>
              <div>
                <p className="font-bold text-slate-900">Your Business</p>
                <p className="text-xs text-slate-500">Just now • AI Generated</p>
              </div>
            </div>
            {generatedContent && (
              <button 
                onClick={handleCopy}
                className="text-slate-400 hover:text-purple-600 transition"
                title="Copy text"
              >
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            )}
          </div>

          <div className="flex-1">
            {generatedContent ? (
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap animate-in fade-in">
                {generatedContent}
                <span className="inline-block w-2 h-5 bg-purple-600 ml-1 animate-pulse align-middle"></span>
              </p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4">
                <Wand2 size={48} className="opacity-20" />
                <p>Ready to create? Fill the form and hit Generate.</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-100 flex gap-4 text-sm text-slate-400">
            <span>0 Likes</span>
            <span>0 Comments</span>
            <span>0 Shares</span>
          </div>
        </div>
      </div>
    </div>
  );
}