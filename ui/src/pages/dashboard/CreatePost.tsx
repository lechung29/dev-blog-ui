import React from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import "./createpost.scss";
import { Label } from "../../components/common/label/Label";
import { Autocomplete, Chip, Grid, ListItem, Paper, Stack, TextField } from "@mui/material";
import { useImmerState } from "../../hook/useImmerState";
import { IPostCategoryValue, PostCategoryList } from "./util";
import { renderToast } from "../../utils/utils";

interface ICreatePostOwnProps {}

interface ICreatePostState {
	categoryInput: string;
	categoryValue: IPostCategoryValue | null;
	postTitle: string;
	tags: string[];
}

const initialState: ICreatePostState = {
	categoryInput: "",
	categoryValue: null,
	postTitle: "",
	tags: ["All", "React"],
};

const CreatePost: React.FunctionComponent<ICreatePostOwnProps> = (props) => {
	const [state, setState] = useImmerState<ICreatePostState>(initialState);

	const handleDeleteTags = (tagToDelete: string) => () => {
		setState({ tags: state.tags.filter((item) => item !== tagToDelete) });
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			setState({ tags: [...state.tags, "vuejs"] });
			renderToast("error", "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddđ");
		}
	};
	return (
		<DashboardLayout>
			<div className="g-dashboard-content-section">
				<Stack display={"flex"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
					<Label className="g-dashboard-content-title" title="Tạo bài post" bold />
				</Stack>
				<Grid container spacing={1}>
					<Grid style={{ display: "flex", flexDirection: "column" }} item sm={4} xs={12} md={4}>
						<Label className="g-create-post-title" title="Danh mục" />
						<Autocomplete
							value={state.categoryValue}
							onChange={(event: any, newValue: IPostCategoryValue | null) => {
								setState({ categoryValue: newValue });
							}}
							inputValue={state.categoryInput}
							onInputChange={(event, newInputValue) => {
								setState({ categoryInput: newInputValue });
							}}
							id="controllable-states-demo"
							options={PostCategoryList}
							sx={{ width: "100%" }}
							renderInput={(params) => <TextField {...params} variant="standard" />}
						/>
					</Grid>
					<Grid style={{ display: "flex", flexDirection: "column" }} item sm={8} xs={12} md={8}>
						<Label className="g-create-post-title" title="Tên bài post" />
						<TextField error={false} helperText="" variant="standard" />
					</Grid>

					<Grid style={{ display: "flex", flexDirection: "column" }} item sm={4} xs={12} md={4}>
						<Label className="g-create-post-title" title="Tên thẻ" />
						<TextField onKeyDown={handleKeyDown} value={"Vuejs"} error={false} id="standard-error-helper-text" helperText="" variant="standard" />
					</Grid>
					<Grid style={{ display: "flex", flexDirection: "column" }} item sm={8} xs={12} md={8}>
						<Label className="g-create-post-title" title="Danh sách thẻ" />
						<Paper
							sx={{
								display: "flex",
								justifyContent: "center",
								listStyle: "none",
								p: 0.5,
								m: 0,
							}}
							component="ul"
						>
							{state.tags.map((data) => {
								return (
									<ListItem key={`${data}-key`}>
										<Chip label={data} onDelete={data === "All" ? undefined : handleDeleteTags(data)} />
									</ListItem>
								);
							})}
						</Paper>
					</Grid>
				</Grid>
			</div>
		</DashboardLayout>
	);
};

export default CreatePost;
