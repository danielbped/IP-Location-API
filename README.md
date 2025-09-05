# Ip Location API

Trata-se de uma API com o intuito de fazer uma busca por IP, em uma grande base de dados, e retornar a localização do IP enviado por parâmetro. A base de dados utilizada para os testes a seguir foi um arquivo .csv com aproximadamente 3 milhões de linhas. O intuito do teste era realizar a busca com uma latência de até 100ms e o resultado obtido foi de aproximadamente 9ms, para o último item da lista. Com o objetivo comparativo, a API foi versionada, onde na v1 é realizada uma busca linear na base de dados, tendo como resultado uma latência de aproximadamente 150ms, e na v2 é realizada uma busca binária, tendo como resultado a latência, comentada anteriormente, de 9ms. A base de dados estará disponível [aqui](https://drive.google.com/file/d/1F7pKrro7snTqvH8bKZgmVEgcI9OnRKP8/view?usp=sharing) e para realizar os testes deve ser adicionada no diretório [src/assets]. Este projeto possui testes unitários do controller e testes de carga, utilizando a biblioteca [k6](https://jslib.k6.io/), com até 100 usuários simultâneos.

# Sumário
- [Tecnologias utilizadas](#tech)
- [Instruções para rodar o projeto](#instructions)
  - [Iniciando a aplicação](#start)
- [Rotas](#rotas)
  - [Buscar localização por IP v1](#get-location-v1)
  - [Buscar localização por IP v2](#get-location-v2)
    - [Busca binária](#binary-search)
- [Testes](#tests)

## Tecnologias utilizadas <a name="tech"></a>
- **[TypeScript](https://www.typescriptlang.org/)**: Um superconjunto de JavaScript que adiciona tipagem estática opcional ao código. Ele ajuda os desenvolvedores a detectar erros mais cedo durante o desenvolvimento e oferece ferramentas avançadas para trabalhar em projetos de grande escala, melhorando a manutenibilidade e escalabilidade do código.
- **[Node.js](https://nodejs.org/en/)**: Plataforma de desenvolvimento para construção do ambiente de servidor.
- **[NestJS](https://docs.nestjs.com/)**: Framework web para Node.js utilizado na construção da API.
- **[Http Status Codes](https://www.npmjs.com/package/http-status-codes)**: Status Codes: Pacote que fornece uma lista de constantes para códigos de status HTTP.
- **[Jest](https://jestjs.io/pt-BR/)**: Framework de teste em JavaScript com foco na simplicidade.
- **[Swagger](https://swagger.io/)**: Ferramente utilizada para criar documentações exemplificando a utilização das rotas, de uma forma prática.

# Instruções para rodar o projeto <a name="instructions"></a>

### Será necessário ter instalado na sua máquina:

```
  Git
  Node v22.18.0
```

- Clone o repositório com o comando git clone:

```
  git clone git@github.com:danielbped/IP-Location-API.git
```

- Entre no diretório que acabou de ser criado:

```
  cd IP-Location-API
```

## Iniciando a aplicação <a name="start"></a>

Após finalizar o build execute o comando a seguir para rodar a aplicação
```
  npm run start
```

Caso tudo tenha dado certo, algo parecido com isso deve aparecer no terminal

```
[Nest] 51449  - 09/05/2025, 1:08:10 PM     LOG [RoutesResolver] LocationControllerV2 {/v2/ip}: +0ms
[Nest] 51449  - 09/05/2025, 1:08:10 PM     LOG [RouterExplorer] Mapped {/v2/ip/location/:ip, GET} route +0ms
Loading dataset...
Dataset loaded with 2979950 rows
[Nest] 51449  - 09/05/2025, 1:08:20 PM     LOG [NestApplication] Nest application successfully started +10194ms
```

Agora basta acessar a URL http://localhost:3000/docs para visualizar as rotas disponíveis da API.

# Rotas <a name="rotas"></a>
## Buscar localização pelo IP v1 <a name="get-location-v1"></a>
### GET /v1/ip/location/:ip

### **Parâmetros da Requisição**
  
  | Parâmetro     | Tipo     | Descrição                            | Observação                                      |
  |---------------|----------|--------------------------------------|----------------------------------------------|
  | `ip`     | string   | IP do usuário   | Deve ser no formato string Ex.: "223.0.0.0" |

### Respostas
- Status **200** (Created)
  - **Descrição:** Dados retornados com sucesso.
- Status **404** (Not Found)
  - **Descrição:** Dados não encontrados.
- Status **500** (Internal Server Error)
  - **Descrição:** Erro interno do sistema.

## Buscar localização pelo IP v2 <a name="get-location-v2"></a>
### GET /v1/ip/location/:ip

### **Parâmetros da Requisição**
  
  | Parâmetro     | Tipo     | Descrição                            | Observação                                      |
  |---------------|----------|--------------------------------------|----------------------------------------------|
  | `ip`     | string   | IP do usuário   | Deve ser no formato string Ex.: "223.0.0.0" |

### Respostas
- Status **200** (Created)
  - **Descrição:** Dados retornados com sucesso.
- Status **404** (Not Found)
  - **Descrição:** Dados não encontrados.
- Status **500** (Internal Server Error)
  - **Descrição:** Erro interno do sistema.

### Busca binária <a name="binary-search"></a>

Apesar da requisição ter o mesmo formato da v1, aqui há um diferencial gigantesco em relação à performance. Para este endpoint, foi utilizado uma busca binária, reduzindo o a latência da requisição em aproximadamente 90%.

A busca binária é um algoritmo eficiente para encontrar um elemento em uma lista ordenada. Ela funciona dividindo repetidamente o intervalo de busca pela metade até encontrar o elemento desejado ou concluir que ele não está presente.

- Como funciona

Início: Começamos com dois índices: início e fim, representando os limites da lista.

Verificação do meio: Calculamos o índice do meio:

meio = (Início + Fim) / 2

- Comparação:

Se o elemento no meio for o que buscamos, retornamos a posição.

Se o elemento buscado for menor, repetimos a busca na metade esquerda.

Se for maior, repetimos na metade direita.

Repetição: Continuamos dividindo até encontrar o elemento ou até que início > fim, o que significa que o elemento não existe na lista.

- Complexidade

Tempo: 𝑂(log 𝑛), onde n é o tamanho da lista.
Espaço: 𝑂(1) para a versão iterativa ou 𝑂(log⁡ 𝑛) para a versão recursiva.

Então no exemplo utilizado aqui, temos no pior caso o último elemento da lista, aproximadamente número 3 milhões. No caso da busca linear, a lista precisaria ser percorrida 3 milhões de vezes, um por elemento, até encontrar o elemento desejado. Já utilizando a busca binária, temos O(log2​ 𝑛), onde 𝑛 ≈ 3,000,000, então temos log2 3,000,000 ≈ 21,5 → aproximadamente 22 comparações no pior caso.

[Fonte](https://pt.wikipedia.org/wiki/Pesquisa_bin%C3%A1ria)

## Testes <a name="tests"></a>

A aplicação possui testes unitários de todas as rotas. Para rodar os testes, basta executar o comando abaixo:

```
  npm run test
```

E a aplicação também possui testes de carga utilizando a biblioteca [k6](https://jslib.k6.io/), com até 100 usuários simultâneos. Para rodar os testes de carga, basta executar o comando abaixo:

```
  npm run test:performance
```