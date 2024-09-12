import { IconButton } from "@mui/material";
import React, { AllHTMLAttributes } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./index.scss";
import { classNames } from "../../../utils/helper";

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
            <input
                {...rest}
                type={type}
                className={classNames("g-searchbox-input", className)}
                value={value}
                id={id}
                name={name}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
            <IconButton
                className="g-searchbox-button"
                aria-label={searchIconProps?.ariaLabel}
                size={searchIconProps?.size}
                onSubmit={() => onSearch()}
                onClick={() => onSearch()}
            >
                <SearchIcon fontSize={searchIconProps?.fontSize} />
            </IconButton>
        </div>
    );
};

export default Search;
