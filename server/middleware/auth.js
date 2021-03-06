import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/*
    Wants to like a post:
        click the like button => auth middleware (NEXT) => like controller...
*/

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomerAuth = token.length < 500; // if token length greater, then is google token

        let decodedData;

        if (token && isCustomerAuth) {
            decodedData = jwt.verify(token, process.env.SECRET);

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; // google id to differentiate users
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
