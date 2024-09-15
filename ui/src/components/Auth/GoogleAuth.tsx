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
import { useImmerState } from "../../hook/useImmerState";
import ConfirmDialog from "../common/confirmDialog/ConfirmDialog";
import { IFunc } from "../../types/Function";

interface IGoogleAuthOwnState {
    isOpenDialog: boolean;
    errorMessage: string;
}

const initialState: IGoogleAuthOwnState = {
    isOpenDialog: false,
    errorMessage: "",
}

const GoogleAuth: React.FunctionComponent = () => {
    const [state, setState] = useImmerState<IGoogleAuthOwnState>(initialState)
    const { isOpenDialog, errorMessage } = state
    const auth = getAuth(firebaseApp)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleLogin: IFunc<Promise<void>> = async () => {
        const googleProvider = new GoogleAuthProvider()
        googleProvider.setCustomParameters({ prompt: "select_account" })
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const data = await AuthService.googleLogin({
                displayName: result.user.displayName!,
                email: result.user.email!,
                avatar: result.user.photoURL!,
            })
            if (data.requestStatus !== IRequestStatus.Success) {
                setState((draft) => {
                    draft.errorMessage = data.message;
                    draft.isOpenDialog = true;
                })
                return Promise.resolve()
            }
            dispatch(login(data.data))
            navigate("/")
        } catch (error) {
            setState((draft) => {
                draft.errorMessage = "Có lỗi xảy ra khi đăng nhập với Google"
                draft.isOpenDialog = true;
            })
        }
    }
    return <Fragment>
        <DefaultButton
            title="Google"
            onClick={handleGoogleLogin}
            variant="outlined"
            className="g-google-auth-button"
            startIcon={<GoogleIcon style={{ color: "#e94820" }} />}
        />;
        {isOpenDialog && <ConfirmDialog
            title="Thông báo"
            content={errorMessage}
            open={isOpenDialog}
            handleConfirm={() => setState({ isOpenDialog: false })}
            noCancelButton
        />}
    </Fragment>
};

export { GoogleAuth };
