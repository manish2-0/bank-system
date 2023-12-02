const user = require('../model/users');

exports.signup = async (req, res) => {

    const { name } = req.body;
    const { email } = req.body;
    const { password } = req.body;

    let flag = true;

    if (!name || !email || !password) {
        flag = false;
        error = "Please Enter Credentials";
    }
    if (flag) {
        const response = await user.register(name, email, password);
        if (response.status) {
            res.status(200).json({ status: true, message: response.message });
        }
        else {
            res.status(500).json({ status: false, message: response.error });
        }
    }
    else if (!flag) {
        res.status(400).json({ status: false, message: error });
    }
}

exports.login = async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    let flag = true;
    if (!email) {
        flag = false;
        error = "Please Enter Email";
    }
    if (flag && !password) {
        flag = false;
        error = "Please Enter Password";
    }
    if (flag) {
        const response = await user.login(email, password);
        if (response.status) {
            if (response.check) {
                delete response.data[0].password;
                delete response.data[0].access_token;
                res.status(200).json({ response });
            }
            else {
                res.status(200).json({ status: false, message: response.message });
            }
        }
        else {
            res.status(500).json({ status: false, message: response.actualError });
        }
    }
    else if (!flag) {
        res.status(200).json({ status: false, message: error });
    }
}

exports.logout = async (req, res) => {
    const { access_token } = req.body;
    let flag = true;
    if (!access_token) {
        flag = false;
        error = "Please Enter access_token";
    }
    if (flag) {
        const response = await user.logout(access_token);
        if (response.status) {
            res.status(200).json({ status: true, message: 'User logout successfully' });
        }
        else {
            res.status(500).json({ status: false, message: response.error });
        }
    }
    else if (!flag) {
        res.status(400).json({ status: false, message: error });
    }
}

exports.getCustomers = async (req, res) => {
    const customers = await user.readAll();
    if (customers.status) {
        if (customers.data === undefined) {
            res.status(200).json({ status: true, message: customers.message });
        }
        else {
            res.status(200).json({ status: true, data: customers.data });
        }
    }
    else {
        res.status(500).json({ status: false, message: customers.actualError });
    }
}

exports.getBalance = async (req, res) => {

    const email = req.params.id;
    const response = await user.balance(email);
    if (response) {
        res.status(200).json({ status: true, message: "Balance Found.", data: response })
    }
    else {
        res.status(200).json({ status: false, message: "Something Went Wrong" });
    }
}