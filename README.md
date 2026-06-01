# Sistema Carol · Taís Madureira Makeup

Sistema de atendimento WhatsApp com login Google, scripts por público e tabela de serviços.

---

## Pré-requisitos

- Conta no [GitHub](https://github.com)
- Conta no [Supabase](https://supabase.com) (gratuito)
- Conta no [Vercel](https://vercel.com) (gratuito)

---

## Passo 1 — Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em **New project**, dê um nome (ex: `carol-atendimento`) e crie
3. Aguarde o projeto inicializar (~1 min)
4. No menu lateral, vá em **Authentication → Providers**
5. Clique em **Google** e ative o toggle
6. Você vai precisar de credenciais OAuth do Google (passo 2)

---

## Passo 2 — Criar credenciais OAuth no Google

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto novo (ou use um existente)
3. Vá em **APIs e Serviços → Credenciais**
4. Clique em **Criar credenciais → ID do cliente OAuth 2.0**
5. Tipo: **Aplicativo da Web**
6. Em "Origens JavaScript autorizadas", adicione:
   - `https://SEU_PROJETO.supabase.co`
7. Em "URIs de redirecionamento autorizados", adicione:
   - `https://SEU_PROJETO.supabase.co/auth/v1/callback`
8. Copie o **Client ID** e **Client Secret**
9. Cole esses valores de volta no Supabase em **Authentication → Providers → Google**
10. Salve

---

## Passo 3 — Obter as chaves do Supabase

1. No Supabase, vá em **Settings → API**
2. Copie:
   - **Project URL** → será o `VITE_SUPABASE_URL`
   - **anon / public key** → será o `VITE_SUPABASE_ANON_KEY`

---

## Passo 4 — Subir no GitHub

1. Crie um repositório no GitHub (pode ser privado)
2. Faça upload de todos os arquivos desta pasta
3. **Não suba o arquivo `.env.local`** — ele está no `.gitignore` por segurança

---

## Passo 5 — Publicar no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com o GitHub
2. Clique em **New Project** e importe o repositório `carol-atendimento`
3. Antes de fazer deploy, vá em **Environment Variables** e adicione:
   - `VITE_SUPABASE_URL` = sua URL do Supabase
   - `VITE_SUPABASE_ANON_KEY` = sua anon key do Supabase
4. Clique em **Deploy**
5. Aguarde ~2 min e você receberá um link como `carol-atendimento.vercel.app`

---

## Passo 6 — Adicionar o domínio Vercel no Supabase

Após o deploy, você precisa autorizar o domínio Vercel no Supabase:

1. No Supabase, vá em **Authentication → URL Configuration**
2. Em **Site URL**, coloque: `https://carol-atendimento.vercel.app`
3. Em **Redirect URLs**, adicione: `https://carol-atendimento.vercel.app`
4. Salve

---

## Restringir acesso por e-mail (opcional)

No arquivo `src/main.js`, localize a variável `ALLOWED_EMAILS` e adicione os e-mails autorizados:

```js
const ALLOWED_EMAILS = [
  'carol@taismadureira.com',
  'tais@taismadureira.com',
]
```

Se a lista ficar vazia, qualquer login Google é aceito.

---

## Proteção de Dados (LGPD)

- O sistema armazena **apenas e-mail e nome** do usuário logado via Google OAuth
- **Nenhum dado de cliente é salvo** — os scripts são apenas modelos de texto
- Nenhuma senha é armazenada (Google OAuth 2.0)
- Os dados ficam nos servidores da Supabase (EUA por padrão — configurável)
- Para adequação completa à LGPD, recomenda-se adicionar uma Política de Privacidade na página de login

---

## Desenvolvimento local

```bash
# instalar dependências
npm install

# criar arquivo de variáveis locais
cp .env.example .env.local
# editar .env.local com suas chaves

# rodar localmente
npm run dev
```
