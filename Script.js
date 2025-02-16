$(document).ready(function () {

    function AlertaSonoro() {
        var som = new Audio('Alert-3.mp3');
        som.play();
        setTimeout(function () {
            alert("O valor não pode ser menor que 0");
        }, 300);
    }

    $(document).on('click', '.addLinha', function () {
        var novaLinha = `
        <tr>
            <td>
                <select class="form-control bg-light">
                    <option selected disabled value="">Selecione</option>
                    <option value="Artes">Artes</option>
                    <option value="Ciências">Ciências</option>
                    <option value="História">História</option>
                    <option value="Matemática">Matemática</option>
                    <option value="Português">Português</option>
                </select>
            </td>
            <td>
                <input type="text" class="form-control bg-light notaInput" name="nota[]" placeholder="Digite a nota">
            </td>
            <td><button type="button" class="btn btn-danger text-light removerLinha"><i class="bi bi-file-earmark-minus-fill"></i></button></td>
        </tr>`;
        $('#tabelaDinamica tbody').append(novaLinha);
    });

    // Remover linha
    $(document).on('click', '.removerLinha', function () {
        $(this).closest('tr').remove();
        calcularMedia(); // Recalcular a média ao remover uma linha
    });

    // Monitorar alterações nos campos de nota
    $(document).on('input', '.notaInput', function () {
        calcularMedia(); // Recalcular a média ao alterar uma nota
    });

    // Função para calcular a média
    function calcularMedia() {
        var totalNotas = 0;
        var quantidadeNotas = 0;

        // Iterar pelos inputs de nota para somar os valores válidos
        $('.notaInput').each(function () {
            var nota = parseFloat($(this).val().replace(",", "."));

            if (nota < 0) {
                AlertaSonoro();
                window.document.querySelector(".notaInput").value = "";
            }

            if (!isNaN(nota)) { // Verifica se é um número válido
                totalNotas += nota;
                quantidadeNotas++;
            }
        });

        var media = quantidadeNotas > 0 ? (totalNotas / quantidadeNotas).toFixed(2) : '. . .';

        var ColorMedia = window.document.getElementById("mediaGeral");

        if (media <= 6.99) {
            ColorMedia.style.color = "red";
        } else {
            ColorMedia.style.color = "green";
        }

        // Atualizar a exibição da média
        $('#mediaGeral').text(media);
    }
});
