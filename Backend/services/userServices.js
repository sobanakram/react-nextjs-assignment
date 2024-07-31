const user = require("../models/user");


const addUser = async (data) => {

    console.log("In add user data service");
    return new Promise((resolve, reject) => {
        new user(data)
            .save()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    });

}

const findUser = async (condition) => {

    console.log("In find user service");
    return new Promise((resolve, reject) => {
        user.findOne(condition)
            .then((user) => resolve(user))
            .catch((err) => reject(err));
    });

}

const updateUser = async (condition, update, option) => {

    console.log("In update User service");
    return new Promise((resolve, reject) => {
        user.findOneAndUpdate(condition, update, option)
            .then((user) => resolve(user))
            .catch((err) => reject(err));
    });

}

const userAggregate = async (query) => {

    console.log("In user aggregate service");
    return new Promise((resolve, reject) => {
        user.aggregate(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });

}

module.exports = {
    addUser,
    findUser,
    updateUser,
    userAggregate
}