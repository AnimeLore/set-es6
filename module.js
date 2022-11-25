module.exports = function (array = []) {
    let setArray = [];
    if (array) {
        setArray = [];
        for (let i = 0; i < array.length; i++) {
            if (!setArray.includes(array[i])) {
                setArray.push(array[i]);
            }
        }
    }
    return {
        has(x) {
            return setArray.includes(x);
        },
        add(x) {
            if (!setArray.includes(x)) {
                setArray.push(x);
            }
            return this;
        },
        delete(x) {
            if (setArray.includes(x)) {
                if (Number.isNaN(x)) {
                    setArray.splice(setArray.findIndex(Number.isNaN), 1);
                    return true;
                }
                setArray.splice(setArray.indexOf(x), 1);
                return true;
            }
            return false;
        },
        clear() {
            setArray = [];
            return this;
        },
        get size() {
            return setArray.length;
        }
    };
};
