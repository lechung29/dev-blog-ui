import { IconButton } from "@mui/material";
import React, { AllHTMLAttributes } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./index.scss"

export interface ISearchBoxProps extends AllHTMLAttributes<HTMLInputElement> {
    onSearch: () => void;
    value?: string;
    name?: string;
    searchIconProps?: {
        size: "small" | "medium" | "large";
        ariaLabel: string;
        fontSize: "small" | "medium" | "large" | "inherit";
    };
}

const Search: React.FunctionComponent<ISearchBoxProps> = (props) => {
    const { className, id, name, placeholder, autoComplete, type, searchIconProps, value, onSearch, ...rest } = props;
    return (
        <div className="g-searchbox-input-group">
            <input {...rest} type={type} className={`${className} g-searchbox-input`} value={value} id={id} name={name} placeholder={placeholder} autoComplete={autoComplete} />
            <IconButton className="g-searchbox-button" onClick={() => onSearch()} aria-label={searchIconProps?.ariaLabel} size={searchIconProps?.size}>
                <SearchIcon fontSize={searchIconProps?.fontSize} />
            </IconButton>
        </div>
    );
};

export default Search;
