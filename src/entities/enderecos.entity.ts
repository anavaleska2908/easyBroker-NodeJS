import { Exclude } from "class-transformer";
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Empresas from "./empresas.entity";
import Imoveis from "./imoveis.entity";
import Usuarios from "./usuarios.entity";
@Entity("tbl_enderecos")
class Enderecos {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @Column({ type: "char", length: 2 })
    end_uf: string;
    @Column({ type: "varchar", length: 100 })
    end_cidade: string;
    @Column({ type: "varchar", length: 100 })
    end_bairro: string;
    @Column({ type: "varchar", length: 200 })
    end_rua: string;
    @Column({ type: "char", length: 10 })
    end_numero: string;
    @Column({ type: "char", length: 15 })
    end_cep: string;
    @ManyToOne((type) => Usuarios, (usuarios) => usuarios.usr_enderecos, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "end_id_usuario_fk" })
    end_id_usuario_fk: Usuarios;
    @ManyToOne((type) => Imoveis, (imoveis) => imoveis.imv_enderecos, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "end_id_imovel_fk" })
    end_id_imovel_fk: Imoveis;
    @ManyToOne((type) => Empresas, (empresas) => empresas.emp_enderecos, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "end_id_empresa_fk" })
    end_id_empresa_fk: Empresas;
    @CreateDateColumn()
    criado_em: Date;
    @UpdateDateColumn()
    atualizado_em: Date;
}
export default Enderecos;
