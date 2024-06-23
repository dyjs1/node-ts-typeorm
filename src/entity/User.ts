import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn() //id가 자동생성될 수 있게
    id: number

    @Column() //기존 생성
    username: string

    @Column() // 기존 생성
    password: string

    @Column() //추가한 컬럼
    address: string 


}
