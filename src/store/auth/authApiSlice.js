import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/sport-maps/v1/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/sport-maps/v1/auth/signup",
        method: "POST",
        body: { ...credentials },
        responseHandler: "text",
      }),
    }),
    newsComment: builder.mutation({
      query: (commentInfo) => ({
        url: "/sport-maps/v1/news-comments/new",
        method: "POST",
        body: { ...commentInfo }
      }),
    }),
    getAllNews: builder.mutation({
      query: () => ({
        url: "/sport-maps/v1/news?page_num=0",
        method: "GET"
      }),
    }),
    getNewsById: builder.mutation({
      query: (newsId) => ({
        url: `/sport-maps/v1/news/byId/${newsId}`,
        method: "GET"
      }),
    }),
    getUserByEmail: builder.mutation({
      query: (email) => ({
        url: `/sport-maps/v1/auth/byEmail/${email}`,
        method: "GET"
      }),
    }),
    createNews: builder.mutation({
      query: (news) => ({
        url: `/sport-maps/v1/news/new`,
        method: "POST",
        body: { ...news}
      }),
    }),
    deleteNews: builder.mutation({
      query: (newsId) => ({
        url: `/sport-maps/v1/news/delete/${newsId}`,
        method: "DELETE"
      }),
    }),
    deleteNewsComment: builder.mutation({
      query: (commentId) => ({
        url: `/sport-maps/v1/news-comments/delete/${commentId}`,
        method: "DELETE"
      }),
    }),
    updateNewsComment: builder.mutation({
      query: (credentials) => ({
        url: `/sport-maps/v1/news-comments/update/${credentials.commentId}`,
        method: "PUT",
        body: credentials.updateComment
      }),
    }),
    updateNews: builder.mutation({
      query: (credentials) => ({
        url: `/sport-maps/v1/news/update/${credentials.newsId}`,
        method: "PUT",
        body: credentials.updateNews
      }),
    }),
  }),
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
  useUpdateNewsCommentMutation
} = authApiSlice;
