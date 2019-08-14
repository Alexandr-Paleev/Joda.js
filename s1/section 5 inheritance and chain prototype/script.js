/*
const Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype = {
    calculateAge : function() {
        console.log(2016 - this.yearOfBirth);
    },
    chowJob : function() {
        console.log(`JOB: ${this.job}`);
    }
}

Person.prototype.fullName = function() {
    console.log(`${this.name} Ivanova`);
}

let john = new Person('John', 1990, 'teacher');
let julya = new Person('Julya', 1980, 'designer');

julya.prototype = Object

john.calculateAge();
julya.calculateAge();
john.chowJob();
julya.chowJob();

john.fullName();
julya.fullName();
*/

/*
let personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBerth);
    }
};

let john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'ticher';

let julya = Object.create(personProto, {
    name: {value: 'Julya'},
    yearOfBirth: {value: 1986},
    job: { value: 'designer'}
});
*/
//Primitives
let a = 26;
let b = a;
a = 47;
console.log(a);
console.log(b);
//Objects
let obj1 = {
    name: 'John',
    age: 20
};

let obj2 = obj1;
obj1.age = 45;

console.log(obj1.age);
console.log(obj2.age);
//Functions
let age = 27;
let obj = {
    name: 'John',
    city: 'Lissabon'
};

function change(a, b) {
    a = 35;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj.city);

