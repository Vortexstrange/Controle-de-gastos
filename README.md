# Controle de Gastos

Aplicação web para controle e organização de despesas pessoais. Permite cadastrar gastos com descrição, valor, data e categoria, visualizar o total, filtrar por categoria e consultar um resumo dos valores.

Os dados ficam salvos no navegador via `localStorage`, então os gastos continuam lá mesmo depois de fechar ou atualizar a página — sem backend, sem banco de dados.

## Funcionalidades

- Cadastro de gastos (descrição, valor, data e categoria)
- Validação dos dados informados
- Cálculo automático do total
- Listagem dos gastos, ordenados por data
- Filtro por categoria
- Resumo dos valores agrupados por categoria
- Exclusão de registros
- Formatação dos valores em Real (BRL)
- Layout responsivo

## Tecnologias

- HTML5 / CSS3
- JavaScript (DOM, JSON)
- `localStorage` para persistência
- `Intl.NumberFormat` para formatação monetária

## Estrutura

```
controle-de-gastos/
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## Como usar

Não precisa de instalação nem servidor — é só abrir o `index.html` no navegador.

```bash
git clone https://github.com/seu-usuario/controle-de-gastos.git
cd controle-de-gastos
```

Depois é só abrir o arquivo `index.html` direto, ou usar uma extensão tipo Live Server se estiver no VS Code.

## Como funciona o armazenamento

Cada gasto cadastrado é salvo como um objeto JSON dentro do `localStorage` do navegador, sob uma chave única (ex: `gastos`). Como o `localStorage` é por navegador e por domínio, os dados não sincronizam entre dispositivos nem navegadores diferentes — é uma limitação conhecida desse tipo de armazenamento, não um bug.

## Status

- [x] Cadastro, listagem e exclusão de gastos
- [x] Filtro por categoria
- [x] Resumo por categoria
- [x] Persistência com localStorage
- [x] Layout responsivo
- [ ] Edição de gastos já cadastrados
- [ ] Gráficos de distribuição de gastos

## Autora

Feito por **Aline** como parte dos estudos e construção de portfólio em desenvolvimento web.