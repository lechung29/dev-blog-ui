import React from 'react'
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../common/confirmDialog/ConfirmDialog';

const ExpiredModal: React.FunctionComponent = () => {
    const { isSessionExpired, errorMessage, handleLogout } = useAuth();
    return (
        <ConfirmDialog 
            content={errorMessage}
            open={isSessionExpired}
            noCancelButton={true}
            handleConfirm={handleLogout}
            title={"Thông báo"}
        />
    )
}

export default ExpiredModal