export const listUnicityChecker = (list) => {
    // Use a Set to store unique language names
    const uniqueLanguages = new Set();

    // Use the some method to iterate over each object in the array
    const isLanguageRepeated = list.some(obj => {
    // If the language is already in the Set, return true to indicate repetition
    if (uniqueLanguages.has(obj.language)) {
        return true;
    } else {
        // Otherwise, add the language to the Set and continue iteration
        uniqueLanguages.add(obj.language);
        return false;
    }
    });
    return isLanguageRepeated
}