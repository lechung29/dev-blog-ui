import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import "./index.scss";
import { IFunc, IFunc1 } from "../../types/Function";
import { Button, Divider, Skeleton, Stack } from "@mui/material";
import { Label } from "../common/label/Label";
import CloseIcon from "@mui/icons-material/Close";
import SortByCreated from "./sortByCreated/SortByCreated";
import Filters from "./filters/Filters";
import { IHomeFilterProps, ISortProps } from "../../pages/home/Home";
import { PostService } from "../../services/posts/PostService";
import { delay } from "../../utils/helper";

export type Anchor = "top" | "left" | "bottom" | "right";

interface IFilterPanelOwnProps {
    placement: Anchor;
    filtersValue: IHomeFilterProps;
    sortValue: ISortProps;
    open: boolean;
    onClosePanel: () => void;
    onOpenPanel: () => void;
    onAplly?: (filter: IHomeFilterProps, sort: ISortProps) => void;
}


const FilterPanel: React.FunctionComponent<IFilterPanelOwnProps> = (props) => {
    const { open, placement, onAplly, onClosePanel, onOpenPanel, filtersValue, sortValue } = props;
    const [filterValue, setFilterValue] = React.useState<IHomeFilterProps>(filtersValue)
    const [sortInfo, setSortInfo] = React.useState<ISortProps>(sortValue)
    const [tagList, setTagList] = React.useState<string[]>([])
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        Promise.all([getTagList(), delay(500)])
            .then(([tags, ..._other]) => {
                setTagList(tags.data || [])
                setIsLoading(false)
            })
    }, [])

    const getTagList = () => {
        setIsLoading(true)
        return PostService.getAllTags()
    }

    const onRenderTitle: IFunc<JSX.Element> = () => {
        return (
            <Stack display={"flex"} flexDirection={"column"} gap={2}>
                <Stack
                    direction={"row"}
                    display={"flex"}
                    alignItems={"center"}
                    height={"2.5rem"}
                    justifyContent={"space-between"}
                >
                    <Label className="g-filter-panel-title" title="Bộ lọc" />
                    <Button
                        variant="text"
                        className="g-filter-close-button"
                        onClick={onClosePanel}
                    >
                        <CloseIcon style={{ color: "#b9b9b9" }} />
                    </Button>
                </Stack>
                <Divider />
            </Stack>
        );
    };

    const onRenderFooter: IFunc<JSX.Element> = () => {
        return (
            <Stack
                direction={"row"}
                display={"flex"}
                alignItems={"center"}
                height={"2rem"}
                justifyContent={"flex-end"}
                gap={2}
            >
                <Button
                    variant="text"
                    className="g-filter-cancel-button"
                    onClick={() => {
                        setFilterValue(filtersValue)
                        setSortInfo(sortValue)
                        onClosePanel()
                    }}
                >
                    <span>{"Hủy"}</span>
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="g-filter-apply-button"
                    onClick={() => {
                        onAplly?.(filterValue, sortInfo)
                        onClosePanel()
                    }}
                >
                    <span>{"Áp dụng"}</span>
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

    const getSortValue = (object: Object) => {
        for (const key in object) {
            return object[key]
        }
    }

    const onChangeSort = (field: string, value: string) => {
        let newSortInfo: ISortProps = {}
        newSortInfo[field] = value
        setSortInfo(newSortInfo)
    }

    const onRenderContent: IFunc<JSX.Element> = () => {
        return <Stack style={{ flex: 1 }}>
            {isLoading
                ? Array(15).fill("").map((_item, id) => {
                    return shimmerElement(id)
                })
                : <>
                    <SortByCreated
                        value={getSortValue(sortInfo)}
                        items={[
                            { name: "Mới nhất", value: "desc" },
                            { name: "Cũ nhất", value: "asc" }
                        ]}
                        onChangeValue={onChangeSort}
                    />

                    <Filters
                        filterTitle="Danh mục"
                        value={filterValue.category}
                        items={[
                            { name: "Bài viết", value: "post" },
                            { name: "Câu hỏi", value: "question" },
                            { name: "Thảo luận", value: "discussion" }
                        ]}
                        onFilterChange={(value) => {
                            const tempCategory: string[] = [...filterValue.category]
                            if (tempCategory.includes(value)) {
                                tempCategory.splice(tempCategory.indexOf(value), 1);
                                setFilterValue((prev) => ({
                                    ...prev,
                                    category: [...tempCategory],
                                }))
                            } else {
                                tempCategory.push(value);
                                setFilterValue((prev) => ({
                                    ...prev,
                                    category: [...tempCategory],
                                }))
                            }

                        }}
                    />

                    <Filters
                        filterTitle="Thẻ"
                        value={filterValue.tags}
                        items={tagList.map((tag) => {
                            return { name: tag, value: tag }
                        })}
                        onFilterChange={(value) => {
                            const tempTags: string[] = [...filterValue.tags]
                            if (tempTags.includes(value)) {
                                tempTags.splice(tempTags.indexOf(value), 1);
                                setFilterValue((prev) => ({
                                    ...prev,
                                    tags: [...tempTags],
                                }))
                            } else {
                                tempTags.push(value);
                                setFilterValue((prev) => ({
                                    ...prev,
                                    tags: [...tempTags],
                                }))
                            }
                        }}
                    />
                </>
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
            <Box
                display={"flex"}
                gap={3}
                flexDirection={"column"}
                justifyContent={"center"}
                width={"100%"}
                flex={1}
            >
                {onRenderTitle()}
                {onRenderContent()}
                {onRenderFooter()}
            </Box>
        </SwipeableDrawer>
    );
};

export { FilterPanel };
