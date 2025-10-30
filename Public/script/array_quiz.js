document.querySelector('.btn-quiz').addEventListener('click',async(e)=>{
 e.preventDefault();

const form = document.querySelector('#arrayQuizForm');

const formData = new FormData(form);

const quizdata={};
formData.forEach((value,key)=>{
     quizdata[key]= value;
});

console.log("Collected Quiz Data:", quizdata);


  const correctAnswers = {
    q1: 'O(1)',
    q2: 'Set',
    q3: 'O(n + m)',
    q4: 'Balanced Binary Search Tree (Red-Black Tree)',
    q5: 'clear()',
    q6: 'Array',
    q7: 'O(1)',
    q8: '0',
    q9: 'Using Set',
    q10: 'Duplicates are ignored',
    q11: 'Insertion at end',
    q12: 'Number of unique elements',
    q13: '4',
    q14: 'insert()',
    q15: 'O(n)'
  };

let score = 0;
// const useranswer =[];
for(let key in correctAnswers){

     const userAnswer = quizdata[key] || "Not answered";
    const correct = correctAnswers[key];
    const isCorrect = userAnswer === correct;
    if (isCorrect) score++;
}

console.log(`the score of the user is ${score}`);

try{

    const response = await fetch("/submit-array-quiz",{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({score})
    });

    const result = await response.json();
    if(result.success){
         alert('Your quiz is submitted Succesfully!');
         localStorage.setItem("score",result.score);
         window.location.href = '/profile';
         return;
    }
    else{
        alert('Error submitting quiz');
        return;
    }

}
catch(eror){
        console.log("Error: ",error);
}



});