import React from "react";
import { DefaultButton } from "../common/button/defaultbutton/DefaultButton";
import GoogleIcon from "@mui/icons-material/Google";
import "./index.scss";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { firebaseApp } from "../../firebase";

const GoogleAuth: React.FunctionComponent = () => {
    const auth = getAuth(firebaseApp)
    const handleGoogleLogin = async () => {
        const googleProvider = new GoogleAuthProvider()
        googleProvider.setCustomParameters({prompt: "select_account"})
        try {
            const result = await signInWithPopup(auth, googleProvider)
            console.log(result)
        } catch (error) {
            console.log("Có lỗi xảy ra khi đăng nhập với Google");
        }
    }
    return <DefaultButton 
        title="Google"
        onClick={handleGoogleLogin}
        variant="outlined"
        className="g-google-auth-button"
        startIcon={<GoogleIcon style={{ color: "#e94820" }} />} 
    />;
};

export { GoogleAuth };
