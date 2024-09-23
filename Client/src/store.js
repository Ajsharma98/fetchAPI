import { writable, get } from 'svelte/store';
import {jwtDecode} from 'jwt-decode';

// Define stores
export const page = writable(1);
export const limit = writable(10);
export const totalPages = writable(1);
export const displayedData = writable([]);
export const password = writable('');
export const userRole = writable(''); // Store to hold the user's role (admin/user)

// Password validation function
export const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUppercase) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowercase) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!hasDigit) {
        return "Password must contain at least one digit.";
    }
    if (!hasSpecialChar) {
        return "Password must contain at least one special character.";
    }

    return ""; // Return an empty string if the password is valid
};

// Function to extract role from JWT token and store it
export const setRoleFromToken = () => {
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage
    if (token) {
        try {
            const decodedToken = jwtDecode(token) ; // Decode the token
            console.log('Decoded token:', decodedToken); // Log entire token payload
            
            // Extract the role from the decoded token
            const role = decodedToken.role;

            // Set role in store
            userRole.set(role); 
            console.log('User role:', role); // Log role
        } catch (error) {
            console.error('Error decoding token:', error);
            userRole.set(''); // Clear role on error
        }
    } else {
        userRole.set(''); // Clear role if no token
    }
};

// Fetch data function
export const fetchData = async () => {
    try {
        const page_num = get(page);
        const limit_val = get(limit);
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage

        if (!token) {
            console.error('No token found, unauthorized access');
            return;
        }

        const response = await fetch(`http://localhost:4000/books?page=${page_num}&limit=${limit_val}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT token in the Authorization header
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Fetched data:', data);
            displayedData.set(data.books);
            totalPages.set(data.totalPages);
        } else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
};
