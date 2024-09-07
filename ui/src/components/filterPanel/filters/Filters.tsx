import { Box, Checkbox, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import React from 'react'
import { ILabelItemProps } from '../sortByCreated/SortByCreated';
import { IAction1, IFunc } from '../../../types/Function';

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
        <Box sx={{ display: 'flex' }}>
            <FormControl 
                sx={{
                    margin: "12px 0"
                }} 
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