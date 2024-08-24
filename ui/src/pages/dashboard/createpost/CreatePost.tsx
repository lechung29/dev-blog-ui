import React from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import "./createpost.scss";
import { Label } from "../../../components/common/label/Label";
import { Autocomplete, Chip, FormHelperText, Grid, ListItem, Paper, Stack, TextField } from "@mui/material";
import { useImmerState } from "../../../hook/useImmerState";
import { IPostCategoryValue, PostCategoryList } from "./util";
import { IToastProps, renderToast } from "../../../utils/utils";
import "react-quill/dist/quill.snow.css";
import Editor from "../../../components/posteditor/Editor";
import { DefaultButton } from "../../../components/common/button/defaultbutton/DefaultButton";
import { PostService } from "../../../services/posts/PostService";
import { IRequestStatus } from "../../../types/IResponse";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

interface ICreatePostOwnProps { }

export interface EditorContentChanged {
	html: string;
	markdown: string;
}

interface ICreatePostState {
	categoryInput: string;
	categoryValue: IPostCategoryValue | null;
	postTitle: string;
	tags: string[];
	tagValue: string
	postContent: string;
	postThumbnails: string;
	titleError?: string;
	tagError?: string;
	categoryError?: string;
	contentError?: string;
	isLoading: boolean;
}

const initialState: ICreatePostState = {
	categoryInput: "",
	categoryValue: null,
	postTitle: "",
	tags: [],
	tagValue: "",
	postContent: "",
	postThumbnails: "",
	isLoading: false,
};

const CreatePost: React.FunctionComponent<ICreatePostOwnProps> = (props) => {
	const [state, setState] = useImmerState<ICreatePostState>(initialState);
	const { 
		categoryInput, 
		categoryValue, 
		postTitle, 
		tags, 
		tagValue, 
		postContent, 
		postThumbnails, 
		titleError, 
		tagError, 
		categoryError, 
		contentError,
		isLoading
	} = state
	const navigate = useNavigate()
	const role = useSelector((state: RootState) => state.user.user?.role)

	const handleDeleteTags = (tagToDelete: string) => () => {
		setState({ tags: state.tags.filter((item) => item !== tagToDelete) });
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			if (tags.includes(tagValue)) {
				renderToast(IToastProps.error, "Tag này đã tồn tại");
			} else if (tags.length + 1 > 3) {
				renderToast(IToastProps.error, "Bài viết chỉ có tối đa 3 tag")
			} else {
				setState({ tags: [...state.tags, tagValue], tagError: "", tagValue: ""});
				renderToast(IToastProps.success, "Thêm tag thành công");
			}
		}
	};

	const handlePostThumbailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setState({ postThumbnails: URL.createObjectURL(file) });
		}
	};

	const validatePost = () => {
		let isValid = true;
		let titleError = "";
		let tagError = "";
		let categoryError = "";
		let contentError = "";

		if (!postTitle?.trim()) {
			titleError = "Tiêu đề bài post là bắt buộc";
			setState({ titleError: titleError });
			isValid = false;
		}

		if (!categoryValue?.trim()) {
			categoryError = "Danh mục là bắt buộc";
			setState({ categoryError: categoryError });
			isValid = false;
		} else if (!PostCategoryList.includes(categoryValue)) {
			categoryError = "Danh mục không hợp lệ";
			setState({ categoryError: categoryError });
			isValid = false;
		}

		if (tags.length === 0) {
			tagError = "Thêm tag cho bài post";
			setState({ tagError: tagError });
			isValid = false;
		} 

		if (!postContent.trim()) {
			contentError = "Nội dung bài post là bắt buộc";
			setState({ contentError: contentError });
			isValid = false;
		}

		return isValid
	}

	const handleSubmit = async () => {
		setState({ isLoading: true });
		if (!validatePost()) {
			setState({ isLoading: false });
			return;
		} else {
			const data = await PostService.createPost({
				title: postTitle,
                category: categoryValue ?? "",
                tags: tags,
                content: postContent,
                thumbnail: postThumbnails ?? "",
			})
			if (data.requestStatus === IRequestStatus.Error) {
				switch (data.fieldError) {
					case "title": 
						setState({ titleError: data.message, isLoading: false });
						break;
					default: 
						break;
				}
			} else {
				setState({ isLoading: false})
				renderToast(IToastProps.success, data.message)
				setTimeout(() => {
					navigate(`/${role}-dashboard/post-management`)
				}, 3000)
			}
		}
	}

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
							value={categoryValue}
							onChange={(_event, newValue: IPostCategoryValue | null) => {
								setState({ categoryValue: newValue, categoryError: "" });
							}}
							inputValue={categoryInput}
							onInputChange={(_event, newInputValue) => {
								setState({ categoryInput: newInputValue });
							}}
							id="controllable-states-demo"
							options={PostCategoryList}
							sx={{ width: "100%" }}
							renderInput={(params) =>
								<TextField
									error={!!categoryError}
									helperText={categoryError}
									variant="standard"
									{...params}
								/>
							}
						/>
					</Grid>
					<Grid style={{ display: "flex", flexDirection: "column" }} item sm={8} xs={12} md={8}>
						<Label className="g-create-post-title" title="Tên bài post" />
						<TextField
							error={!!titleError}
							helperText={titleError}
							variant="standard"
							value={postTitle}
							onChange={(event) => {
								setState({ postTitle: event.target.value, titleError: "" });
							}}
						/>
					</Grid>

					<Grid style={{ display: "flex", flexDirection: "column" }} item sm={4} xs={12} md={4}>
						<Label className="g-create-post-title" title="Tên thẻ" />
						<TextField
							onKeyDown={handleKeyDown}
							value={tagValue}
							onChange={(event) => {
								setState({ tagValue: event.target.value });
							}}
							error={!!tagError}
							id="standard-error-helper-text"
							helperText={tagError}
							variant="standard"
						/>
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
							{tags.map((data) => {
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
					<Grid style={{ display: "flex", gap: "2.75rem", flexDirection: "column", marginBottom: "4rem" }} item sm={12} xs={12} md={12}>
						<Editor value={postContent} onChange={(e) => setState({ postContent: e.html, contentError: "" })} />
						<FormHelperText error={!!contentError} id="post-content-error">{contentError}</FormHelperText>
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
							onClick={handleSubmit}
							iconStyle={{
								width: 20,
								height: 20,
								color: "#fff",
							}}
							isLoading={isLoading}
						/>
					</Grid>
				</Grid>
			</div>
		</DashboardLayout>
	);
};

export default CreatePost;
