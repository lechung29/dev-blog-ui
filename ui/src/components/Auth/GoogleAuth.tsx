import React, { Fragment } from "react";
import { DefaultButton } from "../common/button/defaultbutton/DefaultButton";
import GoogleIcon from "@mui/icons-material/Google";
import "./index.scss";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { firebaseApp } from "../../firebase";
import { AuthService } from "../../services/auth/AuthService";
import { IRequestStatus } from "../../types/IResponse";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/users/UserSlice";
import { IFunc } from "../../types/Function";
import { store } from "../../redux/store/store";
import { handleUnauthorized } from "../../redux/reducers/auth/AuthSlice";

const GoogleAuth: React.FunctionComponent = () => {
    const auth = getAuth(firebaseApp)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleLogin: IFunc<Promise<void>> = async () => {
        const googleProvider = new GoogleAuthProvider()
        googleProvider.setCustomParameters({ prompt: "select_account" })
        const result = await signInWithPopup(auth, googleProvider)
        const data = await AuthService.googleLogin({
            displayName: result.user.displayName!,
            email: result.user.email!,
            avatar: result.user.photoURL!,
        })
        if (data.requestStatus === IRequestStatus.Success) {
            dispatch(login(data.data))
            navigate("/")
        } else {
            store.dispatch(handleUnauthorized(data.message))
        }
    }
    return <Fragment>
        <DefaultButton
            title="Google"
            onClick={handleGoogleLogin}
            variant="outlined"
            className="g-google-auth-button"
            startIcon={<GoogleIcon style={{ color: "#e94820" }} />}
        />
    </Fragment>
};

export { GoogleAuth };
