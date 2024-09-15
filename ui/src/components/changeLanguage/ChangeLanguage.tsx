import { IconButton } from "@mui/material";
import React from "react";
import { engFlag, vieFlag } from "../utils/common/common";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
import { IAction } from "../../types/Function";

interface IChangeLanguageProps {
	language: "vie" | "eng";
	onChangeLanguage: IAction
}

const ChangeLanguage: React.FunctionComponent<IChangeLanguageProps> = (props) => {
	const { language, onChangeLanguage } = props;
	return (
		<React.Fragment>
			<TooltipHost title={language === "vie" ? "Vietnamese" : "English"}>
				<IconButton onClick={onChangeLanguage} aria-label="change-lang" size="large">
					<img src={language === "vie" ? vieFlag : engFlag} alt="lang" width="28" height="28" />
				</IconButton>
			</TooltipHost>
		</React.Fragment>
	);
};

export default ChangeLanguage;
