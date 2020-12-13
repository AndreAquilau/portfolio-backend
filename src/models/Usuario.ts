import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Contato from './Contato';
import Endereco from './Endereco';
import { genHash } from '../functions/bcrypt';
import Experiencia from './Experiencia';
import Formacao from './Formacao';
import Portfolio from './Portfolio';
import Projeto from './Projeto';
import RedeSocial from './RedeSocial';

@Index('pkey_id_usuario', ['id'], { unique: true })
@Entity('usuario', { schema: 'public' })
export default class Usuario {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        name: 'senha',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    senha: string;

    @Column({
        name: 'admin',
        type: 'boolean',
        nullable: true,
    })
    admin: boolean;

    @Column({
        name: 'nome',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    nome: string;

    @CreateDateColumn({
        name: 'created',
    })
    created: Date;

    @CreateDateColumn({
        name: 'updated',
    })
    updated: Date;

    @OneToMany(() => Contato, (contato) => contato.usuario, { eager: true })
    contatos: Contato[];

    @OneToMany(() => Endereco, (endereco) => endereco.usuario, { eager: true })
    enderecos: Endereco[];

    @OneToMany(() => Experiencia, (endereco) => endereco.usuario, { eager: true })
    experiencias: Experiencia[];

    @OneToMany(() => Formacao, (endereco) => endereco.usuario, { eager: true })
    formacoes: Formacao[];

    @OneToMany(() => Projeto, (endereco) => endereco.usuario, { eager: true })
    projetos: Projeto[];

    @OneToMany(() => RedeSocial, (endereco) => endereco.usuario, { eager: true })
    redeSociais: RedeSocial[];

    @OneToOne(() => Portfolio, { eager: true })
    portfolio: Portfolio;

    @BeforeInsert()
    async generatePasswordHash(): Promise<void> {
        this.senha = await genHash(this.senha);
    }

    @BeforeUpdate()
    async updatePasswordHash(): Promise<void> {
        this.senha = await genHash(this.senha);
    }
}
