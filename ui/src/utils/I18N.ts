import i18n from "../i18next";
/**
 * Hàm dùng chung để dịch các câu với các tham số khác nhau.
 * @param {string} key - Key của câu cần dịch.
 * @param {object} options - Tham số đi kèm (nếu có).
 * @returns {string} - Câu đã được dịch.
 */

export const I18N = (key: string, options = {}) => {
    let currentLang = i18n.language;
    const result = i18n.t(key, { ...options, lng: currentLang });
    return result;
};

