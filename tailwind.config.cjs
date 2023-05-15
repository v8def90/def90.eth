/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {},
          dark: {
            css: {
              color: theme('colors.gray.200'),
              a: {
                color: theme('colors.gray.200'),
                  '&:hover': {
                     color: theme('colors.gray.200'),
                   },
              },
			'h2 a': {
				color: theme('colors.gray.200'),
					},
              h1: {
				color: theme('colors.gray.200'),
              },
              h2: {
				color: theme('colors.gray.200'),
              },
              h3: {
				color: theme('colors.gray.200'),
              },
              h4: {
                color: theme('colors.gray.200'),
              },
              h5: {
                color: theme('colors.gray.200'),
              },
              h6: {
                color: theme('colors.gray.200'),
              },
              th: {
                color: theme('colors.gray.200'),
              },
              strong: {
				color: theme('colors.gray.200'),
              },
              code: {
				color: theme('colors.gray.200'),
              },
              figcaption: {
                color: theme('colors.gray.200'),
              },
              blockquote: {
				color: theme('colors.gray.200'),
              },
			},
          },
		}),
      },
	},
	variants: {
       typography: ['dark'],
	},
	plugins: [require('@tailwindcss/typography')],
}
