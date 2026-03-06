document.querySelector('.btn16-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#cnForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
const correctAnswers = {
  q1: "Network Layer",
  q2: "Provide reliable communication",
  q3: "DNS",
  q4: "Switch",
  q5: "Maps IP address to MAC address",
  q6: "Star",
  q7: "SMTP",
  q8: "Presentation Layer",
  q9: "Forward packets between networks",
  q10: "HTTPS",
  q11: "80",
  q12: "CSMA/CD",
  q13: "Network Address Translation",
  q14: "DHCP",
  q15: "Transport Layer"
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
      const response = await fetch("/submit-cn-quiz", {
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
