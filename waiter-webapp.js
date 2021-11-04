module.exports = function waiter(stored) {

        var pool = stored;

        async function login(userId) {
            const db = await pool.query('SELECT * FROM stuff WHERE user_name = $1', [userId]);
            if (db.rowCount === 0) {
                await pool.query('INSERT INTO stuff (user_name) values ($1)', [userId]);
            }
        }

        async function data(id, days) {
            const stuffId = await pool.query('SELECT id FROM stuff WHERE user_name = $1', [id]);
            for (let i = 0; i < days.length; i++) {
                var schedule = days[i];
                const weekdayId = await pool.query('SELECT id FROM weeks  WHERE week_day = $1', [schedule]);
                await pool.query('INSERT INTO adminData (user_id, weeks_id) values($1,$2)', [stuffId.rows[0].id, weekdayId.rows[0].id]);
            }
        }

        async function userData() {

            // filtered = await pool.query('SELECT stuff.user_name, weeks.week_day, adminData.user_id, adminData.weeks_id  
            //     FROM users, weeks, adminData WHERE adminData.user_id = '$stuff.user_name'
            //     AND adminData.weeks_id = '$weeks.week_day'
            //     ');

            // SELECT user_name FROM Customers
            // UNION ALL
            // SELECT City FROM Suppliers
            // ORDER BY City;




            //     return filtered.rows
            }


            return {
                login,
                data,
                userData,
            }
        }