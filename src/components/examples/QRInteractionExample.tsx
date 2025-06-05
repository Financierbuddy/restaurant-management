'use client';

import React, { useState } from 'react';
import { useQRAPI } from '@/hooks/useQRAPI';
import { QRInteractionPayload, ReviewData, BirthdayData } from '@/types/auth.types';

export default function QRInteractionExample() {
  const [qrHash, setQrHash] = useState('');
  const [campaignSlug, setCampaignSlug] = useState('');
  const [qrData, setQrData] = useState<any>(null);
  const [interactionType, setInteractionType] = useState<'review' | 'birthday'>('review');
  
  // Review form data
  const [reviewData, setReviewData] = useState<ReviewData>({
    rating: 5,
    comment: '',
    recommendationScore: 8,
  });

  // Birthday form data
  const [birthdayData, setBirthdayData] = useState<BirthdayData>({
    birthDate: '',
    name: '',
    email: '',
  });

  const { getQRCode, submitQRInteraction, loading, error, clearError } = useQRAPI();

  const handleFetchQRData = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!qrHash || !campaignSlug) {
      return;
    }

    const result = await getQRCode(qrHash, campaignSlug);
    if (result) {
      setQrData(result);
      console.log('QR Data fetched:', result);
    }
  };

  const handleSubmitInteraction = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!qrHash) {
      return;
    }

    const payload: QRInteractionPayload = {
      qrHash,
      type: interactionType,
      data: interactionType === 'review' ? reviewData : birthdayData,
    };

    const result = await submitQRInteraction(payload);
    if (result !== null) {
      console.log('QR Interaction submitted successfully');
      // Reset form
      if (interactionType === 'review') {
        setReviewData({ rating: 5, comment: '', recommendationScore: 8 });
      } else {
        setBirthdayData({ birthDate: '', name: '', email: '' });
      }
    }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'recommendationScore' ? parseInt(value) : value
    }));
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBirthdayData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">QR Code Interaction</h2>
      
      {/* Fetch QR Data Section */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">1. Fetch QR Code Data</h3>
        <form onSubmit={handleFetchQRData} className="space-y-4">
          <div>
            <label htmlFor="qrHash" className="block text-sm font-medium text-gray-700">
              QR Hash
            </label>
            <input
              type="text"
              id="qrHash"
              value={qrHash}
              onChange={(e) => setQrHash(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="abc123xyz"
            />
          </div>

          <div>
            <label htmlFor="campaignSlug" className="block text-sm font-medium text-gray-700">
              Campaign Slug
            </label>
            <input
              type="text"
              id="campaignSlug"
              value={campaignSlug}
              onChange={(e) => setCampaignSlug(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="summer-campaign"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Fetching...' : 'Fetch QR Data'}
          </button>
        </form>

        {qrData && (
          <div className="mt-4 p-3 bg-green-50 rounded-md">
            <h4 className="font-medium text-green-800">QR Data Retrieved:</h4>
            <pre className="text-sm text-green-700 mt-2">
              {JSON.stringify(qrData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Submit Interaction Section */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">2. Submit QR Interaction</h3>
        
        {/* Interaction Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interaction Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="review"
                checked={interactionType === 'review'}
                onChange={(e) => setInteractionType(e.target.value as 'review' | 'birthday')}
                className="mr-2"
              />
              Review
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="birthday"
                checked={interactionType === 'birthday'}
                onChange={(e) => setInteractionType(e.target.value as 'review' | 'birthday')}
                className="mr-2"
              />
              Birthday
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmitInteraction} className="space-y-4">
          {interactionType === 'review' ? (
            // Review Form
            <>
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  value={reviewData.rating}
                  onChange={handleReviewChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  value={reviewData.comment}
                  onChange={handleReviewChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Great service!"
                />
              </div>

              <div>
                <label htmlFor="recommendationScore" className="block text-sm font-medium text-gray-700">
                  Recommendation Score (1-10)
                </label>
                <input
                  type="number"
                  id="recommendationScore"
                  name="recommendationScore"
                  min="1"
                  max="10"
                  value={reviewData.recommendationScore}
                  onChange={handleReviewChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          ) : (
            // Birthday Form
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={birthdayData.name}
                  onChange={handleBirthdayChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={birthdayData.email}
                  onChange={handleBirthdayChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="birthday@example.com"
                />
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={birthdayData.birthDate}
                  onChange={handleBirthdayChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !qrHash}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : `Submit ${interactionType.charAt(0).toUpperCase() + interactionType.slice(1)}`}
          </button>
        </form>
      </div>
    </div>
  );
} 