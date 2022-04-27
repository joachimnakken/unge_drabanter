import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VinmonopoletProductWithImage } from "../../types";

interface GetVinmonopoletProductsArgs {
  name: string;
  limit?: number;
  skip?: number;
}

// Define a service using a base URL and expected endpoints
export const vinmonopoletApi = createApi({
  reducerPath: "vinmonopoletApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/vinmonopolet" }),
  endpoints: (builder) => ({
    getVinmonopoletProducts: builder.query<
      VinmonopoletProductWithImage[],
      GetVinmonopoletProductsArgs
    >({
      query: ({ name, limit = 10, skip = 0 }) =>
        `?name=${name.replaceAll(/ /g, "_")}&limit=${limit}&skip=${skip}`,
      keepUnusedDataFor: 60 * 60 * 24,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetVinmonopoletProductsQuery } = vinmonopoletApi;
