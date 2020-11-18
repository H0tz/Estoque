CREATE SCHEMA IF NOT EXISTS `estoque`;

USE `estoque`;

CREATE TABLE `estoque`.`pessoas` (
  `cpf` VARCHAR(15) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(45) NULL,
  `endereco` VARCHAR(45) NULL,
  `cep` VARCHAR(45) NULL,
  `fornecedor` TINYINT DEFAULT 0,
  `cliente` TINYINT DEFAULT 0,
  PRIMARY KEY (`cpf`)
);

CREATE TABLE `estoque`.`produtos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(45) NULL,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `quantidade` INT NOT NULL DEFAULT 0,
  `custo` FLOAT NOT NULL DEFAULT 0,
  `preco` FLOAT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

CREATE TABLE `estoque`.`lancamentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cpf_pessoa` VARCHAR(11) NOT NULL,
  `id_produto` INT NOT NULL,
  `entrada` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `valor` FLOAT NOT NULL DEFAULT 0,
  `observacao` VARCHAR(255) NULL,
  PRIMARY KEY (`id`)
);

# Seed produtos
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('1', 'Teste 1', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('2', 'Teste 2', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('3', 'Teste 3', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('4', 'Teste 4', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('5', 'Teste 5', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('6', 'Teste 6', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('7', 'Teste 7', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('8', 'Teste 8', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('9', 'Teste 9', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('10', 'Teste 10', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('11', 'Teste 11', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('12', 'Teste 12', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('13', 'Teste 13', 'Produto exemplo', '2', '1', '2');
INSERT INTO `estoque`.`produtos` (`sku`, `nome`, `descricao`, `quantidade`, `custo`, `preco`) VALUES ('14', 'Teste 14', 'Produto exemplo', '2', '1', '2');

# Seed clientes
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `cliente`) VALUES ('13246578900', 'Cliente 1', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `cliente`) VALUES ('13246578902', 'Cliente 2', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `cliente`) VALUES ('13246578903', 'Cliente 3', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `cliente`) VALUES ('13246578904', 'Cliente 4', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `cliente`) VALUES ('13246578905', 'Cliente 5', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `cliente`) VALUES ('13246578906', 'Cliente 6', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `cliente`) VALUES ('13246578907', 'Cliente 7', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `cliente`) VALUES ('13246578908', 'Cliente 8', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `cliente`) VALUES ('13246578909', 'Cliente 9', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `cliente`) VALUES ('13246578910', 'Cliente 10', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');

# Seed fornecedores
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `fornecedor`) VALUES ('13246578911', 'Fornecedor 1', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `fornecedor`) VALUES ('13246578912', 'Fornecedor 2', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `fornecedor`) VALUES ('13246578913', 'Fornecedor 3', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `fornecedor`) VALUES ('13246578914', 'Fornecedor 4', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `fornecedor`) VALUES ('13246578915', 'Fornecedor 5', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `fornecedor`) VALUES ('13246578916', 'Fornecedor 6', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `fornecedor`) VALUES ('13246578917', 'Fornecedor 7', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `fornecedor`) VALUES ('13246578918', 'Fornecedor 8', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `fornecedor`) VALUES ('13246578919', 'Fornecedor 9', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');
INSERT INTO `estoque`.`pessoas` (`cpf`, `nome`, `telefone`, `endereco`, `cep`, `fornecedor`) VALUES ('13246578920', 'Fornecedor 10', '(99) 9999-9999', 'Rua exemplo', '00000000', '1');

# Seed lancamentos
