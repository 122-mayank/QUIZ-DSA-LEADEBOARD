document.querySelector('.btn20-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#csForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
const correctAnswers = {
  q1: "Central Processing Unit",
  q2: "Queue",
  q3: "Stack",
  q4: "Random Access Memory",
  q5: "Kernel",
  q6: "HTTP",
  q7: "Machine Language",
  q8: "O(log n)",
  q9: "Relational Model",
  q10: "Primary Key",
  q11: "Router",
  q12: "Inheritance",
  q13: "CPU",
  q14: "ROM",
  q15: "Round Robin"
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
      const response = await fetch("/submit-cs-quiz", {
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
