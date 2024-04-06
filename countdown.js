
   document.addEventListener("DOMContentLoaded", function() {
    // Calcula e exibe o número de dias restantes até o próximo aniversário de namoro
    function calcularDiasRestantes() {
        const hoje = new Date();
        const proximoAniversario = new Date(hoje.getFullYear(), hoje.getMonth(), 7);
        if (hoje > proximoAniversario) {
            proximoAniversario.setMonth(proximoAniversario.getMonth() + 1);
        }
        const diferenca = proximoAniversario - hoje;
        const diasRestantes = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
        document.getElementById("countdown").textContent = diasRestantes;
    }

    // Carrega fotos da galeria
    function carregarFotos() {
        const gallery = document.getElementById("photoGallery");
        gallery.innerHTML = "";
        const photos = JSON.parse(localStorage.getItem("photos")) || [];
        photos.forEach(photo => {
            const photoDiv = document.createElement("div");
            photoDiv.classList.add("photo");
            const img = document.createElement("img");
            img.src = photo;
            photoDiv.appendChild(img);
            gallery.appendChild(photoDiv);
        });
    }

    // Adiciona foto à galeria
    function adicionarFoto(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoDataUrl = e.target.result;
            const photos = JSON.parse(localStorage.getItem("photos")) || [];
            photos.push(photoDataUrl);
            localStorage.setItem("photos", JSON.stringify(photos));
            carregarFotos();
        };
        reader.readAsDataURL(file);
    }

    // Atualiza a galeria de fotos quando uma foto é adicionada
    document.getElementById("uploadInput").addEventListener("change", adicionarFoto);

    // Atualiza os dias restantes ao carregar a página
    calcularDiasRestantes();
    // Carrega as fotos da galeria ao carregar a página
    carregarFotos();
});
