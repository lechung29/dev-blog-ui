import { IChangePasswordProps, IGoogleLoginType, ILoginType, IRegisterType, IUpdateUserProps, IUserInformation, userStatus } from "../../types/IAuth";
import { IResponseDefault, IResponseType } from "../../types/IResponse";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { allUser, googleLogin, login, register, root, updatePassword, updateUser, updateUserStatus, v1 } from "../helpers/QueryString";

class AuthService {
    public static loginUser(data: ILoginType): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/auth/${login}`, FetchMethod.POST, data);
    }

    public static googleLogin(data: IGoogleLoginType): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/auth/${googleLogin}`, FetchMethod.POST, data);
    }

    public static registerUser(data: IRegisterType): Promise<IResponseType<any>> {
        return FetchApi(`${root}/${v1}/auth/${register}`, FetchMethod.POST, data);
    }

    public static updateUserInfo(userId: string, data: IUpdateUserProps): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/user/${updateUser}/${userId}`, FetchMethod.PUT, data);
    }

    public static updatePassword(userId: string, data: IChangePasswordProps): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/user/${updatePassword}/${userId}`, FetchMethod.PUT, data);
    }

    public static getAllUsers(): Promise<IResponseType<IUserInformation[]>> {
        return FetchApi(`${root}/${v1}/user/${allUser}`, FetchMethod.GET);
    }

    public static updateUserStatus(userId: string, status: userStatus): Promise<IResponseDefault> {
        return FetchApi(`${root}/${v1}/user/${updateUserStatus}/${userId}`, FetchMethod.PUT, { status: status });
    }
}

export { AuthService };
