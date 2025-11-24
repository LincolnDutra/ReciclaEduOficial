-- ===========================================
-- BANCO DE DADOS: ReciclaEdu
-- FINALIDADE: Sistema gamificado de reeducação ambiental em instituições privadas
-- ===========================================
-- TABELA: usuarios
-- Armazena informações dos usuários (alunos, professores, gestores)
-- ===========================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) CHECK (tipo_usuario IN ('aluno', 'professor', 'gestor')) NOT NULL,
    pontos INT DEFAULT 0,
    nivel INT DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- TABELA: desafios
-- Desafios educacionais relacionados à sustentabilidade
-- ===========================================
CREATE TABLE desafios (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    pontos_recompensa INT NOT NULL,
    categoria VARCHAR(50),
    data_inicio DATE,
    data_fim DATE,
    ativo BOOLEAN DEFAULT TRUE
);

-- ===========================================
-- TABELA: conquistas
-- Armazena conquistas desbloqueáveis por marcos atingidos
-- ===========================================
CREATE TABLE conquistas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    pontos_necessarios INT NOT NULL,
    icone VARCHAR(255)
);

-- ===========================================
-- TABELA: desafios_concluidos
-- Registra quais usuários concluíram quais desafios
-- ===========================================
CREATE TABLE desafios_concluidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    desafio_id INT REFERENCES desafios(id) ON DELETE CASCADE,
    data_conclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pontos_ganhos INT NOT NULL
);

-- ===========================================
-- TABELA: conquistas_usuarios
-- Registra quais conquistas cada usuário já obteve
-- ===========================================
CREATE TABLE conquistas_usuarios (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    conquista_id INT REFERENCES conquistas(id) ON DELETE CASCADE,
    data_conquista TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- TABELA: premios
-- Catálogo de prêmios trocáveis com pontos
-- ===========================================
CREATE TABLE premios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    pontos_necessarios INT NOT NULL,
    quantidade_disponivel INT DEFAULT 0
);

-- ===========================================
-- TABELA: resgates
-- Registra resgates de prêmios pelos usuários
-- ===========================================
CREATE TABLE resgates (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    premio_id INT REFERENCES premios(id) ON DELETE CASCADE,
    data_resgate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'entregue', 'cancelado'))
);

-- ===========================================
-- TABELA: ranking
-- Atualização do ranking dos usuários
-- ===========================================
CREATE VIEW ranking AS
SELECT
    u.id,
    u.nome,
    u.tipo_usuario,
    u.pontos,
    DENSE_RANK() OVER (ORDER BY u.pontos DESC) AS posicao
FROM usuarios u;

-- ===========================================
-- DADOS INICIAIS DE EXEMPLO
-- ===========================================

-- Usuários
INSERT INTO usuarios (nome, email, senha, tipo_usuario, pontos, nivel)
VALUES
('Ana Silva', 'ana@faculdade.com', 'senha123', 'aluno', 150, 2),
('João Pereira', 'joao@faculdade.com', 'senha123', 'aluno', 300, 3),
('Maria Souza', 'maria@faculdade.com', 'senha123', 'professor', 500, 4),
('Carlos Oliveira', 'carlos@faculdade.com', 'senha123', 'gestor', 1000, 5);

-- Desafios
INSERT INTO desafios (titulo, descricao, pontos_recompensa, categoria, data_inicio, data_fim)
VALUES
('Separar resíduos corretamente', 'Praticar a separação correta dos materiais recicláveis na faculdade.', 50, 'Reciclagem', '2025-10-01', '2025-10-31'),
('Desafio da Consciência Ambiental', 'Assistir à palestra e responder ao quiz de sustentabilidade.', 100, 'Educação Ambiental', '2025-10-05', '2025-10-30');

-- Conquistas
INSERT INTO conquistas (nome, descricao, pontos_necessarios)
VALUES
('Iniciante Sustentável', 'Primeiros 100 pontos conquistados!', 100),
('Herói da Reciclagem', '500 pontos acumulados!', 500);

-- Prêmios
INSERT INTO premios (nome, descricao, pontos_necessarios, quantidade_disponivel)
VALUES
('Caneca Sustentável', 'Feita com material reciclado.', 200, 20),
('Camisa Ecológica', 'Produzida com algodão orgânico.', 400, 10);

-- ===========================================
-- FUNÇÃO: Atualizar Pontos do Usuário após Desafio
-- ===========================================
CREATE OR REPLACE FUNCTION atualizar_pontuacao()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE usuarios
    SET pontos = pontos + NEW.pontos_ganhos
    WHERE id = NEW.usuario_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER: ao inserir novo desafio concluído
CREATE TRIGGER trigger_atualiza_pontos
AFTER INSERT ON desafios_concluidos
FOR EACH ROW
EXECUTE PROCEDURE atualizar_pontuacao;

-- ===========================================
-- VISUALIZAÇÃO FINAL DE TESTE
-- ===========================================
SELECT * FROM ranking; 