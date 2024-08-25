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
import { SearchTabList } from './util';
import { PostService } from '../../services/posts/PostService';
import PostCard from '../../components/postCard/PostCard';
import SearchSort from '../../components/searchsort/SearchSort';

interface ISearchPageProps { }

interface ISearchPageState {
    tabValue: string,
    posts?: any[]
}

const initialState: ISearchPageState = {
    tabValue: "newest",
    posts: [],
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
    const [state, setState] = useImmerState<ISearchPageState>(initialState)

    useEffect(() => {
        PostService.getFilterPosts({ limit: 10 }).then((data) => setState({ posts: data.data }))
    }, [])

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setState({ tabValue: newValue })
    };
    return (
        <AppLayout>
            <div className='g-search-page-content-section'>
                <Box sx={{ flex: 1, typography: 'body1' }}>
                    <TabContext value={state.tabValue}>
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
                                        style={{
                                            textTransform: "none",
                                            color: "#9b9b9b",
                                            maxWidth: 100,
                                            width: "100%"
                                        }}
                                    />
                                ))}
                                <SearchSort />
                            </TabList>
                        </Box>
                        <TabPanel value="newest">
                            {state.posts?.map((post: any) => (
                                <PostCard
                                    authorAvatar={post.author.avatar}
                                    category={post.category}
                                    postAuthor={post.author.displayName}
                                    postComment={post.comments}
                                    postCreatedAt={post.createdAt}
                                    title={post.title}
                                    subTitle='React'
                                    key={post._id}
                                />
                            ))}
                        </TabPanel>
                        <TabPanel value="question">
                            {state.posts?.map((post: any) => (
                                <PostCard
                                    authorAvatar={post.author.avatar}
                                    category={post.category}
                                    postAuthor={post.author.displayName}
                                    postComment={post.comments}
                                    postCreatedAt={post.createdAt}
                                    title={post.title}
                                    subTitle='React'
                                    key={post._id}
                                />
                            ))}
                        </TabPanel>
                        <TabPanel value="discussion">
                            {state.posts?.map((post: any) => (
                                <PostCard
                                    authorAvatar={post.author.avatar}
                                    category={post.category}
                                    postAuthor={post.author.displayName}
                                    postComment={post.comments}
                                    postCreatedAt={post.createdAt}
                                    title={post.title}
                                    subTitle='React'
                                    key={post._id}
                                />
                            ))}
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </AppLayout>
    )
}

export default SearchPage