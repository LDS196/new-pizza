import React from "react";

export const Categories = () => {
    const [activeIndex, setActiveIndex] = React.useState(0)
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    const onClickCategory = (value: number) => {
        setActiveIndex(value)
    }
    const categoriesForRender = categories.map((c,index)=>{
        return <li key={index} onClick={()=>onClickCategory(index)} className={index===activeIndex? 'active': ''}>{c}</li>
    })
    return (
        <div className="categories">
            <ul>
                {categoriesForRender}
            </ul>
        </div>
    )
}