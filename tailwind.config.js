/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
   
  ],
  theme: {
    extend: {
      // Clases personalizadas
      table: {
        basic: "w-full bg-white rounded-sm shadow-md",
      },
      "table.basic": {
        "& thead tr td": "text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2",
        "& thead tr th": "text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2",
        "& tr td": "px-4 py-1",
        "& a": "px-4 rounded-sm inline-flex mx-1 items-center gap-1 text-sm py-1",
      },
      
      colors: {
        primary: '#5542F6',
        highlight: '#eae8fb',
        bgGray: '#fbfafd',
      },
    },
  },
  plugins: [],
}