"use client"
import React, { FC, useState, useEffect } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useAuthAPI } from "@/hooks/useAuthAPI";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ClientRegisterPayload, PartnerRegisterPayload, AdminRegisterPayload, mapLaravelUserToProfile } from "@/types/auth.types";

export interface PageSignUpProps {}

type UserRole = 'client' | 'partner' | 'admin';

const loginSocials = [
	{
		name: 'Continue with Facebook',
		href: '#',
		icon: facebookSvg,
	},
	{
		name: 'Continue with Twitter',
		href: '#',
		icon: twitterSvg,
	},
	{
		name: 'Continue with Google',
		href: '#',
		icon: googleSvg,
	},
];

const sliderImages = [
	'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
	'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
	'https://images.unsplash.com/photo-1544148103-0773bf10d330',
	'https://images.unsplash.com/photo-1566073771259-6a8506099945',
	'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
];

const ImageSlider = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	// Auto-slide effect
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1,
			);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	// Manual navigation
	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<div className="relative h-full w-full">
			{/* Images */}
			{sliderImages.map((image, index) => (
				<div
					key={index}
					className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
						index === currentIndex ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<div
						className="h-full w-full bg-cover bg-center"
						style={{ backgroundImage: `url(${image})` }}
					/>
				</div>
			))}

			{/* Navigation dots */}
			<div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
				{sliderImages.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`h-2 w-2 rounded-full transition-all ${
							index === currentIndex ? 'w-4 bg-white' : 'bg-white/50'
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

const PageSignUp: FC<PageSignUpProps> = ({}) => {
	const router = useRouter();
	const [userRole, setUserRole] = useState<UserRole>('client');
	
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		// Partner specific
		companyName: '',
		kvkNumber: '',
		vatNumber: '',
		// Admin specific
		adminCode: '',
		// Additional fields
		termsAccepted: false,
	});

	// Use the new API hooks
	const { registerClient, registerPartner, registerAdmin, loading, error, clearError } = useAuthAPI();
	const { login: setAuthState, isAuthenticated } = useAuth();

	// Redirect if already authenticated
	useEffect(() => {
		if (isAuthenticated) {
			router.push("/account");
		}
	}, [isAuthenticated, router]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		clearError();

		// Validation
		if (formData.password !== formData.confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		if (!formData.termsAccepted) {
			alert('Please accept the terms and conditions');
			return;
		}

		try {
			let result = null;

			if (userRole === 'client') {
				const payload: ClientRegisterPayload = {
					email: formData.email,
					password: formData.password,
					firstName: formData.firstName,
					lastName: formData.lastName,
					phoneNumber: formData.phoneNumber,
				};
				result = await registerClient(payload);
			} else if (userRole === 'partner') {
				const payload: PartnerRegisterPayload = {
					email: formData.email,
					password: formData.password,
					firstName: formData.firstName,
					lastName: formData.lastName,
					phoneNumber: formData.phoneNumber,
					companyName: formData.companyName,
					kvkNumber: formData.kvkNumber,
					vatNumber: formData.vatNumber,
				};
				result = await registerPartner(payload);
			} else if (userRole === 'admin') {
				const payload: AdminRegisterPayload = {
					email: formData.email,
					password: formData.password,
					firstName: formData.firstName,
					lastName: formData.lastName,
					adminCode: formData.adminCode,
				};
				result = await registerAdmin(payload);
			}

			      if (result) {
        console.log('Registration successful:', result);
        
        // If token is provided, log in the user automatically
        if (result && typeof result === 'object' && 'token' in result && result.token) {
          const userProfile = mapLaravelUserToProfile((result as any).user);
          setAuthState((result as any).token, userProfile);
          router.push("/account");
        } else {
          // Redirect to login if no token (email verification required)
          alert('Registration successful! Please check your email and then log in.');
          router.push("/login");
        }
      }
		} catch (err) {
			console.error('Registration failed:', err);
		}
	};

	return (
		<div className={`nc-PageSignUp min-h-screen w-full bg-white dark:bg-neutral-900`}>
			<div className="container relative flex min-h-screen items-center justify-center px-4 py-16">
				<div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl shadow-xl md:flex-row">
					<div className="relative w-full overflow-hidden md:w-1/2">
						<ImageSlider />
						<div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
					</div>
					<div className="max-h-screen w-full overflow-auto bg-white dark:bg-neutral-800 p-8 md:w-1/2 md:p-10">
						<div className="mx-auto max-w-md">
							<div className="mb-6 space-y-2">
								<p className="text-sm text-neutral-500 dark:text-neutral-400">Welcome! 👋</p>
								<h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
									Create Account
								</h2>
							</div>

							{/* Role Selection */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
									Account Type
								</label>
								<select
									value={userRole}
									onChange={(e) => setUserRole(e.target.value as UserRole)}
									className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white pb-2"
								>
									<option value="client">Client Account</option>
									<option value="partner">Partner/Business Account</option>
									<option value="admin">Admin Account</option>
								</select>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Basic Information */}
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<input
										type="text"
										name="firstName"
										value={formData.firstName}
										onChange={handleChange}
										placeholder="First Name"
										required
										className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
									/>
									<input
										type="text"
										name="lastName"
										value={formData.lastName}
										onChange={handleChange}
										placeholder="Last Name"
										required
										className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
									/>
								</div>

								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Email Address"
									required
									className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
								/>

								<input
									type="tel"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									placeholder="Phone Number"
									required
									className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
								/>

								{/* Partner-specific fields */}
								{userRole === 'partner' && (
									<>
										<input
											type="text"
											name="companyName"
											value={formData.companyName}
											onChange={handleChange}
											placeholder="Company Name"
											required
											className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
										/>
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<input
												type="text"
												name="kvkNumber"
												value={formData.kvkNumber}
												onChange={handleChange}
												placeholder="KvK Number"
												required
												className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
											/>
											<input
												type="text"
												name="vatNumber"
												value={formData.vatNumber}
												onChange={handleChange}
												placeholder="VAT Number"
												required
												className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
											/>
										</div>
									</>
								)}

								{/* Admin-specific fields */}
								{userRole === 'admin' && (
									<input
										type="password"
										name="adminCode"
										value={formData.adminCode}
										onChange={handleChange}
										placeholder="Admin Code"
										required
										className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
									/>
								)}

								<input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Password"
									required
									className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
								/>

								<input
									type="password"
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder="Confirm Password"
									required
									className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
								/>

								{error && (
									<div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-md text-center">
										{error}
									</div>
								)}

								{/* Terms and Conditions */}
								<div className="flex items-center">
									<input
										type="checkbox"
										name="termsAccepted"
										checked={formData.termsAccepted}
										onChange={handleChange}
										className="accent-blue-500 mr-2"
										required
									/>
									                  <label className="text-xs text-neutral-500 dark:text-neutral-400">
                    I agree to the{" "}
                    <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
								</div>

								<ButtonPrimary className="w-full mt-4" disabled={loading}>
									{loading ? "Creating Account..." : "CREATE ACCOUNT"}
								</ButtonPrimary>

								<div className="pt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
									Already have an account?{" "}
									<Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium">
										Sign In
									</Link>
								</div>
							</form>

							{/* Test API Link */}
							<div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
								<div className="text-center">
									<Link 
										href="/test-api" 
										className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-blue-500 dark:hover:text-blue-400"
									>
										🧪 Test API Integration
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageSignUp;
