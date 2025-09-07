import React from 'react';

const Categories = () => {

    const fetchCategories = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/v1/categories");
            if (!res.ok) throw new Error("Failed to fetch categories");
            const categories = await res.json();
            console.log(categories);
            return categories;
        } catch (err) {
            console.error(err);
            return [];
        }
    };

    // Usage example
    fetchCategories().then((data) => {
        // do something with categories
    });

    return (
        <div>
            This is Fresh Categories
        </div>
    );
};

export default Categories;