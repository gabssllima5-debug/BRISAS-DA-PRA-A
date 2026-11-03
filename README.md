# Brisas da Praça Patriarca — Landing Page

Landing page estática (HTML, CSS e JS puros, sem build) do empreendimento **Brisas da Praça Patriarca** (Graal Construtora), feita com o conteúdo e as imagens do book comercial.

## Estrutura

```
wrangler.jsonc               configuração do Cloudflare Worker (static assets)
public/index.html            página única
public/404.html              página de erro
public/_headers              cabeçalhos de cache e segurança
public/assets/css/style.css  estilos (paleta e fontes nas variáveis em :root)
public/assets/js/main.js     interações + configuração de leads
public/assets/img/           imagens extraídas do book (WebP)
```

Seções: hero, formulário rápido, conceito, projeto (diferenciais e ficha técnica), plantas (tipo, gardens, cobertura, tipologia por pavimento, implantação), lazer (galeria com ampliação), localização, tour virtual 360°, construtora, contato e informações legais.

## Antes de publicar

Edite o objeto `CONFIG` no topo de `public/assets/js/main.js`:

- `whatsapp`: número com DDI e DDD, só dígitos (ex.: `5511999999999`). Ativa o botão flutuante.
- `formEndpoint`: URL que recebe os leads via `POST` JSON (CRM, RD Station, Zapier/Make, Formspree…).

Sem `formEndpoint`, o formulário abre o WhatsApp com os dados preenchidos. Se nenhum dos dois estiver configurado, os leads **não são enviados**.

## Rodar localmente

```bash
npx wrangler dev
```

## Publicar no Cloudflare Workers

```bash
npx wrangler deploy
```

Ou conecte este repositório em **Cloudflare Dashboard → Workers & Pages → Create → Import a repository**: a cada push na `main` o Worker é publicado automaticamente (o comando de deploy é `npx wrangler deploy`, sem build). O domínio próprio é configurado em **Settings → Domains & Routes** do Worker.
