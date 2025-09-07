import React, { useEffect, useState } from "react";

export default function Welcome({ onComplete }) {
  const text = "Welcome To The OD Calculator"; // Updated text
  const letters = Array.from(text);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      setVisibleCount(idx);
      if (idx >= letters.length) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 1000); // after complete, call onComplete
      }
    }, 80); // 80ms per letter
    return () => clearInterval(interval);
  }, [letters.length, onComplete]);

  return (
    <div className="bg-neutral-900/50 p-10 rounded-3xl max-w-3xl mx-auto mt-20">
      <div className="flex items-center justify-center h-44">
        <h1 className="relative text-4xl md:text-6xl font-extrabold tracking-tight text-white glitch-wrapper">
          {letters.map((ch, i) => (
            <span
              key={i}
              className={`inline-block relative ${
                i < visibleCount
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-3"
              } transition-all`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="glitch text-shadow" data-text={ch}>
                {ch}
              </span>
            </span>
          ))}
        </h1>
      </div>
      <p className="text-center mt-4 text-neutral-400">
        Loading... sit tight
      </p>
    </div>
  );
}
