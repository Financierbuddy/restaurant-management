<<<<<<< Updated upstream
// app/qr/[partnerSlug]/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Input from '@/shared/Input';
import {
    FaWhatsapp,
    FaStar,
    FaUserFriends,
    FaBirthdayCake,
    FaGift,
    FaInstagram,
    FaBell,
    FaHeart,
    FaPhoneAlt
} from 'react-icons/fa';
import pic2 from "@/images/custom-home/pic.jpg";
import QrScanner from './(components)/QrScanner';
import CustomerReviews from '../reviews/(components)/CustomerReviews';
export default function QrLandingPage() {
    return (
        <div className="bg-gradient-to-br from-[#f0f4ff] via-[#fefeff] to-[#e9f6ff] dark:from-gray-900 dark:to-gray-950 min-h-screen w-full font-inter text-gray-800 dark:text-gray-100 transition-colors">
            <section className="relative w-full mx-auto max-w-5xl min-h-screen flex  flex-col items-center justify-center  overflow-hidden">
                <div className="relative w-full h-auto  md:w-3/4 flex items-center justify-center p-8 text-white overflow-hidden">
                    <Image
                        src={pic2}
                        alt="QR Hero"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-40 h-screen border"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                    <div className="relative z-10 text-center space-y-4 max-w-md">

                        <h1 className="text-4xl font-bold leading-snug tracking-tight uppercase">
                            Welcome to<br />The Park <span className="inline-block animate-pulse">👋</span>
                        </h1>
                        <p className="text-lg text-gray-200 font-medium">
                            Get your free €5 bonus in just 10 seconds.
                        </p>
                        <FaGift className="text-red-400 text-4xl mx-auto animate-bounce" />
                        {/* <QrScanner /> */}
                        <div className='flex items-center justify-center w-fit mx-auto cursor-pointer px-4 py-2 gap-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'>
                            <FaWhatsapp className="text-green-400 text-4xl" />
                            <p className="text-lg font-semibold"> 5€ bonus</p>
                        </div>

                    </div>

                </div>
                <div className="relative w-full  min-h-screen md:w-3/4 z-10 py-4 sm:py-6 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="col-span-1 sm:col-span-2 bg-gradient-to-r from-white via-gray-100 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl px-4 py-4 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                            <div className="relative w-full">
                                <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm" />
                                <Input
                                    type="text"
                                    placeholder="Your phone or email"
                                    className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                />
                            </div>
                            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap">
                                Get Bonus
                            </button>
                        </div>

                        <p className="col-span-1 sm:col-span-2 text-xs text-center text-gray-500 dark:text-gray-400">
                            ⇄ Keep me updated via <span className="font-semibold">WhatsApp</span>
                        </p>

                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <FaWhatsapp className="text-green-500 animate-pulse" />
                                <p className="font-semibold text-black dark:text-white">Have a question? Ask our AI</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md text-sm text-gray-800 dark:text-gray-200">
                                What are your hours today?
                            </div>
                        </div>
                        <div className="col-span-1 sm:col-span-2 rounded-xl    flex flex-col sm:flex-row items-center justify-center gap-4">
                            {[{
                                icon: <FaStar className="text-yellow-400 text-lg" />,
                                label: 'Refer friends',
                                sub: 'Bonus for 2+ scans',
                            }, {
                                icon: <FaBirthdayCake className="text-pink-500 text-2xl mx-auto animate-bounce" />,
                                label: 'Birthday Gift',
                                sub: 'Remind me on my day',
                            }, {
                                icon: <FaInstagram className="text-purple-500 text-2xl mx-auto animate-pulse" />,
                                label: 'Tag us',
                                sub: 'Earn +€2 for story tag',
                            }].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-w-20 w-full shadow p-4 text-center "
                                >
                                    <div className="flex justify-center">{item.icon}</div>
                                    <p className="text-sm font-semibold text-black dark:text-white">{item.label}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.sub}</p>
                                </div>
                            ))}
                        </div>



                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-4 text-center">
                            <FaGift className="text-red-500 text-2xl mx-auto" />
                            <p className="text-sm font-semibold text-black dark:text-white">Today&apos;s Deals</p>
                            <div className="flex space-x-2 overflow-x-auto mt-2 scrollbar-hide">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-full h-14 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-md flex items-center justify-center text-xs font-semibold">
                                        Deal {i}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-3 flex items-center justify-center gap-2">
                            <FaBell className="text-yellow-500 animate-pulse" />
                            <span className="text-sm text-black dark:text-white">Reminder in 3 days!</span>
                        </div>

                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-4 flex flex-col items-center justify-center text-center">
                            <CustomerReviews/>
                            {/* <FaHeart className="text-red-500 text-2xl mb-1 animate-ping" /> */}
                            <p className="text-sm font-semibold text-black dark:text-white mt-4">Loving it?</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Tell a friend or leave a review</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
=======
// app/qr/[partnerSlug]/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Input from '@/shared/Input';
import {
    FaWhatsapp,
    FaStar,
    FaUserFriends,
    FaBirthdayCake,
    FaGift,
    FaInstagram,
    FaBell,
    FaHeart,
    FaPhoneAlt
} from 'react-icons/fa';
import pic2 from "@/images/custom-home/pic.jpg";
import QrScanner from './(components)/QrScanner';
import CustomerReviews from '../reviews/(components)/CustomerReviews';
import { useQRAPI } from '@/hooks/useQRAPI';
import { QRInteractionType } from '@/types/auth.types';

export default function QrLandingPage() {
    const { getQRCode, submitQRInteraction, loading, error, clearError } = useQRAPI();
    
    // For demo purposes - in real app these would come from URL params
    const [qrParams] = useState({
        hash: 'demo-hash-123',
        slug: 'the-park-restaurant'
    });
    
    const [qrData, setQrData] = useState<any>(null);
    const [phoneEmail, setPhoneEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [birthdayDate, setBirthdayDate] = useState('');

    // Load QR data on component mount
    useEffect(() => {
        loadQRData();
    }, []);

    const loadQRData = async () => {
        try {
            const data = await getQRCode(qrParams.hash, qrParams.slug);
            if (data) {
                setQrData(data);
            }
        } catch (err) {
            console.error('Failed to load QR data:', err);
        }
    };

    const handleBonusSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneEmail.trim()) return;

        setIsSubmitting(true);
        clearError();
        setSuccessMessage('');

        try {
            await submitQRInteraction({
                hash: qrParams.hash,
                slug: qrParams.slug,
                type: QRInteractionType.BONUS,
                data: {
                    contact: phoneEmail.trim()
                }
            });
            
            setSuccessMessage('🎉 Bonus claimed successfully! Check your WhatsApp.');
            setPhoneEmail('');
            // Clear success message after 5 seconds
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (err) {
            console.error('Failed to submit bonus:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReviewSubmit = async () => {
        try {
            await submitQRInteraction({
                hash: qrParams.hash,
                slug: qrParams.slug,
                type: QRInteractionType.REVIEW,
                data: {
                    contact: phoneEmail || 'anonymous'
                }
            });
            setSuccessMessage('Thank you for leaving a review! 🌟');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Failed to submit review:', err);
        }
    };

    const handleBirthdaySubmit = async () => {
        if (!birthdayDate) return;

        try {
            await submitQRInteraction({
                hash: qrParams.hash,
                slug: qrParams.slug,
                type: QRInteractionType.BIRTHDAY,
                data: {
                    contact: phoneEmail || 'anonymous',
                    birthday: birthdayDate
                }
            });
            setSuccessMessage('🎂 Birthday reminder set! We\'ll surprise you on your special day.');
            setBirthdayDate('');
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (err) {
            console.error('Failed to submit birthday:', err);
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#f0f4ff] via-[#fefeff] to-[#e9f6ff] dark:from-gray-900 dark:to-gray-950 min-h-screen w-full font-inter text-gray-800 dark:text-gray-100 transition-colors">
            <section className="relative w-full mx-auto max-w-5xl min-h-screen flex  flex-col items-center justify-center  overflow-hidden">
                <div className="relative w-full h-auto  md:w-3/4 flex items-center justify-center p-8 text-white overflow-hidden">
                    <Image
                        src={pic2}
                        alt="QR Hero"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-40 h-screen border"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                    <div className="relative z-10 text-center space-y-4 max-w-md">

                        <h1 className="text-4xl font-bold leading-snug tracking-tight uppercase">
                            Welcome to<br />{qrData?.name || 'The Park'} <span className="inline-block animate-pulse">👋</span>
                        </h1>
                        <p className="text-lg text-gray-200 font-medium">
                            Get your free €5 bonus in just 10 seconds.
                        </p>
                        <FaGift className="text-red-400 text-4xl mx-auto animate-bounce" />
                        {/* <QrScanner /> */}
                        <div className='flex items-center justify-center w-fit mx-auto cursor-pointer px-4 py-2 gap-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'>
                            <FaWhatsapp className="text-green-400 text-4xl" />
                            <p className="text-lg font-semibold"> 5€ bonus</p>
                        </div>

                        {/* API Status */}
                        {loading && (
                            <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-2">
                                <p className="text-blue-200 text-sm">Loading QR data...</p>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-600/20 backdrop-blur-sm rounded-lg p-2">
                                <p className="text-red-200 text-sm">Error: {error}</p>
                            </div>
                        )}

                        {successMessage && (
                            <div className="bg-green-600/20 backdrop-blur-sm rounded-lg p-3">
                                <p className="text-green-200 text-sm font-medium">{successMessage}</p>
                            </div>
                        )}
                    </div>

                </div>
                <div className="relative w-full  min-h-screen md:w-3/4 z-10 w-full py-4 sm:py-6 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Bonus Form - Connected to API */}
                        <form onSubmit={handleBonusSubmit} className="col-span-1 sm:col-span-2 bg-gradient-to-r from-white via-gray-100 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl px-4 py-4 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                            <div className="relative w-full">
                                <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm" />
                                <Input
                                    type="text"
                                    placeholder="Your phone or email"
                                    value={phoneEmail}
                                    onChange={(e) => setPhoneEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                />
                            </div>
                            <button 
                                type="submit"
                                disabled={isSubmitting || !phoneEmail.trim()}
                                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-full text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                {isSubmitting ? 'Processing...' : 'Get Bonus'}
                            </button>
                        </form>

                        <p className="col-span-1 sm:col-span-2 text-xs text-center text-gray-500 dark:text-gray-400">
                            ⇄ Keep me updated via <span className="font-semibold">WhatsApp</span>
                        </p>

                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <FaWhatsapp className="text-green-500 animate-pulse" />
                                <p className="font-semibold text-black dark:text-white">Have a question? Ask our AI</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md text-sm text-gray-800 dark:text-gray-200">
                                What are your hours today?
                            </div>
                        </div>

                        {/* Interactive Action Cards */}
                        <div className="col-span-1 sm:col-span-2 rounded-xl    flex flex-col sm:flex-row items-center justify-center gap-4">
                            {[{
                                icon: <FaStar className="text-yellow-400 text-lg" />,
                                label: 'Refer friends',
                                sub: 'Bonus for 2+ scans',
                                onClick: () => {
                                    // Trigger referral interaction
                                    submitQRInteraction({
                                        hash: qrParams.hash,
                                        slug: qrParams.slug,
                                        type: QRInteractionType.REFERRAL,
                                        data: { contact: phoneEmail || 'anonymous' }
                                    });
                                }
                            }, {
                                icon: <FaBirthdayCake className="text-pink-500 text-2xl mx-auto animate-bounce" />,
                                label: 'Birthday Gift',
                                sub: 'Remind me on my day',
                                onClick: () => {
                                    const birthday = prompt('Enter your birthday (YYYY-MM-DD):');
                                    if (birthday) {
                                        setBirthdayDate(birthday);
                                        handleBirthdaySubmit();
                                    }
                                }
                            }, {
                                icon: <FaInstagram className="text-purple-500 text-2xl mx-auto animate-pulse" />,
                                label: 'Tag us',
                                sub: 'Earn +€2 for story tag',
                                onClick: () => {
                                    // Trigger Instagram interaction
                                    submitQRInteraction({
                                        hash: qrParams.hash,
                                        slug: qrParams.slug,
                                        type: QRInteractionType.SOCIAL_MEDIA,
                                        data: { 
                                            contact: phoneEmail || 'anonymous',
                                            platform: 'instagram'
                                        }
                                    });
                                }
                            }].map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={item.onClick}
                                    className="cursor-pointer hover:scale-105 transition-transform rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-w-20 w-full shadow p-4 text-center "
                                >
                                    <div className="flex justify-center">{item.icon}</div>
                                    <p className="text-sm font-semibold text-black dark:text-white">{item.label}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-4 text-center">
                            <FaGift className="text-red-500 text-2xl mx-auto" />
                            <p className="text-sm font-semibold text-black dark:text-white">Today&apos;s Deals</p>
                            <div className="flex space-x-2 overflow-x-auto mt-2 scrollbar-hide">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-full h-14 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-md flex items-center justify-center text-xs font-semibold">
                                        Deal {i}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-3 flex items-center justify-center gap-2">
                            <FaBell className="text-yellow-500 animate-pulse" />
                            <span className="text-sm text-black dark:text-white">Reminder in 3 days!</span>
                        </div>

                        {/* Review Section - Connected to API */}
                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-4 flex flex-col items-center justify-center text-center">
                            <CustomerReviews/>
                            <p className="text-sm font-semibold text-black dark:text-white mt-4">Loving it?</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Tell a friend or leave a review</p>
                            
                            <button
                                onClick={handleReviewSubmit}
                                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                ⭐ Leave a Review
                            </button>
                        </div>

                        {/* API Integration Info */}
                        <div className="col-span-1 sm:col-span-2 rounded-xl border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 shadow p-4">
                            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🔗 QR API Integration</h4>
                            <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                                <p>✅ GET /qr/{qrParams.hash}/{qrParams.slug} - Load QR data</p>
                                <p>✅ POST /qr/interacties - Submit interactions</p>
                                <p>📍 Current QR: {qrParams.hash} / {qrParams.slug}</p>
                                {qrData && (
                                    <p>📊 Loaded: {JSON.stringify(qrData).substring(0, 50)}...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
>>>>>>> Stashed changes
}