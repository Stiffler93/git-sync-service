
function encode(string) {
    return Buffer.from(string).toString('base64');
}

function decode(string) {
    return Buffer.from(string, 'base64').toString('ascii');
}

module.exports.encode = encode;
module.exports.decode = decode;