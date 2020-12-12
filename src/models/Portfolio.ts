import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity('portfolio', {schema: 'public'})
export default class Portfolio {

  @Column({
    name: 'titulo',
    type: 'varchar',
    length: 255
  })
  titulo: string;

  @Column({
    name: 'sobre',
    type:  'text',
  })
  sobre: string;

  @Column({
    name: 'upload_doc_sobre',
    type: 'text'
  })
  uploadDocSobre: string;

  @CreateDateColumn({
    name: 'created',
  })
  created: Date;

  @CreateDateColumn({
    name: 'updated',
  })
  updated: Date;
};
