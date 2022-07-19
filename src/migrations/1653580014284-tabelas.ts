import { MigrationInterface, QueryRunner } from "typeorm";

export class tabelas1653580014284 implements MigrationInterface {
    name = 'tabelas1653580014284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tbl_usuarios_empresas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "ue_id_usuario_fk" uuid, "ue_id_empresa_fk" uuid, CONSTRAINT "PK_f4b5bb60da1b07a06a72fa7f400" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usr_nome" character varying(100) NOT NULL, "usr_cpf" character(50) NOT NULL, "usr_email" character varying(100) NOT NULL, "usr_senha" character varying(255) NOT NULL, "usr_telefone" character(13) NOT NULL, "usr_status_permissao" smallint NOT NULL DEFAULT '0', "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5fc96d9ae1a0b31f10707650fe6" UNIQUE ("usr_cpf"), CONSTRAINT "PK_79961a88d771ab356e45b239865" PRIMARY KEY ("id")); COMMENT ON COLUMN "tbl_usuarios"."usr_status_permissao" IS '0 = Usuário comun, 1 = Administrador'`);
        await queryRunner.query(`CREATE TABLE "tbl_usuarios_empresas_imoveis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uei_valor_imovel" numeric, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "uei_id_usuario_fk" uuid, "uei_id_empresa_fk" uuid, "uei_id_imovel_fk" uuid, CONSTRAINT "PK_0f33e399d9ff46aea2da07763d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_imoveis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imv_inscricao_iptu" character(50), "imv_descricao" text NOT NULL, "imv_status_situacao" smallint NOT NULL DEFAULT '1', "imv_status_condominio" smallint NOT NULL DEFAULT '0', "imv_status_servico" smallint NOT NULL DEFAULT '0', "imv_status_tipo" smallint NOT NULL DEFAULT '1', "imv_status_garagem" smallint NOT NULL DEFAULT '3', "imv_qtde_quartos" smallint NOT NULL DEFAULT '1', "imv_qtde_suites" smallint NOT NULL DEFAULT '0', "imv_qtde_banheiros" smallint NOT NULL DEFAULT '1', "imv_qtde_vagas_garagem" smallint NOT NULL DEFAULT '1', "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_33a93b25eb71705ab2eadc217ad" UNIQUE ("imv_inscricao_iptu"), CONSTRAINT "PK_8d7aa1dd211d07dd198edc2a46b" PRIMARY KEY ("id")); COMMENT ON COLUMN "tbl_imoveis"."imv_status_situacao" IS 'Situação do imovel no sistama: 0 = Finalizado, 1 = Disponivel'; COMMENT ON COLUMN "tbl_imoveis"."imv_status_condominio" IS 'Se esta em um condominio: 0 = Não, 1 = Sim'; COMMENT ON COLUMN "tbl_imoveis"."imv_status_servico" IS 'Se o imovel esta para alugar ou para vender: 0 = Locação, 1 = Venda '; COMMENT ON COLUMN "tbl_imoveis"."imv_status_tipo" IS 'Tipo do Imovel: 0 = Apartamento, 1 = Casa, 2 = Kitnet'; COMMENT ON COLUMN "tbl_imoveis"."imv_status_garagem" IS 'Tipos de garagem: 0 = Não possui garagem , 1 = P/Carro, 2 =P/Moto, 3 = Ambos'; COMMENT ON COLUMN "tbl_imoveis"."imv_qtde_quartos" IS 'Quantidade de quartos no Imovel'; COMMENT ON COLUMN "tbl_imoveis"."imv_qtde_suites" IS 'Quantidade de suites no Imovel'; COMMENT ON COLUMN "tbl_imoveis"."imv_qtde_banheiros" IS 'Quantidade de banheiros no Imovel'; COMMENT ON COLUMN "tbl_imoveis"."imv_qtde_vagas_garagem" IS 'Quantidade de vagas na garagem do Imovel'`);
        await queryRunner.query(`CREATE TABLE "tbl_enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "end_uf" character(2) NOT NULL, "end_cidade" character varying(100) NOT NULL, "end_bairro" character varying(100) NOT NULL, "end_rua" character varying(200) NOT NULL, "end_numero" character(10) NOT NULL, "end_cep" character(15) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "end_id_usuario_fk" uuid, "end_id_imovel_fk" uuid, "end_id_empresa_fk" uuid, CONSTRAINT "PK_cc80a1b6cf2c8d5fbcb3e21c595" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_empresas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "emp_nome_fantasia" character varying(255) NOT NULL, "emp_razao_social" character varying(255) NOT NULL, "emp_incricao_municipal" character(11) NOT NULL, "emp_incricao_estadual" character(20) NOT NULL, "emp_email" character varying(100) NOT NULL, "emp_telefone" character(13) NOT NULL, "emp_cnpj" character(14) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d68c691f7382b37d3b2d8b0941d" UNIQUE ("emp_cnpj"), CONSTRAINT "PK_418d0494cf1258df825c5b79b62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_agendamentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "agn_observacoes" text, "agn_status_agendamento" smallint NOT NULL DEFAULT '1', "agn_horario_inicio" date NOT NULL, "agn_horario_fim" date NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "agn_id_cliente_fk" uuid, "agn_id_empresa_fk" uuid, "agn_id_corretor_fk" uuid, CONSTRAINT "PK_322d06c79bb256b32444fde8461" PRIMARY KEY ("id")); COMMENT ON COLUMN "tbl_agendamentos"."agn_observacoes" IS 'Observações feitar ao finalizar o agendamento'; COMMENT ON COLUMN "tbl_agendamentos"."agn_status_agendamento" IS '0 = Cancelado, 1 = Em Aberto, 2 = Finalizado'; COMMENT ON COLUMN "tbl_agendamentos"."agn_horario_inicio" IS 'Hora do inicio do agendamento'; COMMENT ON COLUMN "tbl_agendamentos"."agn_horario_fim" IS 'Hora do fim do agendamento'`);
        await queryRunner.query(`CREATE TABLE "tbl_agendamentos_imoveis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "ai_id_agendamento_fk" uuid, "ai_id_imovel_fk" uuid, CONSTRAINT "PK_3d4af98a4eea76a926d2ea193ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tbl_usuarios_empresas" ADD CONSTRAINT "FK_a833df23c3e2ef22db1a160aa5a" FOREIGN KEY ("ue_id_usuario_fk") REFERENCES "tbl_usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_usuarios_empresas" ADD CONSTRAINT "FK_eb708a4d6ab269d09d418e1b0d4" FOREIGN KEY ("ue_id_empresa_fk") REFERENCES "tbl_empresas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_usuarios_empresas_imoveis" ADD CONSTRAINT "FK_4b88e18c968e061863880f1111a" FOREIGN KEY ("uei_id_usuario_fk") REFERENCES "tbl_usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_usuarios_empresas_imoveis" ADD CONSTRAINT "FK_e3604b681e4ef100329b3d6240f" FOREIGN KEY ("uei_id_empresa_fk") REFERENCES "tbl_empresas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_usuarios_empresas_imoveis" ADD CONSTRAINT "FK_1b93b55e78a997381e35703d67a" FOREIGN KEY ("uei_id_imovel_fk") REFERENCES "tbl_imoveis"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_enderecos" ADD CONSTRAINT "FK_d082ed7f0ebe14459fce8ad86c3" FOREIGN KEY ("end_id_usuario_fk") REFERENCES "tbl_usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_enderecos" ADD CONSTRAINT "FK_8e8be36645a23d21bc2fcd725ac" FOREIGN KEY ("end_id_imovel_fk") REFERENCES "tbl_imoveis"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_enderecos" ADD CONSTRAINT "FK_10ebdde79b1e2377ada8a047543" FOREIGN KEY ("end_id_empresa_fk") REFERENCES "tbl_empresas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_agendamentos" ADD CONSTRAINT "FK_0e57efc80155d84f15fc255affd" FOREIGN KEY ("agn_id_cliente_fk") REFERENCES "tbl_usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_agendamentos" ADD CONSTRAINT "FK_3aa8942b379909e8adcffd664ca" FOREIGN KEY ("agn_id_empresa_fk") REFERENCES "tbl_empresas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_agendamentos" ADD CONSTRAINT "FK_af154637f16997d4d29ad2b23ab" FOREIGN KEY ("agn_id_corretor_fk") REFERENCES "tbl_usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_agendamentos_imoveis" ADD CONSTRAINT "FK_9a3c579e8b22382dd9a44f90b9a" FOREIGN KEY ("ai_id_agendamento_fk") REFERENCES "tbl_agendamentos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_agendamentos_imoveis" ADD CONSTRAINT "FK_fd7bb7d06485e772e29fe0ae01c" FOREIGN KEY ("ai_id_imovel_fk") REFERENCES "tbl_imoveis"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_agendamentos_imoveis" DROP CONSTRAINT "FK_fd7bb7d06485e772e29fe0ae01c"`);
        await queryRunner.query(`ALTER TABLE "tbl_agendamentos_imoveis" DROP CONSTRAINT "FK_9a3c579e8b22382dd9a44f90b9a"`);
        await queryRunner.query(`ALTER TABLE "tbl_agendamentos" DROP CONSTRAINT "FK_af154637f16997d4d29ad2b23ab"`);
        await queryRunner.query(`ALTER TABLE "tbl_agendamentos" DROP CONSTRAINT "FK_3aa8942b379909e8adcffd664ca"`);
        await queryRunner.query(`ALTER TABLE "tbl_agendamentos" DROP CONSTRAINT "FK_0e57efc80155d84f15fc255affd"`);
        await queryRunner.query(`ALTER TABLE "tbl_enderecos" DROP CONSTRAINT "FK_10ebdde79b1e2377ada8a047543"`);
        await queryRunner.query(`ALTER TABLE "tbl_enderecos" DROP CONSTRAINT "FK_8e8be36645a23d21bc2fcd725ac"`);
        await queryRunner.query(`ALTER TABLE "tbl_enderecos" DROP CONSTRAINT "FK_d082ed7f0ebe14459fce8ad86c3"`);
        await queryRunner.query(`ALTER TABLE "tbl_usuarios_empresas_imoveis" DROP CONSTRAINT "FK_1b93b55e78a997381e35703d67a"`);
        await queryRunner.query(`ALTER TABLE "tbl_usuarios_empresas_imoveis" DROP CONSTRAINT "FK_e3604b681e4ef100329b3d6240f"`);
        await queryRunner.query(`ALTER TABLE "tbl_usuarios_empresas_imoveis" DROP CONSTRAINT "FK_4b88e18c968e061863880f1111a"`);
        await queryRunner.query(`ALTER TABLE "tbl_usuarios_empresas" DROP CONSTRAINT "FK_eb708a4d6ab269d09d418e1b0d4"`);
        await queryRunner.query(`ALTER TABLE "tbl_usuarios_empresas" DROP CONSTRAINT "FK_a833df23c3e2ef22db1a160aa5a"`);
        await queryRunner.query(`DROP TABLE "tbl_agendamentos_imoveis"`);
        await queryRunner.query(`DROP TABLE "tbl_agendamentos"`);
        await queryRunner.query(`DROP TABLE "tbl_empresas"`);
        await queryRunner.query(`DROP TABLE "tbl_enderecos"`);
        await queryRunner.query(`DROP TABLE "tbl_imoveis"`);
        await queryRunner.query(`DROP TABLE "tbl_usuarios_empresas_imoveis"`);
        await queryRunner.query(`DROP TABLE "tbl_usuarios"`);
        await queryRunner.query(`DROP TABLE "tbl_usuarios_empresas"`);
    }

}
