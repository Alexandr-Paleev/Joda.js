const yearBerth = [1990, 1986, 1974, 2007, 1967];

function arrCalc(arr, fn) {
    solutionArr = [];
    for(let i = 0; i < arr.length; i++) {
        solutionArr.push(fn(arr[i]));
    }
    return solutionArr;
}

function calculateAge(el) {
    return 2019 - el;
}

function fullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if(el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}

let result = arrCalc(yearBerth, calculateAge);
let fullAges = arrCalc(result, fullAge);
let heartRate = arrCalc(result, maxHeartRate);
console.log(result);
console.log(heartRate);