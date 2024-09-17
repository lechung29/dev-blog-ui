import React, { useRef } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import "./createpost.scss";
import { Label } from "../../../components/common/label/Label";
import { Autocomplete, Chip, FormHelperText, Grid, ListItem, Paper, Stack, TextField } from "@mui/material";
import { useImmerState } from "../../../hook/useImmerState";
import { IPostCategoryValue } from "./util";
import "react-quill/dist/quill.snow.css";
import Editor from "../../../components/posteditor/Editor";
import { DefaultButton } from "../../../components/common/button/defaultbutton/DefaultButton";
import { PostService } from "../../../services/posts/PostService";
import { IRequestStatus } from "../../../types/IResponse";
import { useAppSelector } from "../../../redux/store/store";
import uploadToCloudinary from "../../../services/helpers/upload";
import { useAuth } from "../../../context/AuthContext";
import { userState } from "../../../redux/reducers/users/UserSlice";
import { IAction1, IFunc1 } from "../../../types/Function";
import { useNavigate } from "react-router-dom";
import { Alert, ISeverity } from "../../../components/common/alert/Alert";
import { useTranslation } from "react-i18next";
import { delay } from "../../../utils/helper";

interface ICreatePostOwnProps { }

export interface EditorContentChanged {
	html: string;
	markdown: string;
}

interface ICreatePostState {
	categoryInput: string;
	categoryValue: IPostCategoryValue | null;
	categoryName: string | null;
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
	isAlertOpen: boolean;
	alertMessage: string;
	alertType: ISeverity;
}

const initialState: ICreatePostState = {
	categoryInput: "",
	categoryValue: null,
	categoryName: null,
	postTitle: "",
	tags: [],
	tagValue: "",
	postContent: "",
	postThumbnails: "",
	isLoading: false,
	isAlertOpen: false,
	alertMessage: "",
	alertType: ISeverity.success,
};

const CreatePost: React.FunctionComponent<ICreatePostOwnProps> = (props) => {
	const { handleUnauthorized } = useAuth()
	const [state, setState] = useImmerState<ICreatePostState>(initialState);
	const {
		categoryInput,
		categoryValue,
		categoryName,
		postTitle,
		tags,
		tagValue,
		postContent,
		postThumbnails,
		titleError,
		tagError,
		categoryError,
		contentError,
		isLoading,
		alertMessage,
		alertType,
		isAlertOpen
	} = state
	const categoryRef = useRef<HTMLInputElement>()
	const titleRef = useRef<HTMLInputElement>()
	const tagRef = useRef<HTMLInputElement>()
	const navigate = useNavigate()
	const { user } = useAppSelector(userState)
	const { t } = useTranslation()

	const PostCategoryList: string[] = [t("Category.Post"), t("Category.Question"), t("Category.Discussion")]

	const handleDeleteTags = (tagToDelete: string) => () => {
		setState({ tags: state.tags.filter((item) => item !== tagToDelete) });
	};

	const handleKeyDown: IAction1<React.KeyboardEvent> = (event) => {
		if (event.key === "Enter") {
			if (tagValue.includes(" ")) {
				setState((draft) => {
					draft.alertMessage = "Error.Tag.Include.Blank";
					draft.alertType = ISeverity.error
					draft.isAlertOpen = true
				})
			} else {
				if (tags.includes(tagValue)) {
					setState((draft) => {
						draft.alertMessage = "Error.Tag.Existed";
						draft.alertType = ISeverity.error
						draft.isAlertOpen = true
					})
				} else if (tags.length + 1 > 3) {
					setState((draft) => {
						draft.alertMessage = "Error.Tag.MaxLength";
						draft.alertType = ISeverity.error
						draft.isAlertOpen = true
					})
				} else {
					setState({ tags: [...state.tags, tagValue], tagError: "", tagValue: "" });
					setState((draft) => {
						draft.alertMessage = "Successful.Add.Tag";
						draft.alertType = ISeverity.success
						draft.isAlertOpen = true
					})
				}
			}

		}
	};

	const handlePostThumbnailChange: IFunc1<React.ChangeEvent<HTMLInputElement>, Promise<void>> = async (event) => {
		const file = event.target.files?.[0];
		if (file) {
			const url = await uploadToCloudinary(file)
			setState({ postThumbnails: url });
		}
	};

	const validatePost = () => {
		let isValid = true;
		let titleError = "";
		let tagError = "";
		let categoryError = "";
		let contentError = "";

		if (!postTitle?.trim()) {
			titleError = "Required.Post.Title";
			setState({ titleError: titleError });
			isValid = false;
		}

		if (!categoryName?.trim()) {
			categoryError = "Required.Post.Category";
			setState({ categoryError: categoryError });
			isValid = false;
		} else if (!PostCategoryList.includes(categoryName!)) {
			categoryError = "Invalid.Post.Category";
			setState({ categoryError: categoryError });
			isValid = false;
		}

		if (tags.length === 0) {
			tagError = "Required.Post.Tag";
			setState({ tagError: tagError });
			isValid = false;
		}

		if (!postContent.trim()) {
			contentError = "Required.Post.Content";
			setState({ contentError: contentError });
			isValid = false;
		}

		if (categoryError || titleError || tagError) {
			if (categoryError) {
				categoryRef.current?.focus()
			} else if (titleError) {
				titleRef.current?.focus()
			} else if (tagError) {
				tagRef.current?.focus()
			}
		}

		return isValid
	}

	const handleSubmit = async () => {
		setState({ isLoading: true });
		if (!validatePost()) {
			setState({ isLoading: false });
			return Promise.resolve();
		} else {
			const data = await PostService.createPost({
				title: postTitle,
				category: categoryValue ?? "",
				tags: tags,
				content: postContent,
				thumbnail: postThumbnails ?? "",
			}, handleUnauthorized)
			if (data.requestStatus === IRequestStatus.Error) {
				switch (data.fieldError) {
					case "title":
						setState({ titleError: t(data.message), isLoading: false });
						break;
					default:
						break;
				}
			} else {
				setState({ isLoading: false })
				setState((draft) => {
					draft.alertMessage = t(data.message)
					draft.alertType = ISeverity.success
					draft.isAlertOpen = true
				})
				await delay(2000).then(() => {
					navigate(`/${user?.role}-dashboard/post-management`)
				})
			}
		}
	}

	return (
		<DashboardLayout title={t("CreatePost.Title")}>
			<div className="g-dashboard-content-section">
				<Stack className="g-dashboard-content-section-title">
					<Label
						className="g-dashboard-content-title"
						title={t("Page.Create.Post.Title")}
						bold
					/>
				</Stack>
				<Grid container spacing={2}>
					<Grid className="g-create-post-section-basic-info" item sm={4} xs={12} md={4}>
						<Label
							className="g-create-post-info-title"
							title={t("Common.Category")}
						/>
						<Autocomplete
							value={categoryName}
							onChange={(_event, newValue: string | null) => {
								switch (newValue) {
									case t("Category.Post"):
										setState({ categoryName: newValue, categoryValue: "post", categoryError: "" });
										break;
									case t("Category.Question"):
										setState({ categoryName: newValue, categoryValue: "question", categoryError: "" })
										break;
									case t("Category.Discussion"):
										setState({ categoryName: newValue, categoryValue: "discussion", categoryError: "" });
										break;
									default:
										break;
								}
							}}
							inputValue={categoryInput}
							onInputChange={(_event, newInputValue) => {
								setState({ categoryInput: newInputValue });
							}}
							id="g-category-data"
							options={PostCategoryList}
							sx={{ width: "100%" }}
							renderInput={(params) =>
								<TextField
									error={!!categoryError}
									inputRef={categoryRef}
									helperText={categoryError}
									variant="standard"
									{...params}
								/>
							}
						/>
					</Grid>
					<Grid className="g-create-post-section-basic-info" item sm={8} xs={12} md={8}>
						<Label
							className="g-create-post-info-title"
							title={t("Post.Create.Name")}
						/>
						<TextField
							error={!!titleError}
							helperText={titleError}
							variant="standard"
							value={postTitle}
							inputRef={titleRef}
							onChange={(event) => {
								setState({ postTitle: event.target.value, titleError: "" });
							}}
						/>
					</Grid>

					<Grid className="g-create-post-section-basic-info" item sm={4} xs={12} md={4}>
						<Label
							className="g-create-post-info-title"
							title={t("Post.Create.TagName")}
						/>
						<TextField
							onKeyDown={handleKeyDown}
							value={tagValue}
							onChange={(event) => {
								setState({ tagValue: event.target.value });
							}}
							inputRef={tagRef}
							error={!!tagError}
							id="standard-error-helper-text"
							helperText={tagError}
							variant="standard"
						/>
					</Grid>
					<Grid className="g-create-post-section-basic-info" item sm={8} xs={12} md={8}>
						<Label className="g-create-post-info-title" title={t("Post.Create.TagList")} />
						<Paper
							component="ul"
							className="g-create-post-tag-list"
						>
							{tags.map((data) => {
								return (
									<ListItem className="g-create-post-tag-list-item" key={`${data}-key`}>
										<Chip className="g-create-post-tag-list-chip" label={data} onDelete={handleDeleteTags(data)} />
									</ListItem>
								);
							})}
						</Paper>
					</Grid>
					<Grid className="g-create-post-section-basic-info" item sm={12} xs={12} md={12}>
						<form className="g-upload-image-form">
							<span className="g-upload-image-form-title">{t("Post.Create.Thumbmail")}</span>
							<label htmlFor="file-input" className="g-upload-image-form-drop-container">
								<input type="file" accept="image/*" id="file-input" onChange={handlePostThumbnailChange} />
							</label>
						</form>
					</Grid>
					<Grid className="g-create-post-section-content" item sm={12} xs={12} md={12}>
						<Editor value={postContent} onChange={(e) => setState({ postContent: e.html, contentError: "" })} />
						<FormHelperText error={!!contentError} id="post-content-error">{contentError}</FormHelperText>
					</Grid>
					<Grid className="g-create-post-section-action-button" item sm={12} xs={12} md={12}>
						<DefaultButton
							className="g-create-post-submit-btn"
							title={t("Common.Confirm")}
							variant="contained"
							onClick={handleSubmit}
							iconStyle={{
								width: 20,
								height: 20,
								color: "#fff",
							}}
							isLoading={isLoading}
						/>
					</Grid>
					{isAlertOpen && <Alert
						open={isAlertOpen}
						severity={alertType}
						message={alertMessage}
						onClose={() => setState({ isAlertOpen: false })}
					/>}
				</Grid>
			</div>
		</DashboardLayout>
	);
};

export default CreatePost;
