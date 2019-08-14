const john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log(`Good ${timeOfDay}, ladies and gentlemen! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old.`);
        } else if (style === 'friendly') {
            console.log(`Hey! What's up? I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old. Have a nice ${timeOfDay}.`);
        }
    }
};

const emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');
john.presentation.call(emily, 'friendly', 'afternoon');
//john.presentation.apply(emily, ['friendly', 'afternoon']);

const johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');