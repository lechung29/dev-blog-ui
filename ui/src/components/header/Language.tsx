import React, { useState } from "react";
import "./Language.scss";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TooltipHost } from "../common/tooltiphost/TooltipHost";

interface ILanguague {
    name: string;
    title: string;
    image: string;
}

interface ILanguageOwnProps {
    languages: ILanguague[];
}

const Language: React.FunctionComponent<ILanguageOwnProps> = (props) => {
    const [lang, setLang] = useState("vie");

    const handleChange = (event: React.MouseEvent<HTMLElement>, newLang: string) => {
        event.preventDefault();
        setLang(newLang);
    };
    return (
        <ToggleButtonGroup className="g-choose-language-section" value={lang} exclusive onChange={handleChange} aria-label="Languages">
            {props.languages.map((item, index) => (
                <ToggleButton className="g-choose-language-item" key={index} style={{ textTransform: "none" }} value={item.name}>
                    <TooltipHost title={item.title}>
                        <img src={item.image} alt={item.title} width="24" height="24" />
                    </TooltipHost>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export default Language;
