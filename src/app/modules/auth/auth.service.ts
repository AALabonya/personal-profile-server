/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../../config";
import AppError from "../../errors/AppError";
import { sendEmail } from "../../utils/sendEmail";

import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";


const signUp = async (payload: TUser) => {
    const result = await User.create(payload);
    //creating access token
    const jwtPayload = {
        userId: result?._id,
        email: result?.email,
        role: result?.role,
        name: result?.name,

    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expires_in,
    }); 

    //creating refresh token
    const refreshPayload = {
        userId: result?._id,
        email: result?.email,
        role: result?.role,
        name: result?.name,

    };

    const refreshToken = jwt.sign(refreshPayload, config.jwt_refresh_secret as string, {
        expiresIn: config.jwt_refresh_expires_in,
    });


    return { result, accessToken, refreshToken };
};

const loginUser = async (payload: TLoginUser) => {
    const user = await User.findOne({ email: payload?.email }).select('-createdAt -updatedAt -__v');

    if (!user) {
        throw new AppError(400, 'User does not exist!');
    }

    //creating access token
    const jwtPayload = {
        userId: user?._id,
        email: user?.email,
        role: user?.role,
        name: user?.name,

    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expires_in,
    });

    //creating refresh token
    const refreshPayload = {
        userId: user?._id,
        email: user?.email,
        role: user?.role,
        name: user?.name,
    };

    const refreshToken = jwt.sign(refreshPayload, config.jwt_refresh_secret as string, {
        expiresIn: config.jwt_refresh_expires_in,
    });

    return {
        accessToken,
        refreshToken,
        user,
    }

    // return {
    //     token,
    //     refreshToken,
    //     user,
    // }


};

const refreshToken = async (token: string) => {
    const decoded = jwt.verify(
        token,
        config.jwt_refresh_secret as string,
    ) as JwtPayload;

    const { userId } = decoded;

    const user = await User.findById({ userId }).select('-createdAt -updatedAt -__v');
    //checking if the user exist or not 
    if (!user) {
        throw new AppError(400, 'User does not exist!');
    }

    const jwtPayload = {
        userId: user?._id,
        email: user?.email,
        role: user?.role,
        name: user?.name,

    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expires_in,
    });

    return {
        accessToken
    };

};

const forgetPassword = async (email: string) => {

    const userEmail = email;

    // console.log(email)


    const user = await User.findOne({ email: userEmail });
    // console.log(user, 'from service')

    if (!user) {
        throw new AppError(404, 'User not found');
    }

    const jwtPayload = {
        userId: user?._id,
        email: user?.email,
        role: user?.role,
        name: user?.name,

    };

    const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expires_in,
    });


    const resetUILink = `${config.client_url}/reset-password?id=${user.id}&token=${resetToken} `;
    sendEmail(user.email, resetUILink);

};


const resetPassword = async (payload: { id: string, password: string }, token: string) => {

    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
    ) as JwtPayload;

    const newPassword = await bcrypt.hash(
        payload.password,
        Number(config.bcrypt_salt_rounds),
    )

    const id = decoded?.userId;

    await User.findByIdAndUpdate(id
        , {
            password: payload.password,
        }
    )
};



export const authServices = {
    signUp,
    loginUser,
    refreshToken,
    forgetPassword,
    resetPassword,
}