const simplifyObject = function (object, keysArray) {
    const result = {};
    if (!object) {
        return null;
    }
    keysArray.forEach(key => {
        if (object[key]) {
            result[key] = object[key];
        }
    });
    return result;
};

export { simplifyObject };
