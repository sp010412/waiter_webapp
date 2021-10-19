module.exports = function (waiterInsta) {

    async function reset(req, res) {
        req.flash('infoIn', 'Database is successfully cleared!');
        await waiterInsta.clearTable();
        res.redirect('/');
    }



    return {
        reset,
    }


}