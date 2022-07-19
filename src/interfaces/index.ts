export interface IUsuarios {
    usr_nome: string;
    usr_cpf: string;
    usr_email: string;
    usr_senha: string;
    usr_telefone: string;
    usr_status_permissao: number;
    usr_enderecos: any;
}
export interface IEnderecos {
    end_uf: string;
    end_cidade: string;
    end_bairro: string;
    end_rua: string;
    end_numero: string;
    end_cep: string;
}
export interface ICriacaoEnd extends IEnderecos {
    id_usuario: string;
    id_empresa: string;
    id_imovel: string;
}
export interface ILogin {
    usr_cpf: string;
    usr_senha: string;
}
export interface IImoveis {
    imv_inscricao_iptu: string;
    imv_descricao: string;
    imv_status_situacao: number;
    imv_status_condominio: number;
    imv_status_servico: number;
    imv_status_tipo: number;
    imv_status_garagem: number;
    imv_qtde_vagas_garagem: number;
    imv_qtde_quartos: number;
    imv_qtde_banheiros: number;
    imv_qtde_suites: number;
    imv_enderecos: object;
}
export interface ICriacaoImv extends IImoveis {
    id_usuario: string;
    id_empresa: string;
    valor: number;
}
export interface IEmpresas {
    emp_nome_fantasia: string;
    emp_razao_social: string;
    emp_incricao_municipal: string;
    emp_incricao_estadual: string;
    emp_email: string;
    emp_telefone: string;
    emp_cnpj: string;
    emp_enderecos: object;
}
export interface IDataId {
    id: number;
}
export interface IDataUuid {
    id: string;
}
export interface IAgendamentos {
    agn_observacoes: string;
    agn_status_agendamento: number;
    agn_horario_inicio: Date;
    agn_horario_fim: Date;
    agn_id_cliente_fk: string;
    agn_id_empresa_fk: string;
    agn_id_corretor_fk: string;
    ids_imoveis: any;
}
export interface IArrendamentos {
    id_usuario: string;
    id_imovel: string;
    id_empresa: string;
    valor: number;
}
