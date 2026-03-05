document.querySelector('.btn12-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#hashForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
const correctAnswers = {
  q1: 'O(1)',
  q2: 'Two keys map to same index',
  q3: 'Chaining',
  q4: 'Linear Probing',
  q5: 'O(n)',
  q6: 'Linked List',
  q7: 'n / table size',
  q8: 'Load factor exceeds threshold',
  q9: 'Two Sum',
  q10: 'O(n)',
  q11: 'Uniform distribution',
  q12: 'Double Hashing',
  q13: 'O(n)',
  q14: 'LinkedHashMap',
  q15: 'O(n)'
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
      const response = await fetch("/submit-hash-quiz", {
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
