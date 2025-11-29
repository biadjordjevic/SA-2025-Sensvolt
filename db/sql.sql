DROP TABLE IF EXISTS aparelho CASCADE;
DROP TABLE IF EXISTS suporte CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;

CREATE TABLE IF NOT EXISTS usuario (
  usuario_id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(200) NOT NULL -- senha hash
);

CREATE TABLE IF NOT EXISTS aparelho (
  aparelho_id SERIAL PRIMARY KEY,
  nome VARCHAR(60),
  modelo VARCHAR(100),
  codigo VARCHAR(50) NOT NULL,
  descricao VARCHAR(200),

  -- novos campos
  consumo_maximo NUMERIC,
  temp_min NUMERIC,
  temp_max NUMERIC,

  usuario_id INT,
  FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id)
);

CREATE TABLE IF NOT EXISTS suporte (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  contato VARCHAR(100)
);

SELECT * FROM usuario;
SELECT * FROM aparelho;
SELECT * FROM suporte;