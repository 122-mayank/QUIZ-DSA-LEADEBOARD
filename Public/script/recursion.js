document.querySelector('.btn7-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#recursionForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
    const correctAnswers = {
  q1: 'A function calling itself',
  q2: 'Base Case',
  q3: 'Infinite recursion → Stack overflow',
  q4: '3 2 1',
  q5: 'O(n)',
  q6: 'Recursive call at end',
  q7: 'All of the above',
  q8: 'O(n)',
  q9: 'Recursive Call',
  q10: 'Function calls another function which calls first function',
  q11: 'DFS',
  q12: 'T(n) = T(n/2) + O(1)',
  q13: 'Stack Size',
  q14: 'Memoization',
  q15: 'All of above'
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
      const response = await fetch("/submit-recursion-quiz", {
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
