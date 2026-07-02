import React from 'react';

export function ShinyButton({ children, onClick, className = "", href, type = "button" }) {
  // If href is provided, render an anchor tag
  if (href) {
    return (
      <a href={href} className={`shiny-cta ${className}`} onClick={onClick}>
        <span className="inline-flex items-center justify-center gap-2">{children}</span>
      </a>
    )
  }

  // Otherwise render a standard button
  return (
    <button type={type} className={`shiny-cta ${className}`} onClick={onClick}>
      <span className="inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  )
}

export default ShinyButton;
