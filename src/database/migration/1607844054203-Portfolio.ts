import { MigrationInterface, QueryRunner } from 'typeorm';
import { genHash } from '../../functions/bcrypt';

export class Portfolio1607844054203 implements MigrationInterface {
    name = 'Portfolio1607844054203';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "public"."endereco" ("id" SERIAL NOT NULL, "rua" character varying(255), "bairro" character varying(255), "cidade" character varying(255), "estado" character varying(255), "numero" integer, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "usuarioId" integer, CONSTRAINT "PK_ed37f15cc4d4f8ba0da51c6c9b1" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(`CREATE UNIQUE INDEX "pkey_id_endereco" ON "public"."endereco" ("id") `);

        await queryRunner.query(
            `CREATE TABLE "public"."experiencias" ("id" SERIAL NOT NULL, "desc_experiencia" text, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "usuarioId" integer, CONSTRAINT "PK_708d768dc2018353f527caee64e" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(`CREATE UNIQUE INDEX "pkey_id_experiencia" ON "public"."experiencias" ("id") `);

        await queryRunner.query(
            `CREATE TABLE "public"."formacao" ("id" SERIAL NOT NULL, "desc_formacao" character varying(255), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "usuarioId" integer, CONSTRAINT "PK_53cf68ddc563be584cceea6229d" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(`CREATE UNIQUE INDEX "pkey_formacao" ON "public"."formacao" ("id") `);

        await queryRunner.query(
            `CREATE TABLE "public"."portfolio" ("id" SERIAL NOT NULL, "titulo" character varying(255), "photo" character varying(255), "file_name_photo" character varying(255), "sobre" text, "file_doc_sobre" text, "name_doc_sobre" text, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "usuarioId" integer, CONSTRAINT "REL_72f9f8b1d0f1642a4b130d92cf" UNIQUE ("usuarioId"), CONSTRAINT "PK_052d053568cecfe54916987ba64" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(
            `CREATE TABLE "public"."projetos" ("id" SERIAL NOT NULL, "titulo" character varying(255), "desc_projeto" character varying(255), "link_github" character varying(255), "link_projeto" character varying(255), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "usuarioId" integer, CONSTRAINT "PK_e4fdfb13f43cf200a24d11c08e0" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(`CREATE UNIQUE INDEX "pkey_id_projetos" ON "public"."projetos" ("id") `);

        await queryRunner.query(
            `CREATE TABLE "public"."rede_sociais" ("id" SERIAL NOT NULL, "link" character varying(255), "upload_icon_link" character varying(255), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "usuarioId" integer, CONSTRAINT "PK_144438a957161041871ba6abe99" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(`CREATE UNIQUE INDEX "pkey_id_rede_social" ON "public"."rede_sociais" ("id") `);

        await queryRunner.query(
            `CREATE TABLE "public"."usuario" ("id" SERIAL NOT NULL, "senha" character varying(255), "admin" boolean, "nome" character varying(255), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "portfolioId" integer, CONSTRAINT "REL_35f374b5286d9f2954b3a20cfb" UNIQUE ("portfolioId"), CONSTRAINT "PK_b0daf6a6d01da82d74f95f519f9" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(`CREATE UNIQUE INDEX "pkey_id_usuario" ON "public"."usuario" ("id") `);

        await queryRunner.query(
            `CREATE TABLE "public"."contato" ("id" SERIAL NOT NULL, "tipo" character varying(255), "conteudo" character varying(255), "created" TIMESTAMP DEFAULT now(), "updated" TIMESTAMP DEFAULT now(), "usuarioId" integer, CONSTRAINT "PK_85ee9a1cd9740c36d69dfbf09fd" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(`CREATE UNIQUE INDEX "pkey_id_contato" ON "public"."contato" ("id") `);

        await queryRunner.query(
            `ALTER TABLE "public"."endereco" ADD CONSTRAINT "FK_3830995837a6d2169a01a2064db" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(
            `ALTER TABLE "public"."experiencias" ADD CONSTRAINT "FK_d7f6fd4daeeed995e06f4d22a70" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(
            `ALTER TABLE "public"."formacao" ADD CONSTRAINT "FK_2edd9f95d9f849d279b6039465d" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(
            `ALTER TABLE "public"."portfolio" ADD CONSTRAINT "FK_72f9f8b1d0f1642a4b130d92cf7" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(
            `ALTER TABLE "public"."projetos" ADD CONSTRAINT "FK_a88f5acea8633b23515bfde6b10" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(
            `ALTER TABLE "public"."rede_sociais" ADD CONSTRAINT "FK_fae6fab28f94dabc2546c87e511" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(
            `ALTER TABLE "public"."usuario" ADD CONSTRAINT "FK_35f374b5286d9f2954b3a20cfbe" FOREIGN KEY ("portfolioId") REFERENCES "public"."portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(
            `ALTER TABLE "public"."contato" ADD CONSTRAINT "FK_7647fd334b7ad2011c1d1784c28" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(`

        INSERT INTO usuario(nome, senha, admin) VALUES('${process.env.USER}', '${await genHash(process.env.PASS)}', ${
            process.env.ADMIN
        });

        INSERT INTO contato(tipo, conteudo, "usuarioId") VALUES('gmail', 'teste@gmail.com', (SELECT id FROM usuario limit 1));

        INSERT INTO contato(tipo, conteudo, "usuarioId") VALUES('telefone', '+55(69)11111-1111', (SELECT id FROM usuario limit 1));

        INSERT INTO endereco(rua, bairro, cidade, estado, numero, "usuarioId")

        VALUES('Rua Teste', 'Bairro Teste', 'Cidade Teste', 'RO', 999, (SELECT id FROM usuario limit 1));

        INSERT INTO experiencias("desc_experiencia", "usuarioId")

        VALUES('Lorem Ipsum is simply dummy text of the printing and typesetting industry.', (SELECT id FROM usuario limit 1));

        INSERT INTO formacao("desc_formacao", "usuarioId") VALUES('What is Lorem Ipsum?', (SELECT id FROM usuario limit 1));

        INSERT INTO portfolio(titulo, photo, "file_name_photo", sobre, "file_doc_sobre", "name_doc_sobre", "usuarioId")

        VALUES('What is Lorem Ipsum?', 'usuario', 'usuario.svg', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 'portfolio.txt', 'portfolio',  (SELECT id FROM usuario limit 1));

        INSERT INTO projetos(titulo, "desc_projeto", "link_github", "link_projeto", "usuarioId")

        VALUES('Portfolio', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 'https://github.com/AndreAquilau/portfolio-web', 'https://portfolio-guilherme.herokuapp.com/', (SELECT id FROM usuario limit 1));

        INSERT INTO "rede_sociais"(link, "upload_icon_link", "usuarioId") VALUES('https://web.whatsapp.com/', 'whatsapp.svg', (SELECT id FROM usuario limit 1));

        INSERT INTO "rede_sociais"(link, "upload_icon_link", "usuarioId") VALUES('https://www.instagram.com/', 'instagram.svg', (SELECT id FROM usuario limit 1));

        INSERT INTO "rede_sociais"(link, "upload_icon_link", "usuarioId") VALUES('https://www.facebook.com/', 'facebook.svg', (SELECT id FROM usuario limit 1));

        INSERT INTO "rede_sociais"(link, "upload_icon_link", "usuarioId") VALUES('https://br.linkedin.com/', 'linkedin.svg', (SELECT id FROM usuario limit 1));

      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DELETE FROM "rede_sociais";
          DELETE FROM projetos;
          DELETE FROM portfolio;
          DELETE FROM formacao;
          DELETE FROM experiencias;
          DELETE FROM endereco;
          DELETE FROM contato;
          DELETE FROM usuario
        `);
        await queryRunner.query(`ALTER TABLE "public"."contato" DROP CONSTRAINT "FK_7647fd334b7ad2011c1d1784c28"`);

        await queryRunner.query(`ALTER TABLE "public"."usuario" DROP CONSTRAINT "FK_35f374b5286d9f2954b3a20cfbe"`);

        await queryRunner.query(`ALTER TABLE "public"."rede_sociais" DROP CONSTRAINT "FK_fae6fab28f94dabc2546c87e511"`);

        await queryRunner.query(`ALTER TABLE "public"."projetos" DROP CONSTRAINT "FK_a88f5acea8633b23515bfde6b10"`);

        await queryRunner.query(`ALTER TABLE "public"."portfolio" DROP CONSTRAINT "FK_72f9f8b1d0f1642a4b130d92cf7"`);

        await queryRunner.query(`ALTER TABLE "public"."formacao" DROP CONSTRAINT "FK_2edd9f95d9f849d279b6039465d"`);

        await queryRunner.query(`ALTER TABLE "public"."experiencias" DROP CONSTRAINT "FK_d7f6fd4daeeed995e06f4d22a70"`);

        await queryRunner.query(`ALTER TABLE "public"."endereco" DROP CONSTRAINT "FK_3830995837a6d2169a01a2064db"`);

        await queryRunner.query(`DROP INDEX "public"."pkey_id_contato"`);

        await queryRunner.query(`DROP TABLE "public"."contato"`);

        await queryRunner.query(`DROP INDEX "public"."pkey_id_usuario"`);

        await queryRunner.query(`DROP TABLE "public"."usuario"`);

        await queryRunner.query(`DROP INDEX "public"."pkey_id_rede_social"`);

        await queryRunner.query(`DROP TABLE "public"."rede_sociais"`);

        await queryRunner.query(`DROP INDEX "public"."pkey_id_projetos"`);

        await queryRunner.query(`DROP TABLE "public"."projetos"`);

        await queryRunner.query(`DROP TABLE "public"."portfolio"`);

        await queryRunner.query(`DROP INDEX "public"."pkey_formacao"`);

        await queryRunner.query(`DROP TABLE "public"."formacao"`);

        await queryRunner.query(`DROP INDEX "public"."pkey_id_experiencia"`);

        await queryRunner.query(`DROP TABLE "public"."experiencias"`);

        await queryRunner.query(`DROP INDEX "public"."pkey_id_endereco"`);

        await queryRunner.query(`DROP TABLE "public"."endereco"`);
    }
}
