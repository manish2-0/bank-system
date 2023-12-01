const accounts = require('../model/accounts');

exports.action = async (req, res) => {

    const { user_id } = req.body;
    const { transaction_type } = req.body;
    const { amount } = req.body;

    let flag = true;

    if (!user_id || !transaction_type || !amount) {
        flag = false;
        error = "Please Enter details";
    }
    if (flag) {
        const response = await accounts.action(user_id, transaction_type, amount);
        if (response.status) {
            res.status(200).json({ status: true, message: response.message });
        }
        else {
            res.status(response.message ? 400 : 500).json({ status: false, message: response.message ? response.message : response.actualError });
        }
    }
    else if (!flag) {
        res.status(400).json({ status: false, message: error });
    }
}