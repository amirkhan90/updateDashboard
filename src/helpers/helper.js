export const removeHypen = (str) => {
  if (str) {
    let newStr = str.replace(/_/, " ");
    return newStr;
  }
};
