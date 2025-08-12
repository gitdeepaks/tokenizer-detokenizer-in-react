# Custom Tokenizer & Detokenizer Tool

A comprehensive React-based tokenization tool that implements multiple tokenization algorithms including Byte Pair Encoding (BPE), Word-based, and Character-level tokenization. Built with TypeScript and modern web technologies.

## 🎬 Live Demo

**🌐 Try it live:** [Please check it out](https://texttokenizer.netlify.app)

## 📸 Project Screenshots & Demo

### Main Interface Overview
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🚀 Custom Tokenizer                                    [BPE Tokenizer ▼] │
│  Advanced tokenization with multiple algorithms                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  INPUT PANEL                           │  OUTPUT PANEL                      │
│  ┌─────────────────────────────────┐   │  ┌─────────────────────────────────┐ │
│  │ [System ▼] Training text...     │   │  │ Token Statistics                │ │
│  │ ┌─────────────────────────────┐ │   │  │ 42 tokens                      │ │
│  │ │ Hello world! This is a      │ │   │  │ Characters: 156                 │ │
│  │ │ sample text for our custom  │ │   │  │ Vocabulary: 89                  │ │
│  │ │ tokenizer...                │ │   │  │ Merges: 15                      │ │
│  │ └─────────────────────────────┘ │   │  └─────────────────────────────────┘ │
│  │ [Reset] [Copy]      [Tokenize] │   │                                     │ │
│  └─────────────────────────────────┘   │  ┌─────────────────────────────────┐ │
│                                        │  │ Tokenized Visualization         │ │
│  ┌─────────────────────────────────┐   │  │ [He][llo][ ][wo][rld][!]...     │ │
│  │ Token IDs                       │   │  │ (Color-coded tokens)            │ │
│  │ 200264, 17360, 200266, 3575...  │   │  └─────────────────────────────────┘ │
│  │ [Detokenize]                    │   │                                     │ │
│  └─────────────────────────────────┘   │  ┌─────────────────────────────────┐ │
│                                        │  │ Raw Token IDs                   │ │
│                                        │  │ 200264, 17360, 200266, 3575,    │ │
│                                        │  │ 553, 261, 10297, 29186...       │ │
│                                        │  └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Algorithm Comparison Demo

**Input Text:** `"Hello world! How are you?"`

#### BPE Tokenizer Results:
```
Tokens: ["He", "llo", " ", "wo", "rld", "!", " ", "How", " ", "are", " ", "you", "?"]
Token IDs: [45, 123, 2, 89, 156, 8, 2, 234, 2, 67, 2, 145, 9]
Vocabulary Size: 89 tokens
Merges: 15 operations
```

#### Word-based Tokenizer Results:
```
Tokens: ["hello", "world", "!", "how", "are", "you", "?"]
Token IDs: [1, 2, 3, 4, 5, 6, 7]
Vocabulary Size: 7 tokens
```

#### Character-level Tokenizer Results:
```
Tokens: ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!", ...]
Token IDs: [72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33, ...]
Vocabulary Size: 15 unique characters
```

### Visual Token Display
```
Color-coded tokens with hover tooltips:
┌────┐ ┌─────┐ ┌─┐ ┌────┐ ┌─────┐ ┌─┐
│ He │ │ llo │ │ │ │ wo │ │ rld │ │!│
└────┘ └─────┘ └─┘ └────┘ └─────┘ └─┘
 Red   Blue   Gray Green  Purple Pink

Hover shows: "Token: 'He' | ID: 45"
```

### Whitespace Visualization
```
Normal view:    [Hello][ ][world][!]
Whitespace on:  [Hello][␣][world][!]
                       ↑
                 Space character
```

## 🚀 Features

### Multiple Tokenization Algorithms
- **Byte Pair Encoding (BPE)** - Advanced subword tokenization with merge operations
- **Word-based Tokenizer** - Traditional word-level tokenization with punctuation handling
- **Character-level Tokenizer** - Character-by-character tokenization for maximum coverage

### Interactive UI
- **Real-time Tokenization** - See tokens update as you type
- **Bidirectional Conversion** - Convert text to token IDs and back
- **Visual Token Display** - Color-coded tokens with hover tooltips
- **Whitespace Visualization** - Toggle to show hidden characters
- **Copy Functionality** - Easy copying of tokens and IDs

### Advanced Features
- **Custom Training** - Each tokenizer trains on your input text
- **Vocabulary Management** - View complete token vocabularies
- **Merge Tracking** - See BPE merge operations in real-time
- **Token Statistics** - Detailed metrics and analysis
- **Model Selection** - Choose from different tokenizer configurations

## 🛠️ Technology Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager
- Modern web browser

### Quick Start
```bash
# Clone the repository
git clone https://github.com/your-username/custom-tokenizer.git
cd tokenizer-detokenizer-in-react

# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:5173 in your browser

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Setup
```bash
# Install dependencies with exact versions
npm ci

# Run in development mode with hot reload
npm run dev

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🎯 Usage

### Quick Start Guide

1. **Open the Application**
   - Navigate to the live demo or run locally
   - You'll see a clean interface with input and output panels

2. **Choose Your Algorithm**
   - Select from the dropdown: BPE, Word, or Character tokenizer
   - Each has different strengths for different use cases

3. **Enter Your Text**
   - Type or paste text in the left input panel
   - The tokenizer trains automatically on your input

4. **View Results**
   - Click "Tokenize" to see colored token visualization
   - View token statistics and raw token IDs
   - Copy results for use in other applications

### Basic Tokenization
```
Step 1: Input Text
┌─────────────────────────────────┐
│ "Hello world! 🚀"               │
└─────────────────────────────────┘

Step 2: Select Algorithm
┌─────────────────────────────────┐
│ [BPE Tokenizer        ▼]        │
└─────────────────────────────────┘

Step 3: Click Tokenize
┌─────────────────────────────────┐
│ [        Tokenize        ]      │
└─────────────────────────────────┘

Step 4: View Results
┌─────────────────────────────────┐
│ Tokens: 8                       │
│ [He][llo][ ][wo][rld][!][ ][🚀] │
│ IDs: 45,123,2,89,156,8,2,234     │
└─────────────────────────────────┘
```

### Detokenization
```
Step 1: Copy Token IDs
┌─────────────────────────────────┐
│ 45, 123, 2, 89, 156, 8, 2, 234  │
│ [Copy]                          │
└─────────────────────────────────┘

Step 2: Paste in Token IDs Input
┌─────────────────────────────────┐
│ Token IDs                       │
│ 45, 123, 2, 89, 156, 8, 2, 234  │
│ [      Detokenize      ]        │
└─────────────────────────────────┘

Step 3: Result
┌─────────────────────────────────┐
│ "Hello world! 🚀"               │
└─────────────────────────────────┘
```

### Algorithm Comparison
```
Input: "artificial intelligence"

BPE Result:
├─ Tokens: ["art", "ificial", " ", "int", "elligence"]
├─ Count: 5 tokens
├─ Vocab: 234 entries
└─ Merges: 45 operations

Word Result:
├─ Tokens: ["artificial", "intelligence"]  
├─ Count: 2 tokens
├─ Vocab: 2 entries
└─ Merges: 0 operations

Character Result:
├─ Tokens: ["a","r","t","i","f","i","c","i","a","l"," ","i","n","t","e","l","l","i","g","e","n","c","e"]
├─ Count: 23 tokens
├─ Vocab: 12 unique chars
└─ Merges: 0 operations
```

### Advanced Features Demo

#### Special Characters & Unicode
```
Input: "Hello 世界! @#$%^&*()"

BPE handles:
├─ ASCII: Standard merging
├─ Unicode: Character-level fallback  
├─ Symbols: Individual tokens
└─ Mixed: Seamless processing
```

#### Whitespace Visualization
```
Normal:     [Hello][ ][world][\n][next][ ][line]
Whitespace: [Hello][␣][world][↵][next][␣][line]
            
Legend:
␣ = Space    ↵ = Newline    ⇥ = Tab
```

#### Copy & Export Features
```
Export Options:
├─ Raw text          → "Hello world!"
├─ Token IDs         → "45, 123, 2, 89, 156"
├─ Token strings     → "['He', 'llo', ' ', 'wo', 'rld']"
└─ Vocabulary JSON   → {"He": 45, "llo": 123, ...}
```

## 🧠 Tokenization Algorithms

### Byte Pair Encoding (BPE)
```typescript
// Example: "hello world" might tokenize to:
// ["he", "llo", " ", "wo", "rld"]
// Token IDs: [45, 123, 2, 89, 156]
```

**Advantages:**
- Handles unknown words effectively
- Efficient subword representation
- Good compression ratio
- Language-agnostic

**Demo Example:**
```
Training Text: "hello hello world world wonderful"

Initial: ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', 'n', 'f', 'u']

Merge 1: 'l' + 'l' → 'll' (most frequent pair)
Result: ['h', 'e', 'll', 'o', ' ', 'w', 'o', 'r', 'll', 'd', 'n', 'f', 'u']

Merge 2: 'h' + 'e' → 'he'
Result: ['he', 'll', 'o', ' ', 'w', 'o', 'r', 'll', 'd', 'n', 'f', 'u']

Final tokens: ["he", "ll", "o", " ", "w", "o", "r", "d", "n", "f", "u"]
```

### Word-based Tokenization
```typescript
// Example: "hello world!" tokenizes to:
// ["hello", "world", "!"]
// Token IDs: [1, 2, 3]
```

**Advantages:**
- Intuitive and interpretable
- Preserves word boundaries
- Fast processing
- Simple implementation

### Character-level Tokenization
```typescript
// Example: "hi" tokenizes to:
// ["h", "i"]
// Token IDs: [104, 105]
```

**Advantages:**
- No unknown tokens
- Works with any language
- Handles rare characters
- Minimal vocabulary

## 🎮 Interactive Demo Scenarios

### Scenario 1: Multilingual Text
```
Input: "Hello 世界 Bonjour мир"

Try different algorithms:
├─ BPE: Handles mixed scripts gracefully
├─ Word: Treats each word as separate token
└─ Char: Works with all Unicode characters
```

### Scenario 2: Code Tokenization
```
Input: "function hello() { return 'world'; }"

Compare results:
├─ BPE: ["function", " ", "hello", "()", " {", " return", " '", "world", "';", " }"]
├─ Word: ["function", "hello", "(", ")", "{", "return", "'", "world", "'", ";", "}"]
└─ Char: ['f','u','n','c','t','i','o','n',' ','h','e','l','l','o','(',...] 
```

### Scenario 3: Social Media Text
```
Input: "OMG this is sooo cool! 😍 #tokenizer @username"

Observe how each handles:
├─ Repeated letters: "sooo"
├─ Emojis: "😍"
├─ Hashtags: "#tokenizer"
└─ Mentions: "@username"
```

## 🔧 Configuration Examples

### Custom BPE Configuration
```typescript
const customBPE = new BPETokenizer({
  vocabSize: 2000,           // Larger vocabulary
  specialTokens: [           // Custom special tokens
    '<pad>', '<unk>', '<s>', '</s>', 
    '<code>', '</code>', '<math>', '</math>'
  ],
  unknownToken: '<unk>',
  padToken: '<pad>'
});
```

### Training on Custom Data
```typescript
// Train on domain-specific text
const medicalText = "The patient shows symptoms of...";
const codeText = "function tokenize(input) { return... }";
const chatText = "User: Hello! Assistant: How can I help?";

// Each creates different vocabularies optimized for the domain
```

## 📊 Features Breakdown

### Training Phase
- **Vocabulary Building**: Creates token-to-ID mappings
- **Merge Learning**: BPE learns optimal character pair merges
- **Frequency Analysis**: Counts character and word frequencies
- **Special Tokens**: Handles padding, unknown, and control tokens

### Visualization
- **Color Coding**: Each unique token gets a distinct color
- **Hover Tooltips**: Show token text and ID on hover
- **Whitespace Display**: Visualize spaces, tabs, and newlines
- **Token Boundaries**: Clear visual separation of tokens

### Statistics
- **Token Count**: Total number of tokens generated
- **Vocabulary Size**: Number of unique tokens in vocabulary
- **Character Count**: Original text length
- **Compression Ratio**: Efficiency of tokenization

### Real-time Metrics
```
┌─────────────────────────────────┐
│ Token Statistics                │
├─────────────────────────────────┤
│ Tokens: 42                      │
│ Characters: 156                 │
│ Vocabulary: 89                  │
│ Compression: 3.7x               │
│ Algorithm: BPE                  │
│ Merges: 15                      │
└─────────────────────────────────┘
```

## 🔧 Configuration

### BPE Tokenizer Options
```typescript
const config = {
  vocabSize: 1000,        // Maximum vocabulary size
  specialTokens: ['<pad>', '<unk>', '<s>', '</s>'],
  unknownToken: '<unk>',  // Token for unknown characters
  padToken: '<pad>'       // Padding token
};
```

### Customization
- Adjust vocabulary sizes
- Add custom special tokens
- Modify merge criteria
- Configure training parameters

### Environment Variables
```bash
# Optional configuration
VITE_DEFAULT_TOKENIZER=bpe
VITE_DEFAULT_VOCAB_SIZE=1000
VITE_ENABLE_DEBUG=false
```

## 🎨 UI Components

### Input Panel
- **Text Editor**: Multi-line text input with syntax highlighting
- **Model Selector**: Choose tokenization algorithm
- **Action Buttons**: Tokenize, reset, copy functions
- **Role Selector**: System/User/Assistant message types

### Output Panel
- **Token Visualization**: Color-coded token display
- **Statistics Card**: Key metrics and information
- **Raw Token IDs**: Comma-separated token ID list
- **Copy Controls**: Easy copying of results

## 🚀 Performance

### Benchmarks
```
Text Length: 1000 characters

BPE Tokenizer:
├─ Training: ~50ms
├─ Tokenization: ~5ms
├─ Memory: ~2MB
└─ Tokens: ~250

Word Tokenizer:
├─ Training: ~10ms
├─ Tokenization: ~2ms
├─ Memory: ~0.5MB
└─ Tokens: ~180

Character Tokenizer:
├─ Training: ~5ms
├─ Tokenization: ~1ms
├─ Memory: ~0.1MB
└─ Tokens: ~1000
```

- **Fast Training**: Efficient algorithm implementations
- **Real-time Updates**: Instant tokenization feedback
- **Memory Efficient**: Optimized data structures
- **Responsive UI**: Smooth interactions and animations

## 🧪 Testing & Validation

### Test Cases Included
```
✅ Basic ASCII text
✅ Unicode characters (emoji, symbols)
✅ Multilingual text
✅ Code snippets
✅ Special characters
✅ Empty strings
✅ Very long texts
✅ Whitespace handling
```

### Validation Features
```
Round-trip testing: Text → Tokens → Text
├─ Input:  "Hello world!"
├─ Tokens: [45, 123, 2, 89, 156, 8]
└─ Output: "Hello world!" ✅
```

## 🔍 Use Cases

### Educational
- **Learn Tokenization**: Understand how different algorithms work
- **Compare Methods**: See trade-offs between approaches
- **Visualize Process**: Watch tokenization happen step-by-step

### Development
- **Test Tokenizers**: Validate tokenization logic
- **Debug Issues**: Identify tokenization problems
- **Prototype Models**: Experiment with different approaches

### Research
- **Algorithm Analysis**: Compare tokenization strategies
- **Performance Testing**: Measure efficiency metrics
- **Data Preprocessing**: Prepare text for ML models

### Production Applications
- **Text Preprocessing**: Prepare data for ML models
- **API Development**: Build tokenization services
- **Data Analysis**: Analyze text patterns
- **Compression**: Efficient text representation

## 🎯 Getting Started Checklist

- [ ] Clone the repository
- [ ] Install dependencies (`npm install`)
- [ ] Start development server (`npm run dev`)
- [ ] Open browser to `http://localhost:5173`
- [ ] Try different tokenization algorithms
- [ ] Test with your own text samples
- [ ] Explore the visualization features
- [ ] Copy token IDs and test detokenization
- [ ] Compare algorithm performance
- [ ] Read the algorithm documentation

## 🆘 Troubleshooting

### Common Issues

**Issue: Tokenization seems slow**
```
Solution: Large texts (>10k chars) may take time to train BPE
- Try smaller text samples first
- Use Word or Character tokenizer for large texts
- Check browser console for errors
```

**Issue: Detokenization doesn't work**
```
Solution: Ensure token IDs are comma-separated numbers
- Format: "45, 123, 2, 89"
- No extra spaces or characters
- Use same tokenizer that generated the IDs
```

**Issue: Special characters not displaying**
```
Solution: Enable whitespace visualization
- Click the "Show whitespace" toggle
- Check browser font support for Unicode
- Try different text samples
```

### Debug Mode
```typescript
// Enable debug logging in browser console
localStorage.setItem('tokenizer-debug', 'true');

// View detailed tokenization steps
// Check vocabulary mappings
// Monitor performance metrics
```

## 📈 Future Enhancements

- [ ] SentencePiece tokenizer implementation
- [ ] WordPiece tokenizer support
- [ ] Custom vocabulary import/export
- [ ] Batch processing capabilities
- [ ] Performance benchmarking tools
- [ ] Multi-language support
- [ ] Token frequency analysis
- [ ] Visualization improvements
- [ ] API endpoint for tokenization
- [ ] Batch processing interface
- [ ] Export/import vocabulary files
- [ ] Performance profiling tools
- [ ] Mobile-responsive design
- [ ] Dark mode theme
- [ ] Keyboard shortcuts
- [ ] Undo/redo functionality

## 📚 Learning Resources

### Understanding Tokenization
- [Hugging Face Tokenizers Course](https://huggingface.co/course/chapter6/1)
- [BPE Algorithm Explained](https://arxiv.org/abs/1508.07909)
- [Subword Tokenization Guide](https://blog.floydhub.com/tokenization-nlp/)

### Implementation References
- [tiktoken (OpenAI)](https://github.com/openai/tiktoken)
- [SentencePiece (Google)](https://github.com/google/sentencepiece)
- [Tokenizers (Hugging Face)](https://github.com/huggingface/tokenizers)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
```bash
# Code style
npm run lint

# Type checking
npm run type-check

# Run tests
npm run test

# Build verification
npm run build
```