# Node.js REST API

## How to Use

To set up and run the API locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/lola-emil/express-rest-api.git
   ```
2. Change Directory
   ```bash
   cd express-rest-api
   ```
3. Install dependencies
   ```bash
   yarn install
   ```
4. Build the project
   ```bash
   yarn run build
   ```
5. Run the server
   ```bash
   yarn run start
   ```

## Endpoints and Routes
### GET /user/login
- Accepts email and password as query, nya maka login dayon
### POST /user/register
- Inserts user to database
### PATCH /user/update/:id
- Updates user info
### DELETE /user/delete/:id
- Deletes user account
