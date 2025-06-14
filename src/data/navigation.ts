import { MegamenuItem, NavItemType } from '@/shared/Navigation/NavigationItem'
import ncNanoId from '@/utils/ncNanoId'
import { Route } from '@/routers/types'
import __megamenu from './jsons/__megamenu.json'

const megaMenuDemo: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Company',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Company,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'App Name',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.AppName,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'City',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.City,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Contruction',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Contruction,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Country',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Country,
		})),
	},
]

const demoChildMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Online booking',
	},
	{
		id: ncNanoId(),
		href: '/home-2',
		name: 'Real estate',
		isNew: true,
	},
	{
		id: ncNanoId(),
		href: '/home-3',
		name: 'Home 3',
		isNew: true,
	},
	{
		id: ncNanoId(),
		href: '/',
		name: 'Coming soon',
	},
	{
		id: ncNanoId(),
		href: '/',
		name: 'Coming soon',
	},
]

const otherPageChildMenus: NavItemType[] = [
	{ id: ncNanoId(), href: '/add-listing/1' as Route, name: '+ Add listing' },
	{ id: ncNanoId(), href: '/blog', name: 'Blog page' },
	{ id: ncNanoId(), href: '/blog/single' as Route, name: 'Blog single' },
	{ id: ncNanoId(), href: '/about', name: 'About' },
	{ id: ncNanoId(), href: '/contact', name: 'Contact us' },
	{ id: ncNanoId(), href: '/login', name: 'Login/Signup' },
]

const templatesChildrenMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/add-listing/1' as Route,
		name: '+ Add listing',
		type: 'dropdown',
		children: [
			{
				id: ncNanoId(),
				href: '/add-listing/1' as Route,
				name: 'Add listing 1',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/2' as Route,
				name: 'Add listing 2',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/3' as Route,
				name: 'Add listing 3',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/4' as Route,
				name: 'Add listing 4',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/5' as Route,
				name: 'Add listing 5',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/6' as Route,
				name: 'Add listing 6',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/7' as Route,
				name: 'Add listing 7',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/8' as Route,
				name: 'Add listing 8',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/9' as Route,
				name: 'Add listing 9',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/10' as Route,
				name: 'Add listing 10',
			},
		],
	},
	//
	{ id: ncNanoId(), href: '/checkout', name: 'Checkout' },
	{ id: ncNanoId(), href: '/pay-done', name: 'Pay done' },
	//
	{ id: ncNanoId(), href: '/author', name: 'Author page' },
	{ id: ncNanoId(), href: '/account', name: 'Account page' },
	//
	{
		id: ncNanoId(),
		href: '/subscription',
		name: 'Subscription',
	},
]




export const NAVIGATION_DEMO: NavItemType[] =

	[
		{
			id: ncNanoId(),
			href: '/about',
			name: 'About',
			// type: 'dropdown',
			// children: demoChildMenus,
			// isNew: true,
		},
		{
			id: ncNanoId(),
			href: '/blog',
			name: 'Blog',
			type: 'dropdown',
			children: [
				{ id: ncNanoId(), href: '/reviews', name: 'Reviews' },
				{ id: ncNanoId(), href: '/clients', name: 'Clients' },
			]
			// type: 'dropdown',
			// children: demoChildMenus,
			// isNew: true,
		},
		{
			id: ncNanoId(),
			href: '/contact',
			name: 'Contact',
			// type: 'dropdown',
			// children: demoChildMenus,
			// isNew: true,
		},
		{
			id: ncNanoId(),
			href: '/account/reservations',
			name: 'Reservations',
			// type: 'dropdown',
			// children: demoChildMenus,
			// isNew: true,
		},
		{
			id: ncNanoId(),
			href: '/account',
			name: 'Account',
			// type: 'dropdown',
			// children: demoChildMenus,
			// isNew: true,
		},
		{
			id: ncNanoId(),
			href: '/deals',
			name: 'Deals',
			// type: 'dropdown',
			// children: demoChildMenus,
			// isNew: true,
		},
		{
			id: ncNanoId(),
			href: '#',
			name: 'Forms',
			type: 'dropdown',
			children: [
				{ id: ncNanoId(), href: '/admin-v1/affiliate-click', name: 'Affiliate Clicks' },
				{ id: ncNanoId(), href: '/admin-v1/categories', name: 'Categories' },
				{ id: ncNanoId(), href: '/deals-form', name: 'Deals Form' },
				{ id: ncNanoId(), href: '/admin-v1/options', name: 'Options' },
				{ id: ncNanoId(), href: '/admin-v1/partners', name: 'Partners' },
				{ id: ncNanoId(), href: '/admin-v1/permission', name: 'Permissions' },
				{ id: ncNanoId(), href: '/admin-v1/referrals', name: 'Referrals' },
				// { id: ncNanoId(), href: '/account/reservation', name: 'Reservations' },
				{ id: ncNanoId(), href: '/admin-v1/role', name: 'Roles' },
				// { id: ncNanoId(), href: '/admin-v1/status-history', name: 'Status History' },
				{ id: ncNanoId(), href: '/admin-v1/transactions', name: 'Transactions' },
				{ id: ncNanoId(), href: '/account/status', name: 'Universal Status' },
				{ id: ncNanoId(), href: '/admin-v1/user', name: 'Users' },
			]
		},
		{
			id: ncNanoId(),
			href: '/qr',
			name: 'Qr code',
			// type: 'dropdown',
			// children: demoChildMenus,
			// isNew: true,
		},
	];


export const NAVIGATION_ADMIN: any = [
	{
		id: ncNanoId(),
		href: '/account/deals',
		name: 'Deals',
	},
	{
		id: ncNanoId(),
		href: '/account/partners',
		name: 'Partners',
	},
	{
		id: ncNanoId(),
		href: '/account/reservation',
		name: 'Reservation',
	},
	{
		id: ncNanoId(),
		href: '/account/reservations',
		name: 'Reservations',
	},
	{
		id: ncNanoId(),
		href: '/account/status',
		name: 'Status',
	},
]

export const NAVIGATION_DEMO_2: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Home',
		type: 'dropdown',
		children: demoChildMenus,
		isNew: true,
	},

	//
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Listing pages',
		children: [
			{ id: ncNanoId(), href: '/listing-stay', name: 'Stay listings' },
			{
				id: ncNanoId(),
				href: '/listing-stay-map',
				name: 'Stay listings (map)',
			},
			{ id: ncNanoId(), href: '/listing-stay-detail', name: 'Stay detail' },

			//
			{
				id: ncNanoId(),
				href: '/listing-experiences',
				name: 'Experiences listings',
			},
			{
				id: ncNanoId(),
				href: '/listing-experiences-map',
				name: 'Experiences (map)',
			},
			{
				id: ncNanoId(),
				href: '/listing-experiences-detail',
				name: 'Experiences detail',
			},
		],
	},
	{
		id: ncNanoId(),
		href: '/listing-car',
		name: 'Listing pages',
		children: [
			{ id: ncNanoId(), href: '/listing-car', name: 'Cars listings' },
			{ id: ncNanoId(), href: '/listing-car-map', name: 'Cars listings (map)' },
			{ id: ncNanoId(), href: '/listing-car-detail', name: 'Car detail' },

			//
			{
				id: ncNanoId(),
				href: '/listing-real-estate',
				name: 'Real estate listings',
			},
			{
				id: ncNanoId(),
				href: '/listing-real-estate-map',
				name: 'Real estate (map)',
			},
			//
			{
				id: ncNanoId(),
				href: '/listing-flights',
				name: 'Flights listings',
			},
		],
	},

	//
	{
		id: ncNanoId(),
		href: '/author',
		name: 'Templates',
		type: 'dropdown',
		children: templatesChildrenMenus,
	},

	//
	{
		id: ncNanoId(),
		href: '/blog',
		name: 'Other pages',
		type: 'dropdown',
		children: otherPageChildMenus,
	},
]
