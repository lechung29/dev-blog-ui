import React from 'react'
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { ILabelItemProps } from '../sortByCreated/SortByCreated';
import { IAction1, IFunc } from '../../../types/Function';
import "./index.scss"

export interface IFilterPartProps {
    filterTitle: string;
    items: ILabelItemProps[];
    value: string[],
    onFilterChange: (value: string) => void
}

const Filters: React.FunctionComponent<IFilterPartProps> = (props) => {
    const { filterTitle, items, onFilterChange, value } = props

    const handleChange: IAction1<React.ChangeEvent<HTMLInputElement>> = (event) => {
        onFilterChange(event.target.name)
    }

    const onRenderFilterItem: IFunc<JSX.Element[]> = () => {
        return items.map((item) => (
            <FormControlLabel
                key={item.name}
                control={
                    <Checkbox
                        checked={value.includes(item.value)}
                        onChange={handleChange}
                        name={item.value}
                    />
                }
                label={item.name}
            />
        ))
    }
    return (
        <Box className='g-filter-section'>
            <FormControl 
                className='g-filter-form'
                component="fieldset" 
                variant="standard"
            >
                <FormLabel component="legend">{filterTitle}</FormLabel>
                {onRenderFilterItem()}
            </FormControl>
        </Box>
    );
}

export default Filters