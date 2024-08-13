import React from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import { Button, Grid, Stack } from "@mui/material";
import { useImmerState } from "../../../hook/useImmerState";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FilterPanel } from "../../../components/filterPanel/FilterPanel";
import "./index.scss";
import FavouriteCard from "../../../components/favouritecard/FavouriteCard";

interface IFavouritePostProps {}

interface IFavouriteState {
	isFilterPanelOpen: boolean;
}

const initialState: IFavouriteState = {
	isFilterPanelOpen: false,
};

const FavouritePost: React.FunctionComponent<IFavouritePostProps> = (props) => {
	const [state, setState] = useImmerState<IFavouriteState>(initialState);
	return (
		<DashboardLayout>
			<div className="g-dashboard-content-section">
				<Stack display={"flex"} marginBottom={2} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-end"}>
					<Button className="g-favourite-filter-button" startIcon={<FilterAltIcon />} onClick={() => setState({ isFilterPanelOpen: true })}>
						Bộ lọc
					</Button>
					<FilterPanel
						open={state.isFilterPanelOpen}
						placement={"right"}
						onClosePanel={() => setState({ isFilterPanelOpen: false })}
						onOpenPanel={() => setState({ isFilterPanelOpen: true })}
					/>
				</Stack>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<FavouriteCard />
					</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
						<FavouriteCard />
					</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
						<FavouriteCard />
					</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
						<FavouriteCard />
					</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
						<FavouriteCard />
					</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
						<FavouriteCard />
					</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
						<FavouriteCard />
					</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
						<FavouriteCard />
					</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
						<FavouriteCard />
					</Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
						<FavouriteCard />
					</Grid>
				</Grid>
			</div>
		</DashboardLayout>
	);
};

export default FavouritePost;
