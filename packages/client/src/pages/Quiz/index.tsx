import { memo, useRef } from "react";

function Quiz() {
  const leftRegionRef = useRef(null);
  const rightRegionRef = useRef(null);
  const intersectionRef = useRef(null);

  const handleHover = (ref: any) => {
    console.log("Hovered element:", ref.current);
  };
  return (
    <div>
      <svg width="200" height="100" viewBox="0 0 200 100">
        {/* Left Region (Circle A minus intersection) */}
        <defs>
          <clipPath id="leftOnly">
            <circle cx="60" cy="50" r="40" />
            <circle cx="120" cy="50" r="40" fill="white" />
          </clipPath>
        </defs>
        <circle
          ref={leftRegionRef}
          cx="60"
          cy="50"
          r="40"
          fill="lightblue"
          onMouseEnter={() => handleHover(leftRegionRef)}
          clipPath="url(#leftOnly)"
        />

        {/* Right Region (Circle B minus intersection) */}
        <defs>
          <clipPath id="rightOnly">
            <circle cx="120" cy="50" r="40" />
            <circle cx="60" cy="50" r="40" fill="white" />
          </clipPath>
        </defs>
        <circle
          ref={rightRegionRef}
          cx="120"
          cy="50"
          r="40"
          fill="lightcoral"
          onMouseEnter={() => handleHover(rightRegionRef)}
          clipPath="url(#rightOnly)"
        />

        {/* Intersection (Overlap area only) */}
        <defs>
          <clipPath id="intersection">
            <circle cx="60" cy="50" r="40" />
            <circle cx="120" cy="50" r="40" />
          </clipPath>
        </defs>
        <g clipPath="url(#intersection)">
          <circle
            ref={intersectionRef}
            cx="90"
            cy="50"
            r="40"
            fill="purple"
            onMouseEnter={() => handleHover(intersectionRef)}
          />
        </g>
      </svg>
    </div>
  );
}

export default memo(Quiz);
