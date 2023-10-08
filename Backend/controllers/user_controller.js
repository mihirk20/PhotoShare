
const MyError = require("../model/error");
const user = require("../model/user");
const ALL_USERS = [
    {
        id: "u1",
        name: "xyz",
        email: "xyz@gmail.com",
        password: "xyz@123"
    },
    {
        id: "u2",
        name: "mno",
        email: "mno@gmail.com",
        password: "mno@123"
    }
]

exports.getUsers = async (req, res, next) => {
    let all_users;
    try {
        all_users = await user.find({}, "-password")
    } catch (err) {
        return next(new MyError("Database Error:cannot get users", 500))
    }
    res.status(200).json({ result: "success", message: all_users });
};

exports.register = async (req, res, next) => {
    const { name, email, password, locationsid } = req.body;
    let findUser;
    try {
        findUser = await user.findOne({ email: email })
    } catch (err) {
        return next(new MyError('database error:cannot register', 500));
    }
    // const findUser = ALL_USERS.find((user) => { return user.email === email });
    if (findUser) {
        return next(new MyError("Email exists"), 401);
    }
    const newUser = new user({
        name,
        email,
        pic: "https://picsum.photos/200/300",
        password,
        locationsid: []
    })
    // const newUser = {
    //     id: "u" + Math.trunc(Math.random() * 100),
    //     name, email, password
    // };
    // ALL_USERS.push(newUser);
    try {
        await newUser.save();
    } catch (err) {
        return next(new MyError("Database Error:cannot create user", 500))
    }
    res.status(201).json({ result: "Success", message: newUser })

};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    let findUser;
    try {
        findUser = await user.findOne({ email: email })
    } catch (err) {
        return next(new MyError('database error:cannot login', 409));
    }
    // const findUser = ALL_USERS.find((user) => { return user.email === email });
    if (!findUser || findUser.password !== password) {
        return next(new MyError("Email or password not found"), 401);
    };
    res.status(200).json({ result: "Success", message: "Successful login" })
};