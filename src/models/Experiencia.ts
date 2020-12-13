import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Usuario from './Usuario';

@Index('pkey_id_experiencia', ['id'], { unique: true })
@Entity('experiencias', { schema: 'public' })
export default class Experiencia {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        name: 'desc_experiencia',
        type: 'text',
        nullable: true,
    })
    descExperiencia: string;

    @CreateDateColumn({
        name: 'created',
    })
    created: Date;

    @CreateDateColumn({
        name: 'updated',
    })
    updated: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.experiencias)
    usuario: Usuario;
}
