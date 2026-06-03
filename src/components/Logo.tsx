/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export default function Logo({ className = "w-8 h-8", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer back curve / head */}
      <path
        d="M85,35 C100,22 118,24 126,30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Upper Crest Sweep */}
      <path
        d="M78,43 C88,28 108,24 120,28"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      {/* Sharp Beak */}
      <path
        d="M126,30 C138,32 153,40 159,44 C143,41 129,39 122,37"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Eye slit / detail */}
      <path
        d="M112,31 C117,32 122,35 125,36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Triple Left Feather / Back Sweeps */}
      <path
        d="M80,45 C75,55 70,75 79,93"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M77,58 C72,66 68,82 74,96"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Main Elegant Crescent Belly (semi-filled off-white) */}
      <path
        d="M112,47 C96,60 84,85 131,128 C119,114 107,85 113,63 C115,55 121,50 124,47 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sleek Wings / Right Plumes */}
      <path
        d="M128,51 C130,62 138,76 150,88"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M130,81 C133,90 143,102 154,114"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Red Bow Tie (centered elegantly at neck/chest) */}
      <g>
        {/* Left Bow side */}
        <path
          d="M106,62 L106,72 L115,67 Z"
          fill="#B91C1C"
          stroke="#991B1B"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Right Bow side */}
        <path
          d="M124,62 L124,72 L115,67 Z"
          fill="#B91C1C"
          stroke="#991B1B"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Center piece / knot */}
        <polygon
          points="113,65 117,65 117,69 113,69"
          fill="#7F1D1D"
          stroke="#991B1B"
          strokeWidth="0.5"
        />
      </g>

      {/* Sleek feet lines at base stepping left */}
      <path
        d="M77,130 C85,127 92,124 98,121"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M98,136 C106,133 112,130 119,127"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
