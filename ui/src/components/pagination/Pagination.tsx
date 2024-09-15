/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Pagination from '@mui/material/Pagination';
import { Skeleton } from '@mui/material';
import { IAction1, IAction2 } from '../../types/Function';
import { useImmerState } from '../../hook/useImmerState';

interface IPaginationProps {
    maxPages: number;
    currentPage: number;
    onChangePage: IAction1<number>
    loading?: boolean;
}
interface IPaginationState {
    page: number
}


const PaginationView: React.FunctionComponent<IPaginationProps> = (props) => {
    const { maxPages, currentPage, onChangePage, loading } = props;
    const initialState: IPaginationState = {
        page: currentPage,
    }
    const [state, setState] = useImmerState<IPaginationState>(initialState)
    const { page } = state;

    useEffect(() => {
        onChangePage(page)
    }, [page])

    const onSelectPage: IAction2<React.ChangeEvent<unknown>, number> = (_event, value) => {
        setState((draft) => {
            draft.page = value;
        })
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