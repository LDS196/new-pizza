import {createSlice} from "@reduxjs/toolkit";

export type PizzaForCartType = {
    id: number
    imageUrl: string
    title: string
    types: number
    size: number
    price: number
    count: number
}


 type InitialStateType = {
    totalPrice: number
    items: Array<PizzaForCartType>
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
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload, count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                if (findItem.count > 0) findItem.count--
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        clearItem(state, action) {
            state.items = action.payload
            state.totalPrice = 0
        },
    }
})
export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions
export default cartSlice.reducer
