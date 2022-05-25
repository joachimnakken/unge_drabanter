import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RatingDocument } from "../../types";

// Define a service using a base URL and expected endpoints
export const ratingsApi = createApi({
  reducerPath: "ratingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/ratings" }),
  tagTypes: ["ratings"],
  endpoints: (builder) => ({
    allRatings: builder.query<RatingDocument[], void>({
      query: () => "",
      transformResponse: (response: { data: RatingDocument[] }) =>
        response.data,
      providesTags: ["ratings"],
    }),
    getRating: builder.query<RatingDocument, { id: string }>({
      query: ({ id }) => `/${id}`,
      providesTags: ["ratings"],
    }),
    addRating: builder.mutation<RatingDocument, RatingDocument>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ratings"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllRatingsQuery, useAddRatingMutation, useGetRatingQuery } =
  ratingsApi;
