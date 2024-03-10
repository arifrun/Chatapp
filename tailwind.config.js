/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors:{ 
        primary:"#11175D", 
        secondary:"#7A7A7A", 
        brand:"#32375C",
      }
    },  
    fontFamily: {
      primary: ["Nunito", "sans-serif"],
     
    },
    container:{ 
      center:true,
    }
  },
  plugins: [],
}

