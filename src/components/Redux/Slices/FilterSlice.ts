import {createSlice} from "@reduxjs/toolkit";

export type SortType = {
    name: string
    sortProp: string
}

export type InitialStateType = {
    category: number
    currentPage:number
    sort: SortType
}

const initialState: InitialStateType = {
    category: 0,
    currentPage:1,
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
        },
        setCurrentPage(state,action){
            state.currentPage=action.payload
        }

    }
})
export const {setCategory,setSort,setCurrentPage}= filterSlice.actions
export default  filterSlice.reducer