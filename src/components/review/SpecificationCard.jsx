import React, { useState } from "react";

// SpecificationCard.jsx
// Usage: drop this file into a React + Tailwind project.
// Tailwind must be configured with `darkMode: 'class'` in tailwind.config.js
// Example: <SpecificationCard initialDark={false} />

export default function SpecificationCard({ initialDark = false }) {
  const [isDark, setIsDark] = useState(initialDark);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="max-w-4xl ">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <header className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Starlink — External Antenna Specification
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Key features, environmental ratings, power & physical dimensions.
              </p>
            </div>

          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column: Key specs */}
            <div className="space-y-4">
              <CardRow title="Antenna" value="Electronic Phased Array" />
              <CardRow title="Frequency / Band" value="Dual Band, 3x3 MU-MIMO" />
              <CardRow title="Wireless Standard" value="WiFi 5 (802.11a/b/g/n/ac)" />
              <CardRow title="Encryption" value="WPA2" />
              <CardRow title="Ports" value="1x Latching Ethernet LAN port with Starlink Plug" />
              <CardRow title="Devices Supported" value="Up to 128 devices" />
              <CardRow title="Coverage" value="Up to 112 m² (1,200 ft²)" />
              <CardRow title="Mesh Compatibility" value="Compatible with Starlink mesh systems (not 3rd party)" />
            </div>

            {/* Right column: Environmental & Power */}
            <div className="space-y-4">
              <CardRow title="Field of View" value="110°" />
              <CardRow title="Orientation" value="Software Assisted Manual Orienting" />
              <CardRow title="Environmental Rating" value="IP67 Type 4 (with DC cable & Starlink plug installed)" />
              <CardRow title="Operating Temperature" value="-30°C to 50°C (-22°F to 122°F)" />
              <CardRow title="Wind Speed (Operational)" value="96 kph+ (60 mph+)" />
              <CardRow title="Snow Melt Capability" value="Up to 25 mm / hour (1 in / hour)" />
              <CardRow title="Power Consumption" value="Average 25–40W" />
              <CardRow title="Input Rating" value="12–48V, 60W" />
              <CardRow title="USB PD Requirement" value="100W (20V / 5A) minimum" />
            </div>
          </div>

          <hr className="my-6 border-gray-100 dark:border-gray-800" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoBlock title="Physical (Starlink)" lines={[
              '298.5 x 259 x 38.5 mm (11.75 x 10.2 x 1.45 in)',
              'Weight: 1.10 kg (2.43 lb) — 1.53 kg with kickstand & 15 m cable'
            ]} />

            <InfoBlock title="Power Supply" lines={[
              '91 x 44 x 51 mm (3.6 x 1.7 x 2.0 in)',
              'Power Mode: 100–240V ~ 1.6A 50–60 Hz',
              'Power indicator: LED (rear face plate, lower-left)'
            ]} />

            <InfoBlock title="Package & Warranty" lines={[
              'Package size: 430 x 334 x 79 mm',
              'Manufacturer warranty: 1 year (contact Starlink app for claims)',
              'Subscription activation required by customer (Starlink app)'
            ]} />
          </div>

          <footer className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>Note: 12V short Starlink cable and Starlink USB-C to barrel jack accessory availability may vary.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

function CardRow({ title, value }) {
  return (
    <div className="rounded-xl p-3 border border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
      <dt className="text-xs font-medium text-gray-500 dark:text-gray-300">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{value}</dd>
    </div>
  );
}

function InfoBlock({ title, lines = [] }) {
  return (
    <div className="rounded-xl p-4 border border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <ul className="mt-2 text-sm text-gray-700 dark:text-gray-200 list-disc list-inside space-y-1">
        {lines.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
  );
}
