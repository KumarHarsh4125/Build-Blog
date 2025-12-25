import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, PostCard } from '../components'
import appwriteService from "../appWrite/config"
import { Query } from 'appwrite'
import { useSelector } from 'react-redux'

function AuthorPosts() {
    const [posts, setPosts] = useState([])
    const { userId } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const isCurrentUser = userData?.$id === userId;
    const firstName = userData?.name ? userData.name.split(' ')[0] : 'Author';

    useEffect(() => {
        if (userId) {
            appwriteService.getPosts([Query.equal("userId", userId)]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        } else {
            navigate("/")
        }
    }, [userId, navigate])

    return (
        <div className='w-full py-12'>
            <Container>
                <div className="mb-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 flex items-center text-slate-500 hover:text-primary transition-colors font-semibold group"
                    >
                        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                        {isCurrentUser ? `${firstName}'s ` : "Posts by "}
                        <span className="text-primary">{isCurrentUser ? "Stories" : "Author"}</span>
                    </h1>
                    <p className="text-slate-500 mt-2 italic">
                        {isCurrentUser ? "Managing your published content" : `Viewing profile: ${userId}`}
                    </p>
                </div>

                {posts.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        {posts.map((post) => (
                            <div key={post.$id} className="h-full">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-xl text-slate-500">This author hasn't posted anything yet.</p>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AuthorPosts
