import React from "react";
import Banner from "../components/Banner";
import BlogComponent from "../components/blog/Blog";
import { useGetBlogs } from "../hooks/services";
import { capitalizeTitle } from "../utils/capitalize";
import { Blog } from "../types/clientType";
function Blogs() {
  const { blogs } = useGetBlogs();

  return (
    <section className="bg-white w-full py-16">
      <div className="px-6 md:px-12 lg:px-20 flex flex-col gap-12">
        {/* Title */}
        <h2 className="uppercase text-2xl md:text-3xl tracking-[5px] text-center">
          News and Blogs
        </h2>

        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-semibold text-center lg:text-left">
            {capitalizeTitle("our latest")}{" "}
            <span className="text-primary-100 underline decoration-orange-300 italic">
              {capitalizeTitle("news and blogs")}
            </span>
          </h2>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.data.map((blog: Blog) => (
            <BlogComponent
              key={blog._id}
              img={blog.image}
              title={blog.title}
              writerName={`${blog.author?.firstName} ${blog?.author?.lastName}`}
              date={new Date(blog.createdAt).toLocaleDateString()}
              tags={blog.category}
              route={`/blogs/${blog.slug}`}
            />
          ))}
        </div>
      </div>

      {/* Banner */}
      <Banner />
    </section>
  );
}

export default Blogs;
