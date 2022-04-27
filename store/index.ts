import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { drabantApi } from "./features/drabant";
import { vinmonopoletApi } from "./features/vinmonopolet";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [drabantApi.reducerPath]: drabantApi.reducer,
    [vinmonopoletApi.reducerPath]: vinmonopoletApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      drabantApi.middleware,
      vinmonopoletApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
