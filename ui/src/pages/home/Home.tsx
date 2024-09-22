/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AppLayout from "../../layout/Layout";
import { PostService } from "../../services/posts/PostService";
import Thumbnail from "../../components/thumbnail/Thumbnail";
import "./index.scss";
import PostCard from "../../components/postCard/PostCard";
import { Box, Container, Stack } from "@mui/material";
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
import { DefaultButton } from "../../components/common/button/defaultbutton/DefaultButton";
import { IFunc } from "../../types/Function";
import { Label } from "../../components/common/label/Label";
import { useTranslation } from "react-i18next";
import { useMiniMobile } from "../../utils/Responsive";
import { IconButton } from "../../components/common/button/iconbutton/IconButton";

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
    const limit: number = 5;
    const navigate = useNavigate()
    const { t } = useTranslation()
    const shimmerArray = Array(5).fill('');
    const [state, setState] = useImmerState<IHomePageState>(initialState)
    const isMiniMobile = useMiniMobile()
    const {
        isFilterPanelOpen,
        posts, currentPage,
        isLoadingPost,
        isLoadingLastQuestions,
        isLoadingMaxPages,
        maxPages,
        lastQuestions,
        filtersObject,
        sortObject,
        runAfter
    } = state;

    const getPosts = async () => {
        setState({ isLoadingPost: true })
        const res = await PostService.getFilterPosts({
            limit: limit,
            page: currentPage,
            filter: ObjectToFilterQuery(filtersObject),
            sort: ObjectToFilterQuery(sortObject),
        })
        setState((draft) => {
            draft.posts = res.data || []
        })
    }

    const getMaxPages = async () => {
        setState({ isLoadingMaxPages: true })
        const res = await PostService.getMaxPages({
            limit: limit,
            filter: ObjectToFilterQuery(filtersObject),
        })
        setState({ maxPages: res.data })
    }


    const getLikelyQuestions = async () => {
        setState({ isLoadingLastQuestions: true })
        const res = await PostService.getFilterPosts({
            limit: 10,
            filter: ObjectToFilterQuery({
                status: "Public",
                category: "question"
            }),
            sort: ObjectToFilterQuery({
                createdAt: "desc"
            }),
        })
        setState((draft) => {
            draft.lastQuestions = res.data || []
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
                setState({ currentPage: 1 })
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


    const onRenderPostItem: IFunc<JSX.Element | JSX.Element[]> = () => {
        return isLoadingPost
            ? shimmerArray.map((_item, id) => (
                <PostShimmer key={id} />
            ))
            : posts.length
                ? posts?.map((post: IPostDataProps) => (
                    <PostCard
                        key={post._id}
                        item={post}
                        onClick={() => navigate(`/post/${post._id}`)}
                    />))
                : <Label
                    className="g-post-no-item-label"
                    title={t("Common.Post.NoItem")}
                />

    }


    const onRenderQuestionItem: IFunc<JSX.Element | JSX.Element[]> = () => {
        return isLoadingLastQuestions
            ? shimmerArray.map((_item, id) => (
                <QuestionShimmer key={id} />
            ))
            : lastQuestions.length
                ? lastQuestions?.map((post: IPostDataProps) => (
                    <QuestionCard
                        key={post._id}
                        item={post}
                        onClick={() => navigate(`/post/${post._id}`)}
                    />))
                : <Label
                    className="g-post-no-item-label"
                    title={t("Common.Post.NoItem")}
                />
    }

    return (
        <AppLayout title={t("HomePage.Title")}>
            <Thumbnail />
            <Box
                component={"section"}
                className="g-navbar-link-section"
            >
                <Link to="/" className="g-navbar-link-section-item">
                    {t("Invite.Group.Link")}
                </Link>
            </Box>
            <Container className="g-homepage-section">
                <Box
                    className="g-homepage-left-section"
                    component={"section"}
                    mx={1}
                >
                    <Stack className="g-homepage-left-section-action">
                        {isMiniMobile ? <IconButton 
                            size="large"
                            className="g-homepage-left-section-filter-icon"
                            icon={<FilterAltIcon />}
                            onClick={() => setState({ isFilterPanelOpen: true })}
                        /> : <DefaultButton
                            className="g-homepage-left-section-filter"
                            title={t("Common.Filter")}
                            startIcon={<FilterAltIcon />}
                            onClick={() => setState({ isFilterPanelOpen: true })}
                        />}

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
                    <Stack className="g-home-page-section-post-list">
                        {onRenderPostItem()}
                    </Stack>
                    {maxPages > 0 && <Stack className="g-home-page-section-post-pagination">
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
                        title={t("Common.Latest.Question")}
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
                        {onRenderQuestionItem()}
                    </Stack>
                </Box>
            </Container>
        </AppLayout>
    );
};

export default Home;
