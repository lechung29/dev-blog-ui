import React from "react";
import { DefaultButton } from "../common/button/defaultbutton/DefaultButton";
import GoogleIcon from "@mui/icons-material/Google";
import "./index.scss";
import { GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { firebaseApp } from "../../firebase";
import { AuthService } from "../../services/auth/AuthService";
import { IRequestStatus } from "../../types/IResponse";
import { useNavigate } from "react-router-dom";

const GoogleAuth: React.FunctionComponent = () => {
    const auth = getAuth(firebaseApp)
    const navigate = useNavigate()
    const handleGoogleLogin = async () => {
        const googleProvider = new GoogleAuthProvider()
        googleProvider.setCustomParameters({prompt: "select_account"})
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const data = await AuthService.googleLogin({
                displayName: result.user.displayName!,
                email: result.user.email!,
                avatar: result.user.photoURL!,
            })
            if (data.requestStatus === IRequestStatus.Success) {
                navigate("/")
            }
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
