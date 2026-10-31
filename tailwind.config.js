/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Apple System Colors & Materials
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fbfbfd",
        "surface-container": "#f2f2f7",
        "surface-container-high": "#e5e5ea",
        "surface-container-highest": "#d1d1d6",
        "surface-variant": "#f2f2f7",
        "surface": "#ffffff",
        "surface-bright": "#ffffff",
        "surface-dim": "#f5f5f7",
        "surface-tint": "#34c759", // Apple Health Emerald

        background: "#f5f5f7", // Apple system grouped background
        "on-background": "#1d1d1f",
        "on-surface": "#1d1d1f",
        "on-surface-variant": "#6e6e73",

        outline: "#8e8e93",
        "outline-variant": "rgba(0, 0, 0, 0.08)",

        primary: "#1d1d1f", // Apple Deep Ink / Charcoal
        "primary-container": "#0071e3", // Apple Signature System Blue
        "on-primary": "#ffffff",
        "on-primary-container": "#ffffff",
        "primary-fixed": "#ebf5ff",
        "primary-fixed-dim": "#d0e6fc",
        "on-primary-fixed": "#0071e3",
        "on-primary-fixed-variant": "rgba(255, 255, 255, 0.2)",

        secondary: "#0071e3", // Apple Accent Blue
        "secondary-container": "#e8f8ee", // Apple Mint tint
        "on-secondary": "#ffffff",
        "on-secondary-container": "#0f6b38",
        "secondary-fixed": "#e8f8ee",
        "secondary-fixed-dim": "#c6eccf",
        "on-secondary-fixed": "#0f6b38",
        "on-secondary-fixed-variant": "#0a5229",

        tertiary: "#5856d6", // Apple Indigo
        "tertiary-container": "#f2f1fd",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#3634a3",
        "tertiary-fixed": "#ffffff",
        "tertiary-fixed-dim": "#8e8e93",
        "on-tertiary-fixed": "#1d1d1f",
        "on-tertiary-fixed-variant": "#3a3a3c",

        error: "#ff3b30", // Apple System Red
        "error-container": "#feeceb",
        "on-error": "#ffffff",
        "on-error-container": "#d70015",

        "inverse-surface": "#1d1d1f",
        "inverse-on-surface": "#f5f5f7",
        "inverse-primary": "#409cff",

        // Specific Apple system accents
        apple: {
          blue: "#0071e3",
          "blue-hover": "#0077ed",
          "blue-subtle": "rgba(0, 113, 227, 0.08)",
          green: "#34c759",
          "green-subtle": "rgba(52, 199, 89, 0.1)",
          orange: "#ff9500",
          "orange-subtle": "rgba(255, 149, 0, 0.1)",
          red: "#ff3b30",
          "red-subtle": "rgba(255, 59, 48, 0.1)",
          purple: "#af52de",
          indigo: "#5856d6",
          teal: "#00c7be",
          gray1: "#8e8e93",
          gray2: "#aeaeb2",
          gray3: "#c7c7cc",
          gray4: "#d1d1d6",
          gray5: "#e5e5ea",
          gray6: "#f2f2f7",
        },
      },
      borderRadius: {
        sm: "0.375rem", // 6px
        DEFAULT: "0.5rem", // 8px
        md: "0.625rem", // 10px
        lg: "0.875rem", // 14px
        xl: "1rem", // 16px
        "2xl": "1.25rem", // 20px
        "3xl": "1.5rem", // 24px
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        margin: "2rem",
        "margin-mobile": "1rem",
        gutter: "1.5rem",
        "gutter-sm": "1rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.04)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.03)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        // Apple ambient multi-tier shadows
        apple: "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 12px 28px -4px rgba(0, 0, 0, 0.08)",
        "apple-card": "0 1px 2px rgba(0, 0, 0, 0.03), 0 6px 20px -2px rgba(0, 0, 0, 0.05)",
        "apple-card-hover": "0 4px 12px rgba(0, 0, 0, 0.05), 0 16px 36px -4px rgba(0, 0, 0, 0.09)",
        "apple-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
        "apple-popover": "0 12px 40px -4px rgba(0, 0, 0, 0.14), 0 4px 12px 0 rgba(0, 0, 0, 0.05)",
        "apple-hud": "0 16px 48px -8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.15)",
      },
      fontFamily: {
        serif: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "SF Pro",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "headline-lg": [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "headline-md": [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "title-md": [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "body-lg": [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "body-md": [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "body-sm": [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "label-lg": [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "label-md": [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "label-sm": [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        // Optical sizing and negative tracking on display/large headlines, neutral on body
        display: ["32px", { lineHeight: "38px", letterSpacing: "-0.03em", fontWeight: "600" }],
        "headline-lg": ["24px", { lineHeight: "30px", letterSpacing: "-0.025em", fontWeight: "600" }],
        "headline-md": ["20px", { lineHeight: "26px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "title-md": ["16px", { lineHeight: "22px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", letterSpacing: "-0.006em", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "16px", letterSpacing: "0", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "-0.006em", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "500" }],
      },
      transitionTimingFunction: {
        // Apple spring curves
        "apple-spring": "cubic-bezier(0.16, 1, 0.3, 1)", // critically damped default (damping 1.0, response 0.4s)
        "apple-bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)", // flick / throw with bounce
        "apple-ease": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};
