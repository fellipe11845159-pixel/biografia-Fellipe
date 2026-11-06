document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTOS PRINCIPAIS
    ========================================= */

    const intro = document.getElementById("intro");
    const botaoEntrar = document.getElementById("entrar");

    const links = document.querySelectorAll("header a");

    const secoes = document.querySelectorAll("main section");


    /* =========================================
       TELA DE INTRODUÇÃO
    ========================================= */

    if (intro && botaoEntrar) {

        document.body.style.overflow = "hidden";

        botaoEntrar.addEventListener("click", () => {

            intro.classList.add("fade");

            tocarSomEntrada();

            setTimeout(() => {

                intro.style.display = "none";

                document.body.style.overflow = "";

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }, 1500);

        });

    }


    /* =========================================
       NAVEGAÇÃO SUAVE
    ========================================= */

    links.forEach(link => {

        link.addEventListener("click", function(event) {

            const destino = this.getAttribute("href");

            if (destino && destino.startsWith("#")) {

                const elemento =
                    document.querySelector(destino);

                if (elemento) {

                    event.preventDefault();

                    elemento.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    /* =========================================
       ANIMAÇÃO DAS SEÇÕES
    ========================================= */

    if ("IntersectionObserver" in window) {

        const observador =
            new IntersectionObserver(
                (entradas, observer) => {

                    entradas.forEach(entrada => {

                        if (entrada.isIntersecting) {

                            entrada.target.classList.add(
                                "visivel"
                            );

                            observer.unobserve(
                                entrada.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        secoes.forEach(secao => {

            secao.classList.add("animar");

            observador.observe(secao);

        });

    }


    /* =========================================
       EFEITO DE DIGITAÇÃO NO HERO
    ========================================= */

    const tituloHero =
        document.querySelector("#hero h1");

    if (tituloHero) {

        const textoOriginal =
            tituloHero.textContent;

        tituloHero.textContent = "";

        let indice = 0;

        function escreverTitulo() {

            if (indice < textoOriginal.length) {

                tituloHero.textContent +=
                    textoOriginal.charAt(indice);

                indice++;

                setTimeout(
                    escreverTitulo,
                    45
                );

            }

        }

        setTimeout(
            escreverTitulo,
            1800
        );

    }


    /* =========================================
       FUNDO PARALLAX
    ========================================= */

    const elementosFundo =
        document.querySelectorAll(
            ".militar, .estudo, .direito, .engenharia, .luta"
        );

    document.addEventListener(
        "mousemove",
        event => {

            const mouseX =
                (event.clientX / window.innerWidth) - 0.5;

            const mouseY =
                (event.clientY / window.innerHeight) - 0.5;

            elementosFundo.forEach(
                (elemento, indice) => {

                    const intensidade =
                        (indice + 1) * 4;

                    elemento.style.transform =
                        `translate(
                            ${mouseX * intensidade}px,
                            ${mouseY * intensidade}px
                        )`;

                }
            );

        }
    );


    /* =========================================
       FORMULÁRIO
    ========================================= */

    const formulario =
        document.querySelector("#Contato form");

    if (formulario) {

        formulario.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const nome =
                    document.getElementById("nome");

                const email =
                    document.getElementById("email");

                const mensagem =
                    document.getElementById("mensagem");

                if (!nome || !email || !mensagem) {
                    return;
                }

                const nomeValor =
                    nome.value.trim();

                const emailValor =
                    email.value.trim();

                const mensagemValor =
                    mensagem.value.trim();


                if (nomeValor === "") {

                    mostrarMensagem(
                        "Por favor, digite seu nome.",
                        "erro"
                    );

                    nome.focus();

                    return;
                }


                if (!validarEmail(emailValor)) {

                    mostrarMensagem(
                        "Digite um e-mail válido.",
                        "erro"
                    );

                    email.focus();

                    return;
                }


                if (mensagemValor === "") {

                    mostrarMensagem(
                        "Escreva uma mensagem antes de enviar.",
                        "erro"
                    );

                    mensagem.focus();

                    return;
                }


                const assunto =
                    encodeURIComponent(
                        "Mensagem enviada pelo site de Fellipe"
                    );

                const corpo =
                    encodeURIComponent(
                        `Nome: ${nomeValor}\n\n` +
                        `E-mail: ${emailValor}\n\n` +
                        `Mensagem:\n${mensagemValor}`
                    );


                /*
                 * COLOQUE SEU E-MAIL AQUI
                 */

                const seuEmail =
                    "SEUEMAIL@EXEMPLO.COM";


                window.location.href =
                    `mailto:${seuEmail}?subject=${assunto}&body=${corpo}`;


                mostrarMensagem(
                    "Abrindo seu aplicativo de e-mail...",
                    "sucesso"
                );

                formulario.reset();

            }
        );

    }


    /* =========================================
       CURRÍCULO
    ========================================= */

    const linkCurriculo =
        document.querySelector(
            '#Curriculo a[href="curriculo.pdf"]'
        );

    if (linkCurriculo) {

        linkCurriculo.addEventListener(
            "click",
            () => {

                console.log(
                    "Abrindo currículo em PDF..."
                );

            }
        );

    }


    /* =========================================
       HABILIDADES INTERATIVAS
    ========================================= */

    const cardsHabilidades =
        document.querySelectorAll(
            ".habilidade-card"
        );

    const modalHabilidade =
        document.getElementById(
            "modal-habilidade"
        );

    const fecharModal =
        document.getElementById(
            "fechar-modal"
        );

    const modalTitulo =
        document.getElementById(
            "modal-titulo"
        );

    const modalTexto =
        document.getElementById(
            "modal-texto"
        );

    const modalIcone =
        document.getElementById(
            "modal-icone"
        );


    /*
     * TEXTOS DAS HABILIDADES
     */

    const historiasHabilidades = {

        disciplina: {

            titulo: "Disciplina",

            icone: "🎖️",

            texto: `
                <p>
                    Disciplina não é fazer apenas aquilo que
                    gostamos. É fazer aquilo que precisa ser feito
                    mesmo quando a vontade é desistir.
                </p>

                <p>
                    Aprendi que grandes objetivos não aparecem
                    de um dia para o outro. Eles são construídos
                    através das pequenas decisões tomadas todos
                    os dias.
                </p>

                <p>
                    Meu sonho de seguir a carreira militar me fez
                    enxergar a disciplina como uma ferramenta para
                    construir a pessoa que quero ser.
                </p>
            `

        },


        foco: {

            titulo: "Foco",

            icone: "🎯",

            texto: `
                <p>
                    Existem momentos em que o objetivo parece
                    distante. Nessas horas, olhar para o caminho
                    inteiro pode assustar.
                </p>

                <p>
                    Então aprendi a olhar apenas para o próximo
                    passo. Depois outro. E outro.
                </p>

                <p>
                    Foco não significa nunca se distrair.
                    Significa saber voltar para o caminho quando
                    alguma coisa tenta nos tirar dele.
                </p>
            `

        },


        resistencia: {

            titulo: "Resistência",

            icone: "💪",

            texto: `
                <p>
                    A vida nem sempre respeita os nossos planos.
                    Existem dias em que o corpo está cansado,
                    a mente está pesada e continuar parece
                    impossível.
                </p>

                <p>
                    Foi nesses momentos que comecei a entender
                    o verdadeiro significado de resistência.
                </p>

                <p>
                    Resistir não significa nunca cair.
                    Significa levantar, respirar fundo e continuar
                    depois da queda.
                </p>
            `

        },


        luta: {

            titulo: "Artes Marciais",

            icone: "🥊",

            texto: `
                <p>
                    O boxe e o Muay Thai me ensinaram que força
                    não é suficiente.
                </p>

                <p>
                    Antes de aprender a acertar um golpe,
                    é preciso aprender a controlar a própria mente.
                </p>

                <p>
                    Cada treino me lembra que o verdadeiro lutador
                    não luta apenas contra um adversário.
                    Ele também aprende a controlar o medo,
                    o cansaço e a própria mente.
                </p>
            `

        },


        estudos: {

            titulo: "Estudos",

            icone: "📚",

            texto: `
                <p>
                    Sempre enxerguei os estudos como uma maneira
                    de construir o futuro antes mesmo que ele
                    aconteça.
                </p>

                <p>
                    Tenho o objetivo de me formar em Direito e
                    também seguir a área de Engenharia Militar.
                </p>

                <p>
                    São caminhos difíceis, mas gosto justamente
                    da ideia de enfrentar desafios que exigem
                    inteligência, dedicação e disciplina.
                </p>
            `

        },


        militar: {

            titulo: "O sonho de ser Capitão",

            icone: "🪖",

            texto: `
                <p>
                    Desde cedo comecei a imaginar como seria
                    vestir uma farda e assumir a responsabilidade
                    de liderar outras pessoas.
                </p>

                <p>
                    Não sonho apenas com o posto de Capitão.
                    Sonho com tudo aquilo que preciso me tornar
                    para merecer chegar até lá.
                </p>

                <p>
                    Imagino um dia olhando para trás e lembrando
                    de todas as dificuldades, dos treinamentos,
                    dos estudos e de cada vez que pensei em desistir.
                </p>

                <p>
                    Talvez esse seja o verdadeiro significado
                    do meu sonho: não apenas alcançar uma patente,
                    mas construir uma história da qual eu possa
                    me orgulhar.
                </p>
            `

        }

    };


    /*
     * ABRIR MODAL
     */

    cardsHabilidades.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const habilidade =
                    card.dataset.habilidade;

                const historia =
                    historiasHabilidades[
                        habilidade
                    ];

                if (!historia) {
                    return;
                }

                modalTitulo.textContent =
                    historia.titulo;

                modalIcone.textContent =
                    historia.icone;

                modalTexto.innerHTML =
                    historia.texto;

                modalHabilidade.classList.add(
                    "ativo"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    /*
     * FECHAR MODAL
     */

    function fecharJanelaHabilidade() {

        modalHabilidade.classList.remove(
            "ativo"
        );

        document.body.style.overflow = "";

    }


    if (fecharModal) {

        fecharModal.addEventListener(
            "click",
            fecharJanelaHabilidade
        );

    }


    if (modalHabilidade) {

        modalHabilidade.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modalHabilidade
                ) {

                    fecharJanelaHabilidade();

                }

            }
        );

    }


    /*
     * ESC FECHA A JANELA
     */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modalHabilidade &&
                modalHabilidade.classList.contains(
                    "ativo"
                )
            ) {

                fecharJanelaHabilidade();

            }

        }
    );


    /* =========================================
       HOVER NAS HABILIDADES
    ========================================= */

    cardsHabilidades.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.borderColor =
                    "#c9ad57";

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.borderColor =
                    "rgba(201,173,87,0.18)";

            }
        );

    });


    /* =========================================
       BOTÃO ENTRAR
    ========================================= */

    if (botaoEntrar) {

        botaoEntrar.addEventListener(
            "mousedown",
            () => {

                botaoEntrar.style.transform =
                    "scale(0.95)";

            }
        );

        botaoEntrar.addEventListener(
            "mouseup",
            () => {

                botaoEntrar.style.transform =
                    "scale(1.05)";

            }
        );

    }


    /* =========================================
       ANO DO RODAPÉ
    ========================================= */

    const footer =
        document.querySelector("footer p");

    if (footer) {

        footer.textContent =
            `© ${new Date().getFullYear()} Fellipe. Todos os direitos reservados.`;

    }


    /* =========================================
       VALIDAR E-MAIL
    ========================================= */

    function validarEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    }


    /* =========================================
       MENSAGEM DO FORMULÁRIO
    ========================================= */

    function mostrarMensagem(
        texto,
        tipo
    ) {

        const antiga =
            document.querySelector(
                ".mensagem-formulario"
            );

        if (antiga) {
            antiga.remove();
        }


        const mensagem =
            document.createElement("div");

        mensagem.className =
            "mensagem-formulario";

        mensagem.textContent =
            texto;

        mensagem.style.padding =
            "15px";

        mensagem.style.marginTop =
            "20px";

        mensagem.style.borderRadius =
            "10px";

        mensagem.style.textAlign =
            "center";

        mensagem.style.fontWeight =
            "bold";


        if (tipo === "erro") {

            mensagem.style.background =
                "rgba(180,40,40,.2)";

            mensagem.style.border =
                "1px solid #d9534f";

            mensagem.style.color =
                "#ff8a85";

        } else {

            mensagem.style.background =
                "rgba(40,180,100,.2)";

            mensagem.style.border =
                "1px solid #42c77a";

            mensagem.style.color =
                "#7dffad";

        }


        if (formulario) {

            formulario.appendChild(
                mensagem
            );

        }


        setTimeout(() => {

            mensagem.style.opacity = "0";

            mensagem.style.transition =
                "0.5s";

            setTimeout(() => {

                mensagem.remove();

            }, 500);

        }, 4000);

    }


    /* =========================================
       SOM DA ABERTURA
    ========================================= */

    function tocarSomEntrada() {

        try {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioContext) {
                return;
            }

            const audio =
                new AudioContext();

            const oscilador =
                audio.createOscillator();

            const ganho =
                audio.createGain();


            oscilador.type =
                "sine";


            oscilador.frequency.setValueAtTime(
                440,
                audio.currentTime
            );

            oscilador.frequency.exponentialRampToValueAtTime(
                880,
                audio.currentTime + 0.4
            );


            ganho.gain.setValueAtTime(
                0.0001,
                audio.currentTime
            );

            ganho.gain.exponentialRampToValueAtTime(
                0.15,
                audio.currentTime + 0.05
            );

            ganho.gain.exponentialRampToValueAtTime(
                0.0001,
                audio.currentTime + 0.5
            );


            oscilador.connect(ganho);

            ganho.connect(
                audio.destination
            );


            oscilador.start();

            oscilador.stop(
                audio.currentTime + 0.5
            );

        } catch (erro) {

            console.log(
                "Áudio não disponível:",
                erro
            );

        }

    }


    /* =========================================
       TECLA ESC - FECHAR INTRO
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                intro &&
                intro.style.display !== "none"
            ) {

                intro.classList.add("fade");

                setTimeout(() => {

                    intro.style.display =
                        "none";

                    document.body.style.overflow =
                        "";

                }, 1500);

            }

        }
    );


    /* =========================================
       LOG
    ========================================= */

    console.log(
        "Fellipe — site carregado com sucesso."
    );

});
