import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export type PizzaType = {
    id: number
    imageUrl: string
    title: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}

 type InitialStateType = {
    items: PizzaType[]
status:string
}
const initialState: InitialStateType = {
    items: [],
    status:'loading'

}

export const fetchPizzas:any = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params:any) => {
        const{ sortBy,order,categoryId,search,currentPage}=params
        const {data} = await axios.get(`https://63ccf03c0f1d5967f02739d9.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=${order}${search}`)

        return data
    }
)

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }

    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchPizzas.fulfilled, (state, action) => {
    //         state.items = action.payload;
    //     });
    // }
    extraReducers:{
        [fetchPizzas.pending]:(state,action)=>{
            state.status='loading';
            state.items=[];
        },
        [fetchPizzas.fulfilled]:(state,action)=>{
            state.items=action.payload
            state.status='success'
        },
        [fetchPizzas.rejected]:(state,action)=>{
            state.status='error';
            state.items=[];
        },
    }

})


export const {setItems} = pizzasSlice.actions
export default pizzasSlice.reducer
