import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipes from '../data.json';

const HomePage = () => {
    const [recipesData, setRecipesData] = useState([]);

    useEffect(() => {
        setRecipesData(recipes);
    }, []);

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Discover Amazing Recipes
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipesData.map(recipe => (
                    <Link
                        key={recipe.id}
                        to={`/recipe/${recipe.id}`}
                        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 block"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 truncate mb-2">
                                {recipe.title}
                            </h2>
                            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                                {recipe.summary}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
