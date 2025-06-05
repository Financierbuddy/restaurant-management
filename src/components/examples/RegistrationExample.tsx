'use client';

import React, { useState } from 'react';
import { useAuthAPI } from '@/hooks/useAuthAPI';
import { useAuth } from '@/contexts/AuthContext';
import { ClientRegisterPayload, PartnerRegisterPayload, AdminRegisterPayload } from '@/types/auth.types';

type UserRole = 'client' | 'partner' | 'admin';

export default function RegistrationExample() {
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    // Partner specific
    companyName: '',
    kvkNumber: '',
    vatNumber: '',
    // Admin specific
    adminCode: '',
  });

  const { registerClient, registerPartner, registerAdmin, loading, error, clearError } = useAuthAPI();
  const { login: setAuthState } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

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

    if (result && result.token) {
      // Auto-login after successful registration
      setAuthState(result.token, {
        id: result.user.id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        phoneNumber: result.user.phoneNumber,
        role: result.user.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      console.log('Registration successful:', result);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as UserRole);
    // Reset form data when role changes
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      companyName: '',
      kvkNumber: '',
      vatNumber: '',
      adminCode: '',
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selection */}
        <div>
          <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">
            User Type
          </label>
          <select
            id="userRole"
            name="userRole"
            value={userRole}
            onChange={handleRoleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="client">Client</option>
            <option value="partner">Partner</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Common Fields */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="user@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your password"
          />
        </div>

        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="John"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Doe"
          />
        </div>

        {/* Phone Number for Client and Partner */}
        {(userRole === 'client' || userRole === 'partner') && (
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="+31612345678"
            />
          </div>
        )}

        {/* Partner Specific Fields */}
        {userRole === 'partner' && (
          <>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Business Corp"
              />
            </div>

            <div>
              <label htmlFor="kvkNumber" className="block text-sm font-medium text-gray-700">
                KVK Number
              </label>
              <input
                type="text"
                id="kvkNumber"
                name="kvkNumber"
                value={formData.kvkNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="12345678"
              />
            </div>

            <div>
              <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700">
                VAT Number
              </label>
              <input
                type="text"
                id="vatNumber"
                name="vatNumber"
                value={formData.vatNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="NL123456789B01"
              />
            </div>
          </>
        )}

        {/* Admin Specific Fields */}
        {userRole === 'admin' && (
          <div>
            <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700">
              Admin Code
            </label>
            <input
              type="text"
              id="adminCode"
              name="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="ADMIN_SECRET_CODE"
            />
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Registering...' : `Register as ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`}
        </button>
      </form>
    </div>
  );
} 