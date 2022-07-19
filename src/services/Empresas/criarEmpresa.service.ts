import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import Empresas from "../../entities/empresas.entity";
import Enderecos from "../../entities/enderecos.entity";
import Usuarios from "../../entities/usuarios.entity";
import Usuarios_empresas from "../../entities/usuarios_empresas.entity";
import { IEmpresas } from "../../interfaces";
const criarEmpresaService = async ({ emp_nome_fantasia, emp_razao_social, emp_incricao_municipal, emp_incricao_estadual, emp_email, emp_telefone, emp_cnpj, emp_enderecos }: IEmpresas) => {
    const usuario = await cadastrarUsuario({ emp_nome_fantasia, emp_cnpj, emp_email, emp_telefone } as any);
    const empresa = await cadastrarEmpresa({ emp_nome_fantasia, emp_razao_social, emp_incricao_municipal, emp_incricao_estadual, emp_email, emp_telefone, emp_cnpj, emp_enderecos });
    !!emp_enderecos && cadastrarEndereco({ emp_enderecos, usuario, empresa });
    const pivoRepository = AppDataSource.getRepository(Usuarios_empresas);
    const dadosPìvo = pivoRepository.create({
        ue_id_usuario_fk: usuario,
        ue_id_empresa_fk: empresa,
    } as any);
    await pivoRepository.save(dadosPìvo);
    return empresa;
};
const cadastrarEmpresa = async ({ emp_nome_fantasia, emp_razao_social, emp_incricao_municipal, emp_incricao_estadual, emp_email, emp_telefone, emp_cnpj }: any) => {
    const empresasRepository = AppDataSource.getRepository(Empresas);
    const dadosEmpresa = empresasRepository.create({
        emp_nome_fantasia,
        emp_razao_social,
        emp_incricao_municipal,
        emp_incricao_estadual,
        emp_email,
        emp_telefone,
        emp_cnpj,
    } as any);
    return await empresasRepository.save(dadosEmpresa);
};
const cadastrarUsuario = async ({ emp_nome_fantasia, emp_cnpj, emp_email, emp_telefone }: any) => {
    const usuariosRepository = AppDataSource.getRepository(Usuarios);
    const dadosUsuarios = usuariosRepository.create({
        usr_nome: `Super Admin - ${emp_nome_fantasia}`,
        usr_cpf: `admin-${emp_cnpj}`,
        usr_email: emp_email,
        usr_senha: hashSync(`${emp_cnpj}-admin`, 8),
        usr_telefone: emp_telefone,
        usr_status_permissao: 1,
    } as any);
    return await usuariosRepository.save(dadosUsuarios);
};
const cadastrarEndereco = async ({ emp_enderecos, usuario, empresa }: any) => {
    const { end_uf, end_cidade, end_bairro, end_rua, end_numero, end_cep }: any = emp_enderecos;
    const enderecosRepository = AppDataSource.getRepository(Enderecos);
    const dadosEndereco = enderecosRepository.create({
        end_uf,
        end_cidade,
        end_bairro,
        end_rua,
        end_numero,
        end_cep,
        end_id_empresa_fk: empresa,
        end_id_usuario_fk: usuario,
    } as any);
    return await enderecosRepository.save(dadosEndereco);
};
export default criarEmpresaService;
