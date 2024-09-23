<script>
  import { Router, Route, navigate } from 'svelte-routing';
  import Register from './lib/Components/SignUp.svelte';
  import SignIn from './lib/Components/signIn.svelte';
  import BookList from './lib/Components/BookList.svelte';
  import AddBookForm from './lib/Components/AddBookForm.svelte';
  import Logout from './lib/Components/logout.svelte';

  let userRole = ''; // This will hold the role of the user (e.g., 'admin' or 'user')

  // Check if the user is logged in and retrieve their role from the JWT token or localStorage
  function checkUserRole() {
    const token = localStorage.getItem('jwtToken'); // Assuming the JWT token is stored in localStorage
    if (token) {
      try {
        // Decode JWT to get the role (This assumes the role is part of the JWT payload)
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the JWT
        userRole = decodedToken.role; // Assuming the role is stored in the 'role' field
      } catch (error) {
        console.error('Error decoding token:', error);
        userRole = ''; // Set to empty string in case of error
      }
    }
  }

  // Call the function on component load to get the role
  checkUserRole();
  
  // A helper function to check if the user has admin rights
  function isAdmin() {
    return userRole === 'admin';
  }

  // Protect admin routes and redirect if necessary
  function protectAdminRoute() {
    if (!isAdmin()) {
      alert("Access denied. Admins only.");
      navigate('/login');
    }
  }
</script>

<Router>
  <div>
    <Route path="/booklist" component={BookList} />
    <Route path="/login" component={SignIn} />
    <Route path="/logout" component={Logout} />
    <Route path="/register" component={Register} />

    <!-- Admin Route for adding books -->
    <Route path="/add" component={AddBookForm} on:route={protectAdminRoute} />
  </div>
</Router>




