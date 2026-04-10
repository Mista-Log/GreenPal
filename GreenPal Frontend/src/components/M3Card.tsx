import React from "react";

interface M3CardProps {
  children: React.ReactNode;
  variant?: "elevated" | "filled" | "outlined";
  className?: string;
  onClick?: () => void;
}

const M3Card: React.FC<M3CardProps> = ({ 
  children, 
  variant = "elevated", 
  className = "", 
  onClick 
}) => {
  const baseStyles = "rounded-xl transition-all duration-200 overflow-hidden";
  
  const variantStyles = {
    elevated: "bg-surface-container-low border border-outline-variant/30",
    filled: "bg-surface-container-highest",
    outlined: "bg-surface border border-outline-variant"
  };

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${onClick ? "cursor-pointer active:scale-[0.98]" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default M3Card;
