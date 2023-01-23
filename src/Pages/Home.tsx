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
const Home = () => {
    const [items, setItems] = React.useState<Array<PizzaType>>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    React.useEffect(() => {
        fetch('https://63ccf03c0f1d5967f02739d9.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })

    }, [])

    const pizzasForRender = items.map((p) => {
        return <PizzaBlock key={p.id} {...p}/>
    })
    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ?[...new Array(6)].map((_,i)=><Skeleton key={i}/>)
                        : pizzasForRender
                }
            </div>
            </>
    );
};

export default Home;