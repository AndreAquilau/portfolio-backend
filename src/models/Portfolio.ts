import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import Usuario from './Usuario';

@Entity('portfolio', { schema: 'public' })
export default class Portfolio {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        name: 'titulo',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    titulo: string;

    @Column({
        name: 'subtitulo',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    subtitulo: string;

    @Column({
        name: 'message_download',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    messageDownload: string;

    @Column({
        name: 'photo',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    photo: string;

    @Column({
        name: 'file_name_photo',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    fileNamePhoto: string;

    @Column({
        name: 'sobre',
        type: 'text',
        nullable: true,
    })
    sobre: string;

    @Column({
        name: 'file_doc_sobre',
        type: 'text',
        nullable: true,
    })
    uploadDocSobre: string;

    @Column({
        name: 'name_doc_sobre',
        type: 'text',
        nullable: true,
    })
    nameDocSobre: string;

    @CreateDateColumn({
        name: 'created',
    })
    created: Date;

    @CreateDateColumn({
        name: 'updated',
    })
    updated: Date;

    @OneToOne(() => Usuario, (usuario) => usuario.portfolio)
    @JoinColumn()
    usuario: Usuario;
}
