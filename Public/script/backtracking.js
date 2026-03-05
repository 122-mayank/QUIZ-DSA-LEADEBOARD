document.querySelector('.btn8-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#backtrackingForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
   const correctAnswers = {
  q1: 'Try all possibilities and undo if not valid',
  q2: 'Decision and constraint satisfaction problems',
  q3: 'Binary Search',
  q4: 'O(n!)',
  q5: 'Remove the last choice and try another option',
  q6: 'Stack (recursion stack)',
  q7: 'When a number placement violates constraints',
  q8: 'When a valid solution is found',
  q9: 'Pure Brute Force',
  q10: 'Branch and Bound',
  q11: 'Wrong answers due to state pollution',
  q12: 'Fix one element and recursively permute the rest',
  q13: 'Stopping recursion when condition fails',
  q14: 'Subset Sum',
  q15: 'O(2^n)'
};
    let score = 0;


    const totalQuestions = Object.keys(correctAnswers).length;


    for (let key in correctAnswers) {
      if (quizData[key] === correctAnswers[key]) {
        score++;
      }
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    console.log(`Score: ${score}/${totalQuestions}`);
    console.log(`Percentage: ${percentage}%`);


    try {
      const response = await fetch("/submit-backtracking-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score,
          totalQuestions,
          percentage
        })
      });

      const result = await response.json();
      console.log(result.success);
      if (result.success) {

       if (result.guest) {
          alert(`Guest Mode 🎯\nYour Score: ${score}/${totalQuestions}`);
           return;
      }

      alert(`Quiz submitted! Your score: ${score}/${totalQuestions}`);
      window.location.href = '/profile';
}

      else {
        alert('Error submitting quiz');
      }

    } catch (error) {
      console.error("Error:", error);
    }

});
