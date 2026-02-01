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
         q12: 'Flyod Cycle Detection',
         q13: 'O(n)',
         q14: 'No random access',
         q15: 'Doubly'

    };

    let score = 0;

    const totalQuestions = Object.keys(correctAnswers).length;


    for(let key in correctAnswers){

       if(quizdata[key] == correctAnswers[key]){
        score++;
       }

    }

    const percentage = Math.round((score / totalQuestions) * 100 );
    console.log(`Score: ${score}/${totalQuestions}`);
    console.log(`Percentage: ${percentage}%`);


    try{

         const response = await fetch("/submit-linked-list-quiz" , {

             method :"POST",
             headers :{"Content-Type" : "application/json"},
             body : JSON.stringify({score , totalQuestions , percentage})

         });


         const result = await response.json();

         if(result.success){

              if(result.guest){
                 alert(`Guest Mode 🎯\nYour Score: ${score}/${totalQuestions}`);
                  return;
              }

              alert(`Quiz submitted! Your score: ${score}/${totalQuestions}`);
              window.location.href = '/profile';
         }
     else {
        alert('Error submitting quiz');
      }

    }catch(error){
        console.error("Error:", error);
    }

});