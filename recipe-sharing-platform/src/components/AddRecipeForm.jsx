import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        ingredients: '',
        instructions: '',
        steps: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Recipe title is required';
        }

        if (!formData.image.trim()) {
            newErrors.image = 'Recipe image URL is required';
        } else if (!isValidUrl(formData.image)) {
            newErrors.image = 'Please enter a valid URL';
        }

        if (!formData.ingredients.trim()) {
            newErrors.ingredients = 'Ingredients are required';
        }

        if (!formData.instructions.trim()) {
            newErrors.instructions = 'Instructions are required';
        }

        if (!formData.steps.trim()) {
            newErrors.steps = 'Cooking steps are required';
        }

        return newErrors;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Process the form data
            const newRecipe = {
                id: Date.now(),
                title: formData.title.trim(),
                image: formData.image.trim(),
                summary: `Delicious ${formData.title.trim()} recipe`,
                ingredients: formData.ingredients.split('\n').filter(ingredient => ingredient.trim()),
                instructions: formData.instructions.split('\n').filter(instruction => instruction.trim()),
                steps: formData.steps.split('\n').filter(step => step.trim())
            };

            console.log('New Recipe:', newRecipe);

            // Reset form
            setFormData({
                title: '',
                image: '',
                ingredients: '',
                instructions: '',
                steps: ''
            });

            // Show success message and redirect
            alert('Recipe added successfully!');
            navigate('/');

        } catch (error) {
            console.error('Error submitting recipe:', error);
            alert('Failed to add recipe. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Add New Recipe
                    </h1>
                    <p className="text-gray-600">
                        Share your culinary creations with the community
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                    {/* Recipe Title */}
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                            Recipe Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter recipe title (e.g., Classic Chocolate Cake)"
                            className={`w-full px-4 py-3 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.title
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Recipe Image */}
                    <div className="mb-6">
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                            Recipe Image URL *
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="https://example.com/recipe-image.jpg"
                            className={`w-full px-4 py-3 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.image
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Ingredients */}
                    <div className="mb-6">
                        <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-700 mb-2">
                            Ingredients *
                        </label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleInputChange}
                            rows="6"
                            placeholder="Enter each ingredient on a new line:&#10;2 cups all-purpose flour&#10;1 cup sugar&#10;3 large eggs&#10;1/2 cup butter"
                            className={`w-full px-4 py-3 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                                errors.ingredients
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        />
                        {errors.ingredients && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.ingredients}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            Enter each ingredient on a separate line
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="mb-6">
                        <label htmlFor="instructions" className="block text-sm font-semibold text-gray-700 mb-2">
                            Cooking Instructions *
                        </label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleInputChange}
                            rows="6"
                            placeholder="Enter cooking instructions:&#10;Mix all dry ingredients together&#10;Add wet ingredients gradually&#10;Bake according to recipe directions"
                            className={`w-full px-4 py-3 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                                errors.instructions
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        />
                        {errors.instructions && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.instructions}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            Enter general cooking instructions
                        </p>
                    </div>

                    {/* Cooking Steps */}
                    <div className="mb-8">
                        <label htmlFor="steps" className="block text-sm font-semibold text-gray-700 mb-2">
                            Detailed Cooking Steps *
                        </label>
                        <textarea
                            id="steps"
                            name="steps"
                            value={formData.steps}
                            onChange={handleInputChange}
                            rows="8"
                            placeholder="Enter each detailed step on a new line:&#10;Step 1: Preheat oven to 350°F (175°C)&#10;Step 2: Mix dry ingredients in a large bowl&#10;Step 3: Beat eggs and add to mixture&#10;Step 4: Bake for 25-30 minutes until golden"
                            className={`w-full px-4 py-3 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                                errors.steps
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        />
                        {errors.steps && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.steps}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            Enter each detailed step on a separate line
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full sm:flex-1 px-6 py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            } text-white`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Adding Recipe...
                                </>
                            ) : (
                                'Add Recipe'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipeForm;
