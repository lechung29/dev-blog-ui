import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import "./index.scss";
import { IFunc } from "../../types/Function";
import { Button, Divider, Stack } from "@mui/material";
import { Label } from "../common/label/Label";
import CloseIcon from "@mui/icons-material/Close";

export type Anchor = "top" | "left" | "bottom" | "right";

interface IFilterPanelOwnProps {
    placement: Anchor;
    open: boolean;
    onClosePanel: () => void;
    onOpenPanel: () => void;
    onAplly?: () => void;
}

const FilterPanel: React.FunctionComponent<IFilterPanelOwnProps> = (props) => {
    const { open, placement, onAplly, onClosePanel, onOpenPanel } = props;
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
                    onClick={onClosePanel}
                >
                    <span>{"Hủy"}</span>
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    className="g-filter-apply-button" 
                    onClick={onAplly}
                >
                    <span>{"Áp dụng"}</span>
                </Button>
            </Stack>
        );
    };

    const onRenderContent: IFunc<JSX.Element> = () => {
        return <Stack style={{ flex: 1 }}>dsfsdf</Stack>;
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
                height={"100%"}
            >
                {onRenderTitle()}
                {onRenderContent()}
                {onRenderFooter()}
            </Box>
        </SwipeableDrawer>
    );
};

export { FilterPanel };
