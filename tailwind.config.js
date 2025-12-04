/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    './src/**/*.{js,jsx,ts,tsx}', // The path to your React components/files
],
theme: {
    extend: {
        spacing: {
            header: '64px',
            content: 'calc(100vh - 64px)'
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 }
            }
        },
        animation: {
            fadeIn: 'fadeIn 0.3s linear'
        }
    },
},
plugins: [],
};