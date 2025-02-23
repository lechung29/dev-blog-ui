import { IChangePasswordProps, IGoogleLoginType, ILoginType, IRegisterType, IUpdateUserProps, IUserInformation, userStatus } from "../../types/IAuth";
import { IResponseDefault, IResponseType } from "../../types/IResponse";
import instance from "../config/axios";
import { allUser, googleLogin, login, logout, refreshToken, register, root, updatePassword, updateUser, updateUserStatus, v1 } from "../helpers/QueryString";

class AuthService {
    public static loginUser(data: ILoginType): Promise<IResponseType<IUserInformation>> {
        return instance.post(`${root}/${v1}/auth/${login}`, data);
    }

    public static refreshToken(): Promise<any> {
        return instance.get(`${root}/${v1}/auth/${refreshToken}`);
    }

    public static googleLogin(data: IGoogleLoginType): Promise<IResponseType<IUserInformation>> {
        return instance.post(`${root}/${v1}/auth/${googleLogin}`, data);
    }

    public static logoutUser(userId: string): Promise<any> {
        return instance.post(`${root}/${v1}/auth/${logout}`, { userId });
    }

    public static registerUser(data: IRegisterType): Promise<IResponseType<any>> {
        return instance.post(`${root}/${v1}/auth/${register}`, data);
    }

    public static updateUserInfo(userId: string, data: IUpdateUserProps): Promise<IResponseType<IUserInformation>> {
        return instance.put(`${root}/${v1}/user/${updateUser}/${userId}`, data);
    }

    public static updatePassword(userId: string, data: IChangePasswordProps): Promise<IResponseType<IUserInformation>> {
        return instance.put(`${root}/${v1}/user/${updatePassword}/${userId}`, data);
    }

    public static getAllUsers(): Promise<IResponseType<IUserInformation[]>> {
        return instance.get(`${root}/${v1}/user/${allUser}`);
    }

    public static updateUserStatus(userId: string, status: userStatus): Promise<IResponseDefault> {
        return instance.put(`${root}/${v1}/user/${updateUserStatus}/${userId}`, { status: status });
    }

    public static sendOtp(email: string): Promise<IResponseDefault> {
        return instance.post(`${root}/${v1}/auth/send-otp`, { email });
    }

    public static resendOtp(email: string): Promise<IResponseDefault> {
        return instance.post(`${root}/${v1}/auth/resend-otp`, { email });
    }

    public static verifyOtp(email: string, otp: string): Promise<IResponseDefault> {
        return instance.post(`${root}/${v1}/auth/verify-otp`, { email, otp });
    }

    public static resetPassword(email: string, password: string): Promise<IResponseDefault> {
        return instance.put(`${root}/${v1}/auth/reset-password`, { email, password });
    }
}

export { AuthService };
