document.querySelector('.btn15-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#osForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
const correctAnswers = {
  q1: "Shortest Job First",
  q2: "Process synchronization",
  q3: "FIFO",
  q4: "Preemption",
  q5: "Time quantum",
  q6: "Excessive paging",
  q7: "SJF",
  q8: "Increase CPU utilization",
  q9: "Banker's Algorithm",
  q10: "Optimal",
  q11: "Resource management",
  q12: "Fixed Partitioning",
  q13: "Saving and loading process state",
  q14: "C-SCAN",
  q15: "Allow programs larger than physical memory"
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
      const response = await fetch("/submit-os-quiz", {
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
