document.addEventListener("DOMContentLoaded", () => {

  const scoreText = document.getElementById('high-score').textContent;
  const [score, total] = scoreText.split('/').map(Number);

  const percent = total === 0 ? 0 : Math.round((score / total) * 100);

  const ctx = document.getElementById('progressCircle');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [percent, 100 - percent],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '75%',
      plugins: {
        legend: { display: false }
      }
    }
  });

});
