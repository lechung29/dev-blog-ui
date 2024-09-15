import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useAppDispatch } from '../redux/store/store';
import { logout } from '../redux/reducers/users/UserSlice';
import { delay } from '../utils/helper';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    handleUnauthorized: (message: string) => void;
    handleLogout: () => void;
    isSessionExpired: boolean;
    errorMessage: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isSessionExpired, setIsSessionExpired] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleUnauthorized = (message: string) => {
        setErrorMessage(message);
        setIsSessionExpired(true);
    };


    const handleLogout = async () => {
        setIsSessionExpired(false);
        setErrorMessage('');
        dispatch(logout())
        await delay(500).then(() => navigate("/login"))
    }

    return (
        <AuthContext.Provider value={{ handleUnauthorized, handleLogout, isSessionExpired, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
