document.addEventListener("DOMContentLoaded", function () {
    const modalTrigger = document.querySelector(".modal-trigger");
    const modal = document.getElementById("modal");
    const modalOverlay = document.getElementById("modal-overlay");
    const modalForm = document.getElementById("modal-form");
    const modalReset = document.getElementById("modal-reset")

    modalTrigger.addEventListener("click", function () {
        modal.style.display = "block";
        modalOverlay.style.display = "block";
    });


    modalReset.addEventListener("click", function () {
        modal.style.display = "none";
        modalOverlay.style.display = "none";
    });
    modalOverlay.addEventListener("click", function () {
        modal.style.display = "none";
        modalOverlay.style.display = "none";
    });

    modalForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (name.trim() === "" || email.trim() === "" || !validateEmail(email)) {
            alert("Заполните корректно все поля формы.");
        } else {
            alert("Форма успешно отправлена.");
            modal.style.display = "none";
            modalOverlay.style.display = "none";
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

const fileInput = document.getElementById("fileToUpload");
const imagePreview = document.getElementById("imagePreview");
const deleteButton = document.getElementById("deleteButton");

function previewImage(event) {
    const input = event.target;

    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;

            // Перед добавлением новой картинки, удалите предыдущую
            const existingImg = imagePreview.querySelector("img");
            if (existingImg) {
                imagePreview.removeChild(existingImg);
            }

            imagePreview.appendChild(img);
            deleteButton.style.display = "block"; // Show the delete button
        };
        reader.readAsDataURL(file);
    }
}

function deleteImage() {
    const img = imagePreview.querySelector("img");

    if (img) {
        imagePreview.removeChild(img);
        deleteButton.style.display = "none"; // Hide the delete button
        fileInput.value = ""; // Clear the file input
    }
}



