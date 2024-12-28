interface BlogContentProps {
  content: string;
}

const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div className="prose max-w-none prose-lg text-gray-700 leading-relaxed bg-white rounded-lg shadow-md p-6 transition-transform hover:shadow-lg hover:-translate-y-1">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BlogContent;
