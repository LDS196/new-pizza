import React, {useState} from 'react';


import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Sceleton";
import {Pagination} from "../components/Pagination/Pagination";
import {SearchContext} from "../App";
import {setCategory, setCurrentPage} from "../components/Redux/Slices/FilterSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../components/Redux/Store";
import axios from "axios";


type PizzaType = {
    id: number
    imageUrl: string
    title: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}
// export type SortType = {
//     name: string
//     sortProp: string
// }

const Home = () => {
    const dispatch = useDispatch()
    const {category, sort,currentPage} = useSelector((state:RootState)=> state.filter)

    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState<Array<PizzaType>>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)


    const sortBy = sort.sortProp.replace('-', '');
    const order = sort.sortProp.includes('-') ? 'ask' : 'desc';
    const categoryId = category > 0 ? `category=${category}` : '';
    const search = searchValue ? `&search=${searchValue}` : ''

    React.useEffect(() => {
        setIsLoading(true)
        axios.get(`https://63ccf03c0f1d5967f02739d9.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res=>{
                setItems(res.data)
               setIsLoading(false)
            })
        window.scroll(0, 0)
    }, [category, sort, searchValue, currentPage])

    const onChangeCategory=(value:number)=>{
        dispatch(setCategory(value,))
    }
    const onChangePage= (value:number)=> dispatch(setCurrentPage(value))
    const pizzasForRender = items.map((p) => {return <PizzaBlock key={p.id} {...p}/>})
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories category={category} callBack={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzasForRender
                }
            </div>
            <Pagination currentPage={currentPage} onChange={onChangePage}/>
        </div>

    );
};

export default Home;