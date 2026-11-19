const essays = [
    {
        title: "O respeito às diferenças para a superação dos conflitos sociais na sociedade contemporânea",
        score: "Nota não informada",
        text: `Nos dias atuais, vivemos em uma sociedade no qual pessoas sofrem com preconceito, intolerância, desigualdade, desrespeito, isso vem junto com a perda de ética das pessoas e isso é um grande ponto negativo para uma convivência saudável. Por isso, temos que respeitarmos a diferença e não criticá-los, usar essas críticas para uma superação maior que elas.

Com isso, a falta de ética dentro da nossa sociedade pode aumentar os conflitos. Os preconceitos também podem levar a uma exclusão social, violência e danos físicos e mentais para as pessoas que sofrem com isso. Um dos pontos em que ocorrem constantemente esses tipos de conflitos são as redes sociais.

A ética e o respeito é fundamental para mudarmos e superarmos esses conflitos, mostrando para a sociedade a diferença radical que trás, para que assim possamos viver em igualdade e sem problemas. Uma iniciativa que pode ser tomada para aumentar o respeito na sociedade, seja as escolas fazendo trabalhos escolares abordando o tema, campanhas sociais e até mesmo publicando postagens para as redes sociais, pois assim alcançamos o nosso objetivo com mais eficiência.

Entende-se que o respeito e a ética são importantes para superar esses conflitos, porém não é algo fácil de conseguir, mas podemos criar alternativas para resolver isso e assim vivemos em uma sociedade igualitária.`
    },
    ...Array.from({ length: 16 }, (_, i) => ({
        title: `Redação ${i + 2}`,
        score: "Nota não informada",
        text: "Insira aqui o texto completo da redação."
    }))
];

document.addEventListener("DOMContentLoaded", () => {
    const essayGrid = document.getElementById("essayGrid");
    const essaySearch = document.getElementById("essaySearch");

    const modal = document.getElementById("essayModal");
    const modalNumber = document.getElementById("modalNumber");
    const modalScore = document.getElementById("modalScore");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalClose = document.getElementById("modalClose");

    if (!essayGrid) {
        console.error("Não encontrei o elemento #essayGrid no redacoes.html");
        return;
    }

    function openModal(essay, index) {
        if (modalNumber) {
            modalNumber.textContent = `REDAÇÃO ${String(index + 1).padStart(2, "0")}`;
        }
        if (modalScore) {
            modalScore.textContent = essay.score;
        }
        modalTitle.textContent = essay.title;
        modalText.textContent = essay.text;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }

    function renderEssays(search = "") {
        essayGrid.innerHTML = "";

        const termo = search.trim().toLowerCase();
        const filtered = essays.filter(essay =>
            essay.title.toLowerCase().includes(termo)
        );

        if (filtered.length === 0) {
            essayGrid.innerHTML =
                '<p class="empty-message">Nenhuma redação encontrada.</p>';
            return;
        }

        filtered.forEach(essay => {
            const originalIndex = essays.indexOf(essay);

            const card = document.createElement("article");
            card.className = "essay-card";
            card.tabIndex = 0;
            card.setAttribute("role", "button");

            const number = document.createElement("span");
            number.className = "essay-number";
            number.textContent = `REDAÇÃO ${String(originalIndex + 1).padStart(2, "0")}`;

            const score = document.createElement("div");
            score.className = "essay-score";
            score.textContent = essay.score;

            const title = document.createElement("h3");
            title.textContent = essay.title;

            const instruction = document.createElement("p");
            instruction.className = "essay-instruction";
            instruction.textContent = "Clique para ler a redação →";

            card.append(number, score, title, instruction);

            card.addEventListener("click", () => openModal(essay, originalIndex));

            card.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openModal(essay, originalIndex);
                }
            });

            essayGrid.appendChild(card);
        });
    }

    if (essaySearch) {
        essaySearch.addEventListener("input", event => {
            renderEssays(event.target.value);
        });
    }

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", event => {
            if (event.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeModal();
    });

    renderEssays();
});