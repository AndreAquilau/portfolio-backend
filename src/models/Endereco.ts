import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Usuario from './Usuario';

@Index('pkey_id_endereco', ['id'], { unique: true })
@Entity('endereco', { schema: 'public' })
export default class Endereco {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        name: 'rua',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    rua: string;

    @Column({
        name: 'bairro',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    bairro: string;

    @Column({
        name: 'cidade',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    cidade: string;

    @Column({
        name: 'estado',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    estado: string;

    @Column({
        name: 'numero',
        type: 'integer',
        nullable: true,
    })
    numero: string;

    @CreateDateColumn({
        name: 'created',
    })
    created: Date;

    @CreateDateColumn({
        name: 'updated',
    })
    updated: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.enderecos)
    usuario: Usuario;
}
