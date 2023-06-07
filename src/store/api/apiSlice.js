import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8090",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryAuth = fetchBaseQuery({
  baseUrl: "http://localhost:8090",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result;
  args.url.endsWith("auth/login") || args.url.endsWith("auth/signup")
    ? (result = await baseQueryAuth(args, api, extraOptions))
    : (result = await baseQuery(args, api, extraOptions));

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new auth token
    const refreshResult = await baseQuery(
      "/sport-maps/v1/auth/refresh/token",
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const email = api.getState().auth.email;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, email }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
