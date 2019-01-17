// obj, ['a','b','c']
// obj, 'a.b.c'
// obj, ['a.b.c']
function checkNestedCore(obj, pathArr) {
    pathArr = extractPath(pathArr);

    for (let i in pathArr) {
        if (pathArr.hasOwnProperty(i)) {
            if ( !(
                    (Array.isArray(obj) && obj.indexOf(pathArr[i]) !== -1) ||
                    (obj && (obj.hasOwnProperty(pathArr[i]) || pathArr[i] in obj) )
                )
            ) {
                return false;
            }
            obj = obj[pathArr[i]];
        }
    }
    return true;
}

function checkNested(obj, ...args/*, level1, level2, ... levelN*/) {
    return checkNestedCore(obj, args);
}

// obj, ['a','b','c']
// obj, 'a.b.c'
// obj, ['a.b.c']
function getNestedCore(obj, pathArr) {
    pathArr = extractPath(pathArr);

    for (let i in pathArr) {
        if (pathArr.hasOwnProperty(i)) {
            if ( !(
                    (Array.isArray(obj) && obj.indexOf(pathArr[i]) !== -1) ||
                    (obj && (obj.hasOwnProperty(pathArr[i]) || pathArr[i] in obj))
                 )
            ) {
                return undefined;
            }
            obj = obj[pathArr[i]];
        }
    }
    return obj;
}

// obj, 'a', 'b', 'c'
function getNested(obj, ...args /*, level1, level2, ... levelN*/) {
    return getNestedCore(obj, args);
}

function getValue(defVal, obj, ...args /*obj , level1, level2, ... levelN*/) {
    let nestedVal = getNested(obj, ...args);
    return typeof nestedVal !== 'undefined' ? nestedVal : defVal;
}

function setNested(obj, pathArr, value) {
    pathArr = extractPath(pathArr);
    let isFound = checkNested(obj, pathArr);
    let lastPath = pathArr.pop();
    let closestEl = getNested(obj, pathArr);
    if (isFound) {
        closestEl[lastPath] = value;
        return true;
    }else {
        return false;
    }
}

function extractPath(pathArr) {
    if (Array.isArray(pathArr) && pathArr.length === 1) {
        pathArr = pathArr[0];
    }
    if (typeof pathArr === 'string') {
        // extract an array from keypath //Ex: 'a.b.c' will be ['a','b','c']
        pathArr = pathArr.split('.');
    }
    return pathArr;
}

// http://jsperf.com/cloning-an-object/79
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    let target = obj instanceof Array ? [] : {};
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            target[i] = deepCopy(obj[i]);
        }
    }
    return target;
 }

module.exports = {
    checkNestedCore,
    checkNested,
    getNestedCore,
    getValue,
    setNested,
    extractPath,
    deepCopy
}