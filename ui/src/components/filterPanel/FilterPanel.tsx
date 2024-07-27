import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import "./index.scss";
import { IFunc } from "../../types/Function";
import { Button, Paper, Stack, styled } from "@mui/material";
import { Label } from "../common/label/Label";
import CloseIcon from '@mui/icons-material/Close';

type Anchor = "top" | "left" | "bottom" | "right";

interface IFilterPanelOwnProps {
    placement: Anchor;
    open: boolean;
    onClosePanel: () => void;
    onOpenPanel: () => void;
    onAplly?: () => void;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const FilterPanel: React.FunctionComponent<IFilterPanelOwnProps> = (props) => {
    const { open, placement, onAplly, onClosePanel, onOpenPanel } = props;
    const onRenderTitle: IFunc<JSX.Element> = () => {
        return (
            <Stack direction={"row"} display={"flex"} alignItems={"center"} height={"2.5rem"} justifyContent={"space-between"}>
                <Label className="g-filter-panel-title" title="Filter Panel" />
                <Button variant="text" className="g-filter-close-button">
                    <CloseIcon style={{color: "#b9b9b9"}}/>
                </Button>
            </Stack>
        );
    };

    const onRenderFooter: IFunc<JSX.Element> = () => {
        return (
            <Stack direction={"row"} display={"flex"} alignItems={"center"} height={"2rem"} justifyContent={"flex-end"} gap={2}>
                <Button variant="text" className="g-filter-cancel-button" onClick={onClosePanel}>
                    <span>{"Cancel"}</span>
                </Button>
                <Button variant="contained" color="primary" className="g-filter-apply-button" onClick={onAplly}>
                    <span>{"Apply"}</span>
                </Button>
            </Stack>
        );
    };

    const onRenderContent: IFunc<JSX.Element> = () => {
        return (
            <div style={{flex: 1}}>
                dsfsdf
            </div>
        )
    }

    
    return (
        <div>
            <SwipeableDrawer anchor={placement} open={open} onClose={onClosePanel} onOpen={onOpenPanel} className="g-filter-panel-section">
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} width={"100%"} height={"100%"}>
                    {onRenderTitle()}
                    {onRenderContent()}
                    {onRenderFooter()}
                </Box>
            </SwipeableDrawer>
        </div>
    );
};

export { FilterPanel };
