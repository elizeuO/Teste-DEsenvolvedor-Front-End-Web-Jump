# Desafio Frontend Web Jump

## Tecnologias Adotadas
- Photoshop - Utilizado para remover os espaços vazios da imagem do favicon.

-	Visual Studio Code - IDE utilizada para o desenvolvimento do projeto.

-	WAI-ARIA - Complemento semântico das tags HTML para melhoria da acessibilidade voltada ao uso de leitores de tela. Tive contato com essa tecnologia no meu TCC da graduação, que foi voltado ao desenvolvimento de um site com acessibilidade para deficientes visuais.

-	Chrome VOX - Extensão do Google Chrome que atua como um leitor de tela. Serviu como métrica para a verificação de acessibilidade, especialmente na validação da efetividade das tags do WAI-ARIA.

-	GIT Kraken - Ferramenta de controle de versionamento para o GIT.

-	Grunt - Foi usada a task “Uglify” para minificação do código dos arquivos JS e a task  “Watch” para aplicação automática da “Uglify” sempre que os arquivos JS fossem salvos.

-	SASS - Empregada para a otimização e organização da criação do CSS.
	
-	Font awesome - Para inserção dos ícones nos elementos do projeto.


## Soluções Adotadas
### Estratégias

Uma pasta chamada “dist” foi criada na “public” para conter o arquivo “main.js”, que é um compilado minificado pelo Grunt dos arquivos JS criados na pasta “assets” . O CSS modificado pelo SASS também foi destinado a esta pasta. Isso foi feito  para garantir a otimização no carregamento das páginas. 

Foi utilizada a metodologia BEM para organização da nomenclatura das classes de CSS.

Criei uma página chamada categoria, cujo conteúdo, exceto o header e o footer, é renderizado através de javascript pelo consumo da API disponibilizada. A categoria da página é determinada pelo valor do parâmetro ID contido na URL.

O wrapper do item de produto foi deixado como div porque não foi passado o comportamento de ecommerce: em alguns casos o elemento inteiro é um link que leva a página do produto, em outros o botão comprar adiciona direto no carrinho, por isso deixei sem link.

No responsivo, foram adicionados outros breakpoints para manter a consistência do layout. Também foram usados elementos que só aparecem no breakpoint 468px para exibir a barra de pesquisa e navegação do header. Esses elementos fecham ao pressionar Esc ou clicar fora do header e também quando outro elemento deste tipo é clicado.

### Modificações

Foi necessária a modificação de um parâmetro do arquivo “app.js” que está localizado fora da pasta “public”, porque estava impedindo o acesso correto a outras páginas que não fossem a index.html. Também foi feita uma alteração no arquivo “list” contido dentro da pasta “mock-api” porque as propriedades “name” e “path” do terceiro item estavam com o valor “calçados”e foram modificados para “sapatos” para manter fidelidade ao modelo base apresentado no repositório. No arquivo 3 da API, alterei o valor de uma propriedade de cor que estava com o valor “preto”, sendo que já havia uma cor com o valor “preta” em outro produto e isso estava gerando problema na renderização do filtro de cores.

### Impasses

Tive que deixar o header e o footer estáticos, repetindo nas duas páginas, porque a forma como estou habituado a fazer é através do uso do include do PHP e eu não queria fazer o uso desta linguagem, pois foi pedido o foco no emprego do javascript, HTML e CSS. Eu poderia ter feito uma injeção do conteúdo do header e footer com um script js, mas o conteúdo da tag head iria ter que se repetir para poder fazer a chamada do script para a realização de tal operação.

Outro problema que enfrentei, foi a divergência de cores que encontrei nos modelos do repositório com o arquivo do Adobe XD. Para manter consistência eu decidi escolher o modelo de cores das imagens do repositório e o usar o XD como referência para tamanho de elementos e fontes.

