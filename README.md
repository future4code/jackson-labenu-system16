## LabenuSystem:

Você estuda na Labenu_ há tanto tempo que já parecem anos, não é? Então, hoje, vamos pedir para criar um sistema que represente o básico da nossa organização. 

Ele deve possuir, ao menos, as 3 entidades importantes:

1. Estudantes 

    Representa estudantes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e os principais hobbies dele. 

2. Docente

    Representa docentes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e todas as especialidades dele. Há 7 especialidades: React, Redux, CSS, Testes, Typescript, Programação Orientada a Objetos e Backend

3. Turma

    Toda turma é composta das seguintes características: id, nome, data de início, data de término, lista de professores responsáveis, uma lista de alunos e módulo atual em que a turma está.

    O módulo pode assumir os valores de 1 a 7 ou `undefined`, indicando que as aulas dessa turma ainda não começaram. Para esse exercício, vamos considerar que existam dois tipos de turma: integral ou noturna. Há uma restrição para o nome das turmas noturnas: tem que terminar com `-na-night`.

As funcionalidades básicas são:

→ Criar estudante;

→ Criar docente;

→ Criar turma;

→ Adicionar estudante na turma;

→ Adicionar docente na turma;

→ Pegar a idade de algum estudante a partir do id

***
# ESTRUTURA DE DADOS

### ✣ ESTUDANTE
◦ ID <br>
◦ Nome <br>
◦ E-mail <br>
◦ Data de nascimento <br>
◦ Hobbies <br>

### ✣ DOCENTE
◦ ID <br>
◦ Nome <br>
◦ E-mail <br>
◦ Data de nascimento <br>
◦ Especialidades <br>

### ✣ TURMA
◦ ID <br>
◦ Nome <br>
◦ Data de início <br>
◦ Data de encerramento <br>
◦ Módulo <br>

***
# CRIAÇÃO DE TABELAS - MySql

CREATE TABLE labenu_missions (<br>
    id INT(64) PRIMARY KEY,<br>
    name VARCHAR(128) NOT NULL,<br>
    start DATE NOT NULL,<br>
    end DATE NOT NULL,<br>
    module INT(12)<br>
);<br>

CREATE TABLE labenu_students (<br>
    id INT(64) PRIMARY KEY,<br>
    name VARCHAR(128) NOT NULL,<br>
    email VARCHAR(64) NOT NULL,<br>
    birthdate DATE NOT NULL,<br>
    mission_id INT(64), <br>
    FOREIGN KEY(mission_id) REFERENCES labenu_missions(id)
);<br>

CREATE TABLE labenu_hobbies (<br>
    id INT(12) PRIMARY KEY,<br>
    hobby VARCHAR(256) NOT NULL UNIQUE, <br>
);<br>

CREATE TABLE labenu_students_hobbies (<br>
    hobby_id INT(12) PRIMARY KEY,<br>
    student_id INT(64) NOT NULL UNIQUE,<br>
    FOREIGN KEY(student_id) REFERENCES labenu_students(id) <br>
    FOREIGN KEY(hobby_id) REFERENCES labenu_hobbies(id) <br>
);<br>

CREATE TABLE labenu_teachers (<br>
    id INT(64) PRIMARY KEY,<br>
    name VARCHAR(128) NOT NULL,<br>
    email VARCHAR(64) NOT NULL,<br>
    birthdate DATE NOT NULL,<br>
    speciality VARCHAR(256) NOT NULL, <br>
    mission_id INT(64), <br>
    FOREIGN KEY(speciality) REFERENCES labenu_specialities(speciality),<br>
    FOREIGN KEY(mission_id) REFERENCES labenu_missions(id)
);<br>

CREATE TABLE labenu_specialities (<br>
    id INT(12) PRIMARY KEY,<br>
    speciality VARCHAR(12) NOT NULL UNIQUE <br>
);<br>

CREATE TABLE labenu_teachers_specialities (<br>
    speciality_id INT(64) PRIMARY KEY,<br>
    teacher_id INT(64) NOT NULL UNIQUE,<br>
    FOREIGN KEY(teacher_id) REFERENCES labenu_teachers(id), <br>
    FOREIGN KEY(speciality_id) REFERENCES labenu_specialities(id) <br>
);<br>

***
# ENDPOINTS

### ✣ Criar turma
- Método: PUT <br>
- Path: /mission <br>
- Body: <br>
    - name (obrigatório) <br>
    - start (obrigatório; formato DD/MM/YYYY) <br>
    - end (obrigatório formato DD/MM/YYYY) <br>
    - module (obrigatório) <br>

### ✣ Criar estudante
- Método: PUT <br>
- Path: /student <br>
- Body: <br>
    - name (obrigatório) <br>
    - email (obrigatório) <br>
    - birthdate (obrigatório formato DD/MM/YYYY) <br>
    - hobbies (obrigatório) <br>

### ✣ Adicionar estudante à turma
- Método: POST <br>
- Path: /student/edit/:id <br>
- Body: <br>
    - id (obrigatório) <br>
    - missionId (obrigatório) <br>

### ✣ Criar professor
- Método: PUT <br>
- Path: /teacher <br>
- Body: <br>
    - name (obrigatório) <br>
    - email (obrigatório) <br>
    - birthdate (obrigatório formato DD/MM/YYYY) <br>
    - specialities (obrigatório) <br>

### ✣ Pegar idade do estudante pelo id
- Método: GET <br>
- Path: /student/:id <br>
- Body de Resposta: (retornar se não encontrar erros) <br>
    - id <br>
    - studentAge <br>


### ✣ Adicionar professor à turma
- Método: POST <br>
- Path: /teacher/edit/:id <br>
- Body: <br>
    - id (obrigatório) <br>
    - missionId (obrigatório) <br>

***
# DESAFIOS

### ✣ Pegar todos os estudantes pela turma
- Método: GET <br>
- Path: /mission/students/:id <br>
- Body de Resposta: (retornar se não encontrar erros) <br>
    -  id <br>
    -  name <br>
    -  email <br>
    -  birthdate <br>
    -  hobbies <br>

### ✣ Pegar todos os professores pela turma
- Método: GET <br>
- Path: /mission/teachers/:id <br>
- Body de Resposta: (retornar se não encontrar erros) <br>
    -  id <br>
    -  name <br>
    -  email <br>
    -  birthdate <br>
    -  specialities <br>

### ✣ Pegar todos os estudantes pelo hobby
- Método: GET <br>
- Path: /hobby/students/:id <br>
- Body de Resposta: (retornar se não encontrar erros) <br>
    -  id <br>
    -  name <br>
    -  email <br>
    -  birthdate <br>

### ✣ Remover estudante
- Método: DELETE <br>
- Path: /student/:id <br>
- Body de Resposta: (Estudante removido com sucesso) <br>

