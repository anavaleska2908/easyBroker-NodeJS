import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Agendamentos from "./agendamentos.entity";
import Imoveis from "./imoveis.entity";
@Entity("tbl_agendamentos_imoveis")
class Agendamentos_imoveis {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @ManyToOne((type) => Agendamentos, (agendamentos) => agendamentos.agn_agendamentos_imoveis, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "ai_id_agendamento_fk" })
    ai_id_agendamento_fk: Agendamentos;
    @ManyToOne((type) => Imoveis, (imoveis) => imoveis.imv_agendamentos_imoveis, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "ai_id_imovel_fk" })
    ai_id_imovel_fk: Imoveis;
    @CreateDateColumn()
    criado_em: Date;
    @UpdateDateColumn()
    atualizado_em: Date;
}
export default Agendamentos_imoveis;
