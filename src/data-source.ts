import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "1234",
    database: "jsdb",
    synchronize: false, //migration을 위한 false설정
    logging: false,
    entities: [User],
    migrations: ['src/migration/*.ts'],
    subscribers: [],
})
