import Logo from "../assets/logo.svg";
import "../styles/header.css";
import "../styles/utility.css";
import Button from "../components/Button";
import { useState, useEffect, useRef } from "react";
import Close from "../assets/close.svg";
import Menu from "../assets/hamburguer.svg";
import HeroRectangleOne from "../assets/rectangleOne.svg";
import HeroRectangleTwo from "../assets/rectangleTwo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/hero.css";
import Card from "../components/Card";
import TestimonialCard from "../components/TestimonialCard";
import "../styles/solution.css";
import "../styles/testimonials.css";
import "../styles/pricing.css";
import "../styles/contact.css";
import "../styles/footer.css";

export default function Home() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChallengeCompleted, setChallengeCompleted] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  function handleCompleteChallenge(token: string | null) {
    if (!token) {
      setChallengeCompleted(false);
      return;
    }
    setChallengeCompleted(true);
  }

  async function sendContactEmail(e: React.FormEvent) {
    e.preventDefault();

    if (!isChallengeCompleted) {
      alert(
        "Por favor, mude o status do reCAPTCHA marcando a caixa 'Eu não sou um robô'.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Erro ao enviar mensagem.");
      }

      alert("Mensagem enviada com sucesso! Entraremos em contato.");
      setEmail("");
      setMessage("");

      setChallengeCompleted(false);
      recaptchaRef.current?.reset();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocorreu um erro desconhecido.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = showMobileMenu ? "hidden" : "auto";
    }
  }, [showMobileMenu]);

  return (
    <>
      <header className="container py-sm">
        <nav className="flex items-center justify-between">
          <img src={Logo} alt="Logo Solar Locações" width={220} height={80} />
          <div className="desktop-only">
            <ul className="flex gap-1">
              <li>
                <a href="#">Página inicial</a>
              </li>
              <li>
                <a href="#solution">Soluções</a>
              </li>
              <li>
                <a href="#testimonials">Depoimentos</a>
              </li>
              <li>
                <a href="#pricing">Preços</a>
              </li>
              <li>
                <a href="#contact">Contato</a>
              </li>
            </ul>
          </div>

          <div className="desktop-only">
            <div className="flex items-center">
              <span className="ml-lg">
                <Button text="Login" secondary />
              </span>
              <Button text="Cadastre-se" />
            </div>
          </div>

          <div className="mobile-menu">
            {showMobileMenu ? (
              <div className="mobile-menu-content">
                <div className="container flex">
                  <ul>
                    <li>
                      <a onClick={() => setShowMobileMenu(false)} href="#">
                        Página inicial
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setShowMobileMenu(false)}
                        href="#solution"
                      >
                        Soluções
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setShowMobileMenu(false)}
                        href="#testimonials"
                      >
                        Depoimentos
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setShowMobileMenu(false)}
                        href="#pricing"
                      >
                        Preços
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setShowMobileMenu(false)}
                        href="#contact"
                      >
                        Contato
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setShowMobileMenu(false)} href="">
                        Login
                      </a>
                    </li>
                  </ul>
                  <span
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="btn-wrapper"
                  >
                    <img
                      src={Close}
                      alt="ícone fechar"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
              </div>
            ) : (
              <span
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="btn-wrapper"
              >
                <img src={Menu} alt="ícone menu" width={24} height={24} />
              </span>
            )}
          </div>
        </nav>
      </header>

      <section id="hero">
        <span className="desktop-only">
          <img src={HeroRectangleTwo} alt="Grafismo solar de fundo" />
        </span>
        <img src={HeroRectangleOne} alt="Painel solar em destaque" />

        <div className="container content">
          <p className="desktop-only">Bem-vindo à Solar Locações</p>
          <h1>Desconto na fatura de energia sem precisar de investimento!</h1>
          <p>
            Reduza sua conta de luz alugando nossas usinas solares. Sem precisar
            construir, basta assinar e começar a economizar mês a mês.
          </p>

          <div className="flex gap-1">
            <span>
              <Button text="Simule Agora" />
            </span>
            <span className="desktop-only">
              <Button text="Como funciona" secondary />
            </span>
          </div>
        </div>
      </section>

      <section className="container" id="solution">
        <header>
          <span>
            <h2>Soluções</h2>
            <span className="desktop-only">
              <h2>Economia desenhada para o seu bolso</h2>
            </span>
          </span>
          <p>
            Reduzir custos nunca foi tão simples. Junte-se aos clientes da Solar
            Locações e aproveite uma energia sustentável com previsibilidade
            financeira total mês a mês. Veja como nosso modelo de locação
            facilita a sua vida:
          </p>
        </header>

        <section className="even-columns">
          <Card
            title="Zero Investimento"
            description="Você não gasta 1 real com compra de placas ou instalação. Toda a estrutura já está pronta na nossa usina, esperando por você."
          />
          <Card
            title="Sustentabilidade"
            description="Utilize energia 100% limpa e renovável. Ajude a preservar o meio ambiente enquanto reduz os custos da sua fatura mensal."
          />
          <Card
            title="Sem Burocracia"
            description="Processo de locação simplificado e digital. Nós cuidamos de toda a documentação junto à concessionária de energia da sua região."
          />
        </section>
      </section>

      <section id="testimonials">
        <header>
          <span>
            <p className="desktop-only">Conselho de quem conhece</p>
            <h2>Cada cliente importa!</h2>
          </span>
          <p>
            Veja o que dizem os clientes que já estão economizando na conta de
            luz com as nossas usinas solares. Acompanhe os depoimentos abaixo.
          </p>
        </header>

        <section className="carousel">
          <div className="carousel-content">
            <TestimonialCard
              testimony="A melhor escolha que fiz para minha empresa. Com a locação cobrando uma taxa fixa por kWh, eu sei exatamente o quanto vou pagar no fim do mês, sem surpresas na fatura!"
              rating={5}
              name="Thiago Tomazolli"
              role="Empresário"
            />
            <TestimonialCard
              testimony="Reduzimos drasticamente a conta de energia da fazenda sem precisar comprar placas solares. O processo foi super rápido e sem burocracia."
              rating={4}
              name="Mauro Silva"
              role="Agrônomo"
            />
            <TestimonialCard
              testimony="A economia na conta de luz da propriedade rural foi imediata. Sem precisar descapitalizar para comprar os painéis, consegui direcionar o dinheiro da economia direto para o maquinário da roça. Excelente serviço e suporte!"
              rating={5}
              name="Jose Antonio"
              role="Agricultor"
            />
            <TestimonialCard
              testimony="Sempre quis ter energia solar, mas como o imóvel é alugado, não valia a pena fazer a instalação. Com a assinatura digital da usina, reduzi meus custos fixos sem precisar de obras ou burocracia. Recomendo demais!"
              rating={4}
              name="Valério"
              role="Pecuarista"
            />
          </div>
        </section>
      </section>

      <section className="container" id="pricing">
        <header>
          <p className="desktop-only">Planos e preços</p>
          <h2>Nossos planos de locação</h2>
        </header>

        <section className="even-columns gap-1.5">
          {/* Cartão 1 */}
          <div className="pricing-card">
            <span className="plan">
              <h3>Residencial</h3>
              <p>Até 1.000 kWh mensais.</p>
            </span>
            <h2>
              15% <span>de desconto</span>
            </h2>
            <Button text="Simular agora" secondary />
            <span className="hr" />
            <ul className="features">
              <li>Desconto sobre a economia</li>
              <li>Sem taxa de adesão</li>
              <li>Carência 4 anos</li>
            </ul>
          </div>

          {/* Cartão 2 (Destaque) */}
          <div className="pricing-card premium">
            <span className="bonus">MAIS PROCURADO</span>
            <span className="plan">
              <h3>Comercial</h3>
              <p>Acima de 5.000 kWh mensais.</p>
            </span>
            <h2>
              18% <span>de desconto</span>
            </h2>
            <Button text="Simular agora" />
            <span className="hr" />
            <ul className="features">
              <li>Desconto sobre a economia</li>
              <li>Relatório de geração via App</li>
              <li>Carência 2 anos</li>
            </ul>
          </div>

          {/* Cartão 3 */}
          <div className="pricing-card">
            <span className="plan">
              <h3>Industrial</h3>
              <p>Acima de 10.000 kWh mensais.</p>
            </span>
            <h2>
              20% <span>de desconto</span>
            </h2>
            <Button text="Simular agora" secondary />
            <span className="hr" />
            <ul className="features">
              <li>Desconto sobre a economia</li>
              <li>Monitoramento 24h</li>
              <li>Carência 1 ano</li>
            </ul>
          </div>
        </section>
      </section>

      <section className="container" id="contact">
        <header>
          <p className="desktop-only highlight-text">Envie sua dúvida</p>
          <h2>Entre em contato</h2>
          <p className="subtitle">
            Ficou com alguma dúvida sobre como alugar sua usina? Nossa equipe
            está à disposição para te ajudar a economizar na fatura.😎
          </p>
        </header>

        <form className="contact-form" onSubmit={sendContactEmail}>
          <input
            type="email"
            placeholder="Seu melhor Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Motivo do contato. Ex: Gostaria de uma simulação para minha padaria?"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div style={{ marginBottom: "1rem" }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfXQj4tAAAAAJUrMUjqvBNC47qjAKLJD-gNSuu9"
              onChange={handleCompleteChallenge}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </section>

      <footer id="footer">
        <div className="container footer-content">
          <div className="brand-col">
            <h2 className="logo-text">Solar Locações</h2>
            <div className="social-links">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">YouTube</a>
            </div>
          </div>

          <div className="links-col">
            <h3>Empresa</h3>
            <ul>
              <li>
                <a href="#">Sobre nós</a>
              </li>
              <li>
                <a href="#">Faça parte do time</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="links-col">
            <h3>Funcionalidades</h3>
            <ul>
              <li>
                <a href="#">Marketing</a>
              </li>
              <li>
                <a href="#">Análise de dados</a>
              </li>
              <li>
                <a href="#">Boot discord</a>
              </li>
            </ul>
          </div>

          <div className="links-col">
            <h3>Recursos</h3>
            <ul>
              <li>
                <a href="#">IOS & Android</a>
              </li>
              <li>
                <a href="#">Teste a Demo</a>
              </li>
              <li>
                <a href="#">Clientes</a>
              </li>
              <li>
                <a href="#">API</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Feito por Anthony Vinicius ©2024 Programação Web - Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
