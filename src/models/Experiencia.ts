import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('pkey_id_experiencia', ['id'], {unique: true})
@Entity('experiencias', {schema: 'public'})
export default class Experiencia {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'desc_experiencia',
    type: 'text',
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
};
