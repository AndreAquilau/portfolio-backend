
CREATE TABLE portfolio (
titulo VARCHAR(255),
sobre TEXT,
upload_doc_sobre TEXT
)

CREATE TABLE rede_sociais (
id INTEGER PRIMARY KEY,
link VARCHAR(255),
upload_icon_link VARCHAR(255)
)

CREATE TABLE formacao (
desc_formacao TEXT
)

CREATE TABLE experiencias (
id INTEGER PRIMARY KEY,
desc_experiencia TEXT
)

CREATE TABLE projetos (
id INTEGER PRIMARY KEY,
titulo VARCHAR(10),
desc_projeto VARCHAR(255),
link_github VARCHAR(255),
link_projeto VARCHAR(255)
)

CREATE TABLE usuario (
nome VARCHAR(255),
senha VARCHAR(255),
admin VARCHAR(255),
id INTEGER PRIMARY KEY
)

CREATE TABLE contatos (
id INTEGER PRIMARY KEY,
tipo VARCHAR(10),
conteudo VARCHAR(10),
id_usuario INTEGER,
FOREIGN KEY(id) REFERENCES usuario (id)
)

CREATE TABLE endereco (
rua VARCHAR(10),
numero VARCHAR(10),
bairro VARCHAR(10),
cidade VARCHAR(10),
estado VARCHAR(10),
id INTEGER PRIMARY KEY,
id_usuario INTEGER,
FOREIGN KEY(id) REFERENCES usuario (id)
)

