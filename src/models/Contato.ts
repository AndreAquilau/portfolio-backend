import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Usuario from './Usuario';

@Index('pkey_id_contato', ['id'], { unique: true })
@Entity('contato', {schema: 'public'})

export default class Contato {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'tipo',
    type: 'varchar',
    length: 255
  })
  tipo: string;

  @Column({
    name: 'conteudo',
    type: 'varchar',
    length: 255
  })
  conteudo: string;

  @CreateDateColumn({
    name: 'created',
  })
  created: Date;

  @CreateDateColumn({
    name: 'updated',
  })
  updated: Date;

  @ManyToOne(()=> Usuario, (usuario) =>usuario.contatos )
  usuario: Usuario;
};
