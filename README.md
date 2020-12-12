> .env
```env
DATABASE_URL = postgres://postgres:root@localhost:5432/portfolio
TYPEORM_ENTITIES = src/models/**/*.ts
TYPEORM_MIGRATIONS = src/database/migrations/**/*.ts
TYPEORM_SUBESCRIBERS = src/subscribers/**/*.ts
TYPEORM_ENTITIES_DIR = src/models
TYPEORM_MIGRATIONS_DIR = src/database/migrations
TYPEORM_SUBESCRIBERS_DIR = src/subscribers
```
