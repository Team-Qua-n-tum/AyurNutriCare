import React from 'react';
import { Mail, User, Search, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Forget() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
                    <p className="text-gray-600">We'll help you get back into your account</p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        To reset your password, submit your username or email address below.
                        If we can find you in the database, an email will be sent with instructions
                        on how to regain access.
                    </p>
                </div>

                {/* Forms */}
                <div className="space-y-6">
                    {/* Username Search */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <form autoComplete="off" action="" method="post">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    Search by Username
                                </h3>

                                <div className="space-y-2">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <div className="relative">

                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="username"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                            placeholder="Enter your username"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    name="search-btn"
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                >
                                    <Search className="w-4 h-4" />
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Email Search */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <form autoComplete="off" action="" method="post">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-green-600" />
                                    Search by Email Address
                                </h3>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    name="search-btn"
                                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                                >
                                    <Search className="w-4 h-4" />
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Back Link */}
                <button
                    type="submit"
                    className="btn btn-primary w-full py-3"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                </button>
            </div>
        </div >
    );
}

export default Forget;