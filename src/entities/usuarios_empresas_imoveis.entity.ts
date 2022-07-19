import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import Empresas from "./empresas.entity";
import Imoveis from "./imoveis.entity";
import Usuarios from "./usuarios.entity";
@Entity("tbl_usuarios_empresas_imoveis")
class Usuarios_empresas_imoveis {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @ManyToOne((type) => Usuarios, (usuarios) => usuarios.usr_usuarios_empresas_imoveis, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "uei_id_usuario_fk" })
    uei_id_usuario_fk: Usuarios;
    @ManyToOne((type) => Empresas, (empresas) => empresas.emp_usuarios_empresas_imoveis, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "uei_id_empresa_fk" })
    uei_id_empresa_fk: Empresas;
    @ManyToOne((type) => Imoveis, (imoveis) => imoveis.imv_usuarios_empresas_imoveis, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "uei_id_imovel_fk" })
    uei_id_imovel_fk: Imoveis;
    @Column({ type: "decimal", nullable: true, default: null })
    uei_valor_imovel: number;
    @CreateDateColumn()
    criado_em: Date;
    @UpdateDateColumn()
    atualizado_em: Date;
}
export default Usuarios_empresas_imoveis;
