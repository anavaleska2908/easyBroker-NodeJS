import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import Agendamentos_imoveis from "./agendamentos_imoveis.entity";
import Empresas from "./empresas.entity";
import Usuarios from "./usuarios.entity";
@Entity("tbl_agendamentos")
class Agendamentos {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    @ManyToOne((type) => Usuarios, (usuarios) => usuarios.usr_cliente_agendamentos, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "agn_id_cliente_fk" })
    agn_id_cliente_fk: Usuarios;
    @ManyToOne((type) => Empresas, (empresas) => empresas.emp_agendamentos, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "agn_id_empresa_fk" })
    agn_id_empresa_fk: Empresas;
    @ManyToOne((type) => Usuarios, (usuarios) => usuarios.usr_corretor_agendamentos, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "agn_id_corretor_fk" })
    agn_id_corretor_fk: Usuarios;
    @Column({ type: "text", nullable: true, default: null, comment: "Observações feitar ao finalizar o agendamento" })
    agn_observacoes: string;
    @Column({ type: "smallint", default: 1, comment: "0 = Cancelado, 1 = Em Aberto, 2 = Finalizado" })
    agn_status_agendamento: number;
    @Column({ type: "date", comment: "Hora do inicio do agendamento" })
    agn_horario_inicio: Date;
    @Column({ type: "date", comment: "Hora do fim do agendamento" })
    agn_horario_fim: Date;
    @OneToMany((type) => Agendamentos_imoveis, (agendamentos_imoveis) => agendamentos_imoveis.ai_id_agendamento_fk, { eager: true })
    agn_agendamentos_imoveis: Agendamentos_imoveis[];
    @CreateDateColumn()
    criado_em: Date;
    @UpdateDateColumn()
    atualizado_em: Date;
}
export default Agendamentos;
