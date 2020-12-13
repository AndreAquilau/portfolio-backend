import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Usuario from './Usuario';

@Index('pkey_id_rede_social', ['id'], { unique: true })
@Entity('rede_sociais', { schema: 'public' })
export default class RedeSocial {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        name: 'link',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    link: string;

    @Column({
        name: 'upload_icon_link',
        type: 'varchar',
        length: 255,
        nullable: true,
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

    @ManyToOne(() => Usuario, (usuario) => usuario.redeSociais)
    usuario: Usuario;
}
