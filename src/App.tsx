import React, { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Copy, RotateCcw, Settings, Eye, EyeOff } from 'lucide-react';

interface TokenizerResult {
  tokens: number[];
  vocabulary: Map<string, number>;
  reverseVocabulary: Map<number, string>;
}

function App() {
  const [inputText, setInputText] = useState('You are a helpful assistant');
  const [tokenIds, setTokenIds] = useState('');
  const [showWhitespace, setShowWhitespace] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  
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
      const ids = tokenIds.split(',')
        .map(id => id.trim())
        .filter(id => id !== '')
        .map(id => parseInt(id))
        .filter(id => !isNaN(id));
      
      const text = ids.map(id => tokenizerResult.reverseVocabulary.get(id) || '�').join('');
      setInputText(text);
    } catch (error) {
      console.error('Error detokenizing:', error);
      alert('Error: Please enter valid comma-separated token IDs');
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  const resetAll = () => {
    setInputText('You are a helpful assistant');
    setTokenIds('');
  };
  
  const renderColoredTokens = () => {
    const colors = [
      'bg-red-100 text-red-800 border-red-200',
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-yellow-100 text-yellow-800 border-yellow-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-orange-100 text-orange-800 border-orange-200',
    ];
    
    return Array.from(inputText).map((char, index) => {
      const tokenId = tokenizerResult.vocabulary.get(char)!;
      const colorClass = colors[tokenId % colors.length];
      const displayChar = showWhitespace && char === ' ' ? '␣' : 
                         showWhitespace && char === '\n' ? '↵' : 
                         showWhitespace && char === '\t' ? '⇥' : char;
      
      return (
        <span
          key={index}
          className={`inline-block px-2 py-1 m-0.5 rounded border text-sm font-mono ${colorClass}`}
          title={`Token ID: ${tokenId}`}
        >
          {displayChar}
        </span>
      );
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tiktokenizer
            </h1>
            <p className="text-gray-600">
              Visualize and understand how text is tokenized for AI models
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="gpt-4o">gpt-4o</option>
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              <option value="claude-3">claude-3</option>
              <option value="custom">custom</option>
            </select>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* Chat-like Input Interface */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white">
                      <option>System</option>
                      <option>User</option>
                      <option>Assistant</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Message content..."
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-32 resize-none border-0 focus:outline-none text-gray-700 placeholder-gray-400"
                  placeholder="Enter your text here..."
                />
              </div>
              
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={resetAll}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                    <button
                      onClick={() => copyToClipboard(inputText)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                  <button
                    onClick={tokenizeText}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Add message
                  </button>
                </div>
              </div>
            </div>
            
            {/* Token IDs Input */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="border-b border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900">Token IDs</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Paste comma-separated token IDs to decode back to text
                </p>
              </div>
              <div className="p-4">
                <textarea
                  value={tokenIds}
                  onChange={(e) => setTokenIds(e.target.value)}
                  className="w-full h-24 resize-none border border-gray-300 rounded-lg p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="200264, 17360, 200266, 3575, 553, 261..."
                />
              </div>
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {tokenIds ? tokenIds.split(',').filter(id => id.trim()).length : 0} tokens
                  </span>
                  <button
                    onClick={detokenizeIds}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Decode
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Panel - Output */}
          <div className="space-y-6">
            {/* Token Count */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Token count</h3>
                  <div className="text-3xl font-bold text-blue-600 mt-2">
                    {tokenizerResult.tokens.length}
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>Characters: {inputText.length}</div>
                  <div>Unique tokens: {tokenizerResult.vocabulary.size}</div>
                </div>
              </div>
            </div>
            
            {/* Colored Tokens */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Tokenized Text</h3>
                  <button
                    onClick={() => setShowWhitespace(!showWhitespace)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {showWhitespace ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    Show whitespace
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="leading-relaxed">
                  {renderColoredTokens()}
                </div>
              </div>
            </div>
            
            {/* Raw Token IDs */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Raw Token IDs</h3>
                  <button
                    onClick={() => copyToClipboard(tokenizerResult.tokens.join(', '))}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="font-mono text-sm text-gray-700 bg-gray-50 rounded-lg p-4 break-all">
                  {tokenizerResult.tokens.join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Built with React & TypeScript • Character-level tokenization</p>
        </div>
      </div>
    </div>
  );
}

export default App;