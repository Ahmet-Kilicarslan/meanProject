import dotenv from 'dotenv';
dotenv.config();
import app from "./app.js";

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);

})

/*
2xx Success

200 OK: Request successful, response has content
201 Created: Resource successfully created (POST requests)
204 No Content: Request successful, no response body (DELETE requests)

3xx Redirection

301 Moved Permanently: URL permanently redirected
302 Found: Temporary redirect
304 Not Modified: Cached version is still valid

4xx Client Errors

400 Bad Request: Invalid request syntax or data
401 Unauthorized: Authentication required or failed
403 Forbidden: Server understood request but refuses to authorize
404 Not Found: Resource doesn't exist
405 Method Not Allowed: HTTP method not supported for this endpoint
409 Conflict: Request conflicts with current resource state (duplicates)
422 Unprocessable Entity: Request valid but contains semantic errors
429 Too Many Requests: Rate limiting exceeded

5xx Server Errors

500 Internal Server Error: Generic server error
502 Bad Gateway: Server received invalid response from upstream
503 Service Unavailable: Server temporarily unavailable
504 Gateway Timeout: Upstream server timeout


#!/bin/bash
DB_NAME="frost"
DB_USER="workbench"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${DB_NAME}_${DATE}.sql"

mysqldump -u $DB_USER -p $DB_NAME > $BACKUP_FILE
echo "Backup created: $BACKUP_FILE"


DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=workbench
DB_PASSWORD=Asirpa12
DB_NAME=frost
SESSION_SECRET=gizli
NODE_ENV=development

*/