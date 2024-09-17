import React from "react";
import "./Language.scss";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
import { useImmerState } from "../../hook/useImmerState";
import { classNames } from "../../utils/helper";
import { useTranslation } from "react-i18next";

interface ILanguage {
    name: string;
    title: string;
    image: string;
}

interface ILanguageOwnProps {
    languages: ILanguage[];
}

interface ILanguageState {
    lang: string;
}

const Language: React.FunctionComponent<ILanguageOwnProps> = (props) => {
    const { languages } = props
    const { i18n, t } = useTranslation()
    const currentLanguage = i18n.language;
    const initialState: ILanguageState = {
        lang: currentLanguage || "en",
    }
    const [state, setState] = useImmerState<ILanguageState>(initialState)
    const { lang } = state;

    const handleChange = (event: React.MouseEvent<HTMLElement>, newLang: string) => {
        event.preventDefault();
        i18n.changeLanguage(newLang)
        setState({ lang: newLang });
    };

    return (
        <Stack className="g-header-toggle-language">
            <ToggleButtonGroup
                className="g-choose-language-section"
                value={lang}
                aria-label="Languages"
            >
                {languages.map((item, index) => (
                    <ToggleButton
                        className={classNames("g-choose-language-item", { "g-active-language": lang === item.name })}
                        key={index}
                        value={item.name}
                        onClick={handleChange}
                    >
                        <TooltipHost title={t(item.title)}>
                            <img
                                className="g-choose-language-image"
                                src={item.image}
                                alt={t(item.title)}
                            />
                        </TooltipHost>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
};

export default Language;
