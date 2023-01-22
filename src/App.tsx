import React from 'react';
import './scss/app.scss'
import {Header} from "./components/Header";
import {Categories} from "./components/Categories";
import {Sort} from "./components/Sort";
import {PizzaBlock} from "./components/PizzaBlock";


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

function App() {
    const [items, setItems] = React.useState<Array<PizzaType>>([])
    React.useEffect(() => {
        fetch('https://63ccf03c0f1d5967f02739d9.mockapi.io/items')
            .then((res) => res.json())
            .then((arr)=> setItems(arr))
    },[])

    const pizzasForRender = items.map((p) => {
        return <PizzaBlock key={p.id} {...p}/>
    })
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            pizzasForRender
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
