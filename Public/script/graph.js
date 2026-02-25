document.querySelector(".btn6-quiz").addEventListener("click",async(e)=>{

    e.preventDefault();

    const form = document.querySelector("#graphForm");

    const formData = new FormData(form);

    const quizData ={};

    formData.forEach((value,key)=>{
            quizData[key] = value;
    });

    const correctAnswers ={

        q1:'Acyclic Graph',
        q2:'Queue',
        q3:'Stack',
        q4:'n(n−1)/2',
        q5:'O(V + E)',
        q6:'Tree',
        q7:'Dijkstra',
        q8:'O(V²)',
        q9:'It can be colored using 2 colors',
        q10:'At least one topological ordering',
        q11:'Kosaraju',
        q12:'O(E log V)',
        q13:'Prim’s and Kruskal',
        q14:'Dijkstra',
        q15:'Directed Acyclic Graph'
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

        const response = await fetch('/submit-graph-quiz',{
                     
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