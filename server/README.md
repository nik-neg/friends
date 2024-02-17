# Please create a .env file and add the following:

```text
HOST = localhost
PORT = 3000
DATABASE_USERNAME = postgres
DATABASE_PASSWORD = postgres
DATABASE = user_db
JWT_EXPIRATION = 1800
ALLOWED_ORIGINS = ["https://localhost:3000", "www.google.com", "https://wwww.facebook.com"]
USER_SERVICE_API_URL = https://reqres.in/api/users
```

Then run the docker-compose file to start the database

```bash
docker-compose up -d
```

Then run the following command to start the server

```bash
npm i
npm run start:dev
```