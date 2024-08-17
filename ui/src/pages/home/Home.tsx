/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
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
import { useImmerState } from "../../hook/useImmerState";
import { Pagination } from "../../components/pagination/Pagination";

interface IHomePageOwnProps {

}
interface IHomePageState {
    isFilterPanelOpen: boolean;
    posts?: any[]
    currentPage: number
}

const initialState: IHomePageState = {
    isFilterPanelOpen: false,
    currentPage: 1
}

const Home: React.FunctionComponent<IHomePageOwnProps> = (_props) => {
    const [state, setState] = useImmerState<IHomePageState>(initialState)
    const { isFilterPanelOpen, posts} = state;

    React.useEffect(() => {
        PostService.getPosts({limit: 10}).then((data) => setState({posts: data.data}))
    }, [])
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
                        <Button 
                            className="g-homepage-left-section-filter" 
                            startIcon={<FilterAltIcon />}
                            onClick={() => setState({ isFilterPanelOpen: true})} 
                        >
                            Bộ lọc
                        </Button>
                        <FilterPanel 
                            open={isFilterPanelOpen} 
                            placement={"right"} 
                            onClosePanel={() => setState({ isFilterPanelOpen: false})} 
                            onOpenPanel={() => setState({ isFilterPanelOpen: true})} 
                        />
                    </Stack>
                    <Stack 
                        direction={"column"} 
                        spacing={1} 
                        width={"100%"}
                    >
                        {posts?.map((post: any) => (
                            <PostCard 
                                authorAvatar={post.author.avatar}
                                category={post.category}
                                postAuthor={post.author.displayName}
                                postComment={post.comments}
                                postCreatedAt={post.createdAt}
                                title={post.title}
                                key={post._id}
                            />
                        ))}
                    </Stack>
                    <Stack 
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flexDirection={"row"}
                        marginTop={4}
                    >
                        <Pagination 
                            maxPages={10}
                            currentPage={state.currentPage}
                            onChangePage={(page) => setState({currentPage: page})}
                        />
                    </Stack>
                </Box>
                <Box 
                    className="g-homepage-right-section"
                    component={"section"}
                    mx={1}
                >
                    <Divider 
                        title="CÂU HỎI MỚI NHẤT" 
                        textAlign="center" 
                        textFontSize={16} 
                        margin="5px 0 10px" 
                        color="#5488c7" 
                        fontWeight={500} 
                    />
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
