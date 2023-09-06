import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import 'dotenv/config';
import 'reflect-metadata';

const DataSourceConfig = (): DataSourceOptions => {
	const entitiesPath = path.join(__dirname, "entities/**.{js,ts}");
	const migrationsPath = path.join(__dirname, "migrations/**.{js,ts}");

	const nodeEnv: string | undefined = process.env.NODE_ENV;
	const dbUrl: string | undefined = process.env.DATABASE_URL;

	if (nodeEnv === "test") {
		return {
			type: "sqlite",
			database: ":memory:",
			synchronize: true,
			entities: [entitiesPath],
		};
	}

	if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

	return {
		type: "postgres",
		url: dbUrl,
		synchronize: false,
		logging: true,
		entities: [entitiesPath],
		migrations: [migrationsPath],
	};
};
export const AppDataSource: DataSource = new DataSource(DataSourceConfig());
