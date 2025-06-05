'use client';

import React, { useState, useEffect } from 'react';
import NcModal from '@/shared/NcModal';
import ButtonPrimary from '@/shared/ButtonPrimary';
import StatusCard from '@/components/StatusCard';
import UserModal, { UserData } from './model/UserModal';
import { useAuthAPI } from '@/hooks/useAuthAPI';
import { useAuth } from '@/contexts/AuthContext';

// Keep the initial demo data as fallback
const initialUsers: UserData[] = [
    {
        user_id: 1,
        name: 'Anjali Rana',
        email: 'anjali@example.com',
        password_hash: '',
        phone: '9876543210',
        wallet_balance: 500.75,
        referral_code: 'REF12345',
        referred_by: null,
        newsletter_opt_in: true,
    },
    {
        user_id: 2,
        name: 'Rahul Shah',
        email: 'rahul@example.com',
        password_hash: '',
        phone: '9988776655',
        wallet_balance: 150.5,
        referral_code: 'RAHUL2024',
        referred_by: 1,
        newsletter_opt_in: false,
    },
     {
        user_id: 3,
        name: 'Anjali Rana',
        email: 'anjali@example.com',
        password_hash: '',
        phone: '9876543210',
        wallet_balance: 500.75,
        referral_code: 'REF12345',
        referred_by: null,
        newsletter_opt_in: true,
    },
    {
        user_id: 4,
        name: 'Rahul Shah',
        email: 'rahul@example.com',
        password_hash: '',
        phone: '9988776655',
        wallet_balance: 150.5,
        referral_code: 'RAHUL2024',
        referred_by: 1,
        newsletter_opt_in: false,
    },
     {
        user_id: 5,
        name: 'Anjali Rana',
        email: 'anjali@example.com',
        password_hash: '',
        phone: '9876543210',
        wallet_balance: 500.75,
        referral_code: 'REF12345',
        referred_by: null,
        newsletter_opt_in: true,
    },
    {
        user_id: 6,
        name: 'Rahul Shah',
        email: 'rahul@example.com',
        password_hash: '',
        phone: '9988776655',
        wallet_balance: 150.5,
        referral_code: 'RAHUL2024',
        referred_by: 1,
        newsletter_opt_in: false,
    },
     {
        user_id: 7,
        name: 'Anjali Rana',
        email: 'anjali@example.com',
        password_hash: '',
        phone: '9876543210',
        wallet_balance: 500.75,
        referral_code: 'REF12345',
        referred_by: null,
        newsletter_opt_in: true,
    },
    {
        user_id: 8,
        name: 'Rahul Shah',
        email: 'rahul@example.com',
        password_hash: '',
        phone: '9988776655',
        wallet_balance: 150.5,
        referral_code: 'RAHUL2024',
        referred_by: 1,
        newsletter_opt_in: false,
    },
     {
        user_id: 9,
        name: 'Anjali Rana',
        email: 'anjali@example.com',
        password_hash: '',
        phone: '9876543210',
        wallet_balance: 500.75,
        referral_code: 'REF12345',
        referred_by: null,
        newsletter_opt_in: true,
    },
    {
        user_id: 10,
        name: 'Rahul Shah',
        email: 'rahul@example.com',
        password_hash: '',
        phone: '9988776655',
        wallet_balance: 150.5,
        referral_code: 'RAHUL2024',
        referred_by: 1,
        newsletter_opt_in: false,
    },
];

const UsersPage = () => {
    const { user: currentUser, isAuthenticated } = useAuth();
    const { getCurrentUser, getUserById, loading, error, clearError } = useAuthAPI();
    
    const [users, setUsers] = useState<UserData[]>(initialUsers);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [apiUserData, setApiUserData] = useState<any>(null);

    // Check if current user is admin
    const isAdmin = currentUser?.role === 'admin';

    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            loadCurrentUser();
        }
    }, [isAuthenticated, isAdmin]);

    const loadCurrentUser = async () => {
        try {
            const userData = await getCurrentUser();
            if (userData) {
                console.log('Current admin user:', userData);
                // Convert API user data to local format if needed
                const convertedUser: UserData = {
                    user_id: userData.id || 0,
                    name: `${userData.firstName} ${userData.lastName}`,
                    email: userData.email,
                    password_hash: '',
                    phone: userData.phone || '',
                    wallet_balance: 0, // Would come from wallet API
                    referral_code: '',
                    referred_by: null,
                    newsletter_opt_in: false,
                };
                
                // Add or update current user in the list
                setUsers(prev => {
                    const existingIndex = prev.findIndex(u => u.user_id === convertedUser.user_id);
                    if (existingIndex >= 0) {
                        const updated = [...prev];
                        updated[existingIndex] = convertedUser;
                        return updated;
                    } else {
                        return [convertedUser, ...prev];
                    }
                });
            }
        } catch (err) {
            console.error('Failed to load current user:', err);
        }
    };

    const loadUserById = async (userId: number) => {
        setLoadingUsers(true);
        setSelectedUserId(userId);
        try {
            const userData = await getUserById(userId);
            if (userData) {
                setApiUserData(userData);
                console.log('Loaded user by ID:', userData);
                
                // Convert API user data to local format
                const convertedUser: UserData = {
                    user_id: userData.id || userId,
                    name: `${userData.firstName} ${userData.lastName}`,
                    email: userData.email,
                    password_hash: '',
                    phone: userData.phone || '',
                    wallet_balance: 0, // Would come from wallet API
                    referral_code: '',
                    referred_by: null,
                    newsletter_opt_in: false,
                };
                
                // Update the user in the list
                setUsers(prev => 
                    prev.map(u => u.user_id === userId ? convertedUser : u)
                );
            }
        } catch (err) {
            console.error('Failed to load user by ID:', err);
        } finally {
            setLoadingUsers(false);
            setSelectedUserId(null);
        }
    };

    const handleSaveUser = (updatedUser: UserData) => {
        if (updatedUser.user_id) {
            setUsers((prev) =>
                prev.map((u) =>
                    u.user_id === updatedUser.user_id ? { ...u, ...updatedUser } : u
                )
            );
        } else {
            const newUser = {
                ...updatedUser,
                user_id: Math.floor(Math.random() * 100000),
            };
            setUsers((prev) => [...prev, newUser]);
        }
        setEditingUser(null);
        setIsModalOpen(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto py-10 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
                <p className="text-gray-600">Please log in to access the admin panel.</p>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="container mx-auto py-10 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Admin Access Required</h2>
                <p className="text-gray-600">You need admin privileges to access this page.</p>
                <p className="text-sm text-gray-500 mt-2">Current role: {currentUser?.role}</p>
            </div>
        );
    }

    return (
        <div className="container min-h-screen mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Users Management
                </h2>
                <div className="flex gap-4">
                    <ButtonPrimary
                        onClick={loadCurrentUser}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {loading ? 'Loading...' : '🔄 Refresh Current User'}
                    </ButtonPrimary>
                    
                <ButtonPrimary
                    onClick={() => {
                        setEditingUser(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Add User
                </ButtonPrimary>
                </div>
            </div>

            {/* API Status */}
            {loading && (
                <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-700">Loading user data...</p>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 rounded-lg flex justify-between items-center">
                    <p className="text-red-700">Error: {error}</p>
                    <button
                        onClick={clearError}
                        className="text-red-500 hover:text-red-700"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Current Admin Info */}
            {currentUser && (
                <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-700 mb-2">👤 Current Admin User</h3>
                    <p className="text-sm text-green-600">
                        {currentUser.firstName} {currentUser.lastName} ({currentUser.email}) - Role: {currentUser.role}
                    </p>
                </div>
            )}

            {/* API Test Panel */}
            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">🔗 User API Testing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Test Load User by ID:</p>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="User ID"
                                className="px-3 py-1 border rounded text-sm"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const id = parseInt((e.target as HTMLInputElement).value);
                                        if (id) loadUserById(id);
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    const input = document.querySelector('input[placeholder="User ID"]') as HTMLInputElement;
                                    const id = parseInt(input?.value || '');
                                    if (id) loadUserById(id);
                                }}
                                disabled={loadingUsers}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                            >
                                {loadingUsers ? 'Loading...' : 'Load'}
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-sm text-gray-600">API Endpoints:</p>
                        <div className="text-xs text-gray-500 space-y-1">
                            <p>✅ GET /users/me - Current user info</p>
                            <p>✅ GET /users/{'{id}'} - User by ID</p>
                        </div>
                    </div>
                </div>
                
                {apiUserData && (
                    <div className="mt-3 p-3 bg-white rounded border">
                        <p className="text-sm font-medium">Latest API Response:</p>
                        <pre className="text-xs text-gray-600 mt-1 overflow-x-auto">
                            {JSON.stringify(apiUserData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user, index) => (
                    <NcModal
                        key={user.user_id}
                        modalTitle={`Edit User: ${user.name}`}
                        contentExtraClass="max-w-2xl"
                        isOpenProp={editingUser?.user_id === user.user_id}
                        onCloseModal={() => setEditingUser(null)}
                        renderTrigger={(openModal) => (
                            <div className="relative">
                                {/* API Load Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        loadUserById(user.user_id);
                                    }}
                                    disabled={loadingUsers && selectedUserId === user.user_id}
                                    className="absolute top-2 right-2 z-10 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:opacity-50"
                                >
                                    {loadingUsers && selectedUserId === user.user_id ? '...' : '🔄'}
                                </button>
                                
                            <StatusCard
                                logo="https://www.gstatic.com/flights/airline_logos/70px/KE.png"
                                title={user.name}
                                subtitle={user.email}
                                value={`₹${user.wallet_balance.toFixed(2)}`}
                                valueCaption={`Phone: ${user.phone}`}
                                    className={`${
                                        currentUser?.id === user.user_id 
                                            ? 'border-2 border-green-600 dark:border-2 dark:border-green-400' 
                                            : index % 2 === 0 
                                                ? 'border-2 border-blue-400 dark:border-2 dark:border-blue-400' 
                                                : 'border-2 border-red-400 dark:border-2 dark:border-red-400'
                                    } cursor-pointer transition-all hover:scale-105`}
                                onClick={() => {
                                    setEditingUser(user);
                                    openModal();
                                }}
                            />
                            </div>
                        )}
                        renderContent={() => (
                            <UserModal
                                initialData={editingUser as UserData}
                                onClose={() => setEditingUser(null)}
                                onSave={handleSaveUser}
                            />
                        )}
                    />
                ))}
            </div>
            
            {isModalOpen && (
                <NcModal
                    modalTitle="Add New User"
                    contentExtraClass="max-w-xl"
                    isOpenProp={isModalOpen}
                    onCloseModal={() => setIsModalOpen(false)}
                    renderContent={() => (
                        <UserModal
                            initialData={null}
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSaveUser}
                        />
                    )}
                />
            )}
        </div>
    );
};

export default UsersPage;
