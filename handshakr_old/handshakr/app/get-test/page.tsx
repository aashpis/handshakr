'use client'
import React, { useState, useEffect } from 'react';


const getPosts = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
        return "error: " + error;
    }
};

export default function Page() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col items-center justify-top min-h-screen">
            {posts && posts.map((post) => (
               <div key={post.id}>
                <h1 className='font-bold'>{post.title}</h1>
                <p>{post.body}</p>
                <hr className = "color-slate-800 border-10 my-5"></hr>
               </div>
            ))}
        </div>
    );
}