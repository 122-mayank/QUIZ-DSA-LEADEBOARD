document.querySelector(".btn5-quiz").addEventListener("click",async(e)=>{

    e.preventDefault();

    const form = document.querySelector("#treeForm");

    const formData = new FormData(form);

    const quizData ={};

    formData.forEach((value,key)=>{
            quizData[key] = value;
    });

    const correctAnswers ={

        q1:'2^l',
        q2:'At leaf position',
        q3:'O(logn)',
        q4:'All levels are filled except possibly last, filled from left',
        q5:'Every node has 0 or 2 children',
        q6:'InOrder',
        q7:'1',
        q8:'PostOrder',
        q9:'O(log n)',
        q10:'Yes, uniquely',
        q11:'Height(left) − Height(right)',
        q12:'2L-1',
        q13:'5',
        q14:'Tree',
        q15:'All of above'
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

        const response = await fetch('/submit-tree-quiz',{
                     
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