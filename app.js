document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-nav');
    const contentDiv = document.getElementById('content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const file = button.getAttribute('data-file');
            fetchMarkdown(file);
        });
    });

    async function fetchMarkdown(file) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo');
            }
            const markdown = await response.text();
            renderMarkdown(markdown);
        } catch (error) {
            contentDiv.innerHTML = `<p class="text-red-500">${error.message}</p>`;
        }
    }

    function renderMarkdown(markdown) {
        const htmlContent = marked(markdown);
        contentDiv.innerHTML = htmlContent;
    }
});
