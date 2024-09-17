import React from 'react'
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../common/confirmDialog/ConfirmDialog';
import { useTranslation } from 'react-i18next';

const ExpiredModal: React.FunctionComponent = () => {
    const { t } = useTranslation()
    const { isSessionExpired, errorMessage, handleLogout } = useAuth();
    return (
        <ConfirmDialog
            content={t(errorMessage)}
            open={isSessionExpired}
            noCancelButton={true}
            handleConfirm={handleLogout}
            title={t("Common.Notifications")}
        />
    )
}

export default ExpiredModal