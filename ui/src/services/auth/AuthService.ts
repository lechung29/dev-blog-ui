import { ILoginType, IUserInformation } from "../../types/IAuth";
import { IResponseType } from "../../types/IResponse";
import { FetchApi, FetchMethod } from "../helpers/FetchApi";
import { login, root, v1 } from "../helpers/QueryString";

class AuthService {
    public static loginUser(data: ILoginType): Promise<IResponseType<IUserInformation>> {
        return FetchApi(`${root}/${v1}/auth/${login}`, FetchMethod.POST, data)
    }
}

export { AuthService };