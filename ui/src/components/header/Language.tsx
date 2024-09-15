import React from "react";
import "./Language.scss";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";
import { useImmerState } from "../../hook/useImmerState";
import { classNames } from "../../utils/helper";

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
const initialState: ILanguageState = {
    lang: "vie",
}

const Language: React.FunctionComponent<ILanguageOwnProps> = (props) => {
    const { languages } = props
    const [state, setState] = useImmerState<ILanguageState>(initialState)
    const { lang } = state;

    const handleChange = (event: React.MouseEvent<HTMLElement>, newLang: string) => {
        event.preventDefault();
        setState({ lang: newLang })
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
                        <TooltipHost title={item.title}>
                            <img
                                className="g-choose-language-image"
                                src={item.image}
                                alt={item.title}
                            />
                        </TooltipHost>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
};

export default Language;
