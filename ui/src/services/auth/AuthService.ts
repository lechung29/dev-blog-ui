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

    public static updateUserInfo(userId: string, data: IUpdateUserProps, handleUnauthorized: Function): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/user/${updateUser}/${userId}`, FetchMethod.PUT, data, handleUnauthorized);
    }

    public static updatePassword(userId: string, data: IChangePasswordProps, handleUnauthorized: Function): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/user/${updatePassword}/${userId}`, FetchMethod.PUT, data, handleUnauthorized);
    }

    public static getAllUsers(handleUnauthorized: Function): Promise<IResponseType<IUserInformation[]>> {
        return FetchApi(`${root}/${v1}/user/${allUser}`, FetchMethod.GET, handleUnauthorized);
    }

    public static updateUserStatus(userId: string, status: userStatus, handleUnauthorized: Function): Promise<IResponseDefault> {
        return FetchApi(`${root}/${v1}/user/${updateUserStatus}/${userId}`, FetchMethod.PUT, { status: status }, handleUnauthorized);
    }
}

export { AuthService };
