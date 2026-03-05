document.querySelector('.btn11-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#slForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
   const correctAnswers = {
  q1: 'Use two pointers to maintain a window range',
  q2: 'Arrays or Strings',
  q3: 'O(n)',
  q4: 'Longest Substring Without Repeating Characters',
  q5: 'When constraint is violated',
  q6: 'Deque',
  q7: 'O(n)',
  q8: 'Variable window with frequency count',
  q9: 'O(n²)',
  q10: 'Frequency of required characters',
  q11: 'Two Pointer Technique',
  q12: 'When elements are negative and condition is sum-based',
  q13: 'Longest Substring Without Repeating Characters',
  q14: 'O(n)',
  q15: 'Problem involves contiguous subarrays/substrings'
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
      const response = await fetch("/submit-sl-quiz", {
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
