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
}