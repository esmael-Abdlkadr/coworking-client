import Tag from "./ui/Tag";
import writer from "/team2.jpg";

interface Blog {
  image: string;
  title: string;
  tags?: string[];
  author?: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  readingTime: string;
}

const BlogHero = ({ blog }: { blog: Blog }) => {
  return (
    <div className="relative">
      <img
        src={blog.image}
        alt="Blog Detail"
        className="w-full h-[400px] lg:h-[600px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-4 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          {blog.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {blog.tags?.map((tag: string, index: number) => (
            <Tag key={index} title={tag} />
          ))}
        </div>
        <div className="flex items-center space-x-4 mt-2 text-white">
          <img
            src={writer}
            alt="Writer"
            className="w-[50px] h-[50px] object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="font-medium">
              Written By{" "}
              <span className="text-lg font-bold">{`${blog.author?.firstName} ${blog?.author?.lastName}`}</span>
            </p>
            <p>
              {new Date(blog.createdAt).toLocaleDateString()} |{" "}
              {blog.readingTime} read
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
