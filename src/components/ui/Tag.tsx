interface TagProps {
  title: string;
}
function Tag({ title }: TagProps) {
  return (
    <div className="bg-primary-100 text-white text-lg font-medium px-[60px] py-3  rounded-lg text-center">
      {title}
    </div>
  );
}

export default Tag;
