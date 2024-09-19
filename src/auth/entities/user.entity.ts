import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        length: 50
    })
    name: string;
    
    @Column({
        type: 'varchar',
        length: 20
    })
    user: string;

    @Column({
        type: 'varchar',
        length: 50, 
        unique: true,
    })
    @IsEmail({}, {message: 'Email is not valid'})
    email: string;

    @Column({
        type: 'varchar',
        length: 20,
        unique: true
    })
    document: number;


    @Column({
        type: 'varchar',
        // select: false
    })
    password: string;

    @Column({
        type: 'varchar'
    })
    img: string;

    @Column({
        type: 'varchar',
        default: 'USER_ROLE'
    })
    role: string;

    @Column({
        type: 'int',
        default: 1
    })
    is_active: number;

}