import React from 'react';
import DescriptionCard from '@/components/review/DescriptionCard';
import SpecificationCard from '@/components/review/SpecificationCard';
import ProductReviews from '@/pages/frontend/product/ProductReviews';

const DescriptionTabs = ({ product }) => {
  return (
    // name of each tab group should be unique
    <div className="tabs tabs-lift bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
      {/* Description Tab */}
      <input
        type="radio"
        name="my_tabs_3"
        className="tab bg-white dark:bg-gray-800"
        aria-label="Description"
        defaultChecked
      />
      <div className="tab-content bg-white dark:bg-gray-800  p-6  text-sm max-w-2xl">
        {product?.description}
        <br />
        <DescriptionCard />
      </div>

      {/* Specification Tab */}
      <input
        type="radio"
        name="my_tabs_3"
        className="tab bg-white dark:bg-gray-800"
        aria-label="Specification"
      />
      <div className="tab-content bg-white dark:bg-gray-800  p-6 ">
        <SpecificationCard />
      </div>

      {/* Questions Tab */}
      <input
        type="radio"
        name="my_tabs_3"
        className="tab bg-white dark:bg-gray-800"
        aria-label="Questions(0)"
      />
      <div className="tab-content bg-white dark:bg-gray-800  p-6 ">
       no questions
      </div>

      {/* Reviews Tab */}
      <input
        type="radio"
        name="my_tabs_3"
        className="tab bg-white dark:bg-gray-800"
        aria-label="Reviews(5)"
      />
      <div className="tab-content bg-white dark:bg-gray-800  p-6 ">
       <ProductReviews/>
      </div>
    </div>
  );
};

export default DescriptionTabs;
