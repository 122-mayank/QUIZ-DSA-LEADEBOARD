document.querySelector('.btn18-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#aptForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
const correctAnswers = {
  q1: "40",
  q2: "80 km/h",
  q3: "₹210",
  q4: "15 days",
  q5: "30",
  q6: "4% decrease",
  q7: "90",
  q8: "₹450",
  q9: "243",
  q10: "15 km/l",
  q11: "100",
  q12: "30",
  q13: "₹500",
  q14: "80",
  q15: "7.5°"
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
      const response = await fetch("/submit-apt-quiz", {
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
