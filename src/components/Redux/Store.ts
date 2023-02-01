import {configureStore} from '@reduxjs/toolkit'
import filter from "./Slices/FilterSlice";
import cart from "./Slices/CartSlice";
import pizzas from "./Slices/PizzasSlice";


export const store = configureStore({
    reducer: {
        filter: filter,
        cart: cart,
        pizzas: pizzas
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch