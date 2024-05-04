import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from 'flowbite-react';
import PostCard from "../components/PostCard";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
    const { postSlug } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await res.json();
                setPost(data.posts[0]);
                setLoading(false);
                setError(false);
            } catch (error) {
                console.error(error);
                setError(true);
                setLoading(false);
            }
        };

        if (postSlug) {
            fetchPost();
        }
    }, [postSlug]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?limit=3`);
                if (!res.ok) {
                    throw new Error('Failed to fetch recent posts');
                }
                const data = await res.json();
                setRecentPosts(data.posts);
            } catch (error) {
                console.error(error);
                setError(true);
            }
        };

        fetchRecentPosts();
    }, []);

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            {loading && <p>Loading...</p>}
            {error && <p>Error occurred while fetching data</p>}
            {post && (
                <>
                    <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                        {post.title}
                    </h1>
                    <Link className="self-center mt-5">
                        <Button color="gray" pill size="xs">
                            {post.category}
                        </Button>
                    </Link>
                    <img src={post.image} alt={post.title} className="mt-10 p-3 max-h-[600px] w-full object-cover" />
                    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="italic">
                            {(post.content.length / 1000).toFixed(0)} mins read
                        </span>
                    </div>
                    <div
                        className='p-3 max-w-2xl mx-auto w-full post-content'
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>
                    <div className="max-w-4xl mx-auto w-full">
                        <CallToAction />
                    </div>
                    <CommentSection postId={post._id} />
                </>
            )}
            <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-xl mt-5">Recent articles</h1>
                <div className="flex flex-wrap gap-5 mt-5 justify-center">
                    {recentPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </main>
    );
}
