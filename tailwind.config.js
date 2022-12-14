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
          500: "#C1976D", 
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
       keyframes: {
        fadeRight: {
          '0%': { opacity: 0, transform: 'translateX(-50%)' },
          '10%': { opacity: 0.1, transform: 'translateX(-45%)' },
          '20%': { opacity: 0.2, transform: 'translateX(-40%)' },
          '30%': { opacity: 0.3, transform: 'translateX(-35%)' },
          '40%': { opacity: 0.4, transform: 'translateX(-30%)' },
          '50%': { opacity: 0.5, transform: 'translateX(-25%)' },
          '60%': { opacity: 0.6, transform: 'translateX(-20%)' },
          '70%': { opacity: 0.7, transform: 'translateX(-15%)' },
          '80%': { opacity: 0.8, transform: 'translateX(-10%)' },
          '90%': { opacity: 0.9, transform: 'translateX(-5%)' },
          '100%': { opacity: 1, 	transform: 'translateX(0)' },
        },
        fadeLeft: {
          '0%': { opacity: 0, transform: 'translateX(50%)' },
          '10%': { opacity: 0.1, transform: 'translateX(45%)' },
          '20%': { opacity: 0.2, transform: 'translateX(40%)' },
          '30%': { opacity: 0.3, transform: 'translateX(35%)' },
          '40%': { opacity: 0.4, transform: 'translateX(30%)' },
          '50%': { opacity: 0.5, transform: 'translateX(25%)' },
          '60%': { opacity: 0.6, transform: 'translateX(20%)' },
          '70%': { opacity: 0.7, transform: 'translateX(15%)' },
          '80%': { opacity: 0.8, transform: 'translateX(10%)' },
          '90%': { opacity: 0.9, transform: 'translateX(5%)' },
          '100%': { opacity: 1, 	transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0},
          '10%': { opacity: 0.1 },
          '20%': { opacity: 0.2 },
          '30%': { opacity: 0.3 },
          '40%': { opacity: 0.4},
          '50%': { opacity: 0.5 },
          '60%': { opacity: 0.6 },
          '70%': { opacity: 0.7 },
          '80%': { opacity: 0.8 },
          '90%': { opacity: 0.9 },
          '100%': { opacity: 1 },
        },
        zoomIn: {
          '0%': {transform: 'scale(1)'},
          '50%': {transform: 'scale(1.1)'},
          '100%': {transform: 'scale(1)'},
        },
        showOn: {
          '0%': { opacity: 0,  transform: 'scale(0.9)' },
          '100%': { opacity: 1,   transform: 'scale(1)' }
          }

      }, 
      animation: {
        'fade-right': 'fadeRight 1.5s ease-in forwards',
        'fade-left': 'fadeLeft 1.5s ease-in forwards',
        'fade': 'fadeIn 1.5s ease-in forwards',
        'zoom-in': 'zoomIn 2s ease-in forwards',
        'show-on': 'showOn 2s ease-in forwards'
       },
      linearBorderGradients: {
        directions: { // defaults to these values
          't': 'to top',
          'tr': 'to top right',
          'r': 'to right',
          'br': 'to bottom right',
          'b': 'to bottom',
          'bl': 'to bottom left',
          'l': 'to left',
          'tl': 'to top left',
        },
        colors: { // defaults to {} 
          'yellow-orange': ['#f6a733', '#e7261f'],
        },
        borders: { // defaults to these values (optional)
          '1': '1px',
          '2': '2px',
          '4': '4px',
        },
        background: {
          'cgray-500': "#F0F0F0",
        }
      },
      backgroundImage: theme => ({
        'hermes-gradient': "linear-gradient(90deg, #FFE490, #C1976D)",
        'hermes-hgradient': "linear-gradient(135deg,  #FFE490, #C1976D)",
        'light-image': "url('/assets/images/BG.jpg')",
        'dark-image': "url('/assets/images/BG_DARK.jpg')",
        'light-image-del': "url('/assets/images/delegation/main_hero.png')",
        'dark-image-del': "url('/assets/images/delegation/main_hero_dark.jpg')",
        'light-image-fdel': "url('/assets/images/delegation/footer_hero.png')",
        'dark-image-fdel': "url('/assets/images/delegation/footer_hero_dark.jpg')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
