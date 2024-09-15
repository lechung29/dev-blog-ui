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
import { IToastProps, renderToast } from "../../../utils/utils";
import { IRequestStatus } from "../../../types/IResponse";
import { useAuth } from "../../../context/AuthContext";

interface IFavouritePostProps { }

interface IFavouriteState {
	favoritePosts: IPostDataProps[]
	isLoading: boolean;
}

const initialState: IFavouriteState = {
	favoritePosts: [],
	isLoading: false,
};

const FavouritePost: React.FunctionComponent<IFavouritePostProps> = (props) => {
	const { user } = useAppSelector(userState)
	const [state, setState] = useImmerState<IFavouriteState>(initialState);
	const { favoritePosts, isLoading } = state
	const { handleUnauthorized } = useAuth()

	const getFavouritePosts = async () => {
		setState({ isLoading: true })
		const res = await PostService.getFavoritePostByUserId(user?._id!, handleUnauthorized)
		setState((draft) => {
			draft.favoritePosts = res.data || [];
			draft.isLoading = false;
		})
	}

	useEffect(() => {
		getFavouritePosts();
	}, [])

	const handleChangeFavouritePosts = (item: IPostDataProps) => {
		return PostService.addOrRemoveFavorites(user?._id!, item._id, !item.isFavorite, handleUnauthorized)
			.then((data) => {
				renderToast(
					data.requestStatus === IRequestStatus.Success ? IToastProps.success : IToastProps.error,
					data.message
				)
			})
			.then(() => {
				getFavouritePosts();
			})
	}

	return (
		<DashboardLayout>
			<div className="g-dashboard-content-section">
				<Grid container spacing={2}>
					{isLoading
						? Array(8).fill("").map((_item, index) => (
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Skeleton key={index} variant="rounded" width={"100%"} height={220} />
							</Grid>
						))
						: favoritePosts.map((post) => (
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<FavouriteCard
									item={post}
									onChangeFavorite={(item) => {
										handleChangeFavouritePosts(item)
									}}
								/>
							</Grid>
						))}
					{/* <Grid item xs={12} sm={6} md={4} lg={3}>
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
					</Grid> */}
				</Grid>
			</div>
		</DashboardLayout>
	);
};

export default FavouritePost;
