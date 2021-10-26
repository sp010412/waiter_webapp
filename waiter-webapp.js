module.exports = function waiter(stored) {

    var pool = stored;

    async function login(userId) {
        const db = await pool.query('SELECT * FROM stuff WHERE user_name = $1', [userId]);
        if (db.rowCount === 0) {
            await pool.query('INSERT INTO stuff (user_name) values ($1)', [userId]);
        }
    }

    async function data(id, values) {
        const stuffId = await pool.query('SELECT id FROM stuff WHERE user_name = $1', [id]);
        const weekdayId = await pool.query('SELECT id FROM weeks  WHERE week_day = $1', [values]);
        // const dbUser = await pool.query('SELECT user_id from adminData');
        // const dbWeeks = await pool.query('SELECT weeks_id from adminData');

        await pool.query('INSERT INTO adminData (user_id, weeks_id) values($1,$2)', [stuffId], [weekdayId]);
    }

    return {
        login,
        data,
    }
}