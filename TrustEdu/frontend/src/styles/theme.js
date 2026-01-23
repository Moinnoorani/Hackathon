// Bitcoin DeFi Design System Theme
// True Void aesthetic with Bitcoin Orange energy

export const theme = {
  colors: {
    // Backgrounds
    background: '#030304', // True Void
    surface: '#0F1115', // Dark Matter
    
    // Text
    foreground: '#FFFFFF', // Pure Light
    muted: '#94A3B8', // Stardust
    
    // Borders
    border: '#1E293B', // Dim Boundary
    
    // Bitcoin Orange Palette
    primary: '#F7931A', // Bitcoin Orange
    'primary-dark': '#EA580C', // Burnt Orange
    'primary-light': '#FFD600', // Digital Gold
    
    // Semantic
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    
    // Functional
    blockchain: '#3b82f6',
    ai: '#8b5cf6',
  },
  
  gradients: {
    primary: 'linear-gradient(to right, #EA580C, #F7931A)',
    gold: 'linear-gradient(to right, #F7931A, #FFD600)',
    text: 'linear-gradient(to right, #F7931A, #FFD600)',
  },
  
  shadows: {
    'orange-glow': '0 0 20px -5px rgba(234, 88, 12, 0.5)',
    'orange-glow-lg': '0 0 30px -5px rgba(247, 147, 26, 0.6)',
    'gold-glow': '0 0 20px rgba(255, 214, 0, 0.3)',
    'card-elevation': '0 0 50px -10px rgba(247, 147, 26, 0.1)',
    'card-hover': '0 0 30px -10px rgba(247, 147, 26, 0.2)',
    'input-focus': '0 10px 20px -10px rgba(247, 147, 26, 0.3)',
  },
  
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  
  radius: {
    card: '1rem', // 16px
    button: '9999px', // pill shape
    input: '0.5rem', // 8px
  },
  
  spacing: {
    section: '6rem', // 96px
    container: '1280px',
  },
};

export default theme;
