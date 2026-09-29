-- Dashboard de Indicadores — modelagem do banco
CREATE DATABASE DashboardDB;
GO
USE DashboardDB;
GO

CREATE TABLE Vendas (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    DataVenda DATE NOT NULL,
    Produto NVARCHAR(100) NOT NULL,
    Canal NVARCHAR(50) NOT NULL,
    Valor DECIMAL(10,2) NOT NULL
);
GO

INSERT INTO Vendas (DataVenda, Produto, Canal, Valor) VALUES
    ('2026-04-10', 'Notebook',   'E-commerce',  4500.00),
    ('2026-04-15', 'Monitor',    'Loja Física', 1200.00),
    ('2026-05-02', 'Notebook',   'Marketplace', 4300.00),
    ('2026-05-20', 'Teclado',    'E-commerce',   350.00),
    ('2026-06-08', 'Notebook',   'Loja Física', 4600.00),
    ('2026-06-25', 'Mouse',      'E-commerce',   180.00),
    ('2026-07-12', 'Monitor',    'Marketplace', 1150.00),
    ('2026-07-30', 'Notebook',   'Atacado',     4200.00),
    ('2026-08-14', 'Notebook',   'E-commerce',  4700.00),
    ('2026-08-28', 'Impressora', 'Loja Física',  980.00),
    ('2026-09-05', 'Notebook',   'Loja Física', 4800.00),
    ('2026-09-18', 'Monitor',    'E-commerce',  1250.00);
GO

-- Consultas que alimentam o dashboard:

-- Evolução mensal de vendas
SELECT FORMAT(DataVenda, 'yyyy-MM') AS Mes, SUM(Valor) AS Total
FROM Vendas
GROUP BY FORMAT(DataVenda, 'yyyy-MM')
ORDER BY Mes;

-- Participação por canal
SELECT Canal, SUM(Valor) AS Total
FROM Vendas
GROUP BY Canal
ORDER BY Total DESC;

-- Ticket médio geral
SELECT AVG(Valor) AS TicketMedio FROM Vendas;
GO
