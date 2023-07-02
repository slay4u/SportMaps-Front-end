import {apiSlice} from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/sport-maps/v1/auth/login", method: "POST", body: {...credentials}
            })
        }), logout: builder.mutation({
            query: (credentials) => ({
                url: "/sport-maps/v1/auth/logout", method: "POST", body: {...credentials}
            })
        }), signup: builder.mutation({
            query: (credentials) => ({
                url: "/sport-maps/v1/auth/signup", method: "POST", body: {...credentials}, responseHandler: "text"
            })
        }), newsComment: builder.mutation({
            query: (credentials) => ({
                url: "/sport-maps/v1/news-comments/new", method: "POST", body: {...credentials}
            })
        }), getAllNews: builder.mutation({
            query: () => ({
                url: "/sport-maps/v1/news?page_num=0", method: "GET"
            })
        }), getNewsById: builder.mutation({
            query: (newsId) => ({
                url: `/sport-maps/v1/news/byId/${newsId}`, method: "GET"
            })
        }), getUserByEmail: builder.mutation({
            query: (email) => ({
                url: `/sport-maps/v1/auth/byEmail/${email}`, method: "GET"
            })
        }), createNews: builder.mutation({
            query: (credentials) => ({
                url: `/sport-maps/v1/news/new`, method: "POST", body: {...credentials}
            })
        }), deleteNews: builder.mutation({
            query: (newsId) => ({
                url: `/sport-maps/v1/news/delete/${newsId}`, method: "DELETE"
            })
        }), deleteNewsComment: builder.mutation({
            query: (commentId) => ({
                url: `/sport-maps/v1/news-comments/delete/${commentId}`, method: "DELETE"
            })
        }), updateNewsComment: builder.mutation({
            query: (credentials) => ({
                url: `/sport-maps/v1/news-comments/update/${credentials.commentId}`,
                method: "PUT", body: credentials.updateComment
            })
        }), updateNews: builder.mutation({
            query: (credentials) => ({
                url: `/sport-maps/v1/news/update/${credentials.newsId}`, method: "PUT", body: credentials.updateNews
            })
        }), getAllForums: builder.mutation({
            query: () => ({
                url: "/sport-maps/v1/forums?page_num=0", method: "GET"
            })
        }), getForumById: builder.mutation({
            query: (forumId) => ({
                url: `/sport-maps/v1/forums/byId/${forumId}`, method: "GET"
            })
        }), createForumComment: builder.mutation({
            query: (credentials) => ({
                url: "/sport-maps/v1/forum-comments/new", method: "POST", body: {...credentials}
            })
        }), createNewForum: builder.mutation({
            query: (credentials) => ({
                url: "/sport-maps/v1/forums/new", method: "POST", body: {...credentials}
            })
        }), deleteForum: builder.mutation({
            query: (forumId) => ({
                url: `/sport-maps/v1/forums/delete/${forumId}`, method: "DELETE"
            })
        }), deleteForumComment: builder.mutation({
            query: (commentId) => ({
                url: `/sport-maps/v1/forum-comments/delete/${commentId}`, method: "DELETE"
            })
        }), editForum: builder.mutation({
            query: (credentials) => ({
                url: `/sport-maps/v1/forums/update/${credentials.forumId}`, method: "PUT", body: credentials.updateForum
            })
        }), editForumComment: builder.mutation({
            query: (credentials) => ({
                url: `/sport-maps/v1/forum-comments/update/${credentials.commentId}`,
                method: "PUT", body: credentials.updateComment
            })
        }), getMarkers: builder.mutation({
            query: (credentials) => ({
                url: "/sport-maps/v1/markers", method: "POST", body: {...credentials}
            })
        }), postMarker: builder.mutation({
            query: (credentials) => ({
                url: "/sport-maps/v1/markers/add", method: "POST", body: {...credentials}
            })
        }), getUserProfileData: builder.mutation({
            query: () => ({
                url: "/sport-maps/v1/userdata", method: "GET"
            }),
        }), deleteMarker: builder.mutation({
            query: (credentials) => ({
                url: "/sport-maps/v1/markers/delete", method: "DELETE", body: {...credentials}
            })
        })
    })
});

export const {
    useLoginMutation,
    useSignupMutation,
    useNewsCommentMutation,
    useGetAllNewsMutation,
    useGetNewsByIdMutation,
    useGetUserByEmailMutation,
    useCreateNewsMutation,
    useDeleteNewsMutation,
    useDeleteNewsCommentMutation,
    useUpdateNewsMutation,
    useUpdateNewsCommentMutation,
    useGetAllForumsMutation,
    useGetForumByIdMutation,
    useCreateForumCommentMutation,
    useCreateNewForumMutation,
    useDeleteForumMutation,
    useDeleteForumCommentMutation,
    useEditForumMutation,
    useEditForumCommentMutation,
    useLogoutMutation,
    useGetMarkersMutation,
    usePostMarkerMutation,
    useGetUserProfileDataMutation,
    useDeleteMarkerMutation,
} = authApiSlice;
