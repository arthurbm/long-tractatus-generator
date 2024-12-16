# Long Tractatus Generator

Transform your long-form content into structured philosophical treatises, inspired by Wittgenstein's Tractatus Logico-Philosophicus. This AI-powered tool excels at processing extensive content like entire books or long articles, organizing them into logical hierarchies.

## Features

- **Long Content Processing**: Handles extensive texts beyond typical AI token limits through smart sectioning
- **Hierarchical Structure**: Organizes content into numbered propositions and sub-propositions
- **Logical Coherence**: Maintains relationships between ideas across all generated sections
- **Modern UI**: Built with Next.js and Tailwind CSS for a beautiful, responsive experience

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (v9.11.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/long-tractatus-generator.git
cd long-tractatus-generator
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```env
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. Navigate to the generator page
2. Enter or paste your long-form content into the text area
3. Click "Generate Tractatus"
4. Wait for the AI to process and structure your content
5. Copy or use the generated tractatus as needed

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:write` - Format code with Prettier

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://openai.com/)
- [Radix UI](https://www.radix-ui.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Ludwig Wittgenstein's Tractatus Logico-Philosophicus
- Built with modern web technologies and AI capabilities
