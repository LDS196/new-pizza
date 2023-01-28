import React from "react";
type CategoriesType={
    category: number
    callBack:(value:number)=>void
}
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export const Categories: React.FC<CategoriesType>= ({category,callBack}) => {
    const onClickCategory = (value: number) => {
        callBack(value)
    }
    const categoriesForRender = categories.map((c,index)=>{
        return <li key={index} onClick={()=>onClickCategory(index)}
                   className={index===category? 'active': ''}>{c}</li>
    })
    return (
        <div className="categories">
            <ul>
                {categoriesForRender}
            </ul>
        </div>
    )
}