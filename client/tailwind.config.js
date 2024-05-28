/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'smallPhone': '320px',
        'normalPhone': '375px',
        "plusNormalPhone": "400",
        'bigPhone': '440px', 
        'tablet': '768px',
        'tabletGrande': '800px',
        'tabletMaxi': '860px',
        'laptop': '1024px',
      },
      colors: {
        primary: '#1D4ED8', 
        secondary: '#9333EA',
        accent: '#F59E0B',
        muted: '#6B7280',
      },
      fontSize: {
        'tiny': '1.1rem',
        "large": "1.4rem",
        "mainText": "2rem",
        'xxl': '2.6rem',
        "forIcon": "4rem",
      },
      width: {
        miniIconW: "18rem",
        normalW: "21rem",
        iconW: "22rem",
        forImg: "20rem",
        threeImg: "44rem",
      },
      height: {
        iconH: "30rem",
      },
      spacing: {
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
      },
      borderRadius: {
        'xl': '1rem',  // 16px
        '2xl': '1.5rem',  // 24px
      },
      fontFamily: {
        elegant: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}