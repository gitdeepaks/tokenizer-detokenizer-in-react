export interface TokenizerConfig {
  vocabSize: number;
  specialTokens: string[];
  unknownToken: string;
  padToken: string;
}

export interface TokenizerResult {
  tokens: number[];
  vocabulary: Map<string, number>;
  reverseVocabulary: Map<number, string>;
  merges: Array<[string, string]>;
}

export class BPETokenizer {
  private vocabulary: Map<string, number> = new Map();
  private reverseVocabulary: Map<number, string> = new Map();
  private merges: Array<[string, string]> = [];
  private config: TokenizerConfig;

  constructor(config: Partial<TokenizerConfig> = {}) {
    this.config = {
      vocabSize: 1000,
      specialTokens: ['<pad>', '<unk>', '<s>', '</s>'],
      unknownToken: '<unk>',
      padToken: '<pad>',
      ...config
    };
  }

  // Get all possible pairs from a word
  private getPairs(word: string[]): Set<string> {
    const pairs = new Set<string>();
    for (let i = 0; i < word.length - 1; i++) {
      pairs.add(`${word[i]} ${word[i + 1]}`);
    }
    return pairs;
  }

  // Count frequency of pairs across all words
  private countPairs(words: Map<string, number>): Map<string, number> {
    const pairCounts = new Map<string, number>();
    
    for (const [word, freq] of words.entries()) {
      const wordArray = word.split(' ');
      const pairs = this.getPairs(wordArray);
      
      for (const pair of pairs) {
        pairCounts.set(pair, (pairCounts.get(pair) || 0) + freq);
      }
    }
    
    return pairCounts;
  }

  // Apply a merge to all words
  private applyMerge(words: Map<string, number>, merge: [string, string]): Map<string, number> {
    const [first, second] = merge;
    const newWords = new Map<string, number>();
    
    for (const [word, freq] of words.entries()) {
      const newWord = word.replace(new RegExp(`${first} ${second}`, 'g'), `${first}${second}`);
      newWords.set(newWord, freq);
    }
    
    return newWords;
  }

  // Train the tokenizer on text
  train(text: string): void {
    // Reset state
    this.vocabulary.clear();
    this.reverseVocabulary.clear();
    this.merges = [];

    // Add special tokens first
    let tokenId = 0;
    for (const token of this.config.specialTokens) {
      this.vocabulary.set(token, tokenId);
      this.reverseVocabulary.set(tokenId, token);
      tokenId++;
    }

    // Prepare text: split into words and add end-of-word marker
    const words = new Map<string, number>();
    const wordList = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    
    for (const word of wordList) {
      const processedWord = word.split('').join(' ') + ' </w>';
      words.set(processedWord, (words.get(processedWord) || 0) + 1);
    }

    // Initialize vocabulary with all characters
    const allChars = new Set<string>();
    for (const word of words.keys()) {
      for (const char of word.split(' ')) {
        if (char !== '</w>') {
          allChars.add(char);
        }
      }
    }

    // Add characters to vocabulary
    for (const char of Array.from(allChars).sort()) {
      if (!this.vocabulary.has(char)) {
        this.vocabulary.set(char, tokenId);
        this.reverseVocabulary.set(tokenId, char);
        tokenId++;
      }
    }

    // Add end-of-word token
    this.vocabulary.set('</w>', tokenId);
    this.reverseVocabulary.set(tokenId, '</w>');
    tokenId++;

    // BPE training loop
    let currentWords = new Map(words);
    
    while (this.vocabulary.size < this.config.vocabSize) {
      const pairCounts = this.countPairs(currentWords);
      
      if (pairCounts.size === 0) break;
      
      // Find most frequent pair
      let maxCount = 0;
      let bestPair: [string, string] | null = null;
      
      for (const [pair, count] of pairCounts.entries()) {
        if (count > maxCount) {
          maxCount = count;
          bestPair = pair.split(' ') as [string, string];
        }
      }
      
      if (!bestPair || maxCount < 2) break;
      
      // Apply merge
      this.merges.push(bestPair);
      currentWords = this.applyMerge(currentWords, bestPair);
      
      // Add merged token to vocabulary
      const mergedToken = bestPair[0] + bestPair[1];
      if (!this.vocabulary.has(mergedToken)) {
        this.vocabulary.set(mergedToken, tokenId);
        this.reverseVocabulary.set(tokenId, mergedToken);
        tokenId++;
      }
    }
  }

  // Tokenize text using trained model
  tokenize(text: string): number[] {
    if (this.vocabulary.size === 0) {
      throw new Error('Tokenizer not trained. Call train() first.');
    }

    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const tokens: number[] = [];

    for (const word of words) {
      let wordTokens = word.split('').join(' ') + ' </w>';
      
      // Apply all merges in order
      for (const [first, second] of this.merges) {
        wordTokens = wordTokens.replace(new RegExp(`${first} ${second}`, 'g'), `${first}${second}`);
      }
      
      // Convert to token IDs
      const wordParts = wordTokens.split(' ').filter(part => part.length > 0);
      for (const part of wordParts) {
        const tokenId = this.vocabulary.get(part);
        if (tokenId !== undefined) {
          tokens.push(tokenId);
        } else {
          // Use unknown token
          const unkId = this.vocabulary.get(this.config.unknownToken);
          if (unkId !== undefined) {
            tokens.push(unkId);
          }
        }
      }
    }

    return tokens;
  }

  // Detokenize token IDs back to text
  detokenize(tokens: number[]): string {
    const words: string[] = [];
    let currentWord = '';

    for (const tokenId of tokens) {
      const token = this.reverseVocabulary.get(tokenId);
      if (!token) continue;

      if (token === '</w>') {
        if (currentWord) {
          words.push(currentWord);
          currentWord = '';
        }
      } else if (!this.config.specialTokens.includes(token)) {
        currentWord += token;
      }
    }

    // Add any remaining word
    if (currentWord) {
      words.push(currentWord);
    }

    return words.join(' ');
  }

  // Get tokenizer results for UI
  getTokenizerResult(text: string): TokenizerResult {
    const tokens = this.tokenize(text);
    return {
      tokens,
      vocabulary: new Map(this.vocabulary),
      reverseVocabulary: new Map(this.reverseVocabulary),
      merges: [...this.merges]
    };
  }

  // Get vocabulary info
  getVocabularyInfo() {
    return {
      size: this.vocabulary.size,
      merges: this.merges.length,
      specialTokens: this.config.specialTokens
    };
  }
}