/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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
import { ObjectToFilterQuery } from "../../utils/helper";
import QuestionShimmer from "../../components/postCardShimmer/QuestionShimmer";

interface IHomePageOwnProps {

}

export const defaultPostStatus: string = "Public"
export const defaultSort: ISortProps = {
    createdAt: "desc"
}

export type ISortProps = Record<string, string>

export interface IDefaultFilterProps {
    status?: string;
}

export interface IHomeOptionalFilterProps {
    tags: string[];
    category: string[];
}

export type IHomeFilterProps = IDefaultFilterProps & IHomeOptionalFilterProps

interface IHomePageState {
    isFilterPanelOpen: boolean;
    posts: IPostDataProps[];
    lastQuestions: IPostDataProps[];
    currentPage: number;
    maxPages: number;
    isLoadingPost: boolean;
    isLoadingLastQuestions: boolean;
    isLoadingMaxPages: boolean;
    filtersObject: IHomeFilterProps;
    sortObject: ISortProps,
    runAfter: boolean;
}

const initialState: IHomePageState = {
    isFilterPanelOpen: false,
    currentPage: 1,
    posts: [],
    lastQuestions: [],
    isLoadingPost: false,
    isLoadingLastQuestions: false,
    isLoadingMaxPages: false,
    maxPages: 1,
    filtersObject: {
        status: defaultPostStatus,
        tags: [],
        category: []
    },
    sortObject: defaultSort,
    runAfter: false,
}

const Home: React.FunctionComponent<IHomePageOwnProps> = (_props) => {
    const [state, setState] = useImmerState<IHomePageState>(initialState)
    const { isFilterPanelOpen, posts, currentPage, isLoadingPost, isLoadingLastQuestions, isLoadingMaxPages, maxPages, lastQuestions, filtersObject, sortObject, runAfter } = state;
    const limit: number = 5;
    const navigate = useNavigate()
    const shimmerArray = Array(5).fill('');


    const getPosts = () => {
        setState({ isLoadingPost: true })
        return PostService.getFilterPosts({
            limit: limit,
            page: currentPage,
            filter: ObjectToFilterQuery(filtersObject),
            sort: ObjectToFilterQuery(sortObject),
        }).then((data) => {
            setState((draft) => {
                draft.posts = data.data ?? []
            })
        })
    }

    const getMaxPages = () => {
        setState({ isLoadingMaxPages: true })
        return PostService.getMaxPages({
            limit: limit,
            filter: ObjectToFilterQuery(filtersObject),
        }).then((data) => {
            setState({ maxPages: data.data })
        })
    }


    const getLikelyQuestions = () => {
        setState({ isLoadingLastQuestions: true })
        return PostService.getFilterPosts({
            limit: 10,
            filter: ObjectToFilterQuery({
                status: "Public",
                category: "question"
            }),
            sort: ObjectToFilterQuery({
                createdAt: "desc"
            }),
        }).then((data) => {
            setState((draft) => {
                draft.lastQuestions = data.data ?? []
            })
        })
    }

    useEffect(() => {
        
        if (runAfter) {
            if (currentPage === 1) {
                Promise.all([getPosts(), getMaxPages()]).then(([..._other]) => {
                    setState((draft) => {
                        draft.isLoadingMaxPages = false;
                        draft.isLoadingPost = false
                    })
                })
            } else {
                getMaxPages().then(() => {
                    setState({ isLoadingMaxPages: false })
                })
                setState({ currentPage: 1})
            }
        } else {
            getMaxPages().then(() => {
                setState({ isLoadingMaxPages: false })
            })
            setState({ runAfter: true })
        }
    }, [filtersObject, sortObject])

    useEffect(() => {
        getPosts().then(() => setState({ isLoadingPost: false }))
    }, [currentPage])

    useEffect(() => {
        getLikelyQuestions().then(() => setState({ isLoadingLastQuestions: false }))
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
                            onClick={() => setState({ isFilterPanelOpen: true })}
                        >
                            Bộ lọc
                        </Button>
                        {isFilterPanelOpen && <FilterPanel
                            open={isFilterPanelOpen}
                            filtersValue={filtersObject}
                            sortValue={sortObject}
                            placement={"right"}
                            onClosePanel={() => setState({ isFilterPanelOpen: false })}
                            onOpenPanel={() => setState({ isFilterPanelOpen: true })}
                            onApply={(filter, sort) => {
                                setState((draft) => {
                                    draft.filtersObject = filter
                                    draft.sortObject = sort
                                })
                            }}
                        />}
                    </Stack>
                    <Stack
                        direction={"column"}
                        spacing={1}
                        width={"100%"}
                    >
                        {isLoadingPost ? shimmerArray.map((_item, id) => (
                            <PostShimmer key={id} />
                        )) : posts.length ? posts?.map((post: IPostDataProps) => (
                            <PostCard
                                key={post._id}
                                item={post}
                                onClick={() => navigate(`/post/${post._id}`)}
                            />)) : <span style={{ textAlign: "center" }}>Không có bài viết phù hợp</span>
                        }
                    </Stack>
                    {maxPages > 0 && <Stack
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flexDirection={"row"}
                        marginTop={4}
                    >
                        <Pagination
                            loading={isLoadingMaxPages}
                            maxPages={maxPages}
                            currentPage={currentPage}
                            onChangePage={(page) => setState({ currentPage: page })}
                        />
                    </Stack>}
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
                        {isLoadingLastQuestions ? shimmerArray.map((_item, id) => (
                            <QuestionShimmer key={id} />
                        )) : lastQuestions.length ? lastQuestions?.map((post: IPostDataProps) => (
                            <QuestionCard
                                key={post._id}
                                item={post}
                                onClick={() => navigate(`/post/${post._id}`)}
                            />)) : <span style={{ textAlign: "center" }}>Không có bài viết phù hợp</span>
                        }
                    </Stack>
                </Box>
            </Container>
        </AppLayout>
    );
};

export default Home;
