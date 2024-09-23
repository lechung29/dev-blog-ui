/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import "./index.scss"
import { Label } from "../../../components/common/label/Label";
import { Autocomplete, Backdrop, Chip, FormHelperText, Grid, ListItem, Paper, Stack, TextField } from "@mui/material";
import { useImmerState } from "../../../hook/useImmerState";
import { IPostCategoryValue } from "../createpost/util"
import "react-quill/dist/quill.snow.css";
import Editor, { EditorProps } from "../../../components/posteditor/Editor";
import { DefaultButton } from "../../../components/common/button/defaultbutton/DefaultButton";
import { PostService } from "../../../services/posts/PostService";
import { IRequestStatus } from "../../../types/IResponse";
import { useAppSelector } from "../../../redux/store/store";
import uploadToCloudinary from "../../../services/helpers/upload";
import { userState } from "../../../redux/reducers/users/UserSlice";
import { IAction1, IFunc1 } from "../../../types/Function";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, ISeverity } from "../../../components/common/alert/Alert";
import { useTranslation } from "react-i18next";
import { delay } from "../../../utils/helper";
import { htmlToMarkdown } from "../createpost/Parse";
import ConfirmDialog from "../../../components/common/confirmDialog/ConfirmDialog";
import CircularProgress from '@mui/material/CircularProgress';


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
    isLoadingPostDetails?: boolean;
    dialogMessage?: string;
    isOpenConfirmDialog?: boolean;
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
    isLoadingPostDetails: true,
    dialogMessage: "",
    isOpenConfirmDialog: false,
};

const EditPost: React.FunctionComponent<ICreatePostOwnProps> = (props) => {
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
        isAlertOpen,
        isLoadingPostDetails,
        dialogMessage,
        isOpenConfirmDialog
    } = state
    const categoryRef = useRef<HTMLInputElement>()
    const titleRef = useRef<HTMLInputElement>()
    const tagRef = useRef<HTMLInputElement>()
    const navigate = useNavigate()
    const { user } = useAppSelector(userState)
    const { t } = useTranslation()
    const { postId } = useParams()

    const PostCategoryList: string[] = [t("Category.Post"), t("Category.Question"), t("Category.Discussion")]

    useEffect(() => {
        setState({ categoryName: "", categoryValue: null })
    }, [t])

    const handleDeleteTags = (tagToDelete: string) => () => {
        setState({ tags: state.tags.filter((item) => item !== tagToDelete) });
    };

    useEffect(() => {
        const getPostDetail = async () => {
            const post = await PostService.getSinglePost(postId!, user?._id)
            if (user?.role === "user" && post.data?.author._id !== user?._id) {
                setState((draft) => {
                    draft.isOpenConfirmDialog = true;
                    draft.dialogMessage = "Error.Post.Not.Allowed"
                    draft.isLoadingPostDetails = false
                })
            } else {
                setState((draft) => {
                    draft.postTitle = post.data?.title ?? ""
                    draft.postContent = post.data?.content ?? ""
                    draft.postThumbnails = post.data?.thumbnail ?? ""
                    draft.tags = post.data?.tags ?? []
                    draft.categoryValue = post.data?.category as IPostCategoryValue
                    draft.categoryName = getCategoryName(post.data?.category)
                    draft.categoryInput = getCategoryName(post.data?.category)
                    draft.isLoadingPostDetails = false
                })
            }
        }

        getPostDetail()
    }, [])

    const getCategoryName = (categoryValue) => {
        switch (categoryValue) {
            case "post":
                return t("Category.Post")
            case "question":
                return t("Category.Question")
            case "discussion":
                return t("Category.Discussion")
            default:
                return ""
        }
    }

    const handleKeyDown: IAction1<React.KeyboardEvent> = (event) => {
        if (event.key === "Enter") {
            if (!tagValue.trim() || tagValue.includes(" ")) {
                setState((draft) => {
                    draft.alertMessage = t("Error.Tag.Include.Blank");
                    draft.alertType = ISeverity.error
                    draft.isAlertOpen = true
                })
            } else {
                if (tags.includes(tagValue)) {
                    setState((draft) => {
                        draft.alertMessage = t("Error.Tag.Existed");
                        draft.alertType = ISeverity.error
                        draft.isAlertOpen = true
                    })
                } else if (tags.length + 1 > 3) {
                    setState((draft) => {
                        draft.alertMessage = t("Error.Tag.MaxLength");
                        draft.alertType = ISeverity.error
                        draft.isAlertOpen = true
                    })
                } else {
                    setState({ tags: [...state.tags, tagValue], tagError: "", tagValue: "" });
                    setState((draft) => {
                        draft.alertMessage = t("Successful.Add.Tag");
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

        if (!htmlToMarkdown(postContent).trim()) {
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
            const data = await PostService.updatePost({
                title: postTitle,
                category: categoryValue ?? "",
                tags: tags,
                content: postContent,
                thumbnail: postThumbnails ?? "",
            }, postId!, user?._id!)
            if (data.requestStatus === IRequestStatus.Success) {
                setState({ isLoading: false })
                setState((draft) => {
                    draft.alertMessage = t(data.message)
                    draft.alertType = ISeverity.success
                    draft.isAlertOpen = true
                })
                await delay(2000).then(() => {
                    navigate(`/${user?.role}-dashboard/post-management`)
                })
            } else {
                setState({ isLoading: false })
                setState((draft) => {
                    draft.alertMessage = t(data.message ?? "Error.Network")
                    draft.alertType = ISeverity.error
                    draft.isAlertOpen = true
                })
            }

        }
    }

    const handleEditorChange: EditorProps["onChange"] = (e) => {
        setState({ postContent: e.html, contentError: "" })
    }

    return (
        <DashboardLayout title={t("EditPost.Title")}>
            <div className="g-dashboard-content-section">
                <Stack className="g-dashboard-content-section-title">
                    <Label className="g-dashboard-content-title" title={t("Page.Edit.Post.Title")} bold />
                </Stack>
                <Grid container spacing={2}>
                    <Grid className="g-create-post-section-basic-info" item sm={5} xs={12} md={5}>
                        <Label className="g-create-post-info-title" title={t("Common.Category")} />
                        <Autocomplete
                            value={categoryName}
                            onChange={(_event, newValue: string | null) => {
                                switch (newValue) {
                                    case t("Category.Post"):
                                        setState({ categoryName: newValue, categoryValue: "post", categoryError: "" });
                                        break;
                                    case t("Category.Question"):
                                        setState({ categoryName: newValue, categoryValue: "question", categoryError: "" });
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
                            renderInput={(params) => (
                                <TextField error={!!categoryError} inputRef={categoryRef} helperText={t(categoryError ?? "")} variant="standard" {...params} />
                            )}
                        />
                    </Grid>
                    <Grid className="g-create-post-section-basic-info" item sm={7} xs={12} md={7}>
                        <Label className="g-create-post-info-title" title={t("Post.Create.Name")} />
                        <TextField
                            error={!!titleError}
                            helperText={t(titleError!)}
                            variant="standard"
                            value={postTitle}
                            inputRef={titleRef}
                            onChange={(event) => {
                                setState({ postTitle: event.target.value, titleError: "" });
                            }}
                        />
                    </Grid>

                    <Grid className="g-create-post-section-basic-info" item sm={5} xs={12} md={5}>
                        <Label className="g-create-post-info-title" title={t("Post.Create.TagName")} />
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
                    <Grid className="g-create-post-section-basic-info" item sm={7} xs={12} md={7}>
                        <Label className="g-create-post-info-title" title={t("Post.Create.TagList")} />
                        <Paper component="ul" className="g-create-post-tag-list">
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
                            <span className="g-upload-image-form-title">{t("Post.Create.Thumbnail")}</span>
                            <label htmlFor="file-input" className="g-upload-image-form-drop-container">
                                <input type="file" accept="image/*" id="file-input" onChange={handlePostThumbnailChange} />
                            </label>
                        </form>
                    </Grid>
                    <Grid className="g-create-post-section-content" item sm={12} xs={12} md={12}>
                        <Editor value={postContent} onChange={handleEditorChange} />
                        <FormHelperText error={!!contentError} id="post-content-error">
                            {contentError}
                        </FormHelperText>
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
                    {isAlertOpen && (
                        <Alert
                            open={isAlertOpen}
                            severity={alertType}
                            message={t(alertMessage ?? "")}
                            onClose={() => setState({ isAlertOpen: false })}
                        />
                    )}
                    {isOpenConfirmDialog && (
                        <ConfirmDialog
                            open={isOpenConfirmDialog}
                            title={t("Common.Notifications")}
                            content={t(dialogMessage ?? "")}
                            handleConfirm={() => navigate(`/${user?.role}-dashboard/post-management`)}
                            noCancelButton
                        />
                    )}

                    {isLoadingPostDetails && <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={isLoadingPostDetails}
                    >
                        <CircularProgress color="info" />
                    </Backdrop>}
                </Grid>
            </div>
        </DashboardLayout>
    );
};

export default EditPost;
