const pool = require("./pool");

//Returns users and their ids.
async function getUsers() {
    const { rows } = pool.query("SELECT id, user_name FROM messages");
    return rows;
}

async function getMessages(userId) {
    const { rows } = await pool.query(
        "SELECT message FROM messages WHERE id = $1", 
        [userId]);
    return rows;
}

module.exports = [
    getUsers,
    getMessages,
];