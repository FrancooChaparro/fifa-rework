import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		tiny: '385px',
  		xs: '480px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xm: '1150px',
  		xl: '1280px',
  		large: '1365px',
  		'2xl': '1536px',
  		'2.5xl': '1800px',
  		'3xl': '1920px'
  	},
  	extend: {
  		colors: {
  			pearl: '#f5dadf',
  			bgPrimary: '#0d0c14',
  			bgGames: '#1a1823',
  			primaryRed: '#c21741',
  			hoverCard: '#bc2641',
  			fontTitle: '#fcfbff',
  			fontGames: '#abaab0',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			bgHome: 'radial-gradient(circle, #1a1823, #100e19)'
  		},
  		boxShadow: {
  			text: '0 0 10px rgba(179, 174, 174, 1)'
  		},
  		fontFamily: {
  			geistLight: [
  				'var(--font-geist-light)'
  			],
  			geistBold: [
  				'var(--font-geist-bold)'
  			],
  			geistRegular: [
  				'var(--font-geist-regular)'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
