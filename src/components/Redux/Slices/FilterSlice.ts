import {createSlice} from "@reduxjs/toolkit";

export type SortType = {
    name: string
    sortProp: string
}

export type InitialStateType = {
    category: number
    sort: SortType
}

const initialState: InitialStateType = {
    category: 0,
    sort: {
        name: "популярности",
        sortProp: 'rating'
    }
}
const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers:{
        setCategory(state, action){
            state.category=action.payload
        },
        setSort(state,action){
            state.sort=action.payload
        }

    }
})
export const {setCategory,setSort}= filterSlice.actions
export default  filterSlice.reducer