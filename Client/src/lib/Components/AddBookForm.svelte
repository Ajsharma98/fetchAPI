<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { fetchData, userRole, setRoleFromToken } from "../../store"; // Import userRole store

    const dispatch = createEventDispatcher();

    let newEntry = {
        id: "",
        title: "",
        subjects: "",
        bookshelves: "",
        language: "",
    };

    let successMessage = "";
    let errorMessage = "";

    // Call setRoleFromToken on component mount
    onMount(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setRoleFromToken(); // Set the role based on the token
        }
    });

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        successMessage = ""; // Reset success message
        errorMessage = ""; // Reset error message

        const token = localStorage.getItem('jwtToken'); // Ensure the key matches what's used in the login function

        try {
            const response = await fetch("http://localhost:4000/books/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Include Bearer prefix for JWT
                },
                body: JSON.stringify(newEntry),
            });

            const result = await response.json(); // Handle JSON response

            if (response.ok) {
                fetchData(); // Refresh data after successful submission
                successMessage = "Entry added successfully";
                
                // Clear the form fields
                newEntry = {
                    id: "",
                    title: "",
                    subjects: "",
                    bookshelves: "",
                    language: "",
                };
                dispatch('success', { detail: "Book added successfully" });
            } else {
                errorMessage = result.message || "Error while submitting data";
            }
        } catch (error) {
            console.error("Error while submitting data:", error);
            errorMessage = "Error while submitting data";
        }
    };
</script>

<!-- Conditionally render the form based on the user role -->
{#if $userRole === 'admin'}
    <form on:submit={handleSubmit}>
        <label for="id">id:</label>
        <input id="id" bind:value={newEntry.id} required />

        <label for="title">Title:</label>
        <input id="title" bind:value={newEntry.title} required />

        <label for="subjects">Subjects:</label>
        <input id="subjects" bind:value={newEntry.subjects} required />

        <label for="bookshelves">Bookshelves:</label>
        <input id="bookshelves" bind:value={newEntry.bookshelves} required />

        <label for="language">Language:</label>
        <input id="language" bind:value={newEntry.language} required>
           
        <button type="submit">Add Book</button>

        {#if successMessage}
            <p class="success">{successMessage}</p>
        {/if}

        {#if errorMessage}
            <p class="error">{errorMessage}</p>
        {/if}
    </form>
{:else}
    <p class="unauthorized">You are not authorized to add books.</p>
{/if}

<style>
    button {
        width: 100%;
        padding: 10px;
        background-color: #4a90e2;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 10px;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #357abd;
    }
</style>
