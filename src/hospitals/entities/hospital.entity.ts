import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('hospitals')
export class Hospital {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        length: 50
    })
    name: string;
    
    @Column({
        type: 'varchar',
        nullable: true,
        default: ""
    })
    img?: string;

    @ManyToOne(
        () => User,
        {eager: true}
    )
    @JoinColumn({
        name: 'id_user'
    })
    user: User

}
