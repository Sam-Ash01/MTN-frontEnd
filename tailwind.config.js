// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primaryHover: 'var(--color-primary-hover)',
        secondary: 'var(--color-secondary)',
        secondaryHover: 'var(--color-secondary-hover)',
        danger: 'var(--color-danger)',

        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',

        textMain: 'var(--color-text-main)',
        textMuted: 'var(--color-text-muted)',
        textAccent: 'var(--color-text-accent)',

        border: 'var(--color-border)',
      },
    },
  },
  darkMode: false, // لأنك تعتمد على JS لتطبيق المتحولات
};
