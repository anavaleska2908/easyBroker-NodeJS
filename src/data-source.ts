import { DataSource } from "typeorm";
import "reflect-metadata";
import "dotenv/config";

//Configs para uso local e testes
//const AppDataSource =
//  process.env.NODE_ENV === "test"
//    ? new DataSource({
//        type: "postgres",
//        host: "localhost",
//        port: 5432,
//        username: "natanael",
//        password: "1234",
//        database: "capstone_testes",
//        synchronize: true,
//        logging: false,
//        entities: ["src/entities/*.ts"],
//        migrations: ["src/migrations/*.ts"],
//      })
//    : new DataSource({
//        type: "postgres",
//        host: "localhost",
//        port: 5432,
//        username: process.env.POSTGRES_USER,
//        password: process.env.POSTGRES_PASSWORD,
//        database: process.env.POSTGRES_DB,
//        synchronize: false,
//        logging: true,
//        entities: ["src/entities/*.ts"],
//        migrations: ["src/migrations/*.ts"],
//      });
/*Configs para o Heroku*/
const AppDataSource = new DataSource({
	type: "postgres",
	url: process.env.DATABASE_URL,
	ssl:
		process.env.NODE_ENV === "production"
			? { rejectUnauthorized: false }
			: false,
	synchronize: false,
	logging: true,
	entities:
		process.env.NODE_ENV === "production"
			? ["dist/entities/*.js"]
			: ["src/entities/*.ts"],
	migrations:
		process.env.NODE_ENV === "production"
			? ["dist/migrations/*.js"]
			: ["src/migrations/*.ts"],
});
export default AppDataSource;
