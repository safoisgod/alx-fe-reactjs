import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="font-bold text-xl text-gray-800">Recipe Platform</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                location.pathname === '/'
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/add"
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                location.pathname === '/add'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        >
                            Add Recipe
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
