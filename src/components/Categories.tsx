import React from "react";
type CategoriesType={
    category: number
    callBack:(value:number)=>void
}
export const Categories: React.FC<CategoriesType>= ({category,callBack}) => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
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