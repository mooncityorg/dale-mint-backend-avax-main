const database = require('mongoose');
const { userModel } = require('./model');

require('dotenv').config("../.env");
const DB_CONNECTION = process.env.DB_CONNECTION;
console.log(`userModel`);
const init = () => {
    if (DB_CONNECTION === undefined) return;

    database
        .connect(DB_CONNECTION)
        .then((v) => {
            console.log('MongoDB connected');
        })
        .catch((e) => {
            console.error(`Connection Error ${e}`);
        })
};

const getAllInfo = async () => {
    let result = await userModel.find();
    return result;
}

const addUser = async (id, address, num) => {
    try {
        while (num) {
            const newUser = new userModel({
                discordId: id,
                walletAddress: address
            })
            await newUser.save((err) => {
                if (err) return console.log(err);
                console.log(newUser, "Saved Successfully");
            })
            num--;
        }
        let result = await getAllInfo();
        return result;
    } catch (error) {
        console.log(`${error} occured`);
        return;
    }
};

module.exports = { init, addUser, getAllInfo };
