import React from 'react'
import ConfirmDialog from '../common/confirmDialog/ConfirmDialog';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { authState, handleNavigate } from '../../redux/reducers/auth/AuthSlice';
import { logout } from '../../redux/reducers/users/UserSlice';
import { delay } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

const ExpiredModal: React.FunctionComponent = () => {
    const { t } = useTranslation()
    const { errorMessage, isOpenDialog } = useAppSelector(authState)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = async (): Promise<void> => {
        dispatch(logout())
        dispatch(handleNavigate())
        await delay(500).then(() => navigate("/login"))
    }
    return (
        <ConfirmDialog
            content={t(errorMessage)}
            open={isOpenDialog}
            noCancelButton={true}
            handleConfirm={handleLogout}
            title={t("Common.Notifications")}
        />
    )
}

export default ExpiredModal