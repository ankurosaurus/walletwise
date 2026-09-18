/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0B2F25',
          800: '#0E3B2E',
          700: '#12463A',
          600: '#155A44',
          500: '#1E7259',
          100: '#E4F2EC',
          50: '#F0F8F4',
        },
        brand: {
          green: '#0E3B2E',
          accent: '#1E9E6C',
          lightGreen: '#E6F6F0',
        },
        success: {
          DEFAULT: '#1E9E6C',
          light: '#E6F7F0',
          dark: '#167B54',
        },
        danger: {
          DEFAULT: '#D64545',
          light: '#FDEEEE',
          dark: '#B03333',
        },
        warning: {
          DEFAULT: '#E0A63C',
          light: '#FDF6E9',
        },
        surface: {
          bg: '#F5F7F8',
          card: '#FFFFFF',
          field: '#E9EEF7',
        },
        text: {
          primary: '#1A2B27',
          secondary: '#7A8A85',
          muted: '#A0ADA8',
        }
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(14, 59, 46, 0.08)',
        'float': '0 10px 30px -5px rgba(14, 59, 46, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
