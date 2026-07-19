import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "drag" | "text" | "none">("default");
  const [cursorText, setCursorText] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth movement lag (Lagging outer ring)
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 220, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 220, mass: 0.6 });

  // Springs for inner dot (Slightly faster tracking)
  const dotX = useSpring(mouseX, { damping: 45, stiffness: 450, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 45, stiffness: 450, mass: 0.2 });

  // Ref to track any currently hovered magnetic element
  const magneticElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Hide cursor on touchscreen devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setCursorType("none");
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      let targetX = e.clientX;
      let targetY = e.clientY;

      // Magnetic attraction math
      if (magneticElementRef.current) {
        const rect = magneticElementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to center of the element
        const distanceX = targetX - centerX;
        const distanceY = targetY - centerY;
        
        // Inside a certain radius, attract the cursor to the center
        // Pull 35% of the way towards the center of the button
        targetX = targetX - distanceX * 0.45;
        targetY = targetY - distanceY * 0.45;
      }

      mouseX.set(targetX);
      mouseY.set(targetY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest interactive element
      const interactiveEl = target.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, [data-cursor], .interactive-hover"
      );

      if (interactiveEl) {
        // Check for magnetic property
        if (
          interactiveEl.hasAttribute("data-cursor-magnetic") || 
          interactiveEl.classList.contains("magnetic-element") ||
          interactiveEl.tagName === "BUTTON" ||
          interactiveEl.tagName === "A"
        ) {
          magneticElementRef.current = interactiveEl;
        } else {
          magneticElementRef.current = null;
        }

        // Determine cursor behavior
        const customCursorAttr = interactiveEl.getAttribute("data-cursor");
        const customCursorTextAttr = interactiveEl.getAttribute("data-cursor-text");

        if (customCursorTextAttr) {
          setCursorText(customCursorTextAttr);
        } else {
          setCursorText("");
        }

        if (customCursorAttr) {
          setCursorType(customCursorAttr as any);
        } else if (interactiveEl.tagName === "INPUT" || interactiveEl.tagName === "TEXTAREA") {
          setCursorType("text");
        } else {
          setCursorType("pointer");
        }
      } else {
        setCursorType("default");
        setCursorText("");
        magneticElementRef.current = null;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [mouseX, mouseY, isVisible]);

  if (cursorType === "none" || !isVisible) return null;

  // Visual sizes and styles based on state
  let ringSize = 34;
  let ringStyle = "border-white/25 bg-transparent";
  let dotSize = 6;
  let dotStyle = "bg-[#CC0000]";

  if (isClicking) {
    ringSize = 24;
    dotSize = 4;
  } else {
    switch (cursorType) {
      case "pointer":
        ringSize = 56;
        ringStyle = "border-[#CC0000]/60 bg-[#CC0000]/5 backdrop-blur-[1px]";
        dotSize = 0; // Hide the dot inside large pointers for cleaner aesthetic
        break;
      case "view":
        ringSize = 72;
        ringStyle = "border-white/40 bg-white/10 backdrop-blur-[2px]";
        dotSize = 0;
        break;
      case "drag":
        ringSize = 72;
        ringStyle = "border-white/40 bg-white/10 backdrop-blur-[2px]";
        dotSize = 0;
        break;
      case "text":
        ringSize = 14;
        ringStyle = "border-white/40 bg-transparent rounded-sm";
        dotSize = 10;
        dotStyle = "bg-white h-3 w-[1px] rounded-none"; // Vertical text cursor style
        break;
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className={`absolute rounded-full border flex items-center justify-center pointer-events-none transition-colors duration-300 ${ringStyle}`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-extrabold text-white select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Spring Dot */}
      {cursorType !== "text" ? (
        <motion.div
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
            width: dotSize,
            height: dotSize,
          }}
          className={`absolute rounded-full pointer-events-none ${dotStyle}`}
        />
      ) : (
        <motion.div
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute pointer-events-none flex items-center justify-center"
        >
          <div className="h-4 w-[1.5px] bg-white/80" />
        </motion.div>
      )}
    </div>
  );
}
