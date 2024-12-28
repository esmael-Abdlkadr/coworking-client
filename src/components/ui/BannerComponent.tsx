interface BannerComponentProps {
  title: string;
}
import { FaStarOfLife } from "react-icons/fa6";
function BannerComponent({ title }: BannerComponentProps) {
  return (
    <div className="flex items-center gap-6   text-white px-6">
      <FaStarOfLife size={30} />
      <div className="text-2xl font-medium">{title}</div>
    </div>
  );
}

export default BannerComponent;
