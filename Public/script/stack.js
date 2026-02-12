document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector('#stackForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
    const correctAnswers = {
      q1: 'LIFO',
      q2: 'push()',
      q3: 'pop()',
      q4: 'O(1)',
      q5: 'Underflow',
      q6: 'Stack',
      q7: 'All of the above',
      q8: 'top == size - 1',
      q9: 'O(n)',
      q10: 'Stack',
      q11: '40',
      q12: 'Next Greater Element',
      q13: '2',
      q14: 'Stack',
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
      const response = await fetch("/submit-stack-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score,
          totalQuestions,
          percentage
        })
      });

      const result = await response.json();

      if (result.success) {

  // 🟡 Guest user
  if (result.guest) {
    alert(`Guest Mode 🎯\nYour Score: ${score}/${totalQuestions}`);
    return;
  }

  // 🟢 Logged-in user
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

});
