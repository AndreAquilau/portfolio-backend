import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('formacao', {schema: 'public'})
export default class Formacao {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'desc_formacao',
    type: 'varchar',
    length: 255
  })
  descFormacao: string;


  @CreateDateColumn({
    name: 'created',
  })
  created: Date;

  @CreateDateColumn({
    name: 'updated',
  })
  updated: Date;
};
