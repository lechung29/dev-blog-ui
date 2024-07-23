import { IGoogleLoginType, ILoginType, IRegisterType, IUserInformation } from "../../types/IAuth";
import { IResponseType } from "../../types/IResponse";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { googleLogin, login, register, root, v1 } from "../helpers/QueryString";

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
}

export { AuthService };