import { IsEmail } from "class-validator";
import { Doctor } from "src/doctors/entities/doctor.entity";
import { Hospital } from "src/hospitals/entities/hospital.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
        length: 20,
        unique: true
    })
    username: string;

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
        select: false
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: true
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

    // @OneToMany(
    //     () => Hospital,
    //     hospital => hospital.user
    // )
    // hospitals: Hospital[];

    // @OneToMany(
    //     () => Doctor,
    //     doctor => doctor.user
    // )
    // doctors: Doctor[];

    @BeforeInsert()
    checkFieldLower(){
        this.email = this.email.toLowerCase().trim();
        this.username = this.username.toLowerCase().trim();
    }

}