// queries
const pool = require("./pool");

//Returns users and their ids.
async function getAllMessages() {
    const { rows } = await pool.query("SELECT id, user_name FROM messages");
    return rows;
}

async function getMessages(userId) {
    const { rows } = await pool.query(
        "SELECT message, sent_date FROM messages WHERE id = $1", 
        [userId]);

    return rows;
}

async function postNewMessage(userName, message) {
    await pool.query("INSERT INTO messages (user_name, message, sent_date) VALUES ($1, $2, $3)", [userName, message, new Date()]);
    return;
}

module.exports = {
    getUsers: getAllMessages,
    getMessages,
    postNewMessage,
};