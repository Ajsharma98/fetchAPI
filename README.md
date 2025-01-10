### Svelte + Vite + Express + PostgreSQL Project
This project is a full-stack web application built using Svelte for the frontend, Vite for the build tool, Express for the backend, and PostgreSQL for the database. It includes user authentication, role-based access control, and CRUD operations for managing books.
## Project Structure
``` Client/
    .gitignore
    .vscode/
        extensions.json
    index.html
    jsconfig.json
    package.json
    public/
    README.md
    src/
        app.css
        App.svelte
        assets/
        lib/
            Components/
                ...
            ...
        main.js
        store.js
        vite-env.d.ts
    svelte.config.js
    vite.config.js
package.json
Server/
    .env
    app.js
    controllers/
        booksControllers.js
        loginController.js
    database/
        db.js
    middleware/
        verifyAdmin.js
        verifyToken.js
    Model/
        book.js
        user.js

    package.json
    routes/
        booksRoutes.js
        loginRoutes.js
```
## Prerequisites
- Node.js
- PostgreSQL
## Usage 
# User Authentication
- Sign Up: Users can sign up by providing an email, password, and role (user/admin).
- Sign In: Users can sign in using their email and password.
- Log Out: Users can log out, which clears their session.
# Role-Based Access Control
- Admin: Admin users have access to additional features such as adding books.
- User: Regular users can view the list of books.
# Book Management
- View Books: Users can view a paginated list of books.
- Add Books: Admin users can add new books to the database.
## License
This project is licensed under the MIT License.
## Acknoweldgement 
- Svelte
- Vite
- Express
- PostgreSQL
