module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        height: {
          'screen-dynamic': ['100vh', '100dvh'],
        }
      },
    },
    plugins: [],
  };
  