const userServices = require('../services/userServices');
const jwtServices = require('../services/jwtServices');
const bcrypt = require('bcryptjs');
const _ = require("lodash");

const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(422).send({ error: 'Email or password is missing!' });
        }

        const user = await userServices.findUser({ email: email.toLowerCase() });
        if (!user)
            return response.status(403).send({ error: 'Email or password incorrect!' });

        const isCorrectPass = await bcrypt.compare(password, user?.password);
        if (!isCorrectPass)
            return response.status(403).send({ error: 'Password incorrect!' });

        const accessToken = jwtServices.generateAccessToken(user);


        await userServices.updateUser(
            {
                _id: user._id
            },
            {
                $set: {
                    jwt: accessToken
                }
            }
        );

        return response
            .set("access-control-expose-headers", "access_token")
            .header("access_token", accessToken)
            .status(200)
            .json({
                user: {
                    ..._.pick(user, ['_id', 'name', 'email'])
                }
            });

    } catch (error) {
        console.log('Exception :', error);
        return response.status(500).send({
            error: error?.message ? error.message : 'Something went wrong',
        });
    }
};

const signout = async (request, response) => {
    try {
        const user = request.user;

        await userServices.updateUser(
            {
                _id: user._id,
            },
            {
                $set: {
                    jwt: null
                }
            }
        )

        return response
            .status(200)
            .json({ message: "Log out Successfully" });
    } catch (error) {
        console.log(error);
        return response
            .status(500)
            .json({
                error: "Something went wrong",
            });
    }

};

module.exports = {
    login,
    signout
};
