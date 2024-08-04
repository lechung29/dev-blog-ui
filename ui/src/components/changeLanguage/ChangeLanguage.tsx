import { IconButton } from "@mui/material";
import React from "react";
import { engFlag, vieFlag } from "../utils/common/common";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";

interface IChangeLanguageProps {
	language: "vie" | "eng";
	onChangeLanguage: () => void;
}

const ChangeLanguage: React.FunctionComponent<IChangeLanguageProps> = (props) => {
	return (
		<React.Fragment>
			<TooltipHost title={props.language === "vie" ? "Vietnamese" : "English"}>
				<IconButton onClick={props.onChangeLanguage} aria-label="change-lang" size="large">
					<img src={props.language === "vie" ? vieFlag : engFlag} alt="lang" width="28" height="28" />
				</IconButton>
			</TooltipHost>
		</React.Fragment>
	);
};

export default ChangeLanguage;
