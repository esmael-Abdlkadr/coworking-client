import React from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}
function Button({ title, onClick }: ButtonProps) {
  return (
    <button
      className="text-xl bg-primary-100 text-white px-8 py-3 rounded-2xl font-medium capitalize text-nowrap"
      onClick={onClick}
      type="submit"
    >
      {title}
    </button>
  );
}

export default Button;
