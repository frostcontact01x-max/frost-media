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
          src="https://res.cloudinary.com/dfy1jd14/image/upload/v1784430899/WhatsApp_Image_2026-05-03_at_9.53.27_AM_xgu5so.jpg"
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
        src="https://res.cloudinary.com/dfy1jd14/image/upload/v1784430899/WhatsApp_Image_2026-05-03_at_9.53.27_AM_xgu5so.jpg"
        alt="Frost Media Penguin Logo"
        referrerPolicy="no-referrer"
        className="w-[85%] h-[85%] rounded-full object-contain shrink-0"
      />
    </div>
  );
}
