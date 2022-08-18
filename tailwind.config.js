module.exports = {
  content: [
    './**/*.html',
    './_pages/**/*.{html,js,jsx,ts,tsx,vue}',
    './_includes/blocks/**/*.{html,js,jsx,ts,tsx,vue}',
    './**/*.{js,jsx,ts,tsx,vue}',
    './assets/js/*.{js,jsx,ts,tsx,vue}'
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
        gray: {
          medium: "#030229b3",
          dark: "#030229",
          lightmedium: "#A6A2A2",
          light40: "#03022966",
          light50: "#03022980",
          extralight10: "#FAFAFB",
          extralight15: "#f7f7f7",
          extralight20: "#f3f3f3",
          extralight50: "#E5E5E5",
          extralight60: "#dddddd",
          extralight80: "#cdc9c9",
          extralight90: "#9A9AA9"
        },
        darkgold:"#b18d65",
        red: {
          dark: "#FF5762",
          light: "#3C2B2D"
        }
      },
      animation: {
        'fade': 'fadeIn 2s ease-in forwards',
        'show-on': 'showOn 2s ease-in forwards'
       },
      
      keyframes: theme => ({
       fadeIn: {
        '0%': { opacity: 0 },
        '50%': { opacity: 0.6 },
        '100%': { opacity: 1 }
        },
        showOn: {
          '0%': { opacity: 0,  transform: 'scale(0.9)' },
          '100%': { opacity: 1,   transform: 'scale(1)' }
          },
      }),
      backgroundImage: theme => ({
        'light-image': "url('/assets/images/BG.jpg')",
        'dark-image': "url('/assets/images/BG_DARK.jpg')",
      }),
    
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
