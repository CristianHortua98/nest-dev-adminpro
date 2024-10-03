import { User } from "src/auth/entities/user.entity";
import { Hospital } from "src/hospitals/entities/hospital.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctors')
export class Doctor {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        length: 50
    })
    name: string;
    
    @Column({
        type: 'varchar'
    })
    img: string;

    @ManyToOne(
        () => User,
        // {eager: true} 
    )
    @JoinColumn({
        name: 'id_user'
    })
    user: User

    @ManyToOne(
        () => Hospital,
        // {eager:true}
        {onDelete: 'CASCADE'}
    )
    @JoinColumn({
        name: 'id_hospital'
    })
    hospital: Hospital
}
