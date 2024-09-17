/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import "./index.scss";
import { IAction, IAction1, IAction2, IFunc, IFunc1 } from "../../types/Function";
import { Button, Divider, Skeleton, Stack } from "@mui/material";
import { Label } from "../common/label/Label";
import CloseIcon from "@mui/icons-material/Close";
import SortByCreated from "./sortByCreated/SortByCreated";
import Filters from "./filters/Filters";
import { IHomeFilterProps, ISortProps } from "../../pages/home/Home";
import { PostService } from "../../services/posts/PostService";
import { delay } from "../../utils/helper";
import { useImmerState } from "../../hook/useImmerState";
import { useTranslation } from "react-i18next";

export type Anchor = "top" | "left" | "bottom" | "right";

interface IFilterPanelOwnProps {
    placement: Anchor;
    filtersValue: IHomeFilterProps;
    sortValue: ISortProps;
    open: boolean;
    onClosePanel: () => void;
    onOpenPanel: () => void;
    onApply?: (filter: IHomeFilterProps, sort: ISortProps) => void;
}

interface IFilterPanelState {
    filterValue: IHomeFilterProps;
    sortInfo: ISortProps;
    tagList: string[];
    isLoading: boolean;
}


const FilterPanel: React.FunctionComponent<IFilterPanelOwnProps> = (props) => {
    const { open, placement, onApply: onAplly, onClosePanel, onOpenPanel, filtersValue, sortValue } = props;
    const { t } = useTranslation()
    const initialState: IFilterPanelState = {
        filterValue: filtersValue,
        sortInfo: sortValue,
        tagList: [],
        isLoading: false,
    }
    const [state, setState] = useImmerState<IFilterPanelState>(initialState)
    const { filterValue, isLoading, sortInfo, tagList } = state

    React.useEffect(() => {
        Promise.all([getTagList(), delay(500)])
            .then(([tags, ..._other]) => {
                setState((draft) => {
                    draft.isLoading = false;
                    draft.tagList = tags.data || []
                })
            })
    }, [])

    const getTagList = async () => {
        setState({ isLoading: true })
        return await PostService.getAllTags()
    }

    const onClose: IAction = () => {
        setState((draft) => {
            draft.filterValue = filtersValue
            draft.sortInfo = sortValue
        })
        onClosePanel()
    }

    const onApplyFilter: IAction = () => {
        onAplly?.(filterValue, sortInfo)
        onClosePanel()
    }

    const getSortValue: IFunc1<Object, keyof Object> = (object) => {
        for (const key in object) {
            return object[key]
        }
    }

    const onChangeSort: IAction2<string, string> = (field, value) => {
        let newSortInfo: ISortProps = {}
        newSortInfo[field] = value
        setState({ sortInfo: newSortInfo })
    }

    const onChangeCategoryFilter: IAction1<string> = (value) => {
        const tempCategory: string[] = [...filterValue.category]
        if (tempCategory.includes(value)) {
            tempCategory.splice(tempCategory.indexOf(value), 1);
            setState((draft) => {
                draft.filterValue = {
                    ...filterValue,
                    category: [...tempCategory],
                }
            })
        } else {
            tempCategory.push(value);
            setState((draft) => {
                draft.filterValue = {
                    ...filterValue,
                    category: [...tempCategory],
                }
            })
        }
    }

    const onChangeTagFilter: IAction1<string> = (value) => {
        const tempTags: string[] = [...filterValue.tags]
        if (tempTags.includes(value)) {
            tempTags.splice(tempTags.indexOf(value), 1);
            setState((draft) => {
                draft.filterValue = {
                    ...filterValue,
                    tags: [...tempTags],
                }
            })
        } else {
            tempTags.push(value);
            setState((draft) => {
                draft.filterValue = {
                    ...filterValue,
                    tags: [...tempTags],
                }
            })
        }
    }

    const onRenderTitle: IFunc<JSX.Element> = () => {
        return (
            <Stack className="g-filter-panel-header">
                <Stack className="g-filter-panel-header-row">
                    <Label
                        className="g-filter-panel-title"
                        title={t("Common.Filter")}
                        bold
                    />
                    <Button
                        variant="text"
                        className="g-filter-close-button"
                        onClick={onClose}
                    >
                        <CloseIcon className="g-filter-close-button-icon" />
                    </Button>
                </Stack>
                <Divider />
            </Stack>
        );
    };

    const onRenderFooter: IFunc<JSX.Element> = () => {
        return (
            <Stack className="g-filter-panel-footer">
                <Button
                    variant="text"
                    className="g-filter-cancel-button"
                    onClick={onClose}
                >
                    {t("Common.Cancel")}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="g-filter-apply-button"
                    onClick={onApplyFilter}
                >
                    {t("Common.Apply")}
                </Button>
            </Stack>
        );
    };

    const shimmerElement: IFunc1<number, JSX.Element> = (id) => {
        return (
            <Skeleton
                key={id}
                animation="wave"
                height={32}
                width="100%"
            />
        )
    }

    const onRenderContent: IFunc<JSX.Element> = () => {
        return <Stack className="g-filter-panel-content">
            {isLoading
                ? Array(15).fill("").map((_item, id) => {
                    return shimmerElement(id)
                })
                : <React.Fragment>
                    <SortByCreated
                        value={getSortValue(sortInfo)}
                        items={[
                            { name: t("Common.Sort.Latest"), value: "desc" },
                            { name: t("Common.Sort.Oldest"), value: "asc" }
                        ]}
                        onChangeValue={onChangeSort}
                    />
                    <Filters
                        filterTitle={t("Common.Category")}
                        value={filterValue.category}
                        items={[
                            { name: t("Category.Post"), value: "post" },
                            { name: t("Category.Question"), value: "question" },
                            { name: t("Category.Discussion"), value: "discussion" }
                        ]}
                        onFilterChange={onChangeCategoryFilter}
                    />
                    <Filters
                        filterTitle={t("Common.Post.Tag")}
                        value={filterValue.tags}
                        items={tagList.map((tag) => {
                            return { name: tag, value: tag }
                        })}
                        onFilterChange={onChangeTagFilter}
                    />
                </React.Fragment>
            }
        </Stack>;
    };

    return (
        <SwipeableDrawer
            anchor={placement}
            open={open}
            onClose={onClosePanel}
            onOpen={onOpenPanel}
            className="g-filter-panel-section"
        >
            <Box className="g-filter-panel-box">
                {onRenderTitle()}
                {onRenderContent()}
                {onRenderFooter()}
            </Box>
        </SwipeableDrawer>
    );
};

export { FilterPanel };
