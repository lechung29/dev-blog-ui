import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { IPageRoute } from '../navigationPanel/NavigationPanel';

export const userPanelList: IPageRoute[] = [
    {
        title: "Common.Overview",
        route: "/user-dashboard/overview",
        icon: <GridViewRoundedIcon style={{ color: "rgb(20, 21, 34)" }} />
    },
    {
        title: "Common.Create.Post",
        route: "/user-dashboard/create-post",
        icon: <CreateIcon style={{ color: "rgb(20, 21, 34)" }} />
    },
    {
        title: "Common.Management.Post",
        route: "/user-dashboard/post-management",
        icon: <ArticleIcon style={{ color: "rgb(20, 21, 34)" }} />
    },
    {
        title: "Common.Management.Favorite",
        route: "/user-dashboard/favourite-management",
        icon: <FavoriteIcon style={{ color: "rgb(20, 21, 34)" }} />
    }
]

export const adminPanelList: IPageRoute[] = [
    {
        title: "Common.Overview",
        route: "/admin-dashboard/overview",
        icon: <GridViewRoundedIcon style={{ color: "rgb(20, 21, 34)" }} />
    },
    {
        title: "Common.Create.Post",
        route: "/admin-dashboard/create-post",
        icon: <CreateIcon style={{ color: "rgb(20, 21, 34)" }} />
    },
    {
        title: "Common.Management.Post",
        route: "/admin-dashboard/post-management",
        icon: <ArticleIcon style={{ color: "rgb(20, 21, 34)" }} />
    },
    {
        title: "Common.Management.User",
        route: "/admin-dashboard/user-management",
        icon: <PersonIcon style={{ color: "rgb(20, 21, 34)" }} />
    },
    {
        title: "Common.Management.Favorite",
        route: "/admin-dashboard/favourite-management",
        icon: <FavoriteIcon style={{ color: "rgb(20, 21, 34)" }} />
    }
]