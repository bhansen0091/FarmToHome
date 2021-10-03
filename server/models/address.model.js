const mongoose = require("mongoose");

// C
const AddressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Required Field"],
        trim: true,
        min: 3,
        max: 50,
    },
    mobileNumber: {
        type: String,
        required: [true, "Required Field"],
        trim: true,
    },
    zipCode: {
        type: String,
        required: [true, "Required Field"],
        trim: true,
    },
    streetOne: {
        type: String,
        required: [true, "Required Field"],
        trim: true,
        min: 10,
        max: 100,
    },
    streetTwo: {
        type: String,
        trim: true,
        min: 10,
        max: 100,
    },
    city: {
        type: String,
        required: [true, "Required Field"],
        trim: true,
    },
    state: {
        type: String,
        required: [true, "Required Field"],
    },
    alternatePhone: {
        type: String,
    },
    addressType: {
        type: String,
        required: [true, "Required Field"],
        enum: ["Home", "Business"]
    },
});

// B
const UserAddressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        address: [AddressSchema],
    },
    { timestamps: true }
);

// mongoose.model("Address", AddressSchema);
// module.exports = mongoose.model("UserAddress", UserAddressSchema);

const Address = new mongoose.model("Address", AddressSchema);
module.exports.Address = Address;

const UserAddress = new mongoose.model("UserAddress", UserAddressSchema);
module.exports.UserAddress = UserAddress;

