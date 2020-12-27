import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Usuario from './Usuario';

@Index('pkey_formacao', ['id'], { unique: true })
@Entity('formacao', { schema: 'public' })
export default class Formacao {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        name: 'desc_formacao',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    descFormacao: string;

    @Column({
        name: 'instituicao',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    instituicao: string;

    @CreateDateColumn({
        name: 'created',
    })
    created: Date;

    @CreateDateColumn({
        name: 'updated',
    })
    updated: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.formacoes)
    usuario: Usuario;
}
