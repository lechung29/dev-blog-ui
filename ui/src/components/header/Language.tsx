import React, { useEffect, useState } from "react";
import "./Language.scss";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
        <Stack 
            flex={1} 
            display={"flex"} 
            flexDirection={"row"} 
            justifyContent={"center"}
        >
            <ToggleButtonGroup 
                className="g-choose-language-section" 
                value={lang} 
                aria-label="Languages"
            >
                {props.languages.map((item, index) => (
                    <ToggleButton 
                        className={`g-choose-language-item ${lang === item.name && "g-active-language"}`} 
                        key={index} style={{ textTransform: "none" }} 
                        value={item.name}
                        onClick={handleChange}
                    >
                        <TooltipHost title={item.title}>
                            <img src={item.image} alt={item.title} width="24" height="24" />
                        </TooltipHost>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
};

export default Language;
