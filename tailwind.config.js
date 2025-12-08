/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    './src/**/*.{js,jsx,ts,tsx}', // The path to your React components/files
],
theme: {
    extend: {
        colors: {
            'pokeball-red': '#ff0202',
            'pokeball-white': '#ffffff',
            'pokeball-black': '#050505',
            'masterball-purple': '#423392',
            'masterball-pink': '#ffa8cc',
            'button-disabled': '#E2E0E0',
            'button-normal': '#FFFFFF',
            'button-hover': '#4FD9FF',
            'button-active': '#2CA6FF',
        },
        spacing: {
            half: '50%',
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