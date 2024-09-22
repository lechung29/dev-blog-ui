import React, { useMemo } from 'react'
import { Anchor } from '../filterPanel/FilterPanel';
import { IFunc } from '../../types/Function';
import { Box, Button, List, ListItemIcon, Stack, SwipeableDrawer } from '@mui/material';
import { Label } from '../common/label/Label';
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from '../common/divider/Divider';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../redux/store/store';
import { userState } from '../../redux/reducers/users/UserSlice';
import { adminPanelList, userPanelList } from '.';
import { NavLink } from 'react-router-dom';
import "./ResDashboard.scss"

interface IDashboardPanelOwnProps {
    placement: Anchor;
    open: boolean;
    onClosePanel: () => void;
    onOpenPanel: () => void;
}

const ResDashboardPanel: React.FunctionComponent<IDashboardPanelOwnProps> = (props) => {
    const { open, placement, onClosePanel, onOpenPanel } = props;
    const { t } = useTranslation()
    const { user } = useAppSelector(userState)

    const panelList = useMemo(() => {
        const finalPanelList = user?.role === "admin" ? adminPanelList : userPanelList
        return finalPanelList.map((item) => ({
            ...item,
            title: t(item.title)
        }))
    }, [user, t])

    const onRenderTitle: IFunc<JSX.Element> = () => {
        return (
            <Stack className="g-res-dashboard-header">
                <Stack className="g-res-dashboard-row">
                    <Label
                        className="g-navigate-panel-title"
                        title={t("Common.Management")}
                        bold
                    />
                    <Button
                        variant="text"
                        className="g-panel-close-button"
                        onClick={onClosePanel}
                    >
                        <CloseIcon className="g-filter-close-button-icon" />
                    </Button>
                </Stack>
                <Divider />
            </Stack>
        );
    };
    return (
        <SwipeableDrawer
            anchor={placement}
            open={open}
            onClose={onClosePanel}
            onOpen={onOpenPanel}
            className='g-res-dashboard-panel-section'
        >
            <Box className="g-res-dashboard-panel-box">
                {onRenderTitle()}
                <div className="g-dashboard-panel">
                    <div className="g-dashboard-panel-content">
                        <List
                            className="g-dashboard-panel-list"
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            {panelList.map((item, index) => (
                                <NavLink
                                    className={"g-dashboard-list-item"}
                                    key={index}
                                    to={item.route}
                                >
                                    <ListItemIcon className="g-dashboard-item-icon">
                                        {item.icon}
                                    </ListItemIcon>
                                    <Label
                                        bold
                                        title={item.title}
                                        className="g-dashboard-item-title"
                                    />
                                </NavLink>
                            ))}
                        </List>
                    </div>
                </div>
            </Box>
        </SwipeableDrawer>
    )
}

export default ResDashboardPanel