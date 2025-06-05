'use client';

import React, { useState, useEffect } from 'react';
import Label from '@/components/Label';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { useAuthAPI } from '@/hooks/useAuthAPI';
import { useAuth } from '@/contexts/AuthContext';
import { UserPreferencesPayload } from '@/types/auth.types';

const AccountPreferencesPage = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const { setUserPreferences, getUserPreferences, loading, error, clearError } = useAuthAPI();
    
    const [preferences, setPreferences] = useState<UserPreferencesPayload>({
        notifications: {
            email: true,
            push: true,
            sms: false,
            marketing: false
        },
        privacy: {
            profileVisibility: 'public',
            dataSharing: false,
            analytics: true
        },
        ai: {
            personalizedRecommendations: true,
            chatbotEnabled: true,
            dataProcessing: true
        },
        language: 'en',
        currency: 'EUR',
        timezone: 'Europe/Amsterdam'
    });

    const [isUpdating, setIsUpdating] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Load preferences on component mount
    useEffect(() => {
        if (isAuthenticated && user) {
            loadPreferences();
        }
    }, [isAuthenticated, user]);

    // Debug when component mounts and auth state changes
    useEffect(() => {
        console.log('🔍 Account Preferences page - Auth state changed:', {
            isLoading,
            isAuthenticated,
            user: user ? `${user.firstName} ${user.lastName}` : null,
            userId: user?.id,
            rawToken: typeof window !== 'undefined' ? document.cookie : 'server-side'
        });
    }, [user, isAuthenticated, isLoading]);

    const loadPreferences = async () => {
        if (!user?.id) return;
        
        try {
            const userPrefs = await getUserPreferences(user.id);
            if (userPrefs) {
                setPreferences(userPrefs);
            }
        } catch (err) {
            console.error('Failed to load preferences:', err);
        }
    };

    const handlePreferenceChange = (category: string, key: string, value: any) => {
        setPreferences(prev => ({
            ...prev,
            [category]: typeof prev[category as keyof UserPreferencesPayload] === 'object' 
                ? { ...prev[category as keyof UserPreferencesPayload] as any, [key]: value }
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        clearError();
        setSuccessMessage('');

        try {
            const updatedPrefs = await setUserPreferences(preferences);
            if (updatedPrefs) {
                setSuccessMessage('Preferences updated successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (err) {
            console.error('Failed to update preferences:', err);
        } finally {
            setIsUpdating(false);
        }
    };

    // Show loading state while auth is initializing
    if (isLoading) {
        return (
            <div className="text-center py-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-700">Loading authentication...</p>
                </div>
            </div>
        );
    }

    // Temporary debug info
    console.log('🔍 Account Preferences Debug:', {
        isLoading,
        isAuthenticated,
        user,
        token: typeof window !== 'undefined' ? !!document.cookie.includes('token') : 'server-side'
    });

    if (!isAuthenticated) {
        return (
            <div className="text-center py-8">
                <div className="p-4 bg-yellow-50 rounded-lg mb-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">🔍 Debug Info</h3>
                    <p className="text-sm text-yellow-700">
                        isLoading: {String(isLoading)}<br/>
                        isAuthenticated: {String(isAuthenticated)}<br/>
                        user: {user ? `${user.firstName} ${user.lastName} (${user.email})` : 'null'}<br/>
                        user ID: {user?.id || 'no ID'}<br/>
                        Token in cookies: {typeof window !== 'undefined' ? (document.cookie.includes('token') ? 'present' : 'missing') : 'server-side'}
                    </p>
                </div>
                <p className="text-gray-600">Please log in to manage your preferences.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* HEADING */}
            <h2 className="text-3xl font-semibold">Account Preferences</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

            {/* API Status */}
            {loading && (
                <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-700">Loading preferences...</p>
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

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Notification Preferences */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Notifications</h3>
                    <div className="space-y-4">
                        {[
                            { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
                            { key: 'push', label: 'Push Notifications', description: 'Browser and mobile notifications' },
                            { key: 'sms', label: 'SMS Notifications', description: 'Text message alerts' },
                            { key: 'marketing', label: 'Marketing Communications', description: 'Promotional offers and news' }
                        ].map(({ key, label, description }) => (
                            <div key={key} className="flex items-center justify-between">
                                <div>
                                    <Label className="font-medium">{label}</Label>
                                    <p className="text-sm text-gray-500">{description}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={preferences.notifications[key as keyof typeof preferences.notifications]}
                                        onChange={(e) => handlePreferenceChange('notifications', key, e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Privacy Preferences */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                        <div>
                            <Label className="font-medium">Profile Visibility</Label>
                            <select
                                value={preferences.privacy.profileVisibility}
                                onChange={(e) => handlePreferenceChange('privacy', 'profileVisibility', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="friends">Friends Only</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-medium">Data Sharing</Label>
                                <p className="text-sm text-gray-500">Share anonymized data for service improvement</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={preferences.privacy.dataSharing}
                                    onChange={(e) => handlePreferenceChange('privacy', 'dataSharing', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-medium">Analytics</Label>
                                <p className="text-sm text-gray-500">Help us improve with usage analytics</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={preferences.privacy.analytics}
                                    onChange={(e) => handlePreferenceChange('privacy', 'analytics', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* AI Preferences */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">AI & Personalization</h3>
                    <div className="space-y-4">
                        {[
                            { key: 'personalizedRecommendations', label: 'Personalized Recommendations', description: 'AI-powered suggestions based on your preferences' },
                            { key: 'chatbotEnabled', label: 'AI Chatbot', description: 'Enable AI assistant for customer support' },
                            { key: 'dataProcessing', label: 'AI Data Processing', description: 'Allow AI to process your data for better experience' }
                        ].map(({ key, label, description }) => (
                            <div key={key} className="flex items-center justify-between">
                                <div>
                                    <Label className="font-medium">{label}</Label>
                                    <p className="text-sm text-gray-500">{description}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={preferences.ai[key as keyof typeof preferences.ai]}
                                        onChange={(e) => handlePreferenceChange('ai', key, e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* General Preferences */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label>Language</Label>
                            <select
                                value={preferences.language}
                                onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="en">English</option>
                                <option value="nl">Nederlands</option>
                                <option value="de">Deutsch</option>
                                <option value="fr">Français</option>
                            </select>
                        </div>

                        <div>
                            <Label>Currency</Label>
                            <select
                                value={preferences.currency}
                                onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="EUR">EUR (€)</option>
                                <option value="USD">USD ($)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>

                        <div>
                            <Label>Timezone</Label>
                            <select
                                value={preferences.timezone}
                                onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="Europe/Amsterdam">Amsterdam</option>
                                <option value="Europe/London">London</option>
                                <option value="America/New_York">New York</option>
                                <option value="Asia/Tokyo">Tokyo</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                    <ButtonPrimary 
                        type="submit" 
                        disabled={isUpdating || loading}
                        className="flex items-center gap-2"
                    >
                        {isUpdating ? 'Saving...' : 'Save Preferences'}
                    </ButtonPrimary>
                    
                    <button
                        type="button"
                        onClick={loadPreferences}
                        disabled={loading}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Reset'}
                    </button>
                </div>

                {/* API Integration Info */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">🔗 Preferences API Integration</h4>
                    <p className="text-sm text-gray-600">
                        ✅ POST /users/preferences - Save user preferences<br/>
                        ✅ GET /users/{user?.id}/preferences - Load user preferences
                    </p>
                    {user && (
                        <p className="text-xs text-green-600 mt-2">
                            Managing preferences for: {user.firstName} {user.lastName} (ID: {user.id})
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AccountPreferencesPage; 