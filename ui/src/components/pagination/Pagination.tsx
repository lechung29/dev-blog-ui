/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';

interface IPaginationProps {
    maxPages: number;
    currentPage: number;
    onChangePage: (value: number) => void;
}

const PaginationView: React.FunctionComponent<IPaginationProps> = (props) => {
    const { maxPages, currentPage, onChangePage } = props;  
    const [page, setPage] = useState<number>(props.currentPage)

    useEffect(() => {
        onChangePage(page)
    }, [page])
    return (
        <Pagination 
            count={maxPages} 
            page={currentPage} 
            onChange={(_e, value) => setPage(value)} 
        />
    )
}

export {
    PaginationView as Pagination,
}