import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react'
import { IAction1, IFunc } from '../../../types/Function';

export interface ISortByCreated {
    value: string;
    items: ILabelItemProps[];
    onChangeValue: (field: string, value: string) => void;
}

const defaultSortProperty: string = "createdAt"

export interface ILabelItemProps {
    field?: string;
    name: string;
    value: string;
}

const SortByCreated: React.FunctionComponent<ISortByCreated> = (props) => {
    const { value, items, onChangeValue } = props

    const handleChange: IAction1<React.ChangeEvent<HTMLInputElement>> = (event) => {
        const sortField = items.find(item => item.value === event.target.value)?.field || defaultSortProperty
        onChangeValue(sortField, event.target.value)
    }

    const onRenderSortValue: IFunc<JSX.Element[]> = () => {
        return items.map((item) => (
            <FormControlLabel
                key={item.name}
                value={item.value}
                control={<Radio />}
                label={item.name}
            />
        ))
    }

    return (
        <FormControl>
            <FormLabel id="sort-radio-buttons-group">{"Sắp xếp"}</FormLabel>
            <RadioGroup
                aria-labelledby="sort-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                {onRenderSortValue()}
            </RadioGroup>
        </FormControl>
    )
}

export default SortByCreated