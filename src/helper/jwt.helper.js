const jwt = require('jsonwebtoken')
const { setJWT, getJWT } = require("./redis.helper");


// const createAccessJWT = async (result, id) => {
//     try {
//         const accessJWT = await jwt.sign({
//             result
//         }, process.env.JWT_ACCESS_TOKEN, {
//             expiresIn: "1d", //change this to 15m
//         });

//         // await setJWT(accessJWT, id);

//         return Promise.resolve(accessJWT);
//     } catch (error) {
//         return Promise.reject(error);
//     }
// }

const createAccessJWT = async (email, id) => {
    try {
        const accessJWT = await jwt.sign({
            email
        }, process.env.JWT_ACCESS_TOKEN, {
            expiresIn: "1d", //change this to 15m
        });

        // await setJWT(accessJWT, id);

        return Promise.resolve(accessJWT);
    } catch (error) {
        return Promise.reject(error);
    }
};

const createRefreshJWT = async (email, id) => {
    try {
        const refreshJWT = jwt.sign({
            email
        }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        });

        // await storeUserRefreshJWT(_id, refreshJWT);

        return Promise.resolve(refreshJWT);
    } catch (error) {
        return Promise.reject(error);
    }
}

const verifyAccessJWT = (userJWT) => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_TOKEN));
    } catch (error) {
        return Promise.resolve(error);
    }
};
const verifyRefreshJWT = (userJWT) => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET));
    } catch (error) {
        return Promise.resolve(error);
    }
};

module.exports = {
    createAccessJWT,
    createRefreshJWT,
    verifyAccessJWT,
    verifyRefreshJWT,
}