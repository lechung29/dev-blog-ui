import React, { useEffect, useState } from "react";
import AppLayout from "../../layout/Layout";
import { PostService } from "../../services/posts/PostService";
import Thumbnail from "../../components/thumbnail/Thumbnail";
import "./index.scss";
import { groupLink } from "../../components/utils/common/common";
import PostCard from "../../components/postCard/PostCard";
import { Box, Button, Container, Stack } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Divider } from "../../components/common/divider/Divider";
import QuestionCard from "../../components/questionCard/QuestionCard";
import { Link } from "react-router-dom";
import { FilterPanel } from "../../components/filterPanel/FilterPanel";

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
            <Box 
                component={"section"} 
                className="g-navbar-link-section"
            >
                <Link to="/" className="g-navbar-link-section-item">
                    {groupLink}
                </Link>
            </Box>
            <Container className="g-homepage-section">
                <Box  
                    className="g-homepage-left-section"
                    component={"section"}
                    mx={1}

                >
                    <Stack className="g-homepage-left-section-action">
                        <Button className="g-homepage-left-section-filter" startIcon={<FilterAltIcon />}>
                            Filters
                        </Button>
                        <FilterPanel open={true} placement={"right"} onClosePanel={() => alert("helo")} onOpenPanel={() => alert("false")} />
                    </Stack>
                    <Stack 
                        direction={"column"} 
                        spacing={1} 
                        width={"100%"}
                    >
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
                    </Stack>
                </Box>
                <Box 
                    className="g-homepage-right-section"
                    component={"section"}
                    mx={1}
                >
                    <Divider title="CÂU HỎI MỚI NHẤT" textAlign="center" textFontSize={16} margin="5px 0 10px" color="#5488c7" fontWeight={500} />
                    <Stack 
                        className="g-homepage-right-section-question-list"
                        direction={"column"}
                        spacing={1}
                    >
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
                    </Stack>
                </Box>
            </Container>
        </AppLayout>
    );
};

export default Home;
