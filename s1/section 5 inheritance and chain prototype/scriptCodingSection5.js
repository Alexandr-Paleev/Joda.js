(function() {
    let Question = function(question, arrayAnswer, trueAnsver) {
        this.question = question;
        this.arrayAnswer = arrayAnswer;
        this.trueAnsver = trueAnsver;
    }
    
    Question.prototype.showQuest = function() {
        console.log(this.question);
        this.arrayAnswer.forEach((item, index) => console.log(index, item));
    }

    Question.prototype.checkAnswer = function(answer) {
        let score = 0;    
        if (answer === 7) {
            total();
        } else if (answer === this.trueAnsver) {
            score++;
            alert('Yes, correct answer! :)');
            nextQuestion();
        } else {
            alert('No correct! :(');
            nextQuestion();
        }

        function total() {
            alert(`score: ${score}`);
        }
    }
    
    // const dataQue = [
    //     {
    //         'Which of these is a programming language?', 
    //         ['CSS', 'HTML', 'JavaScript'], 
    //         2
    //     },

    // ]

// const qqqqs = (dataQue) => {
    

//     let cat2 = dataQue.map(() => {
//         cat2.push(new Question())
//     })

//     return cat2;
// }

    let q1 = new Question('Which of these is a programming language?', ['CSS', 'HTML', 'JavaScript'], 2);
    let q2 = new Question('Bill gates is astronaut?', ['true', 'false'], 1);
    let q3 = new Question('Country in Europe?', ['Ukraine', 'USA', 'Japan', 'Iran'], 0);
    
    const questions = [q1, q2, q3];


    function nextQuestion() {
    
        let n = Math.floor(Math.random() * questions.length);
        
        questions[n].showQuest();

        let answer = +prompt('Enter number answer!', '0');

        questions[n].checkAnswer(answer);

        nextQuestion();
    }
    nextQuestion();
})();