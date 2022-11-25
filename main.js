function MyAwesomeSet(array = []) {
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
}

// ТЕСТЫ
let object;
let array;
let set;

let res;


// есть свойство size
array = [1, 2, 3, 4, 5];
set = MyAwesomeSet(array);
console.assert(set.size === array.length, 'size property');

// хранит только уникальные значения
array = [4, 4, 8, 15, 15, 16, 23, 42];
set = MyAwesomeSet(array);
console.assert(set.size === new Set(array).size, 'unique value');

// есть методы has, add, delete, clear
object = {};
array = [{}, object, 42, NaN, undefined];
set = MyAwesomeSet(array);

console.assert(set.has(23) === false, 'has not 23');
console.assert(set.has({}) === false, 'has not {}');

console.assert(set.has(42) === true, 'has 42');
console.assert(set.has(NaN) === true, 'has NaN');
console.assert(set.has(object) === true, 'has object');
console.assert(set.has(undefined) === true, 'has undefined');
set.add(NaN).add(undefined);
console.assert(set.size === array.length, 'add NaN & undefined');

set.add({});
array.push({});
console.assert(set.size === array.length, 'add {}');

res = set.delete(23);
console.assert(res === false, '23 is not deleted');
console.assert(set.size === array.length, 'same size after delete 23');

res = set.delete({});
console.assert(res === false, '{} is not deleted');
console.assert(set.size === array.length, 'same size after delete {}');

res = set.delete(42);
console.assert(res === true, '42 is deleted');
console.assert(set.has(42) === false, 'do not includes 42');

res = set.delete(object);
console.assert(res === true, 'object is deleted');
console.assert(set.has(object) === false, 'do not includes object');

res = set.delete(NaN);
console.assert(res === true, 'NaN is deleted');
console.assert(set.has(NaN) === false, 'do not includes NaN');

res = set.delete(undefined);
console.assert(res === true, 'undefined is deleted');
console.assert(set.has(undefined) === false, 'do not includes undefined');

set.clear();
console.assert(set.size === 0, 'empty after clear');

set.add(4).add(4).add(8).add(15).add(16).add(23).add(42).add(42);
console.assert(set.size === 6, 'add handels not unique values');

set.clear();
set.add({}).add({}).add({});
set.add(object).add(object).add(object).add(object).add(object);
console.assert(set.size === 4, 'add handels not unique refs');
