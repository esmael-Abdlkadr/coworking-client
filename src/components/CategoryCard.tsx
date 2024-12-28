interface categoryCardProps {
  CategoryName: string;
}
function CategoryCard({ CategoryName }: categoryCardProps) {
  return (
    <button className="bg-[#cbd5e1] text-[#64748b]  px-5 py-3 text-lg text-start  font-medium">
      {CategoryName}
    </button>
  );
}

export default CategoryCard;
