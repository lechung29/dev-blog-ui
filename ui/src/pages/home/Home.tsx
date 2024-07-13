import React, { useEffect, useState } from "react";
import AppLayout from "../../layout/Layout";

const Home = () => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        fetch("https://technology-blog.onrender.com/api/v1/post/get-all-posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setPost(data.allPosts));
    },[]);
    return (
        <AppLayout>
            {post.map((item: any) => (
                <div key={item._id}>
                    <h2>{item.title}</h2>
                    <p>{item.content}</p>
                </div>
            ))}
        </AppLayout>
    );
};

export default Home;
