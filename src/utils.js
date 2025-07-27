
const URLSafeArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890$-_.+!*'()";

/**
 * Creates a code within the range specificed.
 * @param {*} min 
 * @param {*} max 
 * @returns
 */
function createUniqueLink(min, max) {
    const length = Math.floor(Math.random() * (max - min) + 1) + min;
    let result = '';
    for(var i = 0; i < length; i++) {
        const code = URLSafeArray.charAt(Math.floor(Math.random() * URLSafeArray.length));
        result += code;
    }
    return result;
}