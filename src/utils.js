import { checkForCode } from "./databases/link";

const URLSafeArray =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890$-_.+!*'()";

/**
 * Creates a code within the range specificed.
 * @param {*} min
 * @param {*} max
 * @returns
 */
export async function createUniqueLink(min, max) {
  const length = Math.floor(Math.random() * (max - min) + 1) + min;
  let result = "";
  for (var i = 0; i < length; i++) {
    const code = URLSafeArray.charAt(
      Math.floor(Math.random() * URLSafeArray.length)
    );
    result += code;
  }

  let exists = await checkForCode(result);
  if (exists) {
    console.log(
      "Code already exists within the database. Generating new code."
    );
    return createUniqueLink(min, max);
  }
  return result;
}

/**
 * Verifies a given url.
 *
 * @param {string} url - The url to verify.
 * @returns {bool} Verification result
 */
export function verifyURL(url) {
  let urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return urlRegex.test(url) && new URL(url) ? true : false;
}
