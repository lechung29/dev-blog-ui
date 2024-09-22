/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import { Skeleton, Stack } from "@mui/material";
import "./index.scss";
import { PieChart } from "../../../components/common/chart/piechart/PieChart";
import { BarChart } from "../../../components/common/chart/barchart/BarChart";
import { PostService } from "../../../services/posts/PostService";
import { useAppSelector } from "../../../redux/store/store";
import { userState } from "../../../redux/reducers/users/UserSlice";
import { IPostByCategoryProps, IPostByMonthProps } from "../../../types/Post";
import { useImmerState } from "../../../hook/useImmerState";
import { useTranslation } from "react-i18next";
import { useDesktop, useLaptop, useMiniMobile, useMobile, useTablet } from "../../../utils/Responsive";


interface IOverviewPageProps {
	isLoading: boolean;
	postByMonth: IPostByMonthProps[]
	postByCategory: IPostByCategoryProps[]
	totalLikes: number
	totalPosts: number
	postInCurrentMonth: number
}

const initialState: IOverviewPageProps = {
	isLoading: true,
	postByMonth: [],
	postByCategory: [],
	totalLikes: 0,
	totalPosts: 0,
	postInCurrentMonth: 0
}


const Overview: React.FunctionComponent = () => {
	const { user } = useAppSelector(userState)
	const [state, setState] = useImmerState<IOverviewPageProps>(initialState)
	const { t } = useTranslation()
	const isDesktop = useDesktop()
	const isLaptop = useLaptop()
	const isTablet = useTablet()
	const isMobile = useMobile()
	const isMiniMobile = useMiniMobile()

	useEffect(() => {
		setState((draft) => {
			draft.isLoading = true;
		});
		PostService.getUserOverview(user?._id!)
			.then((data) => {
				setState((draft) => {
					draft.isLoading = false;
					draft.postByMonth = data.data?.postByMonth ?? [];
					draft.postByCategory = data.data?.postByCategory ?? [];
					draft.totalLikes = data.data?.totalLikes ?? 0;
					draft.totalPosts = data.data?.totalPosts ?? 0;
					draft.postInCurrentMonth = data.data?.postInCurrentMonth ?? 0;
				});
			})
	}, [])

	const formattedPostByCategory = useMemo(() => {
		return state.postByCategory.map((category) => {
			let tempLabel = ""
			switch (category.label) {
				case "post":
					tempLabel = t("Category.Post")
					break;
				case "question":
					tempLabel = t("Category.Question")
					break;
				case "discussion":
					tempLabel = t("Category.Discussion")
					break;
				default:
					break;
			}
			return {
				...category,
				label: tempLabel
			}
		})
	}, [t, state.postByCategory])

	const getCardContent = (title: string, value: number) => {
		return (state.isLoading
			? <Fragment>
				<Skeleton variant="rounded" width={"100%"} height={"16px"} />
				<Skeleton variant="rounded" width={"100%"} height={"30px"} />
			</Fragment>
			: <Fragment>
				<h5>{t(title)}</h5>
				<p>{value}</p>
			</Fragment>
		)
	}

	const chartWidth: number = useMemo(() => {
		if (isDesktop) {
			return 450
		} else if (isLaptop) {
			return 600
		} else if (isTablet || (isMobile && !isMiniMobile)) {
			return 450
		} else {
			return 300
		}
	}, [isDesktop, isLaptop, isTablet, isMobile, isMiniMobile])

	const chartHeight: number = useMemo(() => {
		if (isDesktop) {
			return 200
		} else if (isLaptop) {
			return 250
		} else if (isTablet || (isMobile && !isMiniMobile)) {
			return 200
		} else {
			return 140
		}
	}, [isDesktop, isLaptop, isTablet, isMobile, isMiniMobile])

	return (
		<DashboardLayout title={t("OverviewPage.Title")}>
			<div className="g-dashboard-content-section">
				<Stack className="g-dashboard-card-section">
					<div className="g-overview-card g-overview-all-post">
						{getCardContent("Overview.All.MyPost", state.totalPosts)}
					</div>
					<div className="g-overview-card g-overview-month-post">
						{getCardContent("Overview.All.MyPost.CurrentMonth", state.postInCurrentMonth)}
					</div>
					<div className="g-overview-card g-overview-all-like">
						{getCardContent("Overview.All.MyPost.Like", state.totalLikes)}
					</div>
				</Stack>
				<Stack className="g-dashboard-graph-section">
					{state.isLoading
						? <Skeleton variant="rounded" width={"100%"} height={"280px"} />
						: <PieChart
							chartTitle={t("Chart.PostBy.Category.Title")}
							width={chartWidth}
							height={chartHeight}
							data={formattedPostByCategory}
						/>
					}
					{state.isLoading
						? <Skeleton variant="rounded" width={"100%"} height={"280px"} />
						: <BarChart
							chartTitle={t("Chart.PostBy.MonthInYear")}
							chartCategoryLabel={t("Chart.Column.Label")}
							width={chartWidth}
							height={chartHeight}
							dataColumns={[{ dataKey: "post", label: t("Overview.All.MyPost") }]}
							dataSet={state.postByMonth}
						/>
					}
				</Stack>
			</div>
		</DashboardLayout>
	);
};

export default Overview;
