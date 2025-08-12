import { BPETokenizer } from '../tokenizer/BPETokenizer';
import { SimpleTokenizer } from '../tokenizer/SimpleTokenizer';
import { CharacterTokenizer } from '../tokenizer/CharacterTokenizer';

describe('Tokenizer Tests', () => {
  describe('BPE Tokenizer', () => {
    let tokenizer: BPETokenizer;

    beforeEach(() => {
      tokenizer = new BPETokenizer({ vocabSize: 100 });
    });

    test('should handle empty input', () => {
      expect(() => tokenizer.train('')).toThrow('Training text cannot be empty');
    });

    test('should perform round-trip correctly', () => {
      const text = 'Hello world! This is a test.';
      tokenizer.train(text);
      
      const validation = tokenizer.validateRoundTrip(text);
      expect(validation.isValid).toBe(true);
      expect(validation.originalText).toBe(text);
      expect(validation.reconstructedText).toBe(text);
    });

    test('should handle special characters', () => {
      const text = 'Hello @#$%^&*() world! 🚀';
      tokenizer.train(text);
      
      const tokens = tokenizer.tokenize(text);
      const reconstructed = tokenizer.detokenize(tokens);
      
      expect(reconstructed).toBe(text.toLowerCase());
    });

    test('should create proper vocabulary', () => {
      const text = 'hello hello world world';
      tokenizer.train(text);
      
      const vocab = tokenizer.getVocabularyAnalysis();
      expect(vocab.totalTokens).toBeGreaterThan(0);
      expect(vocab.mergeOperations).toBeGreaterThan(0);
    });

    test('should handle unicode characters', () => {
      const text = 'café naïve résumé Москва 北京';
      tokenizer.train(text);
      
      const validation = tokenizer.validateRoundTrip(text);
      expect(validation.isValid).toBe(true);
    });

    test('should export and import vocabulary', () => {
      const text = 'Hello world!';
      tokenizer.train(text);
      
      const exported = tokenizer.exportVocabulary();
      const newTokenizer = new BPETokenizer();
      newTokenizer.importVocabulary(exported);
      
      const originalTokens = tokenizer.tokenize(text);
      const importedTokens = newTokenizer.tokenize(text);
      
      expect(originalTokens).toEqual(importedTokens);
    });

    test('should handle performance benchmarking', () => {
      const testTexts = [
        'Hello world!',
        'The quick brown fox jumps over the lazy dog.',
        'Testing tokenizer performance with various texts.'
      ];
      
      const results = tokenizer.benchmark(testTexts);
      
      expect(results.totalTexts).toBe(3);
      expect(results.roundTripAccuracy).toBeGreaterThanOrEqual(0);
      expect(results.averageCompressionRatio).toBeGreaterThan(0);
    });
  });

  describe('Simple Tokenizer', () => {
    let tokenizer: SimpleTokenizer;

    beforeEach(() => {
      tokenizer = new SimpleTokenizer();
    });

    test('should tokenize words correctly', () => {
      const text = 'Hello world!';
      tokenizer.train(text);
      
      const tokens = tokenizer.tokenize(text);
      const reconstructed = tokenizer.detokenize(tokens);
      
      expect(reconstructed).toBe(text.toLowerCase());
    });

    test('should handle punctuation', () => {
      const text = 'Hello, world! How are you?';
      tokenizer.train(text);
      
      const tokens = tokenizer.tokenize(text);
      expect(tokens.length).toBeGreaterThan(0);
    });
  });

  describe('Character Tokenizer', () => {
    let tokenizer: CharacterTokenizer;

    beforeEach(() => {
      tokenizer = new CharacterTokenizer();
    });

    test('should tokenize characters correctly', () => {
      const text = 'Hello!';
      tokenizer.train(text);
      
      const tokens = tokenizer.tokenize(text);
      const reconstructed = tokenizer.detokenize(tokens);
      
      expect(reconstructed).toBe(text);
      expect(tokens.length).toBe(text.length);
    });

    test('should handle unicode characters', () => {
      const text = '🚀🌟';
      tokenizer.train(text);
      
      const tokens = tokenizer.tokenize(text);
      const reconstructed = tokenizer.detokenize(tokens);
      
      expect(reconstructed).toBe(text);
    });
  });
});

// Performance Tests
describe('Performance Tests', () => {
  test('should handle large text efficiently', () => {
    const largeText = 'Hello world! '.repeat(1000);
    const tokenizer = new BPETokenizer({ vocabSize: 500 });
    
    const startTime = performance.now();
    tokenizer.train(largeText);
    const tokens = tokenizer.tokenize(largeText);
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
    expect(tokens.length).toBeGreaterThan(0);
  });

  test('should maintain consistent performance', () => {
    const tokenizer = new BPETokenizer({ vocabSize: 200 });
    const text = 'Performance test text with various words and characters.';
    
    const times: number[] = [];
    
    for (let i = 0; i < 10; i++) {
      const start = performance.now();
      tokenizer.train(text);
      tokenizer.tokenize(text);
      const end = performance.now();
      times.push(end - start);
    }
    
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const maxTime = Math.max(...times);
    const minTime = Math.min(...times);
    
    // Performance should be consistent (max time shouldn't be more than 3x min time)
    expect(maxTime / minTime).toBeLessThan(3);
  });
});

// Quality Tests
describe('Quality Tests', () => {
  test('should maintain vocabulary quality', () => {
    const tokenizer = new BPETokenizer({ vocabSize: 300 });
    const text = 'The quick brown fox jumps over the lazy dog. ' +
                'Pack my box with five dozen liquor jugs. ' +
                'How vexingly quick daft zebras jump!';
    
    tokenizer.train(text);
    const analysis = tokenizer.getVocabularyAnalysis();
    
    // Should have a good mix of character and subword tokens
    expect(analysis.characterTokens).toBeGreaterThan(0);
    expect(analysis.subwordTokens).toBeGreaterThan(0);
    expect(analysis.averageTokenLength).toBeGreaterThan(1);
    expect(analysis.averageTokenLength).toBeLessThan(10);
  });

  test('should handle edge cases gracefully', () => {
    const tokenizer = new BPETokenizer();
    
    // Empty string
    expect(tokenizer.tokenize('')).toEqual([]);
    expect(tokenizer.detokenize([])).toBe('');
    
    // Single character
    tokenizer.train('a');
    const singleCharTokens = tokenizer.tokenize('a');
    expect(singleCharTokens.length).toBeGreaterThan(0);
    
    // Repeated characters
    tokenizer.train('aaaa bbbb cccc');
    const validation = tokenizer.validateRoundTrip('aaaa bbbb cccc');
    expect(validation.isValid).toBe(true);
  });
});