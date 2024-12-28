import { Link } from "react-router-dom";
interface RecentPostProps {
  img: string;
  date: string;
  title: string;
  route: string;
}
function RecentPost({ img, date, title, route }: RecentPostProps) {
  return (
    <Link to={{ pathname: route }} className="w-full h-[100px] flex gap-3">
      <img
        src={img}
        className="w-[100px] h-[100px] rounded-lg  object-contain"
      />
      <div className="flex flex-col justify-center">
        <p className="text-lg text-[#334155] font-medium">{title}</p>
        <p className="text-sm text-[#64748b]">{date}</p>
      </div>
    </Link>
  );
}

export default RecentPost;
