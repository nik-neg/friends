import {Column, PrimaryGeneratedColumn} from "typeorm";

export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    avatar: string;

}
