/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Ensure all background color classes for design kit are included
    "bg-primary-white",
    "bg-primary-light",
    "bg-secondary-light",
    "bg-primary-dark",
    "bg-secondary-dark",
    "bg-primary-accent",
    "bg-secondary-accent",
    "bg-accent-green",
    "bg-accent-purple",
    "bg-accent-magenta",
    "bg-accent-cyan",
    "bg-accent-teal",
    "bg-accent-light-purple",

    
    // Theme-aware color classes
    "bg-theme-bg",
    "bg-theme-bg-alt",
    "text-theme-text",
    "text-theme-text-alt",
    "text-theme-heading",
    "text-theme-heading-alt",
    "text-theme-text-alt",
    "text-theme-text-muted",
    "text-theme-link",
    "hover:text-theme-link-hover",
    "bg-theme-btn-bg",
    "text-theme-btn-text",
    "hover:bg-theme-btn-hover-bg",
    "hover:text-theme-btn-hover-text",
    "text-theme-btn-outlined-text",
    "border-theme-btn-outlined-border",
    "hover:bg-theme-btn-outlined-hover-bg",
    "hover:text-theme-btn-outlined-hover-text",
    "outline-theme-focus",
    
    // Alignment classes for components
    "items-start",
    "items-center", 
    "items-end",
    "text-left",
    "text-center",
    "text-right",
  ],
  theme: {
    extend: {
      screens: {
        sm: { max: "640px" },
        md: { min: "640px", max: "991px" },
        lg: { min: "991px" },
      },
      colors: {
        // Existing semantic color variables (keep as-is)
        "primary-light": "var(--primary-light, #ffffff)",
        "secondary-light": "var(--secondary-light, #f5f5f5)",
        "primary-dark": "var(--primary-dark, #1d0f34)",
        "secondary-dark": "var(--secondary-dark, #647589)",
        "primary-accent": "var(--accent-purple, #6610f2)",
        "secondary-accent": "var(--primary-cyan, #5ce1e6)",
        "accent-purple": "var(--accent-purple, #6610f2)",
        "accent-green": "var(--accent-green, #20c997)",
        "accent-magenta": "var(--accent-magenta, #b31d9d)",
        "accent-cyan": "var(--accent-cyan, #5ce1e6)",
        "accent-teal": "var(--accent-teal, #0dcaf0)",
        "accent-light-purple": "var(--accent-light-purple, #8c52ff)",

        
        // Theme-aware color properties (new)
        "theme-bg": "var(--theme-bg, var(--primary-light))",
        "theme-bg-alt": "var(--theme-bg-alt, var(--primary-dark))",
        "theme-text": "var(--theme-text, var(--primary-dark))",
        "theme-text-alt": "var(--theme-text-alt, var(--primary-light))",
        "theme-heading": "var(--theme-heading, var(--primary-dark))",
        "theme-heading-alt": "var(--theme-heading-alt, var(--accent-purple))",
        "theme-text-muted": "var(--theme-text-muted, var(--secondary-dark))",
        "theme-link": "var(--theme-link, var(--primary-accent))",
        "theme-link-hover": "var(--theme-link-hover, var(--accent-purple))",
        "theme-underline": "var(--theme-underline, var(--accent-purple))",
        
        // Theme-aware button colors
        "theme-btn-bg": "var(--theme-btn-bg, var(--primary-accent))",
        "theme-btn-text": "var(--theme-btn-text, var(--primary-light))",
        "theme-btn-hover-bg": "var(--theme-btn-hover-bg, var(--secondary-dark))",
        "theme-btn-hover-text": "var(--theme-btn-hover-text, var(--primary-dark))",
        
        // Theme-aware outlined button colors
        "theme-btn-outlined-text": "var(--theme-btn-outlined-text, var(--primary-accent))",
        "theme-btn-outlined-border": "var(--theme-btn-outlined-border, var(--primary-accent))",
        "theme-btn-outlined-hover-bg": "var(--theme-btn-outlined-hover-bg, var(--primary-accent))",
        "theme-btn-outlined-hover-text": "var(--theme-btn-outlined-hover-text, var(--primary-light))",
        
        // Theme-aware focus colors
        "theme-focus": "var(--theme-focus, var(--primary-accent))",
      },
      fontFamily: {
        primary: ["var(--font-primary)"],
        secondary: ["var(--font-secondary)"],
        sans: ["var(--font-primary)"],
        accent: ["var(--font-accent)"],
      },
      fontSize: {
        hero: ["40px", "52px"],
      },
      spacing: {
        section: "36px",
        card: "20px",
        text: "16px",
        container: "50px",
      },
      rotate: {
        "y-180": "180deg",
      },
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
      perspective: {
        1000: "1000px",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
    },
  },
  plugins: [],
};
