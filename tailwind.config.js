/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surreal: {
          bg: '#030305', // Preto absoluto com um micro-toque de azul
          surface: 'rgba(255, 255, 255, 0.02)',
          border: 'rgba(255, 255, 255, 0.05)',
          cyan: '#00F0FF',
          magenta: '#FF003C',
          purple: '#8A2BE2',
          neon: '#E0FF00',
        }
      },
      backgroundImage: {
        'surreal-gradient': 'linear-gradient(135deg, #FF003C 0%, #8A2BE2 50%, #00F0FF 100%)',
        // Mesh pattern para um fundo complexo e imersivo
        'mesh-pattern': 'radial-gradient(at 27% 37%, hsla(280, 100%, 74%, 0.15) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(189, 100%, 56%, 0.15) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(340, 100%, 76%, 0.15) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(64, 100%, 50%, 0.1) 0px, transparent 50%)',
      },
      animation: {
        'blob': 'blob 15s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(50px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-40px, 40px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}