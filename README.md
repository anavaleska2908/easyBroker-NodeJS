<h1 align="center">
  EasyBroker - API
</h1>
<h3 align="center">Projeto de RESTFUL API criado na conclusão do módulo de Back End com NodeJS</h3>
<br/>
<p>
Seu objetivo é o gerenciamento de imóveis, clientes, empresas e corretores. Nele é possível cadastrar clientes, corretores, empresas, endereços dos imóveis, marcar e cancelar visitas.
</p>  
<p>
Os corretores podem estar vinculados a uma empresa ou ser sua própria empresa. Os clientes podem cadastrar seu imóvel à procura de um corretor ou agendarem uma visita à um imóvel pré-cadastrado. Bem como os imóveis podem ser cadastrados para locação ou venda.
</p> 

<br/>

## **Tecnologias utilizadas:**
- Node.js
- Express
- Typescript
- PostgreSQL

<br/>

## **Endpoints:**
A API tem, em seu total, 32 endpoints, permeando entre criação de usuários, empresas, imóveis, bem como locação, venda e arrendamentos. <br/>

O url base da API é https://api-easybroker.herokuapp.com/

<br/>
<hr/>

## Rotas que não precisam de autenticação
<hr/>
<br/>
  
<h2 align ='center'>Criação de usuários</h2>

`POST /usuarios/ - FORMATO DA REQUISIÇÃO`
```json
{
	"nome": "Nome teste",
	"cpf": "12345678913",
	"email": "nometeste@teste.com",
	"senha": "123456",
	"telefone": "41992232701",
	"status_permissao": 0,
	"endereco":{
   			"uf":"SP",
        "cidade":"São Paulo",
        "bairro":"São Matheus",
        "rua":"Orlindo de Carvalho",
        "numero":"2545",
        "cep":"78998238"
    }
}
```

Caso dê tudo certo, a resposta será assim:

`POST /usuarios/ - FORMATO DA RESPOSTA - STATUS 201`
```json
{
	"nome": "Nome teste",
	"cpf": "12345678913",
	"email": "nometeste@teste.com",
	"senha": "123456",
	"telefone": "41992232701",
	"status_permissao": 0,
	"id": "e70c7600-862f-4a0e-82ad-23f366468070",
	"criado_em": "2022-07-20T00:26:30.527Z",
	"atualizado_em": "2022-07-20T00:26:30.527Z"
}
```
1. O campo - "status_permissao" define se o usuário será um usuário comum ou um administrador, da seguinte forma:
   1. "status_permissao": 0 = usuário comum
   2. "status_permissao": 1 = administrador

<h2 align ='center'>Possíveis erros:</h2>
Caso acabe errando, deixando de passar algum dos campos obrigatórios ou passando um CPF já existente, a resposta de erro será assim:

<br/>Campos Obrigatórios no `POST /usuarios/`: "nome", "cpf", "email", "senha", "telefone", "status_permissao".

No exemplo, a requisição foi feita faltando o campo "nome":
`POST /usuarios/ - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"status": "error",
	"message": " 'nome' não informado!"
}
``` 

Neste outro exemplo, a requisição foi feita com um CPF já cadastrado:

`POST /usuarios/ - FORMATO DA RESPOSTA - STATUS 409`

```json
{
  "status": "error",
  "message": "CPF já cadastrado!"
}
```
<br/>

<h2 align = "center"> Login do usuário</h2>

`POST /login/ - FORMATO DA REQUISIÇÃO`
```json
{
  "cpf": "12345678913",
  "senha": "123456"
}
```

Caso dê tudo certo, a resposta será assim:
`POST /login/ - FORMATO DA RESPOSTA - STATUS 200`
```json
{
  "usuario": {
		"id": "3beea3f4-4582-452c-8b58-e925ed85077d",
		"nome": "Nome test",
		"cpf": "12345678912                                       ",
		"email": "nometeste@teste.com",
		"telefone": "41992232701  ",
		"status_permissao": 1,
		"enderecos": [
			{
				"id": "ccdd4be9-166e-4ea5-b94a-3907a34a39c7",
				"uf": "SP",
				"cidade": "São Paulo",
				"bairro": "São Matheus",
				"rua": "Orlindo de Carvalho",
				"numero": "2545      ",
				"cep": "78998238       ",
				"criado_em": "2022-07-20T00:25:50.195Z",
				"atualizado_em": "2022-07-20T00:25:50.195Z"
			}
		],
		"cliente_agendamentos": [],
		"corretor_agendamentos": [],
		"usuarios_empresas": [],
		"usuarios_empresas_imoveis": []
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiIxMjM0NTY3ODkxMiIsInNlbmhhIjoiMTIzNDU2IiwiaWF0IjoxNjU4Mjc3MTgwLCJleHAiOjE2NTgzNjM1ODB9.w_rUTKgp7h4u_ejYJrpqAeE43GKKx1eORNudasUB2nA"

}
```
<h2 align ='center'>Possíveis erros:</h2>
Caso o usuário passe o "cpf" ou "senha" errados, a resposta de erro será assim:

<br/>Campos Obrigatórios no `POST /login/`: "cpf" e "senha".

No exemplo, a requisição foi feita faltando o campo "nome":
`POST /login/ - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"status": "error",
	"message": "Usuário ou Senha incorretos!"
}
``` 

<h2 align ='center'>Criação de empresas</h2>

`POST /empresas/ - FORMATO DA REQUISIÇÃO`
```json
{
    "nome_fantasia": "Test Houses",
    "razao_social": "Test Houses LTDA.",
    "cnpj": "1236547811469",
    "inscricao_municipal": "173756",
    "inscricao_estadual": "154987564123",
    "email": "testhouses@test.com",
    "telefone": "41987785254",
		"endereco":{
					"uf":"SP",
					"cidade":"São Paulo",
					"bairro":"São Matheus",
					"rua":"Orlindo de Carvalho",
					"numero":"2545",
					"cep":"78998238"
			}
}
```

Caso dê tudo certo, a resposta será assim:
`POST /empresas/ - FORMATO DA RESPOSTA - STATUS 201`
```json
{
	"nome_fantasia": "Test Houses",
	"razao_social": "Test Houses LTDA.",
	"incricao_municipal": "173756",
	"incricao_estadual": "154987564123",
	"email": "testhouses@test.com",
	"telefone": "41987785254",
	"cnpj": "1236547811468",
	"id": "f65b8d8b-22ef-4793-9bdd-4f52c3d09ba4",
	"criado_em": "2022-07-20T01:21:56.232Z",
	"atualizado_em": "2022-07-20T01:21:56.232Z"
}
```

<h2 align ='center'>Possíveis erros:</h2>
Caso acabe errando, deixando de passar algum dos campos obrigatórios ou passando um CNPJ já cadastrado, a resposta de erro será assim:

<br/> 
Campos Obrigatórios na criação de uma empresa: 

	- "nome_fantasia"
	-  "razao_social" 
	-  "cnpj"
	-  "inscricao_municipal"
	-  "inscricao_estadual"
	-  "email"
	-  "telefone"

No exemplo, a requisição foi feita faltando o campo "nome_fantasia":

`POST /empresas/ - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"status": "error",
	"message": " 'nome_fantasia' não informado!"
}
``` 

No exemplo, a requisição foi feita usando um CNPJ já cadastrado:

`POST /empresas/ - FORMATO DA RESPOSTA - STATUS 409`

```json
{
	"status": "error",
	"message": "CNPJ já cadastrado!"
}
```
<br/>
<hr/>

## Rotas que necessitam de autorização
<hr/>


Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:
> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir listar todos os usuários cadastrados, listar, atualizar e deletar um usuário específico.

<h2 align ='center'> Listando usuários </h2>
Aqui conseguimos ver todas os usuários cadastrados.

`GET /usuarios/ - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": "4d315144-a5d6-434b-bb90-462bf33c40af",
		"nome": "Nome test",
		"cpf": "12345678912                                       ",
		"email": "nometeste@teste.com",
		"telefone": "41992232701  ",
		"status_permissao": 1,
		"enderecos": [
			{
				"id": "d73aa809-4f99-4b8a-a76b-6d1a67e24fa6",
				"uf": "SP",
				"cidade": "São Paulo",
				"bairro": "São Matheus",
				"rua": "Orlindo de Carvalho",
				"numero": "2545",
				"cep": "78998238",
				"criado_em": "2022-07-20T01:00:50.706Z",
				"atualizado_em": "2022-07-20T01:00:50.706Z"
			}
		],
		"cliente_agendamentos": [],
		"corretor_agendamentos": [],
		"usuarios_empresas": [],
		"usuarios_empresas_imoveis": []
	},
]

```

<h2 align ='center'> Listando um usuário </h2>
Você também pode listar um usuário específico, com o seguinte endpoint:

`GET /usuarios/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "4d315144-a5d6-434b-bb90-462bf33c40af",
	"nome": "Nome test",
	"cpf": "12345678912",
	"email": "nometeste@teste.com",
	"telefone": "41992232701  ",
	"status_permissao": 1,
	"enderecos": [
		{
			"id": "d73aa809-4f99-4b8a-a76b-6d1a67e24fa6",
			"uf": "SP",
			"cidade": "São Paulo",
			"bairro": "São Matheus",
			"rua": "Orlindo de Carvalho",
			"numero": "2545",
			"cep": "78998238",
			"criado_em": "2022-07-20T01:00:50.706Z",
			"atualizado_em": "2022-07-20T01:00:50.706Z"
		}
	],
	"cliente_agendamentos": [],
	"corretor_agendamentos": [],
	"usuarios_empresas": [],
	"usuarios_empresas_imoveis": []
}

```

<h2 align ='center'> Atualizando dados de um usuário </h2>
Há a possibilidade de atualizar os dados de um usuário específico, com o seguinte endpoint:

`PATCH /usuarios/:id - FORMATO DA REQUISIÇÃO`

```json

{
	"nome": "Nome Teste Atualizado"
}

```

Caso dê tudo certo, a resposta será assim:

`PATCH /usuarios/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "4d315144-a5d6-434b-bb90-462bf33c40af",
	"nome": "Nome Teste Atualizado",
	"cpf": "12345678912",
	"email": "nometeste@teste.com",
	"telefone": "41992232701  ",
	"status_permissao": 1,
	"enderecos": [
		{
			"id": "d73aa809-4f99-4b8a-a76b-6d1a67e24fa6",
			"uf": "SP",
			"cidade": "São Paulo",
			"bairro": "São Matheus",
			"rua": "Orlindo de Carvalho",
			"numero": "2545",
			"cep": "78998238",
			"criado_em": "2022-07-20T01:00:50.706Z",
			"atualizado_em": "2022-07-20T01:00:50.706Z"
		}
	],
	"cliente_agendamentos": [],
	"corretor_agendamentos": [],
	"usuarios_empresas": [],
	"usuarios_empresas_imoveis": []
}

```

O campo CPF não pode ser alterado. Caso tente, o erro retornado será assim:

`PATCH /usuarios/:id - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"status": "error",
	"message": " 'cpf' não pode ser alterado!"
}
``` 

<h2 align ='center'> Deletando um usuário </h2>
Também é possível deletar um usuário, utilizando esse endpoint:

`DELETE /usuarios/:id`
```
Não é necessário um corpo da requisição.
```

Caso tudo dê certo, o status de retorno será 204.

Se um id de usuário não existente for passado, o erro retornado será assim:

`DELETE /usuarios/:id - FORMATO DA RESPOSTA - STATUS 404`

```json
{
	"status": "error",
	"message": "Não encontrado!"
}
``` 

<h2 align ='center'> Listando empresas </h2>
Aqui conseguimos ver todas as empresas cadastradas.

`GET /empresas - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": "cf60185c-e1de-46c3-ab37-e47842f70dd0",
		"nome_fantasia": "Test Houses",
		"razao_social": "Test Houses LTDA.",
		"incricao_municipal": "173756",
		"incricao_estadual": "154987564123",
		"email": "testhouses@test.com",
		"telefone": "41987785254  ",
		"cnpj": "1236547811468 ",
		"criado_em": "2022-07-20T01:07:29.092Z",
		"atualizado_em": "2022-07-20T01:07:29.092Z",
		"enderecos": [
			{
				"id": "49df4a18-be8a-4e24-b4c6-95a98135a887",
				"uf": "SP",
				"cidade": "São Paulo",
				"bairro": "São Matheus",
				"rua": "Orlindo de Carvalho",
				"numero": "2545      ",
				"cep": "78998238       ",
				"criado_em": "2022-07-20T01:07:29.127Z",
				"atualizado_em": "2022-07-20T01:07:29.127Z"
			}
		],
		"agendamentos": [],
		"usuarios_empresas": [
			{
				"id": "6f44a9ea-848e-4460-be1e-78b911aa00b3",
				"criado_em": "2022-07-20T01:07:29.274Z",
				"atualizado_em": "2022-07-20T01:07:29.274Z"
			}
		],
		"usuarios_empresas_imoveis": []
	}
]

```

<h2 align ='center'> Listando uma empresa </h2>
Você também pode listar uma empresa específica, com o seguinte endpoint:

`GET /empresas/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "cf60185c-e1de-46c3-ab37-e47842f70dd0",
	"nome_fantasia": "Test Houses",
	"razao_social": "Test Houses LTDA.",
	"incricao_municipal": "173756",
	"incricao_estadual": "154987564123",
	"email": "testhouses@test.com",
	"telefone": "41987785254  ",
	"cnpj": "1236547811468 ",
	"criado_em": "2022-07-20T01:07:29.092Z",
	"atualizado_em": "2022-07-20T01:07:29.092Z",
	"enderecos": [
		{
			"id": "49df4a18-be8a-4e24-b4c6-95a98135a887",
			"uf": "SP",
			"cidade": "São Paulo",
			"bairro": "São Matheus",
			"rua": "Orlindo de Carvalho",
			"numero": "2545",
			"cep": "78998238",
			"criado_em": "2022-07-20T01:07:29.127Z",
			"atualizado_em": "2022-07-20T01:07:29.127Z"
		}
	],
	"agendamentos": [],
	"usuarios_empresas": [
		{
			"id": "6f44a9ea-848e-4460-be1e-78b911aa00b3",
			"criado_em": "2022-07-20T01:07:29.274Z",
			"atualizado_em": "2022-07-20T01:07:29.274Z"
		}
	],
	"usuarios_empresas_imoveis": []
}

```

<h2 align ='center'> Atualizando dados de uma empresa</h2>
Há a possibilidade de atualizar os dados de uma empresa específica, com o seguinte endpoint:

`PATCH /empresas/:id - FORMATO DA REQUISIÇÃO`

```json

{
	"nome_fantasia": "Nome Fantasia Teste Atualizado"
}

```

Caso dê tudo certo, a resposta será assim:

`PATCH /usuarios/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "cf60185c-e1de-46c3-ab37-e47842f70dd0",
	"nome_fantasia": "Nome Fantasia Teste Atualizado",
	"razao_social": "Test Houses LTDA.",
	"incricao_municipal": "173756",
	"incricao_estadual": "154987564123",
	"email": "testhouses@test.com",
	"telefone": "41987785254  ",
	"cnpj": "1236547811468 ",
	"criado_em": "2022-07-20T01:07:29.092Z",
	"atualizado_em": "2022-07-20T01:07:29.092Z",
	"enderecos": [
		{
			"id": "49df4a18-be8a-4e24-b4c6-95a98135a887",
			"uf": "SP",
			"cidade": "São Paulo",
			"bairro": "São Matheus",
			"rua": "Orlindo de Carvalho",
			"numero": "2545",
			"cep": "78998238",
			"criado_em": "2022-07-20T01:07:29.127Z",
			"atualizado_em": "2022-07-20T01:07:29.127Z"
		}
	],
	"agendamentos": [],
	"usuarios_empresas": [
		{
			"id": "6f44a9ea-848e-4460-be1e-78b911aa00b3",
			"criado_em": "2022-07-20T01:07:29.274Z",
			"atualizado_em": "2022-07-20T01:07:29.274Z"
		}
	],
	"usuarios_empresas_imoveis": []
}

```


O campo CNPJ não pode ser alterado. Caso tente, o erro retornado será assim:

`PATCH /empresas/:id - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"status": "error",
	"message": " 'cnpj' não pode ser alterado!"
}
``` 


<h2 align ='center'> Deletando uma empresa </h2>
Também é possível deletar uma empresa, utilizando esse endpoint:

`DELETE /empresas/:id`
```
Não é necessário um corpo da requisição.
```

Caso tudo dê certo, o status de retorno será 204.

Se um id de empresa não existente for passado, o erro retornado será assim:

`DELETE /empresas/:id - FORMATO DA RESPOSTA - STATUS 404`

```json
{
	"status": "error",
	"message": "Não encontrado!"
}
``` 

<br/><br/>
<h2 align ='center'>Criação de Imóveis</h2>
Nos dados do usuário, é necessário passar o id do usuário ao qual o imóvel estará ligado, ou seja, seu dono.

`POST /imoveis/ - FORMATO DA REQUISIÇÃO`
```json
{
    "inscricao_imobiliaria":"00650941",
    "descricao":"Imovel novinho, reformado recentemente e passou apenas por um dono!",
    "status_situacao":1,
    "status_condominio":0,
    "status_tipo":1,
    "status_servico":0,
    "qtde_quartos":3,
    "qtde_banheiros":2,
    "qtde_suites":1,
		"status_garagem":0,
		"qtde_vagas_garagem":2,
		"valor":900,
    "usuario":"3beea3f4-4582-452c-8b58-e925ed85077d",
    "endereco":{
        "uf":"SP",
        "cidade":"São Paulo",
        "bairro":"São Matheus",
        "rua":"Orlindo de Carvalho",
        "numero":"2545",
        "cep":"78998238"
    }
}
```
1. O campo - "status_situacao" define a situação do imóvel no sistema, da seguinte forma:
   1. "status_situacao": 0 = imóvel finalizado
   2. "status_situacao": 1 = imóvel disponível

2. O campo - "status_condominio" define se o imóvel se encontra em um condomínio, da seguinte forma:
    1. "status_condominio": 0 = não está em um condomínio
    2. "status_condominio": 1 = está em um condomínio

3. O campo - "status_tipo" define o tipo do imóvel, da seguinte forma:
    1. "status_tipo": 0 = apartamento
    2. "status_tipo": 1 = casa
    3. "status_tipo": 1 = kitnet

4. O campo - "status_servico" define se o imóvel está para locação ou venda, da seguinte forma:
    1. "status_servico": 0 = locação
    2. "status_servico": 1 = venda

5. O campo - "status_garagem" define se há garagem no imóvel. Caso sim, para quais tipos de automóveis, da seguinte forma:
    1. "status_garagem": 0 = não possui garagem
    2. "status_garagem": 1 = possui garagem para carro
    3. "status_garagem": 2 = possui garagem para moto
    4. "status_garagem": 3 = possui garagem para carro e moto

Caso dê tudo certo, a resposta será assim:
`POST /imoveis/ - FORMATO DA RESPOSTA - STATUS 201`
```json
{
	"inscricao_iptu": "00650941",
	"descricao":"Imovel novinho, reformado recentemente e passou apenas por um dono!",
	"status_situacao": 1,
	"status_condominio": 0,
	"status_servico": 0,
	"status_tipo": 1,
	"status_garagem": 0,
	"qtde_quartos": 3,
	"qtde_suites": 1,
	"qtde_banheiros": 2,
	"qtde_vagas_garagem": 2,
	"enderecos": [
		{
			"id": "29c39f9f-85ef-4827-93a5-83a4e02d4fa4",
			"uf": "SP",
			"cidade": "São Paulo",
			"bairro": "São Matheus",
			"rua": "Orlindo de Carvalho",
			"numero": "2545",
			"cep": "78998238",
			"criado_em": "2022-07-20T13:40:34.292Z",
			"atualizado_em": "2022-07-20T13:40:34.292Z"
		}
	],
	"id": "525eb41e-2e4e-4af0-81fc-4d9d0fc1c187",
	"criado_em": "2022-07-20T13:40:34.313Z",
	"atualizado_em": "2022-07-20T13:40:34.313Z"
}
```

<h2 align ='center'>Possíveis erros:</h2>
Caso acabe errando, deixando de passar algum dos campos obrigatórios ou passando uma Inscrição Imobiliária já cadastrada, a resposta de erro será assim:

<br/>Campos Obrigatórios no `POST /imoveis/`: "inscricao_imobiliaria", "descricao", "valor", "status_situacao", "status_condominio", "status_servico", "qtde_quartos", "status_tipo", "qtde_banheiros", "qtde_suites", "status_garagem", "qtde_vagas_garagem", "endereco".

No exemplo, a requisição foi feita faltando o campo "inscricao_imobiliaria":
`POST /imoveis/ - `
```FORMATO DA RESPOSTA - STATUS 400```
```json
{
	"status": "error",
	"message": " 'inscricao_imobiliaria' não informado!"
}
``` 

Inscrição Imobiliária já cadastrada:

`POST /empresas - `
``  FORMATO DA RESPOSTA - STATUS 409``
```json
{
	"status": "error",
	"message": "Inscrição imobiliaria já cadastrada!"
}
```

<h2 align ='center'> Listando imóveis </h2>
Aqui conseguimos ver todos os imóveis cadastrados.

`GET /imoveis - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": "1f6ebf3e-71f3-45aa-bc08-22dd080b3472",
		"inscricao_iptu": "00650942                                          ",
		"descricao": "Imovel novinho, reformado recentemente e passou apenas por um dono!",
		"status_situacao": 1,
		"status_condominio": 0,
		"status_servico": 0,
		"status_tipo": 1,
		"status_garagem": 0,
		"qtde_quartos": 3,
		"qtde_suites": 1,
		"qtde_banheiros": 2,
		"qtde_vagas_garagem": 2,
		"criado_em": "2022-07-20T13:40:17.528Z",
		"atualizado_em": "2022-07-20T13:40:17.528Z",
		"agendamentos_imoveis": [],
		"usuarios_empresas_imoveis": [
			{
				"id": "c18cda6e-3cc5-417a-bcba-7778dc8b6e73",
				"valor_imovel": "900",
				"criado_em": "2022-07-20T13:40:17.552Z",
				"atualizado_em": "2022-07-20T13:40:17.552Z"
			}
		]
	},
]

```

<h2 align ='center'> Listando um imóvel </h2>
Você também pode listar um imóvel específico, com o seguinte endpoint:

`GET /imovel/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "1f6ebf3e-71f3-45aa-bc08-22dd080b3472",
	"inscricao_iptu": "00650942                                          ",
	"descricao": "Imovel novinho, reformado recentemente e passou apenas por um dono!",
	"status_situacao": 1,
	"status_condominio": 0,
	"status_servico": 0,
	"status_tipo": 1,
	"status_garagem": 0,
	"qtde_quartos": 3,
	"qtde_suites": 1,
	"qtde_banheiros": 2,
	"qtde_vagas_garagem": 2,
	"criado_em": "2022-07-20T13:40:17.528Z",
	"atualizado_em": "2022-07-20T13:40:17.528Z",
	"agendamentos_imoveis": [],
	"usuarios_empresas_imoveis": [
		{
			"id": "c18cda6e-3cc5-417a-bcba-7778dc8b6e73",
			"valor_imovel": "900",
			"criado_em": "2022-07-20T13:40:17.552Z",
			"atualizado_em": "2022-07-20T13:40:17.552Z"
		}
	]
}

```

<h2 align ='center'> Atualizando dados de um imóvel</h2>
Você pode atualizar os dados de um imóvel específico, com o seguinte endpoint:

`PATCH /imoveis/:id - FORMATO DA REQUISIÇÃO`

```json

{
	"nome_fantasia": "Nome Fantasia Teste Atualizado"
}

```

Caso dê tudo certo, a resposta será assim:

`PATCH /usuarios/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "cf60185c-e1de-46c3-ab37-e47842f70dd0",
	"nome_fantasia": "Nome Fantasia Teste Atualizado",
	"razao_social": "Test Houses LTDA.",
	"incricao_municipal": "173756",
	"incricao_estadual": "154987564123",
	"email": "testhouses@test.com",
	"telefone": "41987785254  ",
	"cnpj": "1236547811468 ",
	"criado_em": "2022-07-20T01:07:29.092Z",
	"atualizado_em": "2022-07-20T01:07:29.092Z",
	"enderecos": [
		{
			"id": "49df4a18-be8a-4e24-b4c6-95a98135a887",
			"uf": "SP",
			"cidade": "São Paulo",
			"bairro": "São Matheus",
			"rua": "Orlindo de Carvalho",
			"numero": "2545",
			"cep": "78998238",
			"criado_em": "2022-07-20T01:07:29.127Z",
			"atualizado_em": "2022-07-20T01:07:29.127Z"
		}
	],
	"agendamentos": [],
	"usuarios_empresas": [
		{
			"id": "6f44a9ea-848e-4460-be1e-78b911aa00b3",
			"criado_em": "2022-07-20T01:07:29.274Z",
			"atualizado_em": "2022-07-20T01:07:29.274Z"
		}
	],
	"usuarios_empresas_imoveis": []
}

```


O campo Inscrição Imobiliária não pode ser alterado. Caso tente, o erro retornado será assim:

`PATCH /imoveis/:id - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"status": "error",
	"message": " 'cnpj' não pode ser alterado!"
}
``` 


<h2 align ='center'> Deletando uma empresa </h2>
Também é possível deletar uma empresa, utilizando esse endpoint:

`DELETE /empresas/:id`
```
Não é necessário um corpo da requisição.
```

Caso tudo dê certo, o status de retorno será 204.

Se um id de empresa não existente for passado, o erro retornado será assim:

`DELETE /empresas/:id - FORMATO DA RESPOSTA - STATUS 404`

```json
{
	"status": "error",
	"message": "Não encontrado!"
}
``` 
