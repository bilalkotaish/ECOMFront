import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchData } from "../../../utils/api";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);

  useEffect(() => {
    fetchData(`/api/blog/${id}`).then((res) => {
      if (res.success) {
        setBlog(res.data);
      }
    });

    fetchData("/api/blog/get").then((res) => {
      if (res.success) {
        const filtered = res.data.filter((item) => item._id !== id);
        setOtherBlogs(filtered);
      }
    });
  }, [id]);

  if (!blog) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
      {/* Main Blog */}
      <div className="lg:w-2/3">
        {/* Render first blog image */}
        {blog.image?.length > 0 && (
          <img
            src={blog.image[0].url}
            alt={blog.title}
            className="rounded-xl mb-6 w-full h-80 object-cover"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-4">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {/* Render raw HTML description safely */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            border: "1px solid #eee",
          }}
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Optional: show additional images below content */}
        {blog.image?.length > 1 && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {blog.image.slice(1).map((img) => (
              <img
                key={img.fileId}
                src={img.url}
                alt="Blog extra"
                className="rounded-xl object-cover w-full h-60"
              />
            ))}
          </div>
        )}
      </div>

      {/* Other Blogs */}
      {/* Other Blogs */}
      <aside className="lg:w-1/3">
        <h2 className="text-xl font-semibold mb-4">More from our blog</h2>
        <div className="space-y-6">
          {otherBlogs.map((item) => (
            <Link
              key={item._id}
              to={`/blog/${item._id}`}
              className="block hover:bg-gray-100 p-4 rounded-md transition flex gap-3 items-center"
            >
              {/* Image thumbnail */}
              {item.image?.length > 0 && (
                <img
                  src={item.image[0].url}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">
                  {item.description
                    .replace(/<[^>]+>/g, "") // strip HTML tags
                    .slice(0, 80) + "..."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
