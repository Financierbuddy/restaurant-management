'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function TestAPIPage() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Laravel API Integration Test Suite
          </h1>
          <p className="text-lg text-gray-600">
            Test all your Laravel backend endpoints from the frontend
          </p>
          
          {isAuthenticated && user && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">
                ✅ Logged in as: <strong>{user.firstName} {user.lastName}</strong> ({user.email})
              </p>
              <p className="text-green-600">Role: {user.role}</p>
              <button
                onClick={handleLogout}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Authentication Tests */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🔐 Authentication
            </h2>
            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Test Login
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Test Registration
              </Link>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>• POST /auth/login</p>
              <p>• POST /auth/{`{role}`}/register</p>
              <p>• POST /logout</p>
            </div>
            <div className="mt-3 text-xs text-blue-600">
              ✨ Uses actual login/signup pages
            </div>
          </div>

          {/* Profile Management Tests */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              👤 Profile Management
            </h2>
            <div className="space-y-3">
              <Link
                href="/test-api/profile"
                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Test Profile API
              </Link>
              <Link
                href="/account"
                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                View Account Page
              </Link>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>• GET /profile</p>
              <p>• PUT /profile</p>
              <p>• GET /users/me</p>
              <p>• POST /users/preferences</p>
            </div>
          </div>

          {/* QR Code Tests */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📱 QR Code & Interactions
            </h2>
            <div className="space-y-3">
              <Link
                href="/test-api/qr"
                className="block w-full text-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Test QR Code API
              </Link>
              <Link
                href="/qr"
                className="block w-full text-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                QR Scanner (if exists)
              </Link>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>• GET /qr/{`{hash}`}/{`{slug}`}</p>
              <p>• POST /qr/interacties</p>
            </div>
          </div>

          {/* User Management Tests */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              👥 User Management
            </h2>
            <div className="space-y-3">
              <Link
                href="/test-api/users"
                className="block w-full text-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Test User API
              </Link>
              {isAuthenticated && (
                <Link
                  href="/admin-v1"
                  className="block w-full text-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>• GET /users/me</p>
              <p>• GET /users/{`{id}`}</p>
              <p>• GET /users/{`{id}`}/preferences</p>
            </div>
          </div>

          {/* API Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🌐 API Connection
            </h2>
            <div className="space-y-3">
              <Link
                href="/test-api/status"
                className="block w-full text-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Check API Status
              </Link>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>• Test connectivity</p>
              <p>• Check environment</p>
              <p>• Validate setup</p>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📋 Example Components
            </h2>
            <div className="space-y-3">
              <Link
                href="/test-api/examples"
                className="block w-full text-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                View Code Examples
              </Link>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>• Login example</p>
              <p>• Registration example</p>
              <p>• QR interaction example</p>
            </div>
          </div>
        </div>

        {/* Quick Actions for Authenticated Users */}
        {isAuthenticated && (
          <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🚀 Quick Actions (You're logged in!)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/account"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
              >
                View Profile
              </Link>
              <Link
                href="/test-api/profile"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-center"
              >
                Test Profile API
              </Link>
              <Link
                href="/test-api/qr"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-center"
              >
                Test QR API
              </Link>
            </div>
          </div>
        )}

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📋 Testing Instructions
          </h3>
          <ul className="text-blue-800 space-y-1">
            <li>1. <strong>Start your Laravel API server</strong> (make sure it's running)</li>
            <li>2. <strong>Update NEXT_PUBLIC_API_URL</strong> in your .env.local file</li>
            <li>3. <strong>Test Authentication:</strong> Click "Test Login" or "Test Registration" above</li>
            <li>4. <strong>Check Network Tab:</strong> Open browser DevTools to see API calls</li>
            <li>5. <strong>Monitor Laravel Logs:</strong> Watch backend for incoming requests</li>
          </ul>
        </div>

        {/* Current Environment Info */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">🔧 Environment Info</h4>
          <p className="text-sm text-gray-600">
            API URL: <code className="bg-gray-200 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_API_URL || 'Not set'}</code>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Authentication: <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
              {isAuthenticated ? 'Logged in' : 'Not logged in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
} 