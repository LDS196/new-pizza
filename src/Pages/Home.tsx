import React, { useRef} from 'react';


import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Categories} from "../components/Categories";
import {list, Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Sceleton";
import {Pagination} from "../components/Pagination/Pagination";
import {SearchContext} from "../App";
import {setCategory, setCurrentPage, setFilters} from "../components/Redux/Slices/FilterSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../components/Redux/Store";
import axios from "axios";
import qs from 'qs'
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {category, sort, currentPage} = useSelector((state: RootState) => state.filter)

    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState<Array<PizzaType>>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const isSearch = useRef(false)
    const isMount = useRef(false)


    const sortBy = sort.sortProp.replace('-', '');
    const order = sort.sortProp.includes('-') ? 'ask' : 'desc';
    const categoryId = category > 0 ? `category=${category}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const fetchPizzas = () => {
        setIsLoading(true)
        axios.get(`https://63ccf03c0f1d5967f02739d9.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })
        window.scroll(0, 0)
    }
//если был первый рендер и изменились параметры то
    React.useEffect(() => {
        if (isMount.current) {
            const queryString = qs.stringify({
                sortProp: sort.sortProp,
                category,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMount.current = true
    }, [category, sort.sortProp, searchValue, currentPage])
//если был первый рендер то проверяем URL параметры и сохряем в редакс
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = list.find(obj => obj.sortProp === params.sortProp)
            dispatch(setFilters(
                {...params, sort}
            ))
            isSearch.current = true;
        }
    }, [])
//если был первый рендер то рендерим пиццы
    React.useEffect(() => {
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false

    }, [category, sort.sortProp, searchValue, currentPage])



    const onChangeCategory = (value: number) => {
        dispatch(setCategory(value,))
    }
    const onChangePage = (value: number) => dispatch(setCurrentPage(value))
    const pizzasForRender = items.map((p) => {
        return <PizzaBlock key={p.id} {...p}/>
    })
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories category={category} callBack={onChangeCategory}/>
                <Sort/>
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