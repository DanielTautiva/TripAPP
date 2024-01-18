module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your_username',
    password: 'your_password',
    database: 'transport_db',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ["src/database/migrations/*{.ts,.js}"],
    cli: {
      migrationsDir: "src/database/migrations"
    },
    synchronize: true,
};