import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200';
  const hoverStyles = hover ? 'hover:shadow-lg transform hover:-translate-y-1' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div className={`p-4 ${className}`} style={style}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`p-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default Card;