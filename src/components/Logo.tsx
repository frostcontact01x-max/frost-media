/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  watermark?: boolean;
}

export default function Logo({ className = "w-8 h-8", watermark = false, ...props }: LogoProps) {
  if (watermark) {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}
        {...props}
      >
        <img
          src="https://www.image2url.com/r2/default/images/1780475420430-93e6cbe1-bef1-4c63-b2ea-9d47e909604c.jpeg"
          alt="Frost Media Logo Watermark"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter invert opacity-[0.8]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-white select-none pointer-events-none border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] p-0.5 shrink-0 overflow-hidden ${className}`}
      style={{ aspectRatio: "1/1" }}
      {...props}
    >
      <img
        src="https://www.image2url.com/r2/default/images/1780475420430-93e6cbe1-bef1-4c63-b2ea-9d47e909604c.jpeg"
        alt="Frost Media Penguin Logo"
        referrerPolicy="no-referrer"
        className="w-[85%] h-[85%] rounded-full object-contain shrink-0"
      />
    </div>
  );
}
