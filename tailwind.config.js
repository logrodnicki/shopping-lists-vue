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
      'black': '#000000',
      'gray': colors.gray,
      'orange': colors.orange,
      'red': colors.red,
      'blue': colors.blue,
      'purple': colors.purple,
      'stone': colors.stone,
      'slate': colors.slate,
      'neutral': colors.neutral,
      'dark-mode': '#1a1a1a'
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
        },
        scale: {
          '0%': { transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        'fade-out': 'fadeOut 300ms linear forwards',
        'scale': 'scale 500ms linear forwards'
      },
      translate: {
        '-1/2': '-50%'
      },
    },
  },
  plugins: [],
};
