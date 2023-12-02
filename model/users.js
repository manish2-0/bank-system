const queryExecuter = require('../helper/queryExecuter');
const bcrypt = require('bcrypt');

exports.register = async (name, email, password) => {
    const qry = "SELECT * FROM users WHERE email = ?";
    const resp = await queryExecuter(qry, [email]);
    if (resp.status) {
        if (resp.data === undefined) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`;
            const response = await queryExecuter(query);
            response.message = "User Successfully Registered";
            return response;
        }
        else {
            resp.message = "User Already Registered";
            return resp;
        }
    }
    else {
        return resp;
    }
}

exports.login = async (email, password) => {
    const qry = "SELECT * FROM users WHERE email = ?";
    const resp = await queryExecuter(qry, [email]);
    if (resp.status) {
        if (resp.data === undefined) {
            resp.message = "No Such User Exists";
            return resp;
        }
        else {
            const hashedPassword = resp.data[0].password;
            const check = bcrypt.compareSync(password, hashedPassword);
            if (check) {
                const accessToken = require('crypto').randomBytes(36).toString('hex');
                const query = `UPDATE users SET access_token = '${accessToken}' WHERE email = ?`;
                const response = await queryExecuter(query, [email]);
                resp.check = check;
                resp.accessToken = accessToken;
                resp.message = "User Logged In Successfully";
                return resp;
            }
            else if (!check) {
                resp.message = "Wrong Password Please Check Again";
                return resp;
            }
        }
    }
    else {
        return resp;
    }
}

exports.logout = async (access_token) => {
    const qry = "UPDATE users SET access_token = '' WHERE access_token = ?";
    const resp = await queryExecuter(qry, [access_token]);
    return resp;
}

exports.readAll = async () => {
    const query = "SELECT * FROM users where category = 'customer'";
    const response = await queryExecuter(query);
    if (response.status) {
        if (response.data === undefined) {
            response.message = "No Data Found";
        }
        return response;
    }
    else {
        return response;
    }
}

exports.balance = async (email) => {
    const query = "SELECT balance FROM users where email = ?";
    const response = await queryExecuter(query, [email]);
    return response;
}