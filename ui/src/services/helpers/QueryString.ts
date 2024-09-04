// Common
const root = "http://localhost:8080";
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

//Auth
const login = "login";
const register = "register";
const googleLogin = "google";

export {
    root,
    v1,
    getAllPost,
    createPost,
    login,
    register,
    googleLogin,
    deletePost,
    multiDeletePosts,
    updatePost,
    getFilterPosts,
    getPublicPosts,
    getMaxPages
}