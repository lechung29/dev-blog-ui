import { IChangePasswordProps, IGoogleLoginType, ILoginType, IRegisterType, IUpdateUserProps, IUserInformation } from "../../types/IAuth";
import { IResponseType } from "../../types/IResponse";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { googleLogin, login, register, root, updatePassword, updateUser, v1 } from "../helpers/QueryString";

class AuthService {
    public static loginUser(data: ILoginType): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/auth/${login}`, FetchMethod.POST, data)
    }

    public static googleLogin(data: IGoogleLoginType): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/auth/${googleLogin}`, FetchMethod.POST, data)
    }

    public static registerUser(data: IRegisterType): Promise<IResponseType<any>> {
        return FetchApi(`${root}/${v1}/auth/${register}`, FetchMethod.POST, data)
    }

    public static updateUserInfo(userId: string, data: IUpdateUserProps): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/user/${updateUser}/${userId}`, FetchMethod.PUT, data)
    }

    public static updatePassword(userId: string, data: IChangePasswordProps): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/user/${updatePassword}/${userId}`, FetchMethod.PUT, data)
    }
}

export { AuthService };