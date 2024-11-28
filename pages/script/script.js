function loadHTML(file, elementId) {
  fetch(file)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar ${file}: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById(elementId).innerHTML = html;
    })
    .catch((error) => console.error(error));
}

loadHTML("/pages/header.html", "header");
loadHTML("/pages/main.html", "main");
loadHTML("/pages/footer.html", "footer");

window.addEventListener("load", function () {
  document.querySelector(".content").classList.add("active");
});

function irParaServicos() {
  window.location.href = "/pages/servicos.html";
}

function irParaHome() {
  window.location.href = "../../index.html";
}

function mostrarFormulario() {
  document.getElementById("popupFormulario").classList.add("active");

  const dataInput = document.getElementById("data");
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  dataInput.min = `${ano}-${mes}-${dia}`;

  const telefoneInput = document.getElementById("telefone");
  telefoneInput.addEventListener("input", formatarTelefone);
}

function formatarTelefone(event) {
  let telefone = event.target.value.replace(/\D/g, "");

  if (telefone.length > 11) {
    telefone = telefone.slice(0, 11);
  }

  if (telefone.length <= 2) {
    telefone = `(${telefone}`;
  } else if (telefone.length <= 7) {
    telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
  } else {
    telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(
      2,
      7
    )}-${telefone.slice(7)}`;
  }

  event.target.value = telefone;
}

function validarFormulario() {
  const telefone = document.getElementById("telefone").value.replace(/\D/g, "");
  const nome = document.getElementById("nome").value.trim();

  const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nome);
  if (!nomeValido) {
    alert("O nome deve conter apenas letras");
    return false;
  }

  if (telefone.length !== 11) {
    alert("O número de telefone deve conter exatamente 11 dígitos.");
    return false;
  }

  alert(`Parabéns ${nome} seu Agendamento foi Realizado com Sucesso`);
  return true;
}

function fecharFormulario() {
  document.getElementById("popupFormulario").classList.remove("active");
}

let slideIndexCabeleireira = 0;
let slideIndexManicure = 0;

function mudarSlide(n, tipo) {
  let slides;
  let slideIndex;

  if (tipo === "cabeleireira") {
    slides = document.querySelectorAll(".cabeleireira .slide");
    slideIndex = slideIndexCabeleireira;
  } else if (tipo === "manicure") {
    slides = document.querySelectorAll(".manicure .slide");
    slideIndex = slideIndexManicure;
  }

  slideIndex += n;

  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  } else if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  const offset = -slideIndex * 100;
  if (tipo === "cabeleireira") {
    document.querySelector(
      ".cabeleireira .slides"
    ).style.transform = `translateX(${offset}%)`;
    slideIndexCabeleireira = slideIndex;
  } else if (tipo === "manicure") {
    document.querySelector(
      ".manicure .slides"
    ).style.transform = `translateX(${offset}%)`;
    slideIndexManicure = slideIndex;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mudarSlide(0, "cabeleireira");
  mudarSlide(0, "manicure");
});

let carrinho = [];
let total = 0;

function reposicionarCarrinho() {
  const carrinho = document.getElementById("carrinho");

  carrinho.scrollTop = carrinho.scrollHeight;
}

function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find((item) => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  total += preco;
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const carrinhoElemento = document.getElementById("itens-carrinho");
  const totalElemento = document.getElementById("total-carrinho");
  const carrinhoConteiner = document.getElementById("carrinho");

  carrinhoElemento.innerHTML = "";

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");

    li.textContent = `${item.nome} - R$${item.preco.toFixed(2)} x ${
      item.quantidade
    }`;

    const botaoAumentar = document.createElement("button");
    botaoAumentar.textContent = "+";
    botaoAumentar.onclick = () => adicionarAoCarrinho(item.nome, item.preco);

    const botaoDiminuir = document.createElement("button");
    botaoDiminuir.textContent = "-";
    botaoDiminuir.onclick = () => removerDoCarrinho(index);

    li.appendChild(botaoAumentar);
    li.appendChild(botaoDiminuir);
    carrinhoElemento.appendChild(li);
  });

  document.getElementById("total-carrinho").textContent = `R$${total.toFixed(
    2
  )}`;
  reposicionarCarrinho();

  totalElemento.textContent = `R$${total.toFixed(2)}`;
  carrinhoConteiner.style.display = carrinho.length > 0 ? "block" : "none";
}

function removerDoCarrinho(index) {
  const item = carrinho[index];

  if (item.quantidade > 1) {
    item.quantidade--;
    total -= item.preco;
  } else {
    total -= item.preco;
    carrinho.splice(index, 1);
  }

  atualizarCarrinho();

  if (carrinho.length === 0) {
    document.getElementById("carrinho").style.display = "none";
  }
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio");
    return;
  }

  alert(`Compra finalizada! Total: R$${total.toFixed(2)}`);
  carrinho = [];
  total = 0;
  atualizarCarrinho();
}

function fecharCarrinho() {
  document.getElementById("carrinho").style.display = "none";
}
