import PageDisplayer from "../components/PageDisplayer";
import { capitalizeTitle } from "../utils/capitalize";
import img1 from "/detail1.jpg";
import BlogPageCard from "../components/blog/BlogPageCard";
import Pagination from "../components/Pagination";
import Banner from "../components/Banner";
import { IoIosSearch } from "react-icons/io";
import CategoryCard from "../components/CategoryCard";
import RecentPost from "../components/RecentPost";
import contactUsImg from "/contact.jpg";
import Button from "../components/ui/Button";
import {
  useGetAllCategories,
  useGetBlogs,
  useGetRecentBlogs,
} from "../hooks/services";
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { Blog, Category } from "../types/clientType";

function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { blogs, isLoading } = useGetBlogs({
    title: searchQuery,
    category: selectedCategory,
  });
  const { data } = useGetAllCategories();
  const { recentBlogs } = useGetRecentBlogs(3);
  console.log("recentBlogs", recentBlogs);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search will automatically trigger due to the useGetBlogs dependency on searchQuery
  };
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName === selectedCategory ? "" : categoryName);
  };

  // utility function to truncate content.
  const truncateConent = (content: string, maxLength: number) => {
    const plainText = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
    const truncated =
      plainText.length > maxLength
        ? plainText.substring(0, maxLength) + "..."
        : plainText;
    return truncated;
  };
  if (isLoading) return <Spinner />;
  return (
    <div>
      <PageDisplayer />

      <div className="px-6 md:px-12 lg:px-20 py-16 space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">
            {capitalizeTitle("Our Latest")}{" "}
            <span className="text-primary-100 italic underline decoration-orange-300">
              {capitalizeTitle("News & Blogs")}
            </span>
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[75%,25%] gap-12">
          {/* Blog Cards */}
          <div className="space-y-10">
            {blogs?.data?.map((blog: Blog) => (
              <BlogPageCard
                key={blog.id}
                img={blog.image}
                title={blog.title}
                writerName={`${blog.author.firstName} ${blog.author.lastName}`}
                date={new Date(blog.createdAt).toLocaleDateString()}
                tags={blog.category}
                content={truncateConent(blog.content, 100)} // Show only first 100 characters
                route={`/blogs/${blog.slug}`} // Link to full blog page
              />
            ))}

            <Pagination />
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            {/* Search Input */}
            <div>
              <label className="pl-4 border-l-4 border-primary-100 text-lg font-medium">
                Search
              </label>
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-primary-100"
                />
                <button
                  type="button"
                  className="text-2xl text-primary-100"
                  onClick={handleSearch}
                >
                  <IoIosSearch />
                </button>
              </form>
            </div>

            {/* Categories */}
            <div>
              <label className="pl-4 border-l-4 border-primary-100 text-2xl font-medium">
                Popular Categories
              </label>
              <div className="space-y-4 mt-4">
                {data?.data?.slice(0, 4).map((category: Category) => (
                  <CategoryCard
                    key={category._id}
                    title={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    isSelected={category.name === selectedCategory}
                  />
                ))}
              </div>
            </div>
            {/* Recent Posts */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-6 border-l-4 border-primary-100 pl-4 text-2xl font-medium">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {recentBlogs?.data?.map((blog: Blog) => (
                  <RecentPost
                    key={blog.id}
                    img={blog.image}
                    date={new Date(blog.createdAt).toLocaleDateString()}
                    title={blog.title}
                    route={`/blogs/${blog.slug}`}
                  />
                ))}
              </div>
            </div>

            {/* Contact Us */}
            <div className="relative">
              <img
                src={contactUsImg}
                className="w-full h-[300px] md:h-[400px] rounded-xl object-cover"
                alt="Contact Us"
              />
              <div className="absolute inset-0 bg-black/50 rounded-xl"></div>
              <div className="absolute bottom-10 left-10 text-white space-y-3">
                <h2 className="text-3xl font-bold">Book a Space</h2>
                <Button title="Contact Us" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Banner />
    </div>
  );
}

export default Blogs;
