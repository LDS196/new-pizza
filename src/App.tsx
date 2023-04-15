import React, {useState} from 'react';
import './scss/app.scss'
import {Header} from "./components/Header";
import { Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";


 type SearchType={
    searchValue:string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
export const SearchContext= React.createContext({}as SearchType)



function App() {
const [searchValue,setSearchValue]=useState('')




    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path={'/'} element={<Home />}/>
                        <Route path={'/cart'} element={<Cart/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>

                </div>
            </SearchContext.Provider>


        </div>
    );
}

export default App;
