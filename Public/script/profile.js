document.addEventListener("DOMContentLoaded",()=>{

    const username = localStorage.getItem("loggedUser");
    const score = localStorage.getItem("score");
    if(username){
         document.querySelector('.username').textContent=username;
         document.querySelector('#high-score').textContent=`${score}/15`;
        //  document.querySelector('#quiz-taken').textContent=
    }
    else{
        document.querySelector('.username').textContent='Guest User';
        document.querySelector('.progress-text').textContent='0%';
        document.querySelector('#quiz-taken').textContent='0';
        document.querySelector('#high-score').textContent='0/0';
    }
});
document.querySelector('.btn').addEventListener('click',()=>{

    localStorage.removeItem("loggedUser");

});

