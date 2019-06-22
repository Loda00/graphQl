create table topic(
  id SERIAL PRIMARY KEY,
  description varchar(100) not null
);

INSERT INTO topic(description) values('Programación'),('Diseño'),('Electrónica')
select * from topic

create table course(
  id SERIAL PRIMARY KEY,
  title varchar(100) not null,
  teacher varchar(100) not null,
  description varchar(100),
  topic int REFERENCES topic (id)
);

INSERT INTO course(title, teacher, description, topic) values
('Introduccin a la algoritmia', 'Juan', 'iniciando con la programación', 1),
('Dibujo', 'Chato', 'como hacer sombras', 2),
('Introducción a la electricidad', 'Jirafales', 'conociendo la electricidad', 3)

UPDATE course set description = 'Iniciando con la programación' where id = 1;

select * from course
