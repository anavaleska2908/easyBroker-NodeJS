import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Empresas from "./empresas.entity";
import Usuarios from "./usuarios.entity";
@Entity("tbl_usuarios_empresas")
class Usuarios_empresas {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @ManyToOne((type) => Usuarios, (usuarios) => usuarios.usr_usuarios_empresas, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "ue_id_usuario_fk" })
    ue_id_usuario_fk: Usuarios;
    @ManyToOne((type) => Empresas, (empresas) => empresas.emp_usuarios_empresas, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "ue_id_empresa_fk" })
    ue_id_empresa_fk: Empresas;
    @CreateDateColumn({ type: "timestamp" })
    criado_em: Date;
    @UpdateDateColumn({ type: "timestamp" })
    atualizado_em: Date;
}
export default Usuarios_empresas;
