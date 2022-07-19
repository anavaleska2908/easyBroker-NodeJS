import { Exclude } from "class-transformer";
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Agendamentos_imoveis from "./agendamentos_imoveis.entity";
import Enderecos from "./enderecos.entity";
import Usuarios_empresas_imoveis from "./usuarios_empresas_imoveis.entity";
@Entity("tbl_imoveis")
class Imoveis {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @Column({ type: "char", length: 50, nullable: true, unique: true })
    imv_inscricao_iptu: string;
    @Column({ type: "text" })
    imv_descricao: string;
    @Column({
        type: "smallint",
        default: 1,
        comment: "Situação do imovel no sistama: 0 = Finalizado, 1 = Disponivel",
    })
    imv_status_situacao: number;
    @Column({
        type: "smallint",
        default: 0,
        comment: "Se esta em um condominio: 0 = Não, 1 = Sim",
    })
    imv_status_condominio: number;
    @Column({
        type: "smallint",
        default: 0,
        comment: "Se o imovel esta para alugar ou para vender: 0 = Locação, 1 = Venda ",
    })
    imv_status_servico: number;
    @Column({
        type: "smallint",
        default: 1,
        comment: "Tipo do Imovel: 0 = Apartamento, 1 = Casa, 2 = Kitnet",
    })
    imv_status_tipo: number;
    @Column({
        type: "smallint",
        default: 3,
        comment: "Tipos de garagem: 0 = Não possui garagem , 1 = P/Carro, 2 =P/Moto, 3 = Ambos",
    })
    imv_status_garagem: number;
    @Column({
        type: "smallint",
        default: 1,
        comment: "Quantidade de quartos no Imovel",
    })
    imv_qtde_quartos: number;
    @Column({
        type: "smallint",
        default: 0,
        comment: "Quantidade de suites no Imovel",
    })
    imv_qtde_suites: number;
    @Column({
        type: "smallint",
        default: 1,
        comment: "Quantidade de banheiros no Imovel",
    })
    imv_qtde_banheiros: number;
    @Column({
        type: "smallint",
        default: 1,
        comment: "Quantidade de vagas na garagem do Imovel",
    })
    imv_qtde_vagas_garagem: string;
    @Exclude()
    @OneToMany((type) => Enderecos, (enderecos) => enderecos.end_id_imovel_fk, { eager: true, onDelete: "SET NULL" })
    imv_enderecos: Enderecos[];
    @OneToMany((type) => Agendamentos_imoveis, (agendamentos_imoveis) => agendamentos_imoveis.ai_id_imovel_fk, { eager: true, onDelete: "SET NULL" })
    imv_agendamentos_imoveis: Agendamentos_imoveis[];
    @OneToMany((type) => Usuarios_empresas_imoveis, (usuarios_empresas_imoveis) => usuarios_empresas_imoveis.uei_id_imovel_fk, { eager: true, onDelete: "SET NULL" })
    imv_usuarios_empresas_imoveis: Usuarios_empresas_imoveis[];
    @CreateDateColumn()
    public criado_em: Date;
    @UpdateDateColumn()
    public atualizado_em: Date;
}
export default Imoveis;
