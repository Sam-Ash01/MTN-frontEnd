import React from 'react';
import { lightTheme } from '../../styles/light'; 

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-primary)]">
            <div className='w-full max-w-6xl mx-auto rounded-lg overflow-hidden '>
                <div className={`flex flex-col min-h-[80vh] md:flex-row bg-white m-8`}>
                    {/* Left Section */}
                    <div className="md:w-1/4 flex flex-col items-center justify-center bg-white p-8 shadow-md bg-[var(--color-surface)]">
                        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">Welcome to</h1>
                        <h2 className={`text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6`}>Train Track</h2>
                        <img
                            src="/assets/img/mtn-logo.svg"
                            alt="MTN Logo"
                            className="w-30 h-32 object-contain shadow-lg"
                        />
                    </div>

                    {/* Right Section */}
                    <div className="flex-1 flex items-center justify-center bg-white p-6">
                        <div className="w-full max-w-md">
                            <h2 className="text-2xl font-semibold text-start mb-6">Sign in</h2>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${lightTheme.focusRing}`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${lightTheme.focusRing}`}
                                    />
                                    <div className="text-right mt-1">
                                        <a href="#" className="text-sm text-gray-500 hover:underline">
                                            Forgot Password
                                        </a>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 bg-[var(--color-secondary)] text-white rounded-md ${lightTheme.buttonHover} transition-colors`}
                                >
                                    Sign in
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <a href="#" className="text-sm text-gray-600 hover:underline">
                                    Browse as a guest
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
