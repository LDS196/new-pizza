import React, {FC} from 'react';
import ReactPaginate from "react-paginate";

import styles from '../Pagination/Pagination.module.scss'
type PaginationType={
    onChange:(value:number)=>void
}
export const Pagination:FC<PaginationType> = ({onChange}) => {
    return (
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e)=> onChange(e.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={undefined}
            />

    );
};

