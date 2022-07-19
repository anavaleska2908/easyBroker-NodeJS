import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, JoinTable, ManyToMany, JoinColumn } from "typeorm";
import Agendamentos from "./agendamentos.entity";
import Enderecos from "./enderecos.entity";
import Usuarios from "./usuarios.entity";
import Usuarios_empresas from "./usuarios_empresas.entity";
import Usuarios_empresas_imoveis from "./usuarios_empresas_imoveis.entity";
@Entity("tbl_empresas")
class Empresas {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @Column({ type: "varchar", length: 255 })
    emp_nome_fantasia: string;
    @Column({ type: "varchar", length: 255 })
    emp_razao_social: string;
    @Column({ type: "char", length: 11 })
    emp_incricao_municipal: string;
    @Column({ type: "char", length: 20 })
    emp_incricao_estadual: string;
    @Column({ type: "varchar", length: 100 })
    emp_email: string;
    @Column({ type: "char", length: 13 })
    emp_telefone: string;
    @Column({ type: "char", length: 14, unique: true })
    emp_cnpj: string;
    @OneToMany((type) => Enderecos, (enderecos) => enderecos.end_id_empresa_fk, { eager: true, onDelete: "SET NULL" })
    emp_enderecos: Enderecos[];
    @OneToMany((type) => Agendamentos, (agendamento) => agendamento.agn_id_empresa_fk, { eager: true, onDelete: "SET NULL" })
    emp_agendamentos: Agendamentos[];
    @OneToMany((type) => Usuarios_empresas, (usuarios_empresas) => usuarios_empresas.ue_id_empresa_fk, { eager: true, onDelete: "SET NULL" })
    emp_usuarios_empresas: Usuarios_empresas[];
    @OneToMany((type) => Usuarios_empresas_imoveis, (usuarios_empresas_imoveis) => usuarios_empresas_imoveis.uei_id_empresa_fk, { eager: true, onDelete: "SET NULL" })
    emp_usuarios_empresas_imoveis: Usuarios_empresas_imoveis[];
    /* ManyToMany Automatico
        \\Many to Many com a tabela usuarios e empresas, gerando a pivo usuarios_empresas
        @ManyToMany((type) => Usuarios, { eager: true })
        @JoinTable({
            name: "tbl_usuarios_empresas",
            joinColumn: {
                name: "ue_id_empresa_fk",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "ue_id_usuario_fk",
                referencedColumnName: "id",
            },
        })
        emp_usuarios: Usuarios[];
    */
    @CreateDateColumn()
    criado_em: Date;
    @UpdateDateColumn()
    atualizado_em: Date;
}
export default Empresas;
