module.exports = {
  content: [
    './**/*.html',
    './**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        muddywaters: {
          50: "#fcfaf8", 
          100: "#f9f5f0", 
          200: "#f1e6db", 
          300: "#e8d7c5", 
          400: "#d7ba99", 
          500: "#C69C6D", 
          600: "#b28c62", 
          700: "#957552", 
          800: "#775e41", 
          900: "#614c35"
        },
        darkgold:"#b18d65"
      },
      animation: {
        'fade': 'fadeIn 2s ease-in forwards'
       },
      
      keyframes: theme => ({
       fadeIn: {
        '0%': { opacity: 0 },
        '50%': { opacity: 0.6 },
        '100%': { opacity: 1 },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
