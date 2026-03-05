document.querySelector('.btn13-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#oopsForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
const correctAnswers = {
  q1: 'Encapsulation',
  q2: 'Initialize object data members',
  q3: 'Multiple',
  q4: 'Using virtual inheritance',
  q5: 'Method Overriding',
  q6: 'final',
  q7: 'Function without body',
  q8: 'It becomes abstract class',
  q9: 'Inheritance',
  q10: 'Same function name with different parameters',
  q11: 'private',
  q12: 'Copying derived object to base object',
  q13: 'virtual keyword',
  q14: 'Abstraction',
  q15: 'Polymorphism'
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
      const response = await fetch("/submit-oops-quiz", {
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
