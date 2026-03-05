document.querySelector('.btn9-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#dpForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
    const correctAnswers = {
  q1: 'Breaking problem into subproblems',
  q2: 'Both overlapping subproblems & optimal substructure',
  q3: 'Time complexity reduces',
  q4: 'Fibonacci',
  q5: 'Optimal substructure',
  q6: 'Top-down approach',
  q7: 'Bottom-up approach',
  q8: 'O(n)',
  q9: 'O(n²)',
  q10: '0/1 Knapsack',
  q11: 'O(n)',
  q12: 'All of the above',
  q13: 'T(n) = T(n-1) + T(n-2)',
  q14: 'Coin Change',
  q15: 'It finds minimum operations'
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
      const response = await fetch("/submit-dp-quiz", {
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
