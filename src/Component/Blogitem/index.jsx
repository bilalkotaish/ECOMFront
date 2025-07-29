import { MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsBoxArrowInUpRight } from "react-icons/bs";

export default function Blogitem({ item }) {
  const formattedDate = new Date(item.createdAt).toISOString().split("T")[0];
  const cleanDescription = item.description
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 200)
    .replace(/\s+\S*$/, "") + (item.description.length > 200 ? "..." : "");

  return (
    <div className="blogitem group bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col overflow-hidden">
      <div className="relative w-full h-[200px] overflow-hidden">
        <img
          src={item.image[0]?.url}
          alt={item.title}
          className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-1"
        />
        <span className="flex items-center text-[13px] justify-center bg-red-500 text-white px-3 py-1 rounded-md absolute gap-1 top-3 right-3 z-10">
          <MdAccessTime />
          <span>{formattedDate}</span>
        </span>
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="text-[17px] font-semibold text-center">
          <Link to={`/blog/${item._id}`} className="hover:underline">
            {item.title}
          </Link>
        </h3>

        <p className="text-[14px] text-gray-700 leading-relaxed line-clamp-4">
          {cleanDescription}
        </p>

        <div className="mt-auto pt-2">
          <Link
            to={`/blog/${item._id}`}
            className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
          >
            Read More <BsBoxArrowInUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
