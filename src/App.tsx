import React, { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Copy, RotateCcw } from 'lucide-react';

interface TokenizerResult {
  tokens: number[];
  vocabulary: Map<string, number>;
  reverseVocabulary: Map<number, string>;
}

function App() {
  const [inputText, setInputText] = useState('Hello, AI token! 🚀');
  const [tokenIds, setTokenIds] = useState('');
  
  // Create vocabulary and tokenize text
  const tokenizerResult = useMemo((): TokenizerResult => {
    const vocabulary = new Map<string, number>();
    const reverseVocabulary = new Map<number, string>();
    let tokenId = 0;
    
    // Build vocabulary from input text
    for (const char of inputText) {
      if (!vocabulary.has(char)) {
        vocabulary.set(char, tokenId);
        reverseVocabulary.set(tokenId, char);
        tokenId++;
      }
    }
    
    // Tokenize the text
    const tokens = Array.from(inputText).map(char => vocabulary.get(char)!);
    
    return { tokens, vocabulary, reverseVocabulary };
  }, [inputText]);
  
  const tokenizeText = () => {
    setTokenIds(tokenizerResult.tokens.join(', '));
  };
  
  const detokenizeIds = () => {
    try {
      const ids = tokenIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      const text = ids.map(id => tokenizerResult.reverseVocabulary.get(id) || '�').join('');
      setInputText(text);
    } catch (error) {
      console.error('Error detokenizing:', error);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  const resetAll = () => {
    setInputText('Hello, AI token! 🚀');
    setTokenIds('');
  };
  
  const vocabularyEntries = Array.from(tokenizerResult.vocabulary.entries()).sort((a, b) => a[1] - b[1]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Tokenizer & Detokenizer
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Transform text into token IDs and back. Perfect for understanding how AI models process text.
          </p>
        </div>
        
        {/* Main Tool */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Text Input Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Input Text</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(inputText)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title="Copy text"
                  >
                    <Copy className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={resetAll}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title="Reset all"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-40 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Enter any text with letters, numbers, and special characters..."
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-slate-300 text-sm">
                  Characters: {inputText.length}
                </span>
                <button
                  onClick={tokenizeText}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  Tokenize <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Token IDs Output Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Token IDs</h2>
                <button
                  onClick={() => copyToClipboard(tokenIds)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  title="Copy token IDs"
                >
                  <Copy className="w-4 h-4 text-white" />
                </button>
              </div>
              <textarea
                value={tokenIds}
                onChange={(e) => setTokenIds(e.target.value)}
                className="w-full h-40 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent font-mono"
                placeholder="Token IDs will appear here (comma-separated)..."
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-slate-300 text-sm">
                  Tokens: {tokenIds ? tokenIds.split(',').length : 0}
                </span>
                <button
                  onClick={detokenizeIds}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" /> Detokenize
                </button>
              </div>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {inputText.length}
              </div>
              <div className="text-slate-300">Characters</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {tokenizerResult.tokens.length}
              </div>
              <div className="text-slate-300">Tokens</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {tokenizerResult.vocabulary.size}
              </div>
              <div className="text-slate-300">Unique Characters</div>
            </div>
          </div>
          
          {/* Vocabulary Table */}
          {vocabularyEntries.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Vocabulary Mapping</h3>
              <div className="max-h-80 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {vocabularyEntries.map(([char, id]) => (
                    <div
                      key={id}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between"
                    >
                      <span className="text-white font-mono text-lg">
                        {char === ' ' ? '␣' : char === '\n' ? '↵' : char === '\t' ? '⇥' : char}
                      </span>
                      <span className="text-slate-300 text-sm bg-white/10 px-2 py-1 rounded">
                        {id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 text-slate-400">
          <p>Character-level tokenization • Each unique character gets a token ID</p>
        </div>
      </div>
    </div>
  );
}

export default App;