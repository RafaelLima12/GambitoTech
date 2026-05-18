-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/
create database gambitoTech;

use gambitoTech;

create table usuario(
	id int primary key auto_increment,
    nome varchar(200) not null,
    email varchar(200) not null unique,
    senha varchar(50) not null,
    imagem varchar(200),
    rating int default (300) check(rating >= 0),
    dtCadastro date default (current_date())
);
    
create table exercicio(
	id int primary key auto_increment,
    img varchar(200),
    nome varchar(40),
    resposta varchar(40),
    descricao varchar (200),
    rating int
);

create table tipoExercicio(
	id int primary key auto_increment,
    tipo varchar(50)
);

alter table exercicio add column fkTipo int, add foreign key(fkTipo) references tipoExercicio(id);

create table exerciciosRespondidos(
	id int primary key auto_increment,
	fkUsuario int,
    fkExercicio int,
    ratingUserDepois int,
    acertou tinyint check (acertou in(0, 1)),
    dataRegistro date default (current_date),
    foreign key(fkUsuario) references usuario(id),
    foreign key(fkExercicio) references exercicio(id)
);

    
INSERT INTO usuario (nome, email, senha) 
	VALUES ('Magnus Carlsen', 'carlsen@gmail.com', '123456'),
		   ('Garry Kasparov', 'kasparov@gmail.com', '123456'),
		   ('Bobby Fischer', 'fischer@gmail.com', '123456'),
		   ('Hikaru Nakamura', 'nakamura@gmail.com', '123456'),
		   ('Fabiano Caruana', 'caruana@gmail.com', '123456'),
		   ('Viswanathan Anand', 'anand@gmail.com', '123456'),
		   ('Ding Liren', 'ding@gmail.com', '123456'),
		   ('Ian Nepomniachtchi', 'nepo@gmail.com', '123456'),
           ('Rafael Santana Lima', 'rafaellima120407@gmail.com', '123456@');    
           
           
insert into tipoExercicio(tipo)
	values('Notação'),
		  ('Temas taticos');

insert into exercicio(img, nome, resposta, descricao, rating, fKTipo)
	values('/assets/imgs_exercicios/img_notacao/notacao1.png', 'Notação com o cavalo', 'Cf3', 'Didite a notação correta referente a imagem a cima', 200, 1),
		  ('/assets/imgs_exercicios/img_notacao/notacao2.png', 'Notação com o peão', 'e4', 'Digite a notação correta para aumentar o seu rating', 250, 1),
          ('/assets/imgs_exercicios/img_notacao/notacao3.png','Notação com a dama', 'Dd5', 'Qual a notação correta referente a casa que a dama vai?', 200, 1),
          ('/assets/imgs_exercicios/img_notacao/notacao4.png', 'Notacao com a torre', 'Th5', 'Qual a notacao correta para a situação apresentada?', 250, 1),
          ('/assets/imgs_exercicios/img_notacao/notacao5.png', 'Notacao com o bispo', 'Bg7', 'Qual é a notação correta para a situação a cima?', 200, 1),
          ('/assets/imgs_exercicios/img_taticos/xeque_mate1.png', 'Jogam as brancas', 'Td8#', 'Encontre O MELHOR lance para as brancas', 300, 2),
          ('/assets/imgs_exercicios/img_taticos/xeque_mate2.png', 'Jogam as pretas', 'Dxb2#', 'Encontre O MELHOR lance para as pretas', 420, 2),
          ('/assets/imgs_exercicios/img_taticos/xeque_mate3.png', 'Jogam as pretas', 'Ta8+', 'Encontre O MELHOR lance para as pretas', 1000, 2),
          ('/assets/imgs_exercicios/img_taticos/xeque_mate4.png', 'Jogam as brancas', 'Cf7#', 'Encontre O MELHOR lance para as brancas', 450, 2);

select * from exercicio;

select * from usuario;

select * from exerciciosRespondidos;



SELECT 
    SUM(CASE WHEN acertou = 1 THEN 1 ELSE 0 END) AS total_acertos,
    SUM(CASE WHEN acertou = 0 THEN 1 ELSE 0 END) AS total_erros
FROM exerciciosRespondidos
WHERE fkUsuario = 9;


select te.tipo,
truncate(sum(er.acertou) / count(*) * 100, 2) proporcao_resposta_acerto
from exerciciosRespondidos er
join exercicio ex
on er.fkExercicio = ex.id
join tipoExercicio te
on te.id = ex.fkTipo
where fkUsuario = 9
group by fkTipo
order by proporcao_resposta_acerto asc
limit 1;


select 
sum(case when acertou > 0 then 1 else 0 end) acertos, 
sum(case when acertou < 1 then 1 else 0 end) erros 
from exerciciosRespondidos
where fkUsuario = 9;


select id, ratingUserDepois, date_format(dataRegistro, '%d/%m/%Y') dataRegistro from exerciciosRespondidos where fkUsuario = 9;

select * from exerciciosRespondidos;

select * from usuario;

select 
sum(case when acertou > 0 then 1 else 0 end) acertos, 
sum(case when acertou < 1 then 1 else 0 end) erros,
max(ratingUserDepois),
(select date_format(dataRegistro, '%d/%m/%Y') 
from exerciciosRespondidos 
where fkUsuario = 9 
order by ratingUserDepois desc 
limit 1)data_maior_rating 
from exerciciosRespondidos
where fkUsuario = 9;
