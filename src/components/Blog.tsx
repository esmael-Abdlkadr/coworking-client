import { Link } from "react-router-dom";

interface BlogProps {
  img: string;
  title: string;
  writerName: string;
  date: string;
  tags: string;
  route: string;
}

function Blog({ img, title, writerName, date, tags, route }: BlogProps) {
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden group">
      {/* Image */}
      <div className="relative">
        <img
          src={img}
          alt="blog"
          className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Tag */}
        <div className="absolute top-3 left-3 bg-primary-100 text-white px-3 py-1 rounded-lg text-sm font-medium">
          {tags}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Writer and Date */}
        <div className="flex items-center gap-2 text-[#6b7280] text-sm">
          <span>{writerName}</span>
          <div className="w-[6px] h-[6px] bg-primary-100 rounded-full"></div>
          <span>{date}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold leading-snug group-hover:text-primary-100 transition-colors">
          {title}
        </h2>

        {/* Read More Link */}
        <Link
          to={route}
          className="text-primary-100 font-medium text-sm underline mt-auto"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default Blog;
