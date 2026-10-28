/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        "surface-container-lowest": "#080e1e",
        "tertiary": "#a9deff",
        "outline-variant": "#4f4635",
        "secondary": "#b7c6eb",
        "surface": "#0d1323",
        "primary-container": "#e8b33a",
        "on-error-container": "#ffdad6",
        "surface-variant": "#2f3446",
        "surface-bright": "#33394b",
        "surface-container-low": "#151b2c",
        "on-primary": "#402d00",
        "on-background": "#dde2f9",
        "surface-tint": "#f5be45",
        "outline": "#9b8f7b",
        "primary-fixed": "#ffdea1",
        "surface-container-highest": "#2f3446",
        "error-container": "#93000a",
        "error": "#ffb4ab",
        "primary-fixed-dim": "#f5be45",
        "secondary-container": "#3a4967",
        "surface-container-high": "#24293b",
        "tertiary-fixed": "#c4e7ff",
        "on-secondary-container": "#a9b8dc",
        "on-secondary": "#21304d",
        "primary": "#ffd071",
        "tertiary-container": "#54c7ff",
        "on-tertiary": "#00354a",
        "on-surface-variant": "#d3c5af",
        "secondary-fixed": "#d8e2ff",
        "on-surface": "#dde2f9",
        "surface-container": "#191f30",
        "background": "#0d1323",
        "inverse-primary": "#7a5900",
        "on-primary-container": "#614600"
},
      borderRadius: { DEFAULT: '0.25rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
      spacing: {
        "space-sm": "0.5rem",
        "space-xs": "0.25rem",
        "margin-mobile": "1.25rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "gutter": "1.5rem",
        "gutter-mobile": "1rem",
        "margin": "3rem",
        "space-xl": "2.5rem"
},
      fontFamily: {
        "headline-lg": [
                "Playfair Display",
                "serif"
        ],
        "metric-lg": [
                "Inter",
                "sans-serif"
        ],
        "headline-xl": [
                "Playfair Display",
                "serif"
        ],
        "headline-lg-mobile": [
                "Playfair Display",
                "serif"
        ],
        "body-sm": [
                "Inter",
                "sans-serif"
        ],
        "headline-xl-mobile": [
                "Playfair Display",
                "serif"
        ],
        "label-md": [
                "Inter",
                "sans-serif"
        ],
        "body-md": [
                "Inter",
                "sans-serif"
        ],
        "label-caps": [
                "Inter",
                "sans-serif"
        ],
        "label-sm": [
                "Inter",
                "sans-serif"
        ],
        "headline-sm": [
                "Playfair Display",
                "serif"
        ],
        "body-lg": [
                "Inter",
                "sans-serif"
        ],
        "headline-md": [
                "Playfair Display",
                "serif"
        ]
},
      fontSize: {
        "headline-lg": [
                "36px",
                {
                        "lineHeight": "44px",
                        "fontWeight": "600",
                        "letterSpacing": "-0.01em"
                }
        ],
        "metric-lg": [
                "32px",
                {
                        "lineHeight": "40px",
                        "fontWeight": "600",
                        "letterSpacing": "-0.02em"
                }
        ],
        "headline-xl": [
                "48px",
                {
                        "lineHeight": "56px",
                        "fontWeight": "600",
                        "letterSpacing": "-0.02em"
                }
        ],
        "headline-lg-mobile": [
                "26px",
                {
                        "lineHeight": "34px",
                        "fontWeight": "600"
                }
        ],
        "body-sm": [
                "13px",
                {
                        "lineHeight": "20px",
                        "fontWeight": "400"
                }
        ],
        "headline-xl-mobile": [
                "32px",
                {
                        "lineHeight": "40px",
                        "fontWeight": "600",
                        "letterSpacing": "-0.01em"
                }
        ],
        "label-md": [
                "14px",
                {
                        "lineHeight": "20px",
                        "fontWeight": "500"
                }
        ],
        "body-md": [
                "15px",
                {
                        "lineHeight": "24px",
                        "fontWeight": "400"
                }
        ],
        "label-caps": [
                "11px",
                {
                        "lineHeight": "16px",
                        "fontWeight": "700",
                        "letterSpacing": "0.15em"
                }
        ],
        "label-sm": [
                "12px",
                {
                        "lineHeight": "16px",
                        "fontWeight": "500"
                }
        ],
        "headline-sm": [
                "20px",
                {
                        "lineHeight": "28px",
                        "fontWeight": "500"
                }
        ],
        "body-lg": [
                "18px",
                {
                        "lineHeight": "28px",
                        "fontWeight": "400"
                }
        ],
        "headline-md": [
                "24px",
                {
                        "lineHeight": "32px",
                        "fontWeight": "500"
                }
        ]
},
    },
  },
  plugins: [],
}
