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

loadHTML('/pages/header.html', 'header');
loadHTML('/pages/main.html', 'main');
loadHTML('/pages/footer.html', 'footer');

window.addEventListener('load', function() {
    document.querySelector('.content').classList.add('active');
});

function mostrarMensagem() {
    document.getElementById("popup").classList.add("active");
}

function fecharMensagem() {
    document.getElementById("popup").classList.remove("active");
}