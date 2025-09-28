import React from 'react';


export default function UserProfile() {
return (
<div className="user-profile bg-gray-100 p-8 max-w-sm mx-auto my-20 rounded-lg shadow-lg">
<img
className="rounded-full w-36 h-36 mx-auto object-cover"
src="https://via.placeholder.com/150"
alt="User"
/>


<h1 className="text-xl text-blue-800 my-4 text-center">John Doe</h1>


<p className="text-gray-600 text-base text-center">
Developer at Example Co. Loves to write code and explore new technologies.
</p>
</div>
);
}