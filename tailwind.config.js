// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Heebo', 'sans-serif'],
//       },
//       animation: {
//         'bounce-slow': 'bounce 3s infinite',
//       },
//       // colors: {
//       //   ai: {
//       //     dark: '#1e1e2f', // צבע רקע כהה
//       //     accent: '#00d4ff', // צבע עיקרי
//       //     secondary: '#ff00d4', // צבע משני
//       //   },
//       // },
//       colors: {
//         blue: {
//           600: 'oklch(71.2% 0.194 13.428)', // צבע חדש במקום הצבע הקיים
//         },
//       },
//     },
//   },
//   plugins: [],
// };

// // module.exports = {
// //   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
// //   theme: {
// //     extend: {
// //       colors: {
// //         ai: {
// //           dark: '#1e1e2f',
// //           accent: '#00d4ff',
// //           secondary: '#ff00d4',
// //         },
// //       },
// //     },
// //   },
// //   darkMode: 'class', // מאפשר מצב כהה
// // };

// // module.exports = {
// //   content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
// //   theme: {
// //     extend: {
// //       colors: {
// //         'ai-dark': '#1a202c', // Ensure 'bg-ai-dark' is defined
// //       },
// //     },
// //   },
// //   plugins: [],
// // };

// // module.exports = {
// //   plugins: {
// //     tailwindcss: {},
// //     autoprefixer: {},
// //   },
// // };

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // מאפשר מצב כהה
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      colors: {
        ai: {
          dark: '#1e1e2f', // צבע רקע כהה
          accent: '#00d4ff', // צבע עיקרי
          secondary: '#ff00d4', // צבע משני
        },
        blue: {
          600: 'oklch(71.2% 0.194 13.428)', // צבע חדש במקום הצבע הקיים
        },
      },
    },
  },
  plugins: [],
};