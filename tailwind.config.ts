import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
				mono: ['var(--font-ibm-plex-mono)', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
				serif: ['var(--font-ibm-plex-serif)', 'Georgia', 'serif'],
			},

			spacing: {
				'xs': 'var(--space-xs)',
				'sm': 'var(--space-sm)',
				'md': 'var(--space-md)',
				'lg': 'var(--space-lg)',
				'xl': 'var(--space-xl)',
				'2xl': 'var(--space-2xl)',
				'3xl': 'var(--space-3xl)',
				'4xl': 'var(--space-4xl)',
				'5xl': 'var(--space-5xl)',
				'section': 'var(--section-padding)',
			},

			maxWidth: {
				'content': 'var(--content-width)',
				'prose': '65ch',
			},

			gap: {
				'grid': 'var(--grid-gap)',
			},

			// Sophisticated color system
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Brand gradient colors
				brand: {
					yellow: '#ffd319',
					pink: '#ff2975',
					purple: '#8c1eff',
				}
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xs: 'calc(var(--radius) - 6px)',
			},

			fontSize: {
				'display': ['clamp(2.5rem, 8vw, 6rem)', {
					lineHeight: '0.9',
					letterSpacing: '-0.02em',
					fontWeight: '300'
				}],
				'heading-1': ['clamp(2rem, 5vw, 3.5rem)', {
					lineHeight: '1.1',
					letterSpacing: '-0.015em',
					fontWeight: '400'
				}],
				'heading-2': ['clamp(1.5rem, 4vw, 2.5rem)', {
					lineHeight: '1.2',
					letterSpacing: '-0.01em',
					fontWeight: '400'
				}],
				'heading-3': ['clamp(1.25rem, 3vw, 1.875rem)', {
					lineHeight: '1.3',
					fontWeight: '500'
				}],
				'body-large': ['clamp(1rem, 2.5vw, 1.25rem)', {
					lineHeight: '1.6',
					fontWeight: '400'
				}],
				'body': ['1rem', {
					lineHeight: '1.6',
					fontWeight: '400'
				}],
				'caption': ['0.875rem', {
					lineHeight: '1.4',
					letterSpacing: '0.025em',
					fontWeight: '500'
				}],
			},

			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
				'sophisticated': '0 10px 40px -10px rgb(0 0 0 / 0.1), 0 0 0 1px rgb(0 0 0 / 0.05)',
				'glow': '0 0 20px rgb(255 211 25 / 0.3)',
			},

			backdropBlur: {
				'sophisticated': '20px',
			},

			transitionTimingFunction: {
				'out-cubic': 'var(--ease-out-cubic)',
				'in-out-cubic': 'var(--ease-in-out-cubic)',
			},

			transitionDuration: {
				'fast': 'var(--duration-fast)',
				'normal': 'var(--duration-normal)',
				'slow': 'var(--duration-slow)',
			},

			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'gradient': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'orbit': {
					'0%': {
						transform: 'rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))'
					},
					'100%': {
						transform: 'rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))'
					}
				},
				'grid': {
					'0%': { transform: 'translateY(-50%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'fadeIn': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slideUp': {
					from: { opacity: '0', transform: 'translateY(30px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scaleIn': {
					from: { opacity: '0', transform: 'scale(0.95)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)', opacity: '0.2' },
					'50%': { transform: 'translateY(-20px)', opacity: '0.5' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				}
			},

			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gradient': 'gradient 8s linear infinite',
				'orbit': 'orbit calc(var(--duration)*1s) linear infinite',
				'grid': 'grid 15s linear infinite',
				'fade-in': 'fadeIn var(--duration-slow) var(--ease-out-cubic)',
				'slide-up': 'slideUp var(--duration-normal) var(--ease-out-cubic)',
				'scale-in': 'scaleIn var(--duration-normal) var(--ease-out-cubic)',
				'float': 'float 4s ease-in-out infinite',
				'float-delayed': 'float 3s ease-in-out infinite 1s',
				'shimmer': 'shimmer 2s infinite',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
			},

			screens: {
				'xs': '475px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
				'content': '1200px', // Custom breakpoint for content width
			},

			backdropSaturate: {
				180: '180%',
			},

			// Custom gradients
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'brand-gradient': 'var(--gradient-primary)',
				'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
			},

			// Animation delays
			animationDelay: {
				'100': '100ms',
				'200': '200ms',
				'300': '300ms',
				'500': '500ms',
				'700': '700ms',
				'1000': '1000ms',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		// Custom plugin for design system utilities
		function ({ addUtilities, addComponents, theme }: any) {
			// Add custom utilities
			addUtilities({
				'.content-grid': {
					display: 'grid',
					'grid-template-columns': '[full-start] minmax(var(--space-md), 1fr) [content-start] min(var(--content-width), 100% - var(--space-md) * 2) [content-end] minmax(var(--space-md), 1fr) [full-end]',
				},
				'.full-width': {
					'grid-column': 'full',
				},
				'.section-padding': {
					'padding-top': 'var(--section-padding)',
					'padding-bottom': 'var(--section-padding)',
				},
				'.backdrop-blur-sophisticated': {
					'backdrop-filter': 'blur(20px) saturate(180%)',
					'background': 'hsl(var(--background) / 0.8)',
					'border': '1px solid hsl(var(--border) / 0.5)',
				},
				'.text-gradient': {
					'background': 'var(--gradient-primary)',
					'background-clip': 'text',
					'-webkit-background-clip': 'text',
					'color': 'transparent',
				},
			})

			// Add custom components
			addComponents({
				'.btn-primary': {
					'display': 'inline-flex',
					'align-items': 'center',
					'justify-content': 'center',
					'padding': 'var(--space-sm) var(--space-lg)',
					'background': 'hsl(var(--primary))',
					'color': 'hsl(var(--primary-foreground))',
					'border-radius': 'var(--radius)',
					'font-weight': '500',
					'font-size': '0.875rem',
					'letter-spacing': '0.025em',
					'transition': 'all var(--duration-fast) var(--ease-out-cubic)',
					'border': 'none',
					'cursor': 'pointer',
					'&:hover': {
						'background': 'hsl(var(--primary) / 0.9)',
						'transform': 'translateY(-1px)',
						'box-shadow': 'var(--shadow-lg)',
					}
				},
				'.btn-ghost': {
					'display': 'inline-flex',
					'align-items': 'center',
					'justify-content': 'center',
					'padding': 'var(--space-sm) var(--space-md)',
					'background': 'transparent',
					'color': 'hsl(var(--foreground))',
					'border-radius': 'var(--radius)',
					'font-weight': '500',
					'font-size': '0.875rem',
					'transition': 'all var(--duration-fast) var(--ease-out-cubic)',
					'border': '1px solid transparent',
					'cursor': 'pointer',
					'&:hover': {
						'background': 'hsl(var(--accent))',
						'border-color': 'hsl(var(--border))',
					}
				},
				'.card-modern': {
					'background': 'hsl(var(--card))',
					'border': '1px solid hsl(var(--border))',
					'border-radius': 'var(--radius)',
					'box-shadow': 'var(--shadow-sm)',
					'transition': 'all var(--duration-normal) var(--ease-out-cubic)',
					'&:hover': {
						'box-shadow': 'var(--shadow-md)',
						'transform': 'translateY(-2px)',
					}
				}
			})
		}
	],
} satisfies Config;

export default config;
