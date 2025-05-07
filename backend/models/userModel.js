const { UserModel } = require('./schemaLoader');

const createUser = async (email, password) => {
    try {
        const user = new UserModel({ email, password });
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return null; 
        }
        return user;
    }
    catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
}
module.exports = {
    createUser,
    getUserByEmail,
};