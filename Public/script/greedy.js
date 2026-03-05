document.querySelector('.btn10-quiz').addEventListener( "click", async(e) => {
  e.preventDefault();

  const form = document.querySelector('#greedyForm');

    const formData = new FormData(form);

    const quizData = {};
    formData.forEach((value, key) => {
      quizData[key] = value;
    });

    console.log("Collected Quiz Data:", quizData);


    // ✅ correct answers
   const correctAnswers = {
  q1: 'Make locally optimal choice at each step',
  q2: 'Both Optimal Substructure & Greedy Choice Property',
  q3: 'Activity Selection',
  q4: 'Ending time',
  q5: 'Greedy based on value/weight ratio',
  q6: 'Greedy choice may not give global optimum',
  q7: 'O(n log n)',
  q8: 'Lowest frequency first',
  q9: 'Priority Queue (Min Heap)',
  q10: 'Greedy Algorithm',
  q11: 'O((V + E) log V)',
  q12: 'Coin Change (for standard denominations)',
  q13: 'No greedy choice property',
  q14: 'Minimum Spanning Tree',
  q15: 'Disjoint Set (Union-Find)'
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
      const response = await fetch("/submit--quiz", {
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
