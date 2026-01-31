document.querySelector('.login-btn').addEventListener('click', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('⚠️ Please enter both email and password!');
    return;
  }

  try {
    const response = await fetch('/submit_login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (result.success) {
      window.location.href = '/';
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }
});
