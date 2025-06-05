import { Poppins } from 'next/font/google'
import SiteHeader from './(client-components)/(Header)/SiteHeader'
import ClientCommons from './ClientCommons'
import '@/app/globals.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import Footer from '@/components/Footer'
import FooterNav from '@/components/FooterNav'
import { Metadata } from 'next'
import ThemeProvider from './theme-provider'
import Footer2 from '@/components/Footer2'
import Footer3 from '@/components/Footer3'
import Footer4 from '@/components/Footer4'
import { AuthProvider } from '@/contexts/AuthContext'

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
})


export const metadata: Metadata = {
	title: "GratisGenieten",
	description:
		"Spaar online, geniet lokaal: Shop bij 2000+ webshops, geniet gratis bij lokale favorieten in jouw stad",
	keywords:
		"GratisGenieten, Booking online, Spaar online, geniet lokaal, webshops",
};

export default function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: any
}) {

	return (
		<html lang="en" className={poppins.className}>
			<ThemeProvider>
				<body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
					<AuthProvider>
					<div>
						<div className='sticky top-0 z-50'>
							<SiteHeader />
						</div>
						{children}
						<FooterNav />
						<Footer2 />
					</div>
					<ClientCommons />
					</AuthProvider>
				</body>
			</ThemeProvider>
		</html>
	)
}
{/* Chose footer style here!!!! */ }
{/* <Footer /> */ }
{/* <Footer3 /> */ }
{/* <Footer4 /> */ }
