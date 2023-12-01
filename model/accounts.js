const queryExecuter = require('../helper/queryExecuter');
const date = require('date-and-time');

exports.action = async (user_id, transaction_type, amount) => {
    let now = new Date();
    const created_at = date.format(now, 'YYYY-MM-DD HH:mm:ss');
    const qry = "SELECT * FROM users WHERE user_id = ?";
    const resp = await queryExecuter(qry, [user_id]);
    if (resp.status) {
        if (resp.data !== undefined) {
            let balance = resp.data[0].balance;
            if (transaction_type === 'withdraw') {
                if (amount > balance) {
                    resp.status = false;
                    resp.message = 'Insuffient fund'
                } else {
                    balance = balance - amount;
                }
            } else if (transaction_type === 'deposit') {
                balance = balance + amount;
            }
            if (resp.status) {

                const q = `INSERT INTO accounts (user_id, transaction_type,	amount, balance, created_at) VALUES ('${user_id}', '${transaction_type}', '${amount}', '${balance}', '${created_at}')`;
                const response = await queryExecuter(q);
                if (response.status) {
                    const qr = `UPDATE users SET balance = ${balance} where user_id = ${user_id};`
                    const response = await queryExecuter(qr);
                    if (response.status) {
                        resp.message = 'Action performed successfully'
                        return resp;
                    } else {
                        return response;
                    }
                } else {
                    return response;
                }
            } else {
                return resp;
            }
        } else {
            return resp
        }
    }
    else {
        return resp;
    }
}
