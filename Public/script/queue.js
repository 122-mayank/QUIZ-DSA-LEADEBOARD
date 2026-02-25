document.querySelector(".btn4-quiz").addEventListener("click",async(e)=>{

    e.preventDefault();

    const form = document.querySelector("#queueForm");

    const formData = new FormData(form);

    const quizData ={};

    formData.forEach((value,key)=>{
            quizData[key] = value;
    });

    const correctAnswers ={

        q1:'FIFO',
        q2:'enqueue()',
        q3:'dequeue()',
        q4:'Front',
        q5:'Rear',
        q6:'Queue',
        q7:'People standing in the line',
        q8:'Queue is empty and dequeue is performed',
        q9:'O(1)',
        q10:'rear == size - 1',
        q11:'Priority',
        q12:'O(n)',
        q13:'Avoids wasted space',
        q14:'Level Order Traversal',
        q15:'(rear + 1) % size == front'
    }

    let score = 0;

    const totalQuestions = Object.keys(correctAnswers).length;

    for(let key in correctAnswers){
        if(quizData[key] === correctAnswers[key]){
             score++;
        }
    }

    const percentage = Math.round((score / totalQuestions)*100);

    console.log(`Score : ${score}/${totalQuestions}`);
    console.log(`Percentage: ${percentage}`);

    try{

        const response = await fetch('/submit-queue-quiz',{
                     
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                score,
                totalQuestions,
                percentage
            })
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
        else{
             alert('Error submitting quiz');
        }

    }catch(error){
        console.log(error);

    }
});