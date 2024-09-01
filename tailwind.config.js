/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-gradient': 'linear-gradient(to right, #1D4350, #A43931)',
      },
      boxShadow: {
        '3xl': "20px 20px 20px rgba(0, 0, 0, 0.1), -20px -20px 20px rgba(0, 0, 0, 0.1), 20px -20px 20px rgba(0, 0, 0, 0.1), -20px 20px 20px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        'main' : '#0C1844'
        
      },
    }, 
  },
  plugins: [],
}

