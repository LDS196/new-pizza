import React from "react";
import {setSort, SortType} from "./Redux/Slices/FilterSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./Redux/Store";

// type SortTypeProps={
//     sortType: SortType
//     callback:(value: SortType)=>void
// }
const list = [
    {name:'популярности(desc)',sortProp:'rating'},
    {name:'популярности(ask)',sortProp:'-rating'},
    {name: 'цене(desc)',sortProp:'price'},
    {name: 'цене(ask)',sortProp:'-price'},
    {name: 'алфавиту(desc)',sortProp:'title'},
    {name: 'алфавиту(ask)',sortProp:'-title'},
]
export const Sort = () => {
    const dispatch=useDispatch()
    const sortType = useSelector((state:RootState)=>state.filter.sort)
    const [isVisible, setIsVisible] = React.useState(false)
    const onClickType = (value: SortType) => {
        dispatch(setSort(value))
        setIsVisible(!isVisible)
    }
    const typeSortsForRender = list.map((t, i) =>
        <li className={sortType.name === t.name ? 'active' : ''} onClick={() => onClickType(t)} key={i}>{t.name}</li>)

    const sortName = sortType.name
    return (
        <div className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setIsVisible(!isVisible)}>{sortName}</span>
            </div>
            {isVisible && (<div className="sort__popup">
                <ul>
                    {typeSortsForRender}
                </ul>
            </div>)}

        </div>
    )
}