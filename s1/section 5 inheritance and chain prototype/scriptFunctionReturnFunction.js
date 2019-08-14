function enterQuestion(job) {
    return (name) => {
        if (job === 'teacher') {
            console.log(`${name}, what are you teach?`);
        } else if (job === 'designer') {
            console.log(`${name}, can you please explain what UX design is?`);
        } else {
            console.log(`What do you do? ${name}`);
        }
    }
}

const teacherQuestion = enterQuestion('teacher');
const designerQuestion = enterQuestion('designer');

teacherQuestion('John');
designerQuestion('John');
designerQuestion('Mark');
enterQuestion('designer')('Julya');