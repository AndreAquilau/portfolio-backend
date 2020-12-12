import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Contato from './Contato';
import Endereco from './Endereco';

@Index('pkey_id_usuario', ['id'], { unique: true })
@Entity('usuario', {schema: 'public'})
export default class Usuario {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'senha',
    type: 'varchar',
    length: 255
  })
  senha: string;

  @Column({
    name: 'admin',
    type: 'bit',
  })
  admin: string;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 255
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

  @OneToMany(() => Contato, (contato) => contato.usuario, {eager: true})
  contatos: Contato[];

  @OneToMany(() => Endereco, (endereco) => endereco.usuario, {eager: true})
  enderecos: Endereco[];
};
