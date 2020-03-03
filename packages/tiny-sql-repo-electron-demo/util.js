const { randomBytes } = require("crypto");

const randomString = (length = 16, enc = "hex") => randomBytes(length).toString(enc);

function* range(from, to) {
    while (from <= to) {
        yield from++;
    }
}
function rangeFrom(from, to) {
    return Array.from(range(from, to));
}
module.exports = {
    randomString,
    range,
    rangeFrom
}