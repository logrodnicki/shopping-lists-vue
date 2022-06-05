const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}"
  ],
  theme: {
    colors: {
      'neo-blue': '#5465ff',
      'cornflower-blue': '#788bff',
      'blue-purple': '#788bff',
      'periwinkle-blue': '#bfd7ff',
      'light-cyan': '#e2fdff',
      'white': '#ffffff',
      'gray': colors.gray,
      'orange': colors.orange,
      'red': colors.red,
      'blue': colors.blue,
      'purple': colors.purple
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
    extend: {
      maxWidth: {
        90: '90%'
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        'fade-out': 'fadeOut 300ms linear forwards'
      }
    },
  },
  plugins: [],
};
