/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import AppLayout from '../../layout/Layout'
import "./index.scss"
import { Box } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useImmerState } from '../../hook/useImmerState';
// import { PostService } from '../../services/posts/PostService';
import PostCard from '../../components/postCard/PostCard';
import SearchSort from '../../components/searchsort/SearchSort';
import { IPostDataProps } from '../../types/Post';
import { useNavigate, useParams } from 'react-router-dom';
import { IAction2, IFunc, IFunc2, IFunc3 } from '../../types/Function';
import { PostService } from '../../services/posts/PostService';
import { ObjectToFilterQuery } from '../../utils/helper';
import { Pagination } from '../../components/pagination/Pagination';
import { IPostCategoryValue, PostCategoryValue } from '../dashboard/createpost/util';
import * as _ from "lodash"
import PostShimmer from '../../components/postCardShimmer/PostShimmer';
import { Label } from '../../components/common/label/Label';
import { useTranslation } from 'react-i18next';
import { ITabListProps } from './util';

interface ISearchPageProps { }

export interface ISearchSortValue {
    field: string;
    value: string;
}
interface ISearchPageState {
    tabValue: IPostCategoryValue,
    posts: IPostDataProps[]
    sortValue: ISearchSortValue;
    currentPage: number;
    maxPages: number;
    runAfter: boolean;
    openSortMenu: HTMLElement | null;
    isPostLoading: boolean;
    isMaxPageLoading: boolean;
}

const initialState: ISearchPageState = {
    tabValue: "post",
    posts: [],
    sortValue: {
        field: "createdAt",
        value: "desc",
    },
    currentPage: 1,
    maxPages: 0,
    runAfter: false,
    openSortMenu: null,
    isPostLoading: false,
    isMaxPageLoading: false,
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
    const [state, setState] = useImmerState<ISearchPageState>(initialState)
    const { tabValue, posts, currentPage, maxPages, runAfter, sortValue, openSortMenu, isMaxPageLoading, isPostLoading } = state
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { searchText = "" } = useParams()
    const shimmerArray = Array(5).fill('');

    const SearchTabList: ITabListProps[] = [
        {
            label: t("Category.Post"),
            value: "post",
        },
        {
            label: t("Category.Question"),
            value: "question",
        },
        {
            label: t("Category.Discussion"),
            value: "discussion",
        }
    ]

    const getPosts: IFunc3<number, IPostCategoryValue, string, Promise<void>> = (currentPage, category, searchText) => {
        setState((draft) => {
            draft.isPostLoading = true
        })
        return PostService.getFilterPosts({
            limit: 5,
            page: currentPage,
            filter: ObjectToFilterQuery({
                status: "Public",
                category: category,
            }),
            sort: ObjectToFilterQuery(_.set({}, sortValue.field, sortValue.value)),
            search: searchText
        }).then((data) => {
            setState((draft) => {
                draft.posts = data.data ?? []
            })
        })
    }

    const getMaxPages: IFunc2<IPostCategoryValue, string, Promise<void>> = (category, searchText) => {
        setState((draft) => {
            draft.isMaxPageLoading = true
        })
        return PostService.getMaxPages({
            limit: 5,
            filter: ObjectToFilterQuery({
                status: "Public",
                category: category
            }),
            search: searchText
        }).then((data) => {
            setState({ maxPages: data.data })
        })
    }

    useEffect(() => {
        if (tabValue !== "post" || currentPage !== 1) {
            setState((draft) => {
                draft.currentPage = 1
                draft.tabValue = "post"
            })
        } else {
            Promise.all([getPosts(1, "post", searchText), getMaxPages('post', searchText)])
                .then(([..._other]) => {
                    setState((draft) => {
                        draft.isPostLoading = false
                        draft.isMaxPageLoading = false
                    })
                })
        }
    }, [searchText])

    useEffect(() => {
        if (runAfter) {
            getPosts(currentPage, tabValue, searchText)
                .then(() => {
                    setState((draft) => {
                        draft.isPostLoading = false
                    })
                })
        } else {
            setState({ runAfter: true })
        }
    }, [tabValue, currentPage, sortValue])

    useEffect(() => {
        if (runAfter) {
            getMaxPages(tabValue, searchText)
                .then(() => {
                    setState((draft) => {
                        draft.isMaxPageLoading = false
                    })
                })
        } else {
            setState({ runAfter: true })
        }
    }, [tabValue])

    const handleChange: IAction2<React.SyntheticEvent, IPostCategoryValue> = (_event, newValue) => {
        setState({ tabValue: newValue })
    };

    const onRenderTab: IFunc<JSX.Element[]> = () => {
        return isPostLoading
            ? shimmerArray.map((_item, id) => (
                <PostShimmer key={id} />
            ))
            : PostCategoryValue.map((item, key) => (
                <TabPanel key={key} value={item}>
                    {posts.length
                        ? posts?.map((post: IPostDataProps) => (
                            <PostCard
                                key={post._id}
                                item={post}
                                subTitle={searchText}
                                onClick={() => navigate(`/post/${post._id}`)}
                            />
                        ))
                        : <Label
                            className="g-search-no-item-label"
                            title={t("Common.Post.NoItem")}
                        />
                    }
                </TabPanel>
            ))
    }

    return (
        <AppLayout title={t("SearchPage.Title")}>
            <div className='g-search-page-content-section'>
                <Box className='g-search-page-content-box' sx={{ typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="search-tab-content"
                            >

                                {SearchTabList.map((item, index) => (
                                    <Tab
                                        key={index}
                                        label={item.label}
                                        value={item.value}
                                        className='search-tab-content-button'
                                    />
                                ))}
                                <SearchSort
                                    open={openSortMenu}
                                    sortValue={sortValue}
                                    onOpen={(e) => setState({ openSortMenu: e.target })}
                                    onClose={() => setState({ openSortMenu: null })}
                                    onChangeSortValue={(sortValue) => {
                                        setState((draft) => {
                                            draft.sortValue = sortValue
                                        })
                                    }}
                                />
                            </TabList>
                        </Box>
                        {onRenderTab()}
                    </TabContext>
                    <div className='g-search-pagination'>
                        {maxPages > 0 && <Pagination
                            loading={isMaxPageLoading}
                            maxPages={maxPages}
                            currentPage={state.currentPage}
                            onChangePage={(page) => setState({ currentPage: page })}
                        />}
                    </div>
                </Box>
            </div>
        </AppLayout>
    )
}

export default SearchPage