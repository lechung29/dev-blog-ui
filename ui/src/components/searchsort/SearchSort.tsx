import { alpha, Box, Menu, MenuItem, MenuProps, styled } from '@mui/material'
import React from 'react'
import "./index.scss"
import { Label } from '../common/label/Label';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface ISearchSortProps { }

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 2,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '10px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export const SortList: string[] = [
  "Mới nhất",
  "Cũ nhất",
  "Nhiều bình luận nhất",
  "Nhiều lượt thích nhất"
]

const SearchSort: React.FunctionComponent<ISearchSortProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sort, setSort] = React.useState<string>("Mới nhất");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeSort = (item: string) => {
    setSort(item)
  }
  return (
    <React.Fragment>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: "flex-end", alignItems: 'center', textAlign: 'center', padding: "12px 16px" }}>
        <Label
          title={`Sắp xếp theo: ${sort}`}
          subTitle={sort}
          endIcon={<ArrowDropDownIcon />}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9b9b9b",
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer"
          }}
          subTitleStyle={{
            color: "#5488c7",
            fontWeight: 600
          }}
          onClick={handleClick}
        />
      </Box>
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          SortList.map((item, index) => (
            <MenuItem className='g-search-sort-list-item' key={index} selected={sort === item} onClick={() => onChangeSort(item)}>
              {item}
            </MenuItem>
          ))
        }
      </StyledMenu>
    </React.Fragment>
  )
}

export default SearchSort