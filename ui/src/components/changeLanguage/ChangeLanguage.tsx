import { IconButton } from "@mui/material";
import React from "react";
import { engFlag, vieFlag } from "../utils/common/common";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
import { IAction } from "../../types/Function";
import { useTranslation } from "react-i18next";

interface IChangeLanguageProps {
	language: string
	onChangeLanguage: IAction
}

const ChangeLanguage: React.FunctionComponent<IChangeLanguageProps> = (props) => {
	const { language, onChangeLanguage } = props;
	const { t } = useTranslation()
	return (
		<React.Fragment>
			<TooltipHost title={t(language === "vn" ? "Language.Vietnamese" : "Language.English")}>
				<IconButton onClick={onChangeLanguage} aria-label="change-lang" size="large">
					<img src={language === "vn" ? vieFlag : engFlag} alt="lang" width="28" height="28" />
				</IconButton>
			</TooltipHost>
		</React.Fragment>
	);
};

export default ChangeLanguage;
