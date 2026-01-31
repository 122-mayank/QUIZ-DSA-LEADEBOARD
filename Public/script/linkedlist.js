document.querySelector('.btn2-quiz').addEventListener("click",async(e)=>{

    e.preventDefault();

    const form = document.querySelector('#linkedlistForm');

    const formData = new FormData(form);

    const quizdata = {};
    formData.forEach((value , key)=>{
          quizdata[key] = value;
    });

    console.log("Collected Quiz Data: ",quizdata);

    const correctAnswers = {

         q1: 'Dynamic size',
         q2: 'Data + pointer to next node',
         q3: 'O(1)',
         q4: 'O(n)',
         q5: 'head',
         q6: 'List is Empty',
         q7: 'Doubly Linked List',
         q8: 'O(n)',
         q9: 'Implement Binary Search',
         q10: 'O(n)',
         q11: 'O(n)',
         q12: 'Floyd Cycle Detection',
         q13: 'O(n)',
         q14: 'No random access',
         q15: 'Doubly'

    };

    let score = 0;
    let totalquestion = 15;

    for(let key in correctAnswers){

        const userAnswer = quizdata[key] || "Not answered";
        const correct = correctAnswers[key];
        const isCorrect = userAnswer === correct;

        if(isCorrect)
            score = score + 1;

    }

    console.log(`the score of the user is ${score}`);
    





});