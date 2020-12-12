import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('pkey_id_projetos', ['id'], { unique: true })
@Entity('projetos', {schema: 'public'})
export default class Projeto {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'titulo',
    type: 'varchar',
    length: 255
  })
  titulo: string;

  @Column({
    name: 'desc_projeto',
    type: 'varchar',
    length: 255
  })
  descProjeto: string;

  @Column({
    name: 'link_github',
    type: 'varchar',
    length: 255
  })
  linkGithub: string;

  @Column({
    name: 'link_projeto',
    type: 'varchar',
    length: 255
  })
  linkProjeto: string;

  @CreateDateColumn({
    name: 'created',
  })
  created: Date;

  @CreateDateColumn({
    name: 'updated',
  })
  updated: Date;
};
