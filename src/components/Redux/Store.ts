import {configureStore} from '@reduxjs/toolkit'
import filter from "./Slices/FilterSlice";
import cart from "./Slices/CartSlice";


export const store = configureStore({
    reducer: {
        filter: filter,
        cart: cart,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch