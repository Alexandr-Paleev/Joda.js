(function() {
    let score = Math.random() * 10;
    console.log(score >= 5);
})();

(function(number) {
    let score = Math.random() * 10;
    console.log(score >= 5 - number);
})(5);