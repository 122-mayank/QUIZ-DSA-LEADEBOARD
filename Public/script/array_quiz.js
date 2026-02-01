document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector('#arrayQuizForm');

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
      q1: 'O(1)',
      q2: 'Set',
      q3: 'O(n + m)',
      q4: 'Balanced Binary Search Tree (Red-Black Tree)',
      q5: 'clear()',
      q6: 'Array',
      q7: 'O(1)',
      q8: '0',
      q9: 'Using Set',
      q10: 'Duplicates are ignored',
      q11: 'Insertion at end',
      q12: 'Number of unique elements',
      q13: '4',
      q14: 'insert()',
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
      const response = await fetch("/submit-array-quiz", {
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
