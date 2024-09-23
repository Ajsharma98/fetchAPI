<script>
  import { navigate } from "svelte-routing";
  import { userRole } from "../../store"; // Import userRole store
  let email = "";
  let password = "";
  let errorMessage = "";
  let successMessage = "";
  let isAuthenticated = false;
  let user = "";

  const signIn = async () => {
      if (!email || !password) {
          errorMessage = "Email and Password are required.";
          return;
      }

      try {
          const response = await fetch("http://localhost:4000/users/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
          });

          const result = await response.json();

          if (response.ok) {
              // Store JWT token and user role in local storage
              localStorage.setItem('jwtToken', result.token); 
              localStorage.setItem('userRole', result.role); // Store the role in local storage

              // Set role in store for access throughout the app
              userRole.set(result.role);

              successMessage = "Login successful!";
              isAuthenticated = true;
              user = email; // Fix: directly assign the email string

              // Conditionally navigate based on role
              if (result.role === 'admin') {
                  navigate("/admin"); // Redirect admin to admin page
              } else {
                  navigate("/booklist"); // Redirect users to book list
              }
          } else {
              errorMessage = result.message || "Sign-in failed. Please check your credentials.";
          }
      } catch (error) {
          errorMessage = "Sign-in failed. Please try again later.";
          console.error(error);
      }
  };

  const handleSignup = () => {
      navigate('/register');
  };
</script>

<div class="container">
  <h2>Login</h2>
  <input type="email" placeholder="Email" bind:value={email} />
  <input type="password" placeholder="Password" bind:value={password} />
  <div class="btn1Container">
      <button class="btn1" on:click={signIn}>Login</button>
  </div>
  <div class="btn2">
      <button class="btn2" on:click={handleSignup}>Register</button>
  </div>
  {#if successMessage}
      <p class="success">{successMessage}</p>
  {/if}
  {#if errorMessage}
      <p class="error">{errorMessage}</p>
  {/if}
</div>

<style>
  /* Same styles as before */
  .container {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  .btn1Container {
    margin-top: 1rem;
  }

  .btn1 {
    width: 100%;
    padding: 12px;
    background: linear-gradient(45deg, #007bff, #0056b3);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
  }

  .btn1:hover {
    background: linear-gradient(45deg, #0056b3, #003d7a);
    transform: scale(1.05);
  }

  .btn1:active {
    transform: scale(0.98);
  }

  .btn2 {
    text-align: center;
    margin-top: 1rem;
  }

  .btn2 button {
    padding: 12px;
    font-size: 16px;
    border: 2px solid #0056b3;
    background-color: white;
    color: #0056b3;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
  }

  .btn2 button:hover {
    background-color: #0056b3;
    color: white;
  }

  .success {
      color: green;
      text-align: center;
      margin-top: 1rem;
  }

  .error {
      color: red;
      text-align: center;
      margin-top: 1rem;
  }
</style>
