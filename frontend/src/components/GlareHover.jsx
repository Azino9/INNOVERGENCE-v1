// GlareHover.jsx

import { useRef } from 'react';

const GlareHover = ({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.3,
  glareAngle = -30,
  glareSize = 400,
  transitionDuration = 800,
  className = '',
  style = {}
}) => {
  const overlayRef = useRef(null);

  // --- RGBA Color Calculation (No changes here) ---
  const hex = glareColor.replace('#', '');
  let r, g, b;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  }
  const rgbaGlareColor = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;

  // --- Animation Handlers ---
  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;
    
    // ** THE FIX IS HERE **
    // 1. Remove the old transition to reset instantly
    el.style.transition = 'none';
    // 2. Set the starting position of the glare
    el.style.backgroundPosition = '-100% -100%, 0 0';

    // 3. Use a tiny timeout to force the browser to apply the styles above
    //    before adding the new transition. This makes the animation restart
    //    correctly every time you hover.
    setTimeout(() => {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = '100% 100%, 0 0';
    }, 0);
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;
    // Animate the glare away on mouse leave
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = '-100% -100%, 0 0';
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(${glareAngle}deg, hsla(0,0%,0%,0) 60%, ${rgbaGlareColor} 70%, hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-100% -100%, 0 0', // Start with glare hidden
    pointerEvents: 'none',
    zIndex: 10
  };

  return (
    <div
      className={`relative ${className}`}
      style={style}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  );
};

export default GlareHover;
