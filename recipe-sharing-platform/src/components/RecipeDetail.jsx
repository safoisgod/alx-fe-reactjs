import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipes from '../data.json';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundRecipe = recipes.find(r => r.id === parseInt(id));
        setRecipe(foundRecipe);
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded mb-4"></div>
                    <div className="h-64 bg-gray-300 rounded mb-8"></div>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Recipe Not Found</h1>
                <p className="text-gray-600 mb-8">The recipe you're looking for doesn't exist.</p>
                <Link
                    to="/"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">

            <Link
                to="/"
                className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 transition-colors duration-200"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Recipes
            </Link>

            {/* Recipe Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    {recipe.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    {recipe.summary}
                </p>
            </div>


            <div className="mb-8">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
                        Ingredients
                    </h2>
                    <ul className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li
                                key={index}
                                className="flex items-start text-gray-700"
                            >
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="leading-relaxed">{ingredient}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 pb-2">
                        Instructions
                    </h2>
                    <ol className="space-y-4">
                        {recipe.instructions.map((instruction, index) => (
                            <li
                                key={index}
                                className="flex items-start text-gray-700"
                            >
                                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                                    {index + 1}
                                </span>
                                <span className="leading-relaxed">{instruction}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
