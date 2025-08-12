# Custom Tokenizer & Detokenizer Tool

A comprehensive React-based tokenization tool that implements multiple tokenization algorithms including Byte Pair Encoding (BPE), Word-based, and Character-level tokenization. Built with TypeScript and modern web technologies.

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

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd tokenizer-detokenizer-in-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Usage

### Basic Tokenization
1. Enter your text in the input area
2. Select a tokenization algorithm (BPE, Word, or Character)
3. Click "Tokenize" to see the results
4. View colored tokens and raw token IDs

### Detokenization
1. Copy token IDs from the output
2. Paste them in the "Token IDs" input
3. Click "Detokenize" to convert back to text

### Algorithm Comparison
- Switch between different algorithms to see how they handle the same text
- Compare vocabulary sizes and token counts
- Analyze merge operations in BPE mode

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

- **Fast Training**: Efficient algorithm implementations
- **Real-time Updates**: Instant tokenization feedback
- **Memory Efficient**: Optimized data structures
- **Responsive UI**: Smooth interactions and animations

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

## 📈 Future Enhancements

- [ ] SentencePiece tokenizer implementation
- [ ] WordPiece tokenizer support
- [ ] Custom vocabulary import/export
- [ ] Batch processing capabilities
- [ ] Performance benchmarking tools
- [ ] Multi-language support
- [ ] Token frequency analysis
- [ ] Visualization improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by modern tokenization tools like tiktoken
- Built with modern React and TypeScript best practices
- Uses efficient algorithms from NLP research
- Designed for both educational and practical use

---

**Built with ❤️ for the NLP and ML community**