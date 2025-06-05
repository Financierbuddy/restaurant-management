'use client';

import React, { FC, useState, useEffect } from 'react'
import Label from '@/components/Label'
import Avatar from '@/shared/Avatar'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Textarea from '@/shared/Textarea'
import { ImageAdd02Icon } from '@/components/Icons'
import { useAuthAPI } from '@/hooks/useAuthAPI'
import { useAuth } from '@/contexts/AuthContext'
import { ProfileUpdatePayload, Address } from '@/types/auth.types'

export interface AccountPageProps {}

const AccountPage = () => {
	const { user, isAuthenticated } = useAuth();
	const { getProfile, updateProfile, loading, error, clearError } = useAuthAPI();
	
	const [profileData, setProfileData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: {
			street: '',
			houseNumber: '',
			postalCode: '',
			city: '',
			country: ''
		} as Address,
		// UI specific fields
		title: 'Mr',
		gender: 'Male',
		username: '',
		dateOfBirth: '',
		aboutYou: ''
	});

	const [isUpdating, setIsUpdating] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	// Load profile data on component mount
	useEffect(() => {
		if (isAuthenticated && user) {
			// First, initialize with user data from auth context
			console.log('🔍 Account Page - User data from context:', user);
			setProfileData(prev => ({
				...prev,
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				email: user.email || '',
				phone: user.phoneNumber || '',
				address: user.address || prev.address
			}));
			
			// Then try to load additional profile data from API
			loadProfileData();
		}
	}, [isAuthenticated, user]);

	const loadProfileData = async () => {
		try {
			const profile = await getProfile();
			console.log('🔍 Account Page - Profile data from API:', profile);
			if (profile) {
				setProfileData(prev => ({
					...prev,
					firstName: profile.firstName || prev.firstName,
					lastName: profile.lastName || prev.lastName,
					email: profile.email || prev.email,
					phone: profile.phoneNumber || prev.phone,
					address: profile.address || prev.address
				}));
			}
		} catch (err) {
			console.error('Failed to load profile:', err);
			// Don't show error if we already have user data from context
			if (!user) {
				// Only show error if we don't have fallback data
			}
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		
		if (name.startsWith('address.')) {
			const addressField = name.replace('address.', '');
			setProfileData(prev => ({
				...prev,
				address: {
					...prev.address,
					[addressField]: value
				}
			}));
		} else {
			setProfileData(prev => ({
				...prev,
				[name]: value
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdating(true);
		clearError();
		setSuccessMessage('');

		try {
			const payload: ProfileUpdatePayload = {
				firstName: profileData.firstName,
				lastName: profileData.lastName,
				phone: profileData.phone,
				address: profileData.address
			};

			const updatedProfile = await updateProfile(payload);
			if (updatedProfile) {
				setSuccessMessage('Profile updated successfully!');
				// Clear success message after 3 seconds
				setTimeout(() => setSuccessMessage(''), 3000);
			}
		} catch (err) {
			console.error('Failed to update profile:', err);
		} finally {
			setIsUpdating(false);
		}
	};

	// Debug current form data
	console.log('🔍 Account Page - Current form data:', profileData);

	if (!isAuthenticated) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-600">Please log in to view your account information.</p>
			</div>
		);
	}

	return (
		<div className="space-y-6 sm:space-y-8">
			{/* HEADING */}
			<h2 className="text-3xl font-semibold">Account Information</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			
			{/* API Integration Status */}
			{loading && (
				<div className="p-4 bg-blue-50 rounded-lg">
					<p className="text-blue-700">Loading profile data...</p>
				</div>
			)}

			{error && (
				<div className="p-4 bg-red-50 rounded-lg">
					<p className="text-red-700">Error: {error}</p>
				</div>
			)}

			{successMessage && (
				<div className="p-4 bg-green-50 rounded-lg">
					<p className="text-green-700">{successMessage}</p>
				</div>
			)}

			<form onSubmit={handleSubmit}>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-shrink-0 items-start">
					<div className="relative flex overflow-hidden rounded-full">
						<Avatar sizeClass="w-32 h-32" />
						<div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black bg-opacity-60 text-neutral-50">
							<ImageAdd02Icon className="h-6 w-6" />
								<span className="mt-1 text-xs">Change Image</span>
						</div>
						<input
							type="file"
							className="absolute inset-0 cursor-pointer opacity-0"
						/>
					</div>
				</div>
				<div className="mt-10 max-w-3xl flex-grow space-y-6 md:mt-0 md:ps-16">
					<div>
							<Label>Title</Label>
							<Select 
								className="mt-1.5" 
								name="title"
								value={profileData.title}
								onChange={handleInputChange}
							>
								<option value="Mr">Mr</option>
								<option value="Mrs">Mrs</option>
								<option value="Ms">Ms</option>
						</Select>
					</div>

						{/* First Name */}
						<div>
							<Label>First Name *</Label>
							<Input 
								className="mt-1.5" 
								name="firstName"
								value={profileData.firstName}
								onChange={handleInputChange}
								required
							/>
						</div>

						{/* Last Name */}
					<div>
							<Label>Last Name *</Label>
							<Input 
								className="mt-1.5" 
								name="lastName"
								value={profileData.lastName}
								onChange={handleInputChange}
								required
							/>
					</div>

						{/* Gender */}
					<div>
							<Label>Gender</Label>
							<Select 
								className="mt-1.5"
								name="gender"
								value={profileData.gender}
								onChange={handleInputChange}
							>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
						</Select>
					</div>

						{/* Username */}
					<div>
							<Label>Username</Label>
							<Input 
								className="mt-1.5" 
								name="username"
								value={profileData.username}
								onChange={handleInputChange}
							/>
					</div>

						{/* Email (readonly - from API) */}
					<div>
							<Label>Email</Label>
							<Input 
								className="mt-1.5 bg-gray-50" 
								value={profileData.email}
								readOnly
								title="Email cannot be changed"
							/>
						</div>

						{/* Date of Birth */}
						<div className="max-w-lg">
							<Label>Date of birth</Label>
							<Input 
								className="mt-1.5" 
								type="date" 
								name="dateOfBirth"
								value={profileData.dateOfBirth}
								onChange={handleInputChange}
							/>
					</div>	

						{/* Phone number */}
					<div>
							<Label>Phone number *</Label>
							<Input 
								className="mt-1.5" 
								name="phone"
								value={profileData.phone}
								onChange={handleInputChange}
								placeholder="+31612345678"
								required
							/>
					</div>

						{/* Address Fields */}
						<div>
							<Label>Street</Label>
							<Input 
								className="mt-1.5" 
								name="address.street"
								value={profileData.address.street}
								onChange={handleInputChange}
								placeholder="Main Street"
							/>
					</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
								<Label>House Number</Label>
								<Input 
									className="mt-1.5" 
									name="address.houseNumber"
									value={profileData.address.houseNumber}
									onChange={handleInputChange}
									placeholder="42"
								/>
					</div>
					<div>
								<Label>Postal Code</Label>
								<Input 
									className="mt-1.5" 
									name="address.postalCode"
									value={profileData.address.postalCode}
									onChange={handleInputChange}
									placeholder="1234 AB"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<Label>City</Label>
								<Input 
									className="mt-1.5" 
									name="address.city"
									value={profileData.address.city}
									onChange={handleInputChange}
									placeholder="Amsterdam"
								/>
					</div>
					<div>
								<Label>Country</Label>
								<Input 
									className="mt-1.5" 
									name="address.country"
									value={profileData.address.country}
									onChange={handleInputChange}
									placeholder="Netherlands"
								/>
							</div>
					</div>

						{/* About you */}
					<div>
							<Label>About you</Label>
							<Textarea 
								className="mt-1.5" 
								name="aboutYou"
								value={profileData.aboutYou}
								onChange={handleInputChange}
								placeholder="Tell us about yourself..."
							/>
					</div>

						<div className="pt-2 flex gap-4">
							<ButtonPrimary 
								type="submit" 
								disabled={isUpdating || loading}
								className="flex items-center gap-2"
							>
								{isUpdating ? 'Updating...' : 'Update Information'}
						</ButtonPrimary>
							
							<button
								type="button"
								onClick={loadProfileData}
								disabled={loading}
								className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
							>
								{loading ? 'Loading...' : 'Reload Data'}
							</button>
						</div>

						{/* API Test Info */}
						<div className="mt-8 p-4 bg-gray-50 rounded-lg">
							<h4 className="font-semibold text-gray-700 mb-2">🔗 API Integration</h4>
							<p className="text-sm text-gray-600">
								✅ GET /profile - Load user data<br/>
								✅ PUT /profile - Update user data<br/>
								✅ GET /users/me - Get current user info
							</p>
							{user && (
								<p className="text-xs text-green-600 mt-2">
									Current user: {user.firstName} {user.lastName} ({user.role})
								</p>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default AccountPage
