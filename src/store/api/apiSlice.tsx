import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";
import { RootState } from '../store';
import type { BaseQueryFn} from '@reduxjs/toolkit/query';
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8090",
  credentials: "include",
});

const baseQueryAuth = fetchBaseQuery({
  baseUrl: "http://localhost:8090",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<{ url: string }> = async (args, api, extraOptions) => {
  let result;
  args.url.endsWith("auth/login") || args.url.endsWith("auth/signup") || args.url.endsWith("auth/logout")
    ? (result = await baseQuery(args, api, extraOptions))
    : (result = await baseQueryAuth(args, api, extraOptions));

  if (result?.error?.status === 403) {
    const refreshResult: QueryReturnValue<NonNullable<unknown>> = await baseQueryAuth(
      "/sport-maps/v1/auth/refresh/token",
      api,
      extraOptions
    );

  if (refreshResult?.data) {
    const getAuth = api.getState as () => {auth: {email: string}};
    const email = getAuth().auth.email;
    // store the new token
    api.dispatch(setCredentials({ ...refreshResult.data, email }));
    // retry the original query with new access token
    result = await baseQueryAuth(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
