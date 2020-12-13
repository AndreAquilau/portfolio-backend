import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Usuario from './Usuario';

@Index('pkey_id_contato', ['id'], { unique: true })
@Entity('contato', { schema: 'public' })
export default class Contato {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        name: 'tipo',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    tipo: string;

    @Column({
        name: 'conteudo',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    conteudo: string;

    @CreateDateColumn({
        name: 'created',
        nullable: true,
    })
    created: Date;

    @CreateDateColumn({
        name: 'updated',
        nullable: true,
    })
    updated: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.contatos)
    usuario: Usuario;
}
