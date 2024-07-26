import React, { useEffect, useState } from "react";
import AppLayout from "../../layout/Layout";
import { PostService } from "../../services/posts/PostService";
import Thumbnail from "../../components/thumbnail/Thumbnail";
import "./index.scss"
import { groupLink } from "../../components/utils/common/common";
import PostCard from "../../components/postCard/PostCard";
import { Button } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Divider } from "../../components/common/divider/Divider";
import QuestionCard from "../../components/questionCard/QuestionCard";

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
            <Thumbnail />
            <div className="g-navbar-link-section">
                <a href="/" className="g-navbar-link-section-item">{groupLink}</a>
            </div>
            <div className="g-homepage-section">
                <div className="g-homepage-left-section">
                    <Button 
                        className="g-homepage-left-section-filter" 
                        startIcon={<FilterAltIcon/>}
                    >
                        Filters
                    </Button>
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
                <div className="g-homepage-right-section">
                    <Divider
                        title="CÂU HỎI MỚI NHẤT" 
                        textAlign="center" 
                        textFontSize={16} 
                        margin="5px 0 10px" 
                        color="#5488c7"
                        fontWeight={500}
                    />
                    <div className="g-homepage-right-section-question-list">
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />
                        <QuestionCard />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Home;
