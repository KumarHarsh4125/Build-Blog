import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import appwriteService from "../appWrite/config";
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const firstName = userData?.name ? userData.name.split(' ')[0] : 'Writer';

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-20 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center">
                        <div className="p-2 w-full max-w-2xl">
                            <h1 className="text-6xl font-extrabold text-slate-900 mb-6 tracking-tighter leading-tight">
                                Welcome to <span className="text-primary italic">Blog</span>
                                <span className="text-primary">&Build.</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                                Join a community of writers and readers exploring the most interesting topics in technology, design, and culture.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/25 hover:-translate-y-1"
                                >
                                    Get Started
                                </button>
                                <button
                                    onClick={() => navigate("/all-posts")}
                                    className="px-10 py-4 bg-white text-slate-700 border-2 border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all hover:-translate-y-1"
                                >
                                    Read Stories
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full'>
            {/* Hero Section for Logged-in Users */}
            <div className="bg-slate-900 py-20 mb-12">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Welcome back, {firstName}!
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl mb-10">
                            Discover the latest insights from the community or share your own thoughts today.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate("/add-post")}
                                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all"
                            >
                                Write a Story
                            </button>
                        </div>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Recent Stories</h2>
                    <button
                        onClick={() => navigate("/all-posts")}
                        className="text-primary font-bold hover:underline"
                    >
                        View all →
                    </button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16'>
                    {posts.slice(0, 4).map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home