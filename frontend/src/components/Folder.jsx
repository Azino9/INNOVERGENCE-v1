import React, { useState } from "react";

const darkenColor = (hex, percent) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) color = color.split("").map((c) => c + c).join("");
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.floor(r * (1 - percent));
  g = Math.floor(g * (1 - percent));
  b = Math.floor(b * (1 - percent));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

const Folder = ({ color = "#DEDEDE", size = 1, items = [], className = "" }) => {
  const [open, setOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const maxItems = 4;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) papers.push(null);

  const folderBackColor = darkenColor(color, 0.08);
  const scaleStyle = { transform: `scale(${size})` };

  // Align cards: 2 left, 2 right
  const getOpenTransform = (index) => {
    // MODIFICATION: Adjusted percentages to shift all cards slightly left and ensure they don't overlap.
    const offsetY = -50; // vertical offset remains the same
    
    if (index === 0) return `translate(${-150}%, ${offsetY}%) rotate(-5deg)`; // Further left
    if (index === 1) return `translate(${-80}%, ${offsetY}%) rotate(-2deg)`;  // Closer left
    if (index === 2) return `translate(${20}%, ${offsetY}%) rotate(2deg)`;   // Shifted right card to the left
    if (index === 3) return `translate(${90}%, ${offsetY}%) rotate(5deg)`;    // Shifted far right card to the left
    return "";
  };

  const handleCardClick = (index) => {
    if (!open) return;
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div style={scaleStyle} className={`relative ${className}`}>
      <div
        className="relative group cursor-pointer transition-transform duration-300"
        onClick={() => {
          if (!open) {
            setOpen(true);
            setActiveCard(null);
          } else if (open && activeCard === null) {
            setOpen(false);
          }
        }}
        style={{ transform: open ? "translateY(-10px)" : "translateY(0px)" }}
      >
        {/* Folder Base */}
        <div
          className="relative w-[140px] h-[110px] rounded-[10px]"
          style={{
            backgroundColor: folderBackColor,
            boxShadow: "0 0 15px rgba(0,0,0,0.5)",
          }}
        >
          {/* Folder tab */}
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[40px] h-[10px] rounded-tl-[5px] rounded-tr-[5px]"
            style={{ backgroundColor: folderBackColor }}
          ></span>

          {/* Papers */}
          {papers.map((item, i) => {
            const isActive = activeCard === i;
            const cardWidth = isActive ? 200 : 160;
            const cardHeight = isActive ? 160 : 120;
            const transformStyle = open
              ? isActive
                ? `translate(-160%, -40%) rotate(0deg)`
                : getOpenTransform(i)
              : "translate(-50%, 20%)";
            const transitionSpeed = isActive ? "duration-700" : "duration-500";

            return (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); handleCardClick(i); }}
                className={`absolute left-1/2 bottom-[10%] bg-white border border-red-600 rounded-xl overflow-hidden shadow-xl transition-all ${transitionSpeed} ease-in-out ${open ? "opacity-100" : "opacity-0"}`}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: transformStyle,
                  zIndex: isActive ? 100 : 40 + i,
                  opacity: open ? 1 : 0,
                }}
              >
                <div
                  className={`w-full h-full border border-red-600 flex flex-col items-center 
                    ${isActive ? "bg-black/90 text-gray-200 p-3 text-xs overflow-y-auto justify-start" : "bg-black/70 text-gray-300 p-2 text-[10px] overflow-hidden justify-center"}`}
                >
                  {/* Explicitly display the title. */}
                  {item && (
                    <div 
  className={`font-bold text-center ${isActive ? "text-lg text-red-400 mb-2" : "text-xs text-white line-clamp-2"}`} 
  style={{ height: isActive ? 'auto' : '30px' }}
>
  {item.props.title}
</div>
                  )}
                  
                  {/* Conditionally show the rest of the RubricCard content only when active. */}
                  {isActive ? item : null} 
                </div>
              </div>
            );
          })}

          {/* Folder front cover */}
          <div
            className="absolute z-50 w-full h-full rounded-[10px] transition-transform duration-500 ease-in-out"
            style={{
              backgroundColor: color,
              transform: open ? "rotateX(70deg) translateY(15px)" : "rotateX(0deg)",
              transformOrigin: "bottom",
              boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
