import React from "react";
import { Link } from "react-router-dom";
import { RecentPostProps } from "../types/clientType";

function RecentPost({ img, date, title, route }: RecentPostProps) {
  return (
    <Link
      to={{ pathname: route }}
      className="group relative flex gap-4 overflow-hidden rounded-lg bg-white p-3 transition-all hover:bg-gray-50"
    >
      {/* Image Container */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col justify-center space-y-2">
        <h3 className="line-clamp-2 font-medium text-gray-800 transition-colors group-hover:text-primary-100">
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <svg
            className="h-4 w-4 text-primary-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary-100 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export default RecentPost;
