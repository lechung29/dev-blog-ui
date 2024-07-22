import React, { useEffect, useState } from "react";
import AppLayout from "../../layout/Layout";
import { PostService } from "../../services/posts/PostService";

interface IHomeComponentOwnProps {}

const Home: React.FunctionComponent<IHomeComponentOwnProps> = (_props) => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        PostService.getPosts({ limit: 3 }).then((data) => {
            console.log(data);
            setPost(data.data);
        });
    }, []);
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
