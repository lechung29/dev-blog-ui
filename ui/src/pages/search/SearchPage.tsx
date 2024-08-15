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

interface ISearchPageProps {}

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
        PostService.getPosts({limit: 10}).then((data) => setState({posts: data.data}))
    }, [])

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setState({tabValue: newValue})
    };
    return (
        <AppLayout>
            <div className='g-search-page-content-section'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={state.tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="search-tab-content">
                                {SearchTabList.map((item, index) => (
                                    <Tab 
                                        key={index}
                                        label={item.label} 
                                        value={item.value}
                                        style={{
                                            textTransform: "none"
                                        }}
                                    />
                                ))}
                            </TabList>
                        </Box>
                        <TabPanel value="newest">
                            Item One
                        </TabPanel>
                        <TabPanel value="question">Item Two</TabPanel>
                        <TabPanel value="discussion">Item Three</TabPanel>
                    </TabContext>
                </Box>
            </div>
        </AppLayout>
    )
}

export default SearchPage