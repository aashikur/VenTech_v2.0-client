// SectionTitle.jsx
import React from "react";

const SectionTitle = ({
  topText = "Default Top Text",
  title = "Default Title",
  subtitle = "This is a default subtitle description.",
}) => {
  return (
    <section className="w-full py-8 md:py-10 text-center">
      {/* Top Text */}
      {topText !== false && (
        <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
          {topText || "Default Top Text"}
        </p>
      )}

      {/* Title */}
      {title != false  && (
        <h1 className="text-3xl md:text-4xl font-semibold">
          {title || "Default Title"}
        </h1>
      )}

      {/* Subtitle */}
      {subtitle !== false && (
        <p className="mt-1 text-neutral-600 dark:text-neutral-300">
          {subtitle || "This is a default subtitle description."}
        </p>
      )}
    </section>
  );
};

export default SectionTitle;
