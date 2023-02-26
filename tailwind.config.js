const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    colors: {
      'neo-blue': '#5465ff',
      'cornflower-blue': '#788bff',
      'blue-purple': '#788bff',
      'periwinkle-blue': '#bfd7ff',
      'light-cyan': '#e2fdff',
      white: '#ffffff',
      black: '#000000',
      gray: colors.gray,
      orange: colors.orange,
      red: colors.red,
      blue: colors.blue,
      purple: colors.purple,
      stone: colors.stone,
      slate: colors.slate,
      neutral: colors.neutral,
      'dark-mode': '#101010',
      box: '#202020',
      'gray-cod': '#0f0f0f',
      'mine-shaft': '#1f1f1f'
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
    extend: {
      height: {
        full: '100%',
        main: '100%'
      },
      minHeight: {
        104: '26rem'
      },
      maxWidth: {
        90: '90%'
      },
      minWidth: {
        150: '150px',
        24: '6rem'
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        checked: {
          '0%': { transform: 'scale(0.5)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        unchecked: {
          '0%': { transform: 'scale(1)' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(0.5)' }
        },
        fadeOutItem: {
          '0%': { transform: 'translateY(50%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        click: {
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        'fade-out': 'fadeOut 300ms linear forwards',
        checked: 'checked 500ms linear forwards',
        unchecked: 'unchecked 500ms linear forwards',
        'show-item': 'fadeOutItem 300ms ease forwards',
        click: 'click 300ms linear forwards'
      },
      translate: {
        '-1/2': '-50%'
      },
      gridTemplateColumns: {
        buttons: 'repeat(auto-fit, minmax(150px, 1fr))'
      }
    }
  },
  plugins: []
};
