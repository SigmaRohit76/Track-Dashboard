import React from "react";

// Card wrapper component
export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 ${className}`}
      style={{ minWidth: "200px" }}
    >
      {children}
    </div>
  );
}

// CardContent component to wrap the inner content
export function CardContent({ children, className = "" }) {
  return <div className={`text-gray-800 ${className}`}>{children}</div>;
}
