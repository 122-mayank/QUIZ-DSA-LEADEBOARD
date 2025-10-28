document.querySelector('.signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();


  // Basic validation

  if(!email || !name || !password){
      alert('⚠️ Please fill all the details!');
      return;
  }

  try{

     const response = await fetch('/submit-sign-up',{

        method:"POST",
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({FullName:name , Email:email , Password:password})
     });

     const result = await response.json();
     if(result.success){
         alert(result.message);
         window.location.href='/login';
     }
     else{
         alert(result.message); // show alert with backend message
     }
  }
  catch(error){
     console.error("Signup error:", error);
    alert("Something went wrong. Please try again.");
  }


});
