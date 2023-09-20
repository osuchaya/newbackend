import { Schema, model} from 'mongoose';

const userSchema = new Schema({
    //define properties we want in our model
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    registeredDate: {
        type: Date,
        require: true,
        set: function (value) {
            return new Date(value);
        },
        get: function (value) {
            return value.toISOString();
        },
    },
    age: {
        type: Number,
        require: true
    }
});

const User = model("User", userSchema);
export default User; //ES6 modules rather require/module.exports (common JS or CJS)
