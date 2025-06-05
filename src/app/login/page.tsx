"use client";

import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import { useAuthAPI } from "@/hooks/useAuthAPI";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { mapLaravelUserToProfile } from "@/types/auth.types";

const loginSocials = [
  { name: "Continue with Facebook", href: "#", icon: facebookSvg },
  { name: "Continue with Twitter", href: "#", icon: twitterSvg },
  { name: "Continue with Google", href: "#", icon: googleSvg },
];

const sliderImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative h-full w-full">
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-4" : "bg-white/50 dark:bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const PageLogin: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Use the new API hooks
  const { login, loading, error, clearError } = useAuthAPI();
  const { login: setAuthState, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/account");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    console.log('🔐 Login attempt started with:', { email, password: password ? '***' : 'empty' });

    try {
      const result = await login({ email, password });
      console.log('🔐 Raw login result:', result);
      
      if (result) {
        // Map Laravel user response to UserProfile format
        const userProfile = mapLaravelUserToProfile(result.user);
        console.log('🔐 Laravel user:', result.user);
        console.log('🔐 Mapped user profile:', userProfile);
        console.log('🔐 Token received:', result.token);
        
        // Set authentication state in context
        setAuthState(result.token, userProfile);
        console.log('🔐 Auth state set in context');
        
        // Check if token was stored in cookies
        const storedToken = require('js-cookie').get('token');
        console.log('🔐 Token stored in cookies:', storedToken ? 'YES' : 'NO');
        
        // Show success message
        console.log('🔐 Login successful, redirecting...');
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          router.push("/account");
        }, 100);
      } else {
        console.error('🔐 Login result was null or undefined');
      }
    } catch (err) {
      // Error is handled by the hook
      console.error('🔐 Login failed:', err);
    }
  };

  return (
    <div className="nc-PageLogin min-h-screen w-full bg-white dark:bg-neutral-900 transition-colors">
      <div className="container flex min-h-screen items-center justify-center px-4 py-16">
        <div className="flex w-full max-w-5xl flex-col md:flex-row overflow-hidden rounded-2xl shadow-xl">
          <div className="relative hidden w-full md:block md:w-1/2">
            <ImageSlider />
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
          </div>
          <div className="w-full md:w-1/2 bg-white dark:bg-neutral-800 p-8 md:p-10">
            <div className="max-w-md mx-auto">
              <div className="mb-6 space-y-2">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Hello 👋</p>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Good Morning
                </h2>
              </div>
              <h3 className="mb-6 text-lg font-medium text-neutral-900 dark:text-neutral-100">
                <span className="text-blue-600 dark:text-blue-400">Login</span> Your Account
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-0 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pb-2"
                />

                {error && (
                  <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-md text-center">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="accent-blue-500"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember Me
                  </label>
                  <Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400">
                    Forgot Password?
                  </Link>
                </div>

                <ButtonPrimary className="w-full mt-4" disabled={loading}>
                  {loading ? "Logging in..." : "SUBMIT"}
                </ButtonPrimary>

                <div className="pt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  No Account?{" "}
                  <Link href="/signup" className="text-blue-600 dark:text-blue-400 font-medium">
                    Create an Account
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

export default PageLogin;