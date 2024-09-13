const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        discordId: String,
        walletAddress: String
    },
    {
        timestamps: {
            createdAt: "created_at", // Use `created_at` to store the created date
            updatedAt: "updated_at", // and `updated_at` to store the last updated date
        },
    }
)

const userModel = mongoose.model("user", UserSchema);
module.exports = { userModel }