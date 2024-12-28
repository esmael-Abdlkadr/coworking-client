import CategoryCard from "./CategoryCard";
import contactUsImg from "/contact.jpg";
import Button from "./ui/Button";

const BlogSidebar = () => {
  return (
    <aside className="space-y-10">
      <div className="space-y-6">
        <h3 className="text-2xl font-medium border-l-4 pl-4 border-primary-100">
          Filter by Categories
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {["Coworking", "Startups", "Technology", "Innovation"].map(
            (category, index) => (
              <CategoryCard key={index} CategoryName={category} />
            )
          )}
        </div>
      </div>
      <div className="relative rounded-xl overflow-hidden shadow-md">
        <img
          src={contactUsImg}
          alt="Contact Us"
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
        <div className="absolute bottom-10 left-10 text-white space-y-3">
          <h2 className="text-3xl font-bold">Book a Space</h2>
          <Button title="Contact Us" />
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
