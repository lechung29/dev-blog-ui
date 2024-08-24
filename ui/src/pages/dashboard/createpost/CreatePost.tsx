import React from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import "./createpost.scss";
import { Label } from "../../../components/common/label/Label";
import { Autocomplete, Chip, Grid, ListItem, Paper, Stack, TextField } from "@mui/material";
import { useImmerState } from "../../../hook/useImmerState";
import { IPostCategoryValue, PostCategoryList } from "./util";
import { renderToast } from "../../../utils/utils";
import "react-quill/dist/quill.snow.css";
import Editor from "../../../components/posteditor/Editor";
import { DefaultButton } from "../../../components/common/button/defaultbutton/DefaultButton";

interface ICreatePostOwnProps {}

export interface EditorContentChanged {
	html: string;
	markdown: string;
}

interface ICreatePostState {
	categoryInput: string;
	categoryValue: IPostCategoryValue | null;
	postTitle: string;
	tags: string[];
	postContent: string;
	postThumbnails: string | null;
}

const initialState: ICreatePostState = {
	categoryInput: "",
	categoryValue: null,
	postTitle: "",
	tags: [],
	postContent: "",
	postThumbnails: null,
};

const CreatePost: React.FunctionComponent<ICreatePostOwnProps> = (props) => {
	const [state, setState] = useImmerState<ICreatePostState>(initialState);

	const handleDeleteTags = (tagToDelete: string) => () => {
		setState({ tags: state.tags.filter((item) => item !== tagToDelete) });
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			setState({ tags: [...state.tags, "Machine learning 111"] });
			renderToast("error", "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddđ");
		}
	};

	const handlePostThumbailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setState({ postThumbnails: URL.createObjectURL(file) });
		}
	};

	return (
		<DashboardLayout>
			<div className="g-dashboard-content-section">
				<Stack display={"flex"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
					<Label className="g-dashboard-content-title" title="Tạo bài post" bold />
				</Stack>
				<Grid container spacing={2}>
					<Grid style={{ display: "flex", flexDirection: "column" }} item sm={4} xs={12} md={4}>
						<Label className="g-create-post-title" title="Danh mục" />
						<Autocomplete
							value={state.categoryValue}
							onChange={(_event: any, newValue: IPostCategoryValue | null) => {
								setState({ categoryValue: newValue });
							}}
							inputValue={state.categoryInput}
							onInputChange={(_event, newInputValue) => {
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
								m: 0,
							}}
							component="ul"
							className="g-create-post-tag-list"
						>
							{state.tags.map((data) => {
								return (
									<ListItem className="g-create-post-tag-list-item" key={`${data}-key`}>
										<Chip className="g-create-post-tag-list-chip" label={data} onDelete={data === "All" ? undefined : handleDeleteTags(data)} />
									</ListItem>
								);
							})}
						</Paper>
					</Grid>
					<Grid style={{ display: "flex", flexDirection: "column" }} item sm={12} xs={12} md={12}>
						<form className="form">
							<span className="form-title">Tải ảnh thumbnail</span>
							<label htmlFor="file-input" className="drop-container">
								<input type="file" accept="image/*" id="file-input" onChange={handlePostThumbailsChange} />
							</label>
						</form>
					</Grid>
					<Grid style={{ display: "flex", flexDirection: "column", marginBottom: "4rem" }} item sm={12} xs={12} md={12}>
						<Editor onChange={(e) => setState({ postContent: e.html })} />
					</Grid>
					<Grid style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", paddingBottom: 16 }} item sm={12} xs={12} md={12}>
						<DefaultButton
							className="g-create-post-submit-btn"
							title="Xác nhận"
							variant="contained"
							buttonStyle={{
								backgroundColor: "#5488c7",
								textTransform: "capitalize",
								fontSize: 13,
								height: 36,
								width: 120
							}}
							iconStyle={{
								width: 20,
								height: 20,
								color: "#fff",
							}}
							isLoading={false}
						/>
					</Grid>
				</Grid>
			</div>
		</DashboardLayout>
	);
};

export default CreatePost;
