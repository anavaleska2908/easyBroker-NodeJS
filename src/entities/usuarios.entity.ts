import { Exclude } from "class-transformer";
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable, ManyToMany } from "typeorm";
import Agendamentos from "./agendamentos.entity";
import Empresas from "./empresas.entity";
import Enderecos from "./enderecos.entity";
import Usuarios_empresas from "./usuarios_empresas.entity";
import Usuarios_empresas_imoveis from "./usuarios_empresas_imoveis.entity";
@Entity("tbl_usuarios")
class Usuarios {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @Column({ type: "varchar", length: 100 })
    usr_nome: string;
    @Column({ type: "char", length: 50, unique: true })
    usr_cpf: string;
    @Column({ type: "varchar", length: 100 })
    usr_email: string;
    @Exclude()
    @Column({ type: "varchar", length: 255 })
    usr_senha: string;
    @Column({ type: "char", length: 13 })
    usr_telefone: string;
    @Column({ type: "smallint", default: 0, comment: "0 = Usuário comun, 1 = Administrador" })
    usr_status_permissao: number;
    @OneToMany((type) => Enderecos, (enderecos) => enderecos.end_id_usuario_fk, { eager: true, onDelete: "SET NULL" })
    usr_enderecos: Enderecos[];
    @OneToMany((type) => Agendamentos, (agendamento) => agendamento.agn_id_cliente_fk, { eager: true, onDelete: "SET NULL" })
    usr_cliente_agendamentos: Agendamentos[];
    @OneToMany((type) => Agendamentos, (agendamento) => agendamento.agn_id_corretor_fk, { eager: true, onDelete: "SET NULL" })
    usr_corretor_agendamentos: Agendamentos[];
    @OneToMany((type) => Usuarios_empresas, (usuarios_empresas) => usuarios_empresas.ue_id_empresa_fk, { eager: true, onDelete: "SET NULL" })
    usr_usuarios_empresas: Usuarios_empresas[];
    @OneToMany((type) => Usuarios_empresas_imoveis, (usuarios_empresas_imoveis) => usuarios_empresas_imoveis.uei_id_usuario_fk, { eager: true, onDelete: "SET NULL" })
    usr_usuarios_empresas_imoveis: Usuarios_empresas_imoveis[];
    @Exclude()
    @CreateDateColumn()
    criado_em: Date;
    @Exclude()
    @UpdateDateColumn()
    atualizado_em: Date;
}
export default Usuarios;
