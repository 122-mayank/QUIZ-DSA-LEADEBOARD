document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("progressCircle");

  const percent = parseInt(canvas.dataset.percent) || 0;

  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [percent, 100 - percent],
        backgroundColor: ["#6b46c1", "#e9d5ff"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "75%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

});
