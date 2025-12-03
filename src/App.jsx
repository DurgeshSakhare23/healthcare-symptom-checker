import React, { useState, useCallback } from 'react';
import { Lightbulb, AlertTriangle, Send, Heart, Sparkles, Shield, Activity, Clock, CheckCircle } from 'lucide-react';

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL; 

const App = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError("Please describe your symptoms before checking.");
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // FIX 1: Parse JSON instead of text to get the clean message
      const data = await response.json();
      
      // Handle both cases: if n8n returns object with 'reply' or just the object
      const cleanText = data.reply || data.output || JSON.stringify(data);
      setResult(cleanText);

    } catch (err) {
      console.error('Fetch error:', err);
      setError("An error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }, [symptoms]);

  // FIX 2: Custom Formatter to turn Markdown into nice Bullet Points
  const ResponseFormatter = ({ text }) => {
    if (!text) return null;

    // Split text by new lines
    const lines = text.split('\n');

    return (
      <div className="space-y-3 text-gray-800">
        {lines.map((line, index) => {
          // Clean the line
          const cleanLine = line.trim();
          if (!cleanLine) return null;

          // 1. Handle Headers (###)
          if (cleanLine.startsWith('###')) {
            return (
              <h3 key={index} className="text-xl font-bold text-blue-700 mt-6 mb-2">
                {cleanLine.replace(/^###\s*/, '')}
              </h3>
            );
          }

          // 2. Handle Bullet Points (*)
          if (cleanLine.startsWith('*')) {
            return (
              <div key={index} className="flex items-start gap-3 ml-2">
                <div className="mt-2 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                <p className="leading-relaxed text-gray-700">
                  {/* Handle bold text inside bullets */}
                  {cleanLine.replace(/^\*\s*/, '').split(/(\*\*.*?\*\*)/).map((part, i) => 
                    part.startsWith('**') && part.endsWith('**') ? (
                      <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>
                    ) : part
                  )}
                </p>
              </div>
            );
          }

          // 3. Handle Disclaimer (starts with **)
          if (cleanLine.startsWith('**DISCLAIMER')) {
            return (
               <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-sm text-red-700 mb-6">
                 <p className="font-bold">{cleanLine.replaceAll('*', '')}</p>
               </div>
            );
          }

          // 4. Regular Paragraphs
          return (
            <p key={index} className="leading-relaxed">
              {cleanLine.split(/(\*\*.*?\*\*)/).map((part, i) => 
                part.startsWith('**') && part.endsWith('**') ? (
                  <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>
                ) : part
              )}
            </p>
          );
        })}
      </div>
    );
  };

  const DisclaimerCard = ({ children, icon: Icon, title, className = 'bg-red-100 text-red-800' }) => (
    <div className={`p-5 rounded-2xl shadow-lg flex items-start space-x-4 border-2 transition-all hover:shadow-xl ${className}`}>
      <div className="bg-white/50 backdrop-blur-sm p-2 rounded-xl">
        <Icon className="w-6 h-6 flex-shrink-0" />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden font-sans">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 min-h-screen p-4 sm:p-8 flex justify-center items-start py-12">
        <div className="w-full max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
               <Heart className="w-12 h-12 text-red-500 fill-red-500 animate-pulse" />
               <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                 HealthAI Pro
               </h1>
            </div>
            <p className="text-xl text-gray-600 font-medium">AI-Powered Symptom Analysis & Health Insights</p>
            
            <div className="flex justify-center gap-4 mt-6">
              <span className="bg-white px-4 py-1 rounded-full shadow-sm text-sm font-semibold text-purple-600 border border-purple-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI-Powered
              </span>
              <span className="bg-white px-4 py-1 rounded-full shadow-sm text-sm font-semibold text-blue-600 border border-blue-100 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Instant Results
              </span>
              <span className="bg-white px-4 py-1 rounded-full shadow-sm text-sm font-semibold text-green-600 border border-green-100 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Safe & Private
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/50 relative overflow-hidden">
            
            {/* Warning Banner */}
            <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-4 items-start">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-700">Important Medical Disclaimer</h3>
                <p className="text-sm text-red-600 mt-1">
                  This tool is for <span className="font-bold">educational and informational purposes only</span> and is not a substitute for professional medical advice, diagnosis, or treatment. <span className="font-bold">Always</span> seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </div>
            </div>

            {/* Input Form */}
            <div className="mb-8 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
               <div className="flex items-center gap-3 mb-3">
                 <div className="bg-blue-600 p-2 rounded-lg">
                   <Activity className="w-5 h-5 text-white" />
                 </div>
                 <h2 className="text-xl font-bold text-gray-800">Describe Your Symptoms</h2>
               </div>
               <p className="text-sm text-gray-500 mb-4 ml-1">Be as detailed as possible for the most accurate analysis</p>
               
               <textarea
                rows={6}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Example: I had a headache for two days..."
                className="w-full p-4 border-2 border-blue-100 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none resize-none text-gray-700 text-lg bg-white"
                disabled={isLoading}
              />
              <div className="text-right text-xs text-gray-400 mt-2">{symptoms.length} characters</div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700'}
              `}
            >
              {isLoading ? (
                <>Analyzing...</> 
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Analyze with AI <Send className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-md flex items-center gap-3">
               <AlertTriangle className="w-6 h-6 text-yellow-600" />
               <p className="text-yellow-800 font-medium">{error}</p>
            </div>
          )}

          {/* Results Area */}
          {result && (
            <div className="mt-8 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4 px-2">
                 <CheckCircle className="w-8 h-8 text-green-500" />
                 <h2 className="text-3xl font-bold text-green-600">Symptom Analysis Results</h2>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center gap-2 text-white">
                  <Lightbulb className="w-5 h-5" />
                  <span className="font-bold tracking-wide">Educational Analysis</span>
                </div>
                
                <div className="p-8 bg-white">
                  {/* USE OUR CUSTOM FORMATTER HERE */}
                  <ResponseFormatter text={result} />
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6 flex gap-4 items-start shadow-sm">
                 <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                 <div>
                   <h4 className="font-bold text-blue-800 text-lg">Remember</h4>
                   <p className="text-blue-700 text-sm mt-1">
                     This analysis is for educational purposes only. If you have concerns about your health, please consult with a qualified healthcare professional immediately.
                   </p>
                 </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default App;