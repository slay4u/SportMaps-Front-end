import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/sport-maps/v1/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        signup: builder.mutation({
            query: credentials => ({
                url: '/sport-maps/v1/auth/signup',
                method: 'POST',
                body: { ...credentials },
                responseHandler: 'text'
            })
        }),
    })
})

export const {
    useLoginMutation,
    useSignupMutation
} = authApiSlice