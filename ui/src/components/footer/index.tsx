import { Stack } from "@mui/material";
import React from "react";
import "./index.scss"
import { Divider } from "../common/divider/Divider";
import { Label } from "../common/label/Label";
import { useTranslation } from "react-i18next";
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FunctionComponent = (_props) => {
    const { t } = useTranslation()
    return (
        <Stack className="g-footer-section">
            <Stack className="g-footer-box">
                <Stack className="g-footer-basic-info">
                    <div className="g-footer-basic-column">
                        <Label
                            className="g-footer-basic-column-label"
                            title={t("Footer.Resources")}
                        />
                        <ul className="g-footer-basic-column-list-item">
                            <li>{t("Resources.Posts")}</li>
                            <li>{t("Resources.Questions")}</li>
                            <li>{t("Resources.Videos")}</li>
                            <li>{t("Resources.Discussions")}</li>
                            <li>{t("Resources.Tools")}</li>
                            <li>{t("Resources.System.Status")}</li>
                        </ul>
                    </div>
                    <div className="g-footer-basic-column">
                        <Label
                            className="g-footer-basic-column-label"
                            title={t("Footer.Services")}
                        />
                        <ul className="g-footer-basic-column-list-item">
                            <li>{t("Services.AboutUs")}</li>
                            <li>{t("Services.Feedback")}</li>
                            <li>{t("Services.Help")}</li>
                            <li>{t("Services.FAQs")}</li>
                            <li>{t("Services.RSS")}</li>
                            <li>{t("Services.Terms")}</li>
                        </ul>
                    </div>
                    <div className="g-footer-basic-column">
                        <Label
                            className="g-footer-basic-column-label"
                            title={t("Footer.Links")}
                        />
                        <ul className="g-footer-basic-column-list-item">
                            <li>
                                <Label
                                    className="g-footer-basic-column-icon"
                                    title="Facebook"
                                    startIcon={<FacebookIcon />}
                                    onClick={() => window.location.href = "https://www.facebook.com/profile.php?id=100008110898510&locale=vi_VN"}
                                />
                            </li>
                            <li>
                                <Label
                                    className="g-footer-basic-column-icon"
                                    title="Github"
                                    startIcon={<GitHubIcon />}
                                    onClick={() => window.location.href = "https://github.com/lechung29"}
                                />
                            </li>
                        </ul>
                    </div>
                </Stack>
                <Divider sx={{ backgroundColor: "#dbe3e8" }} />
                <Stack className="g-footer-copyright">
                    <p>
                        Copyright &copy; {new Date().getFullYear()}: Powered by Killian Le
                    </p>
                </Stack>
            </Stack>
        </Stack>
    )
};

export default Footer;
