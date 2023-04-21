import jwt from 'jsonwebtoken';
import User from '@/resources/user/user.interface';
import IToken from '@/utils/interfaces/token.interface';

const createToken = (user: User): string => {
    const expiresIn = '1d';
    const secret = process.env.JWT_SECRET as jwt.Secret;
    const dataStoredInToken: IToken = {
        id: user._id,
        expireIn: expiresIn,
    };

    return jwt.sign(dataStoredInToken, secret, { expiresIn });
};

const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | IToken> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) {
                    return reject(err);
                }

                resolve(payload as IToken);
            }
        );
    });
};

export default { createToken, verifyToken };
