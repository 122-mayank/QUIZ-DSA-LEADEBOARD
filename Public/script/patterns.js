document.querySelector('.btn19-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#patternForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
const correctAnswers = {
  q1: "*\n**\n***",
  q2: "5",
  q3: "Nested loops",
  q4: "111222333",
  q5: "Square Pattern",
  q6: "***",
  q7: "Outer loop",
  q8: "Inner loop",
  q9: "Diamond",
  q10: "9 stars",
  q11: "Number Triangle",
  q12: "Reverse Triangle",
  q13: "Nested loops with spaces",
  q14: "i",
  q15: "***"
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
      const response = await fetch("/submit-pattern-quiz", {
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
