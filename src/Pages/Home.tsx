import React from 'react';


import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Sceleton";


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
export type SortType = {
    name: string
    sort: string
}
const Home = () => {
    const [items, setItems] = React.useState<Array<PizzaType>>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [category, setCategory] = React.useState(0)
    const [sortType, setSortType] = React.useState<SortType>({name: 'популярности', sort: 'rating'})

    const sortBy = sortType.sort.replace('-', '');
    const order = sortType.sort.includes('-') ? 'ask' : 'desc';
    const categoryId = category > 0 ? `category=${category}` : '';

    React.useEffect(() => {
        setIsLoading(true)
        fetch(`https://63ccf03c0f1d5967f02739d9.mockapi.io/items?${categoryId}&sortBy=${sortBy}&order=${order}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scroll(0, 0)
    }, [category, sortType])

    const pizzasForRender = items.map((p) => {
        return <PizzaBlock key={p.id} {...p}/>
    })
    return (
        <div className="container">
            <div className="content__top">
                <Categories category={category} callBack={setCategory}/>
                <Sort sortType={sortType} callback={setSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                        : pizzasForRender
                }
            </div>
        </div>
    );
};

export default Home;