import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Drabant {
  name: string;
}

// Define a service using a base URL and expected endpoints
export const drabantApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/drabants" }),
  endpoints: (builder) => ({
    getDrabants: builder.query<Drabant[], void>({
      query: () => `drabants`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDrabantsQuery } = drabantApi;
