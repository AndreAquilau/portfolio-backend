module.exports ={
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "synchronize": true,
   "logging": false,
   "entities": [
    process.env.TYPEORM_ENTITIES,
   ],
   "migrations": [
    process.env.TYPEORM_MIGRATIONS,
  ],
  "subscribers": [
    process.env.TYPEORM_SUBESCRIBERS,
  ],
  "cli": {
      "entitiesDir": process.env.TYPEORM_ENTITIES_DIR,
      "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR,
      "subscribersDir": process.env.TYPEORM_SUBESCRIBERS_DIR,
   }
}
