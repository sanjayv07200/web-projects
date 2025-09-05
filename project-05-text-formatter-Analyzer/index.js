const str =
  "    Welcome  to  the   JavaScript   World!!!   Learn, Learn, Learn, Learn,  Code,  Build.  ";

const formatWord = function (word) {
  return word
    .split("")
    .filter(function (ch) {
      const charcode = ch.toLowerCase().charCodeAt(0);
      return charcode >= 97 && charcode <= 122;
    })
    .join("");
};

const newStr = str
  .trim()
  .split(" ")
  .filter(function (ele) {
    return ele !== "";
  })
  .map(function (word) {
    return formatWord(word);
  })
  .join(" ");

const wordCount = newStr.split(" ").length;
const uniqueWord = new Set(newStr.split(" ")).size;
const totalCharacter = newStr.replaceAll(" ", "").length;
const includeJavascript = newStr.includes("JavaScript");
const sentenceCase = newStr
  .split("")
  .map(function (ch, i) {
    if (i == 0) return ch.toUpperCase();
    else return ch.toLowerCase();
  })
  .join("");

const titleCase = newStr
  .split(" ")
  .map(function (word) {
    return word
      .split("")
      .map(function (ch, i) {
        if (i == 0) return ch.toUpperCase();
        else return ch.toLowerCase();
      })
      .join("");
  })
  .join(" ");

console.log(`
-----------------------------------------
        TEXT FORMATTER & ANALYZER
-----------------------------------------
Original Text:
"${str}"

Cleaned Text:
"${newStr}"

Statistics:
- Total Words: ${wordCount}
- Unique Words: ${uniqueWord}
- Total Characters (No Spaces): ${totalCharacter}
- Does it include 'JavaScript'? ${includeJavascript}
- Sentence Case: ${sentenceCase} 
- Title Case: ${titleCase}`);
