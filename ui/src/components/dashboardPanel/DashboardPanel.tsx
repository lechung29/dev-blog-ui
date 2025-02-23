import React, { useMemo } from "react";
import "./index.scss";
import { List, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import { adminPanelList, userPanelList } from "./index";
import { useAppSelector } from "../../redux/store/store";
import { userState } from "../../redux/reducers/users/UserSlice";
import { Label } from "../common/label/Label";
import { useTranslation } from "react-i18next";

const DashboardPanel: React.FunctionComponent = () => {
	const { user } = useAppSelector(userState)
	const { t } = useTranslation()
	const panelList = useMemo(() => {
		const finalPanelList = user?.role === "admin" ? adminPanelList : userPanelList
		return finalPanelList.map((item) => ({
			...item,
			title: t(item.title)
		}))
	}, [user, t])

	return (
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
							to={item.route!}
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
	);
};

export default DashboardPanel;
