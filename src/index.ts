import { AppDataSource } from "./data-source"
import { User } from "./entity/User"


//데이터베이스 연결을 설정하고 초기화하는 작업
AppDataSource.initialize().then(async () => {

    //데이터베이스 작업 수행
    console.log("Inserting a new user into the database...")
    //새로운 객체 생성
    const user = new User()
    user.username = "jstest"
    user.password = "1234"
    user.address = "test"
    //객체 데이터베이스에 저장
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))


