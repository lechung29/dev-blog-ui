/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import { Skeleton } from '@mui/material';

interface IPaginationProps {
    maxPages: number;
    currentPage: number;
    onChangePage: (value: number) => void;
    loading: boolean;
}

const PaginationView: React.FunctionComponent<IPaginationProps> = (props) => {
    const { maxPages, currentPage, onChangePage, loading } = props;
    const [page, setPage] = useState<number>(props.currentPage)

    useEffect(() => {
        onChangePage(page)
    }, [page])
    return loading ? (<Skeleton
        animation="wave"
        height={48}
        width="100px"
    />) : (
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