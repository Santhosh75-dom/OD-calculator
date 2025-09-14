import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressCircle({
  percent,
  remainingText,
  labelTop,
  accentId,
}) {
  return (
    <div className="w-36">
      {/* Define gradient for neon glow */}
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={accentId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" /> {/* Purple */}
            <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan */}
          </linearGradient>
        </defs>
      </svg>

      <CircularProgressbarWithChildren
        value={percent}
        maxValue={100}
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "round",
          pathTransitionDuration: 0.8,
          trailColor: "rgba(255,255,255,0.08)",
          pathColor: `url(#${accentId})`,
        })}
      >
        {/* Inner content of circle */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-sm text-neutral-300">{labelTop}</div>
          <div
            className="text-xl font-bold"
            style={{
              filter: "drop-shadow(0 0 8px rgba(139,92,246,0.8))",
            }}
          >
            {percent}%
          </div>
          <div className="text-xs text-neutral-400 mt-1">{remainingText}</div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
