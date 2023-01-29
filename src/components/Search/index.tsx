import React, {ChangeEvent, useCallback, useRef, useState,} from 'react';

import styles from '../Search/Search.module.scss'
import {SearchContext} from "../../App";
import debounce from 'lodash.debounce';


export const Search = () => {
    const [value, setValue] = useState('')
    const { setSearchValue} = React.useContext(SearchContext)

    const inputRef = useRef<HTMLInputElement>(null)
    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const updateSearchValue = useCallback(
        debounce((value: string) => {
            setSearchValue(value)
        },250), [])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        updateSearchValue(value)
    }

    return (
        <div className={styles.root}>
            {value &&
                <svg onClick={onClickClear} className={styles.iconRemove} data-name="Layer 1" height="200"
                     id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg"><title/>
                    <path
                        d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/>
                </svg>}
            <svg className={styles.iconSearch} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/>
                <g data-name="Layer 2" id="Layer_2">
                    <path
                        d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z"/>
                </g>
            </svg>
            <input ref={inputRef} onChange={onChangeHandler} value={value}
                   className={styles.input} placeholder={'Поиск пиццы'}/>
        </div>

    );
}



