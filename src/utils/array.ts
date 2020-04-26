export const arrayCompare = (array1: Array<string | number>, array2: Array<string | number>) =>
    array1.length === array2.length && array1.every((value, index) => value === array2[index])
