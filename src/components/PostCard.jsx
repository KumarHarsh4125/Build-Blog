import React from "react";
import appwriteService from "../appWrite/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostCard({ $id, title, featuredImage, userId }) {
  const userData = useSelector((state) => state.auth.userData);
  const isCurrentUser = userData?.$id === userId;
  const firstName = userData?.name ? userData.name.split(' ')[0] : 'Author';

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-3 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group h-full flex flex-col">
        <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-slate-100 flex-shrink-0">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="px-1 flex-grow">
          <h2 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h2>
          <div className="mt-3 flex items-center text-xs text-slate-500 font-medium uppercase tracking-wider">
            <Link
              to={`/author/${userId}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:text-primary transition-colors"
            >
              By {isCurrentUser ? firstName : "Author"}
            </Link>
            <span className="mx-2">•</span>
            <span>5 min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
