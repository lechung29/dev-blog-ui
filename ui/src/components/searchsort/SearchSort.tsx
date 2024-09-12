/* eslint-disable react-hooks/exhaustive-deps */
import { alpha, Box, Menu, MenuItem, MenuProps, styled } from "@mui/material";
import React, { useEffect } from "react";
import "./index.scss";
import { Label } from "../common/label/Label";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ILabelItemProps } from "../filterPanel/sortByCreated/SortByCreated";
import { ISearchSortValue } from "../../pages/search/SearchPage";

interface ISearchSortProps {
    open: HTMLElement | null;
    onClose: () => void;
    sortValue: ISearchSortValue;
    onOpen: (e:  React.MouseEvent<HTMLElement>) => void;
    onChangeSortValue: (ISearchSortValue) => void;
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 2,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "10px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));

export const SortList: ILabelItemProps[] = [
    {
        field: "createdAt",
        name: "Mới nhất",
        value: "desc",
    },
    {
       field: "createdAt",
        name: "Cũ nhất",
        value: "asc",
    },
    {
       field: "comment",
        name: "Nhiều bình luận nhất",
        value: "desc",
    },
    {
       field: "like",
        name: "Nhiều lượt thích nhất",
        value: "desc",
    }
]

const SearchSort: React.FunctionComponent<ISearchSortProps> = (props) => {
    const { onClose, open, sortValue, onOpen, onChangeSortValue} = props
    const [currentSort, setCurrentSort] = React.useState<ISearchSortValue>(sortValue);
    const onChangeSort = (item: ILabelItemProps) => {
        if (item.field !== currentSort.field || item.value !== currentSort.value) {
          setCurrentSort((prev) => ({
              ...prev,
              field: item.field!,
              value: item.value
          }));
        }
    };

    useEffect(() => {
        onChangeSortValue(currentSort)
    }, [currentSort])

    const checkSelected = (item: ILabelItemProps) => {
        return item.field === currentSort.field && item.value === currentSort.value
    }

    const getSortLabel = () => {
        return SortList.find((i) => i.field === currentSort.field && i.value === currentSort.value)?.name || ""
    }
    return (
        <React.Fragment>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", textAlign: "center", padding: "12px 16px" }}>
                <Label
                    title={`Sắp xếp theo: ${getSortLabel()}`}
                    subTitle={getSortLabel()}
                    endIcon={<ArrowDropDownIcon />}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#9b9b9b",
                        fontWeight: 500,
                        fontSize: 14,
                        cursor: "pointer",
                    }}
                    subTitleStyle={{
                        color: "#5488c7",
                        fontWeight: 600,
                    }}
                    onClick={onOpen}
                />
            </Box>
            <StyledMenu
                anchorEl={open}
                id="account-menu"
                open={Boolean(open)}
                onClose={onClose}
                onClick={onClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {SortList.map((item, index) => (
                    <MenuItem 
                        key={index} 
                        aria-hidden
                        className="g-search-sort-list-item" 
                        selected={checkSelected(item)} 
                        onClick={() => onChangeSort(item)}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </StyledMenu>
        </React.Fragment>
    );
};

export default SearchSort;
