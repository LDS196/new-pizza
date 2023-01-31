import {createSlice} from "@reduxjs/toolkit";

type PizzaType = {
    id: number
    imageUrl: string
    title: string
    types: number
    sizes: number
    price: number
}


export type InitialStateType = {
    totalPrice: number
    items: Array<PizzaType>
}

const initialState: InitialStateType = {
    totalPrice: 0,
    items: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price + sum
            }, 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.id === action.payload)
        },
        clearItem(state, action) {
            state.items = []
        },


    }
})
export const {addItem, removeItem, clearItem} = cartSlice.actions
export default cartSlice.reducer