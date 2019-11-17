# supermercadoDart
Aplicação construída como teste prático de processo seletivo da empresa Dart Digital.

Funcionalidades:
	
	• Controle de acesso: Autenticação com JWT.
	• CRUD de Produtos.

Tecnologias utilizadas:
	
	• Front-End: Angular 6.1.10
	• Back-End: .Net Core 2.2.0
	• ORM: Entity Framework Core
	• Banco de dados: MSSQL Server(Express)

Instruções para execução:
	
	1. Utilizar IDE Visual Studio e SGBD SqlServer Management Studio.
	2. Criar a base de dados (script localizado em "SupermercadoDart/Utils/script.sql").
	3. Altere a string de conexão da base de dados em "SupermercadoDart/appsettings.json".
	4. Altere a url da api no arquivo "SupermercadoDart/ClientApp/src/environments/environment.ts".
	5. Execute os seguintes comandos em sequência no diretório "SupermercadoDart/ClientApp":
		a. "npm install" ;
		b. "ng build".
	6. Execute a aplicação e realize login com as seguintes credencias:
		a. Usuário: igorbrandao00@gmail.com
		b. Senha: 123456

