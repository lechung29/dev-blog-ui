/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Pagination from '@mui/material/Pagination';
import { Skeleton } from '@mui/material';
import { IAction1, IAction2 } from '../../types/Function';

interface IPaginationProps {
    maxPages: number;
    currentPage: number;
    onChangePage: IAction1<number>
    loading?: boolean;
}


const PaginationView: React.FunctionComponent<IPaginationProps> = (props) => {
    const { maxPages, currentPage, onChangePage, loading } = props;

    const onSelectPage: IAction2<React.ChangeEvent<unknown>, number> = (_event, value) => {
        onChangePage(value)
    }

    if (loading) {
        return (<Skeleton
            animation="wave"
            height={48}
            width="100px"
        />)
    }

    return (
        <Pagination
            count={maxPages}
            page={currentPage}
            onChange={onSelectPage}
        />
    )
}

export {
    PaginationView as Pagination,
}