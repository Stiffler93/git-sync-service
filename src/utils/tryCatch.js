
function tc(t, c, rethrow = true) {
    try {
        t();
    } catch (e) {
        c(e);
        if (rethrow) throw e;
    }
}


module.exports.tc = tc;