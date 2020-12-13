import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Usuario from './Usuario';

@Index('pkey_id_projetos', ['id'], { unique: true })
@Entity('projetos', { schema: 'public' })
export default class Projeto {
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
        name: 'desc_projeto',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    descProjeto: string;

    @Column({
        name: 'link_github',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    linkGithub: string;

    @Column({
        name: 'link_projeto',
        type: 'varchar',
        length: 255,
        nullable: true,
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

    @ManyToOne(() => Usuario, (usuario) => usuario.projetos)
    usuario: Usuario;
}
