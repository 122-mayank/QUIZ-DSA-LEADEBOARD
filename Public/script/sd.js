document.querySelector('.btn17-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#sdForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
const correctAnswers = {
  q1: "Designing scalable and efficient systems",
  q2: "System can handle increasing number of users or requests",
  q3: "Load Balancing",
  q4: "Store frequently accessed data for faster retrieval",
  q5: "NoSQL",
  q6: "Splitting database into smaller pieces",
  q7: "Redis",
  q8: "Uneven distribution of traffic",
  q9: "Consistency, Availability, Partition Tolerance",
  q10: "Microservices Architecture",
  q11: "Faster content delivery using distributed servers",
  q12: "Independent deployment of services",
  q13: "Object Storage",
  q14: "Adding more servers",
  q15: "Asynchronous communication between services"
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
      const response = await fetch("/submit-sd-quiz", {
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
