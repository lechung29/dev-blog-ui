/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import { Grid, Skeleton } from "@mui/material";
import { useImmerState } from "../../../hook/useImmerState";
import "./index.scss";
import FavouriteCard from "../../../components/favouritecard/FavouriteCard";
import { IPostDataProps } from "../../../types/Post";
import { useAppSelector } from "../../../redux/store/store";
import { userState } from "../../../redux/reducers/users/UserSlice";
import { PostService } from "../../../services/posts/PostService";
import { IRequestStatus } from "../../../types/IResponse";
import { Label } from "../../../components/common/label/Label";
import { Alert, ISeverity } from "../../../components/common/alert/Alert";
import { useTranslation } from "react-i18next";
import { classNames } from "../../../utils/helper";

interface IFavouritePostProps { }

interface IFavouriteState {
	favoritePosts: IPostDataProps[]
	isLoading: boolean;
	isAlertOpen: boolean
	alertType: ISeverity,
	alertMessage: string,
}

const initialState: IFavouriteState = {
	favoritePosts: [],
	isLoading: false,
	isAlertOpen: false,
	alertMessage: "",
	alertType: ISeverity.success,
};

const FavouritePost: React.FunctionComponent<IFavouritePostProps> = (props) => {
	const { user } = useAppSelector(userState)
	const [state, setState] = useImmerState<IFavouriteState>(initialState);
	const { favoritePosts, isLoading, alertMessage, alertType, isAlertOpen } = state
	const { t } = useTranslation()

	const getFavouritePosts = async () => {
		setState({ isLoading: true })
		const res = await PostService.getFavoritePostByUserId(user?._id!)
		setState((draft) => {
			draft.favoritePosts = res.data || [];
			draft.isLoading = false;
		})
	}

	useEffect(() => {
		getFavouritePosts();
	}, [])

	const handleChangeFavouritePosts = (item: IPostDataProps) => {
		return PostService.addOrRemoveFavorites(user?._id!, item._id, !item.isFavorite)
			.then((data) => {
				setState((draft) => {
					draft.alertMessage = data.message
					draft.alertType = data.requestStatus === IRequestStatus.Success ? ISeverity.success : ISeverity.error
					draft.isAlertOpen = true
				})
			})
			.then(() => {
				getFavouritePosts();
			})
	}

	return (
		<DashboardLayout title={t("ManageFavorite.Title")}>
			<div className="g-dashboard-content-section">
				<Grid className={classNames("g-dashboard-content-grid", {"g-dashboard-content-grid-no-item": (!favoritePosts.length && !isLoading)})} container spacing={2}>
					{isLoading
						? Array(8).fill("").map((_item, index) => (
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Skeleton key={index} variant="rounded" width={"100%"} height={220} />
							</Grid>
						))
						: favoritePosts.length
							? favoritePosts.map((post) => (
								<Grid item xs={12} sm={6} md={5} lg={3}>
									<FavouriteCard
										item={post}
										onChangeFavorite={(item) => {
											handleChangeFavouritePosts(item)
										}}
									/>
								</Grid>
							))
							: <Label
								className="g-post-no-item-label"
								title={t("Common.Post.NoItem")}
							/>
					}
				</Grid>
				{isAlertOpen && <Alert
					open={isAlertOpen}
					severity={alertType}
					message={t(alertMessage)}
					onClose={() => setState({ isAlertOpen: false })}
				/>}
			</div>
		</DashboardLayout>
	);
};

export default FavouritePost;
