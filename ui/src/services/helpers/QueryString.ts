// Common
const root = "https://dev-blog-api-c827.onrender.com";
// const root = "http://localhost:8080";
const v1 = "api/v1";

//Post
const getAllPost = "get-all-posts";
const getFilterPosts = "get-filters-posts";
const getPublicPosts = "get-public-posts";
const createPost = "create-post";
const deletePost = "delete-post";
const updatePost = "update-post";
const multiDeletePosts = "multi-delete-post";
const getMaxPages = "get-max-pages";
const getSinglePost = "get-single-post";
const likePost = "like-post";
const getAllTags = "get-all-tags";
const addFavorite = "add-favorite";
const getFavorite = "get-favorite";
const getOverview = "get-overview"

//Auth
const login = "login";
const register = "register";
const googleLogin = "google";
const updateUser = "update";
const updatePassword = "update-password";
const allUser = "all-users";
const multiDelete = "multi-delete"
const updateUserStatus = "update-status"

//Comment
const createComment = "create-comment";
const likeComment = "like-comment";
const updateComment = "update-comment";
const deleteComment = "delete-comment";

// data
const guestUser = "0000-0000-00000000-0000-000000000000";
export {
    root,
    v1,
    getAllPost,
    createPost,
    login,
    register,
    googleLogin,
    updateUser,
    updatePassword,
    deletePost,
    multiDeletePosts,
    updatePost,
    getFilterPosts,
    getPublicPosts,
    getMaxPages,
    getSinglePost,
    createComment,
    likeComment,
    guestUser,
    likePost,
    updateComment,
    deleteComment,
    getAllTags,
    allUser,
    multiDelete,
    updateUserStatus,
    addFavorite,
    getFavorite,
    getOverview
}