import PageDisplayer from "../components/PageDisplayer";
import { capitalizeTitle } from "../utils/capitalize";
import img1 from "/detail1.jpg";
import BlogPageCard from "../components/BlogPageCard";
import Pagination from "../components/Pagination";
import Banner from "../components/Banner";
import { IoIosSearch } from "react-icons/io";
import CategoryCard from "../components/CategoryCard";
import RecentPost from "../components/RecentPost";
import contactUsImg from "/contact.jpg";
import Button from "../components/ui/Button";
import { useGetBlogs } from "../hooks/services";

function Blogs() {
  const { blogs } = useGetBlogs();
  // utility function to truncate conent.
  const truncateConent = (content: string, maxLength: number) => {
    const plainText = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
    const truncated =
      plainText.length > maxLength
        ? plainText.substring(0, maxLength) + "..."
        : plainText;
    return truncated;
  };
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
            {blogs?.data?.map(
              (blog: {
                id: string;
                image: string;
                title: string;
                author: { firstName: string; lastName: string };
                createdAt: string;
                category: string;
                content: string;
                slug: string;
              }) => (
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
              )
            )}

            <Pagination />
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            {/* Search Input */}
            <div>
              <label className="pl-4 border-l-4 border-primary-100 text-lg font-medium">
                Search
              </label>
              <div className="relative mt-2">
                <input
                  placeholder="Search"
                  className="w-full bg-[#cbd5e1] px-6 py-4 text-lg rounded-lg"
                />
                <button className="absolute top-3 right-4">
                  <IoIosSearch size={30} />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="pl-4 border-l-4 border-primary-100 text-2xl font-medium">
                Popular Categories
              </label>
              <div className="space-y-4 mt-4">
                {["Economics", "Technology", "Startups", "Innovation"].map(
                  (category, index) => (
                    <CategoryCard key={index} CategoryName={category} />
                  )
                )}
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <label className="pl-4 border-l-4 border-primary-100 text-2xl font-medium">
                Recent Posts
              </label>
              <div className="space-y-4 mt-4">
                {[...Array(3)].map((_, index) => (
                  <RecentPost
                    key={index}
                    img={img1}
                    date="09-JUL-2024"
                    title="The standard Lorem Ipsum passage, used since the 1500s"
                    route={`/blogs/${index + 1}`}
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
