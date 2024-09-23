<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing"; // Import navigate from svelte-routing
    import { displayedData, fetchData, userRole, setRoleFromToken } from "../../store"; // Import userRole store
    import Logout from "../Components/logout.svelte";
    import Pagination from "../Components/pagination.svelte";
    import AddBookForm from "./AddBookForm.svelte";

    function handleLogout() {
        localStorage.removeItem('sessionId');
        navigate('/login'); // Use navigate to redirect
    }

    onMount(() => {
        setRoleFromToken();  // Fetch the user role when the component mounts
        fetchData();   // Fetch book data
    });
</script>

<!-- Conditionally render the AddBookForm only if the user has the 'admin' role -->
{#if $userRole === 'admin'}
    <AddBookForm />
{/if}

<table class="book-table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Subjects</th>
            <th>Bookshelves</th>
            <th>Languages</th>
        </tr>
    </thead>
    <tbody>
        {#each $displayedData as book}
            <tr>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.subjects}</td>
                <td>{book.bookshelves}</td>
                <td>{book.language}</td>
            </tr>
        {/each}
    </tbody>
</table>

<Logout />
<Pagination />

<style>
    /* Styles remain unchanged */
    .book-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 16px;
        text-align: left;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    /* Table Headers */
    .book-table thead th {
        background-color: #4a90e2;
        color: white;
        padding: 12px 15px;
        font-weight: bold;
        text-transform: uppercase;
        border-bottom: 2px solid #ddd;
    }

    /* Table Rows */
    .book-table tbody td {
        padding: 10px 15px;
        border-bottom: 1px solid #ddd;
    }

    /* Hover effect for rows */
    .book-table tbody tr:hover {
        background-color: #f2f2f2;
    }

    /* Alternating row colors */
    .book-table tbody tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    /* Table border */
    .book-table th,
    .book-table td {
        border: 1px solid #ddd;
    }

    /* Responsive table for smaller screens */
    @media screen and (max-width: 768px) {
        .book-table thead {
            display: none;
        }

        .book-table,
        .book-table tbody,
        .book-table tr,
        .book-table td {
            display: block;
            width: 100%;
        }

        .book-table tr {
            margin-bottom: 10px;
        }

        .book-table td {
            text-align: right;
            padding-left: 50%;
            position: relative;
        }

        .book-table td::before {
            content: attr(data-label);
            position: absolute;
            left: 0;
            width: 50%;
            padding-left: 15px;
            font-weight: bold;
            text-transform: uppercase;
        }
    }
</style>
