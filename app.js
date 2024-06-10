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
        const htmlContent = marked.parse(markdown);
        contentDiv.innerHTML = htmlContent;
        applyStyles();
    }
});


function applyStyles() {
    const content = document.querySelector('.markdown-content');
    if (content) {
        content.querySelectorAll('a').forEach(el => el.classList.add('text-blue-500', 'hover:text-blue-700', 'underline'));
        content.querySelectorAll('h1').forEach(el => el.classList.add('text-4xl', 'font-bold', 'mt-6', 'mb-4'));
        content.querySelectorAll('h2').forEach(el => el.classList.add('text-3xl', 'font-bold', 'mt-5', 'mb-3'));
        content.querySelectorAll('h3').forEach(el => el.classList.add('text-2xl', 'font-bold', 'mt-4', 'mb-2'));
        content.querySelectorAll('h4').forEach(el => el.classList.add('text-xl', 'font-bold', 'mt-3', 'mb-1'));
        content.querySelectorAll('h5').forEach(el => el.classList.add('text-lg', 'font-bold', 'mt-2', 'mb-1'));
        content.querySelectorAll('h6').forEach(el => el.classList.add('text-base', 'font-bold', 'mt-1', 'mb-1'));
        content.querySelectorAll('p').forEach(el => el.classList.add('text-base', 'leading-relaxed', 'mb-4'));
        content.querySelectorAll('ul').forEach(el => el.classList.add('list-disc', 'list-inside', 'mb-4'));
        content.querySelectorAll('ol').forEach(el => el.classList.add('list-decimal', 'list-inside', 'mb-4'));
        content.querySelectorAll('li').forEach(el => el.classList.add('mb-2'));
    }
}