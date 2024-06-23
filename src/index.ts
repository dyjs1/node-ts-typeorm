import express from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const app = express();
const port = 3000;

//  JSON 형식의 요청 본문을 파싱하여 req.body에 저장
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//데이터베이스 연결을 설정하고 초기화하는 작업
AppDataSource.initialize()
  .then(async () => {
    //데이터베이스 작업 수행
    console.log("Database Connected");
    // 회원가입 API 엔드포인트
    app.post("/api/v2/sign-up", async (req, res) => {
      const { username, password, address } = req.body;
      try {
        // User 엔티티 조회
        const existingUser = await AppDataSource.manager.findOne(User, {
          where: { username },
        });
        //이미 이름이 존재한다면
        if (existingUser) {
          return res
            .status(400)
            .json({ message: "이미 사용중인 사용자 이름입니다." });
        }
        // 유저 생성 및 저장
        const newUser = new User();
        newUser.username = username;
        newUser.password = password;
        newUser.address = address;

        await AppDataSource.manager.save(newUser);

        return res.status(201).json({
          message: "회원가입 성공",
          id: newUser.id,
          usernae: newUser.username,
        });
      } catch (error) {
        console.error("회원가입 오류:", error);
        return res.status(500).json({ error: "서버 오류 발생" });
      }
    });

    // 로그인 API 엔드포인트
    app.post("/api/v2/log-in", async (req, res) => {
      const { username, password } = req.body;

      try {
        // 유저 조회
        const user = await AppDataSource.manager.findOne(User, {
          where: {
            username: username,
          },
        });
        //만약 유저 이름이 없다면
        if (!user) {
          return res
            .status(404)
            .json({ error: "사용자 이름을 찾을 수 없습니다." });
        }

        // 비밀번호가 일치하지 않는다면
        if (user.password !== password) {
          return res
            .status(401)
            .json({ error: "비밀번호가 일치하지 않습니다." });
        }

        // 로그인 성공
        return res.status(200).json({ message: "로그인 성공", user: username });
      } catch (error) {
        console.error("로그인 오류:", error);
        return res.status(500).json({ error: "서버 오류 발생" });
      }
    });

    console.log("Loading users from the database...");
    //현재 db의 유저 모두 출력
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    //서버 실행
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
