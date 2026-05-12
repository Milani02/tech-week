# 🚀 Tech Week

Plataforma completa para gestão, inscrição e acompanhamento de eventos tecnológicos. Desenvolvida para oferecer uma experiência imersiva aos utilizadores (com Landing Pages interativas) e um controle robusto para a administração do evento.

## 📋 Índice
- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Estrutura de Pastas](#-estrutura-de-pastas)

---

## 🔍 Visão Geral
O **Tech Week** é uma aplicação Single Page Application (SPA) focada na conversão de inscrições para um evento de tecnologia. A plataforma conta com um formulário de registo dinâmico, uma área de check-in (presença) para os dias do evento, e um Dashboard Administrativo protegido para a visualização das métricas, participantes e palestras.

---

## ✨ Funcionalidades

### 👤 Área do Participante
- **Landing Page Imersiva:** Interface moderna com background em vídeo (`hero-bg.mp4`, `hero2.mp4`), projetada para alta conversão.
- **Inscrição Rápida:** Formulário para captação de dados dos participantes (Nome, RA, Curso, Série, opção de Coffee Break, etc.).
- **Lista de Palestrantes & Projetos:** Secções informativas detalhando o cronograma e os projetos do evento.
- **Check-in / Presença:** Rota dedicada (`/presenca`) para confirmação de participação no dia do evento.

### 🔒 Área Administrativa
- **Login Seguro:** Acesso restrito via autenticação.
- **Dashboard (Painel de Controle):** Visualização de estatísticas em tempo real, gestão de participantes, palestrantes e controle de presenças.

---

## 💻 Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna, dividindo as responsabilidades entre um frontend reativo e um Backend-as-a-Service (BaaS) escalável.

### Frontend
* **React**: Biblioteca JavaScript para construção da interface de utilizador.
* **Vite**: Bundler super rápido e ferramenta de build.
* **Tailwind CSS**: Framework CSS Utility-first para estilização rápida e responsiva.
* **React Router DOM**: Gerenciamento de rotas e navegação da SPA (`/`, `/login`, `/admin`, `/presenca`).

### Backend & Infraestrutura (BaaS)
* **Supabase**: Alternativa open-source ao Firebase.
  * **PostgreSQL:** Banco de dados relacional robusto.
  * **Autenticação:** Gerenciamento de sessões para os administradores.
  * **RLS (Row Level Security):** Regras de segurança para garantir que apenas admins leiam os dados, enquanto utilizadores anónimos podem apenas inserir (inscrever-se).

---

## 🗄️ Estrutura do Banco de Dados

O sistema espera as seguintes tabelas configuradas no Supabase:

1. `participants`: Armazena os dados de inscrição dos alunos/convidados.
2. `speakers`: Cadastro dos palestrantes do evento.
3. `projects`: Projetos que serão apresentados/exibidos.
4. `attendance`: Registo de check-in / presença dos participantes.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente na sua máquina:

### Pré-requisitos
- Node.js instalado (versão 18+ recomendada).
- Conta no Supabase com um projeto criado.

### Instalação

1. Clone o repositório:
```bash
git clone [https://github.com/Milani02/tech-week.git](https://github.com/Milani02/tech-week.git)