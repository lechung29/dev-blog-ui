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
import { Link, useNavigate } from "react-router-dom";
import { FilterPanel } from "../../components/filterPanel/FilterPanel";
import { useImmerState } from "../../hook/useImmerState";
import { Pagination } from "../../components/pagination/Pagination";
import { IPostDataProps } from "../../types/Post";
import PostShimmer from "../../components/postCardShimmer/PostShimmer";

interface IHomePageOwnProps {

}
interface IHomePageState {
    isFilterPanelOpen: boolean;
    posts: IPostDataProps[];
    currentPage: number;
    maxPages?: number;
    loading: boolean;
    isFirstRender: boolean;
}

const initialState: IHomePageState = {
    isFilterPanelOpen: false,
    currentPage: 1,
    posts: [],
    loading: false,
    isFirstRender: true,
}

const Home: React.FunctionComponent<IHomePageOwnProps> = (_props) => {
    const [state, setState] = useImmerState<IHomePageState>(initialState)
    const { isFilterPanelOpen, posts, currentPage, isFirstRender, loading, maxPages } = state;
    const limit: number = 5;
    const navigate = useNavigate()
    const shimmerArray = Array(5).fill('');
    React.useEffect(() => {
        setState({ loading: true })
        const getPosts = () => {
            return PostService.getFilterPosts({
                limit: limit,
                page: currentPage
            }).then((data) => {
                setState((draft) => {
                    draft.posts = data.data ?? []
                })
            })
        }

        const getMaxPages = () => {
            return PostService.getMaxPages().then((data) => {
                setState({ maxPages: data.data })
            })
        }

        if (isFirstRender) {
            Promise.all([getPosts(), getMaxPages()]).then(() => {
                setState({ loading: false, isFirstRender: false })
            })
        } else {
            getPosts().then(() => {
                setState({ loading: false })
            })
        }
    }, [currentPage])
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
                            onClick={() => setState({ isFilterPanelOpen: true })}
                        >
                            Bộ lọc
                        </Button>
                        <FilterPanel
                            open={isFilterPanelOpen}
                            placement={"right"}
                            onClosePanel={() => setState({ isFilterPanelOpen: false })}
                            onOpenPanel={() => setState({ isFilterPanelOpen: true })}
                        />
                    </Stack>
                    <Stack
                        direction={"column"}
                        spacing={1}
                        width={"100%"}
                    >
                        {loading ? shimmerArray.map((_item, id) => (
                            <PostShimmer key={id} />
                        )) : posts?.map((post: IPostDataProps, id) => (
                            <PostCard 
                                key={id}
                                item={post} 
                                onClick={() => navigate(`/post/${post._id}`)}
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
                            loading={loading}
                            maxPages={maxPages ?? 0}
                            currentPage={state.currentPage}
                            onChangePage={(page) => setState({ currentPage: page })}
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
