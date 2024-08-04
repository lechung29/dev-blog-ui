import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IPageRoute } from '../navigationPanel/NavigationPanel';

export const userPanelList: IPageRoute[] = [
    {
        title: "Tổng quan",
        route: "/user-dashboard/overview",
        icon: <GridViewRoundedIcon style={{color: "rgb(20, 21, 34)"}} />
    },
    {
        title: "Tạo post",
        route: "/user-dashboard/create-post",
        icon: <CreateIcon style={{color: "rgb(20, 21, 34)"}} />
    },
    {
        title: "Quản lý post",
        route: "/user-dashboard/post-management",
        icon: <ArticleIcon style={{color: "rgb(20, 21, 34)"}} />
    },
    {
        title: "Yêu thích",
        route: "/user-dashboard/favorite-management",
        icon: <FavoriteIcon style={{color: "rgb(20, 21, 34)"}} />
    }
]