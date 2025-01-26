import React from "react";
import { Link } from "react-router-dom";

interface BlogPageCardProps {
  img: string;
  title: string;
  writerName: string;
  date: string;
  tags: string;
  content: string;
  route: string;
}

function BlogPageCard({
  img,
  title,
  writerName,
  date,
  tags,
  content,
  route,
}: BlogPageCardProps) {
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">
      {/* Image and Tag */}
      <div className="relative">
        <img
          src={img}
          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-500 hover:scale-105"
          alt={title}
        />
        <div className="absolute top-4 left-4 bg-primary-100 text-white px-3 py-1 rounded-lg text-sm font-medium">
          {tags}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Writer Name and Date */}
        <div className="flex items-center gap-4 text-[#9ca3af] text-sm">
          <span>{writerName}</span>
          <div className="w-2 h-2 bg-primary-100 rounded-full"></div>
          <span>{date}</span>
        </div>

        {/* Blog Title */}
        <h2 className="text-2xl font-semibold text-[#475569] leading-snug">
          {title}
        </h2>

        {/* Blog Content */}
        <p className="text-[#475569] text-lg leading-relaxed line-clamp-3">
          {content}
        </p>

        {/* Read More Link */}
        <Link
          to={route}
          className="text-primary-100 underline font-medium text-base"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogPageCard;
