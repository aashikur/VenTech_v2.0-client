import React from 'react';

// DescriptionCard.jsx — Demo description card for an electronic product
// To be used inside a tab layout as shown in your example.

const DescriptionCard = ({ product }) => {


  return (
    <div className="mt-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Product Overview : {product?.title}
      </h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {product?.description.slice(0, 300)} ...
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <FeatureItem title="Stable Output" description="Maintains consistent 220V ±2% even under load changes." />
        <FeatureItem title="Surge Protection" description="Guards devices against sudden power spikes and lightning." />
        <FeatureItem title="Smart Cooling" description="Integrated thermal sensors and fan prevent overheating." />
        <FeatureItem title="Energy Efficient" description="Consumes less than 2W at idle and up to 40W at peak." />
      </div>

      <div className="mt-6 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Ideal For:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>Home appliances (TV, refrigerator, AC)</li>
          <li>Office computers and networking devices</li>
          <li>Industrial motor control units</li>
        </ul>
      </div>

      <footer className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>⚙️ Note: Always ensure proper grounding and input voltage compatibility before use.</p>
      </footer>
    </div>
  );
};

const FeatureItem = ({ title, description }) => {
  return (
    <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-3">
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
  );
};

export default DescriptionCard;