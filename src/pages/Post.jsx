import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appWrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const firstName = userData?.name ? userData.name.split(' ')[0] : 'Author';

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-12 bg-white min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-slate-500 hover:text-primary transition-colors font-semibold group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="w-full mb-8 relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full object-cover max-h-[500px]"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6 flex space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500 hover:bg-green-600 shadow-lg" className="px-6 rounded-full">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500 hover:bg-red-600 shadow-lg" onClick={deletePost} className="px-6 rounded-full">
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center text-slate-500 font-medium tracking-wide uppercase text-sm">
              <Link to={`/author/${post.userId}`} className="hover:text-primary transition-colors">
                Published by {isAuthor ? firstName : "Author"}
              </Link>
              <span className="mx-3 text-slate-300">|</span>
              <span>5 Min Read</span>
            </div>
          </div>

          <div className="prose prose-slate lg:prose-xl max-w-none text-slate-700 leading-relaxed">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
