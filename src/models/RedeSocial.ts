import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('pkey_id_rede_social', ['id'], { unique: true })
@Entity('rede_sociais', {schema: 'public'})
export default class RedeSocial {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'link',
    type: 'varchar',
    length: 255
  })
  link: string;

  @Column({
    name: 'upload_icon_link',
    type: 'varchar',
    length: 255,
  })
  uploadIconLink: string;

  @CreateDateColumn({
    name: 'created',
  })
  created: Date;

  @CreateDateColumn({
    name: 'updated',
  })
  updated: Date;
};
