function loadHTML(file, elementId) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${file}: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => console.error(error));
}

// Carrega os arquivos
loadHTML('/pages/header.html', 'header');
loadHTML('/pages/main.html', 'main');
loadHTML('/pages/footer.html', 'footer');
