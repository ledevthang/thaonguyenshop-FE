export const objectToQueryString = (obj: any) => {
  const keys = Object.keys(obj);
  const keyValuePairs = keys.map((key) => {
    if (Array.isArray(obj[key])) {
      return obj[key]
        .map((item: any) => {
          return encodeURIComponent(key) + "=" + encodeURIComponent(item);
        })
        .join("&");
    }
    return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
  });
  return keyValuePairs.join("&");
};

export const objectToQueryStringByComma = (obj: any) => {
  const keys = Object.keys(obj);
  const keyValuePairs = keys.map((key) => {
    if (Array.isArray(obj[key]) && obj[key].length === 0) return;
    return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
  });
  return keyValuePairs.join("&");
};
