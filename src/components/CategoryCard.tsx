import React from "react";

interface CategoryCardProps {
  title: string;
  onClick?: () => void;
  isSelected?: boolean;
}

function CategoryCard({ title, onClick, isSelected }: CategoryCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-center w-full p-3 rounded-lg ${
        isSelected 
          ? 'bg-primary-100 text-white' 
          : 'bg-gray-100 hover:bg-gray-200'
      } transition-colors cursor-pointer`}
    >
      <span className={`font-medium text-center ${isSelected ? 'text-white' : 'text-gray-700'}`}>
        {title}
      </span>
    </div>
  );
}

export default CategoryCard;
