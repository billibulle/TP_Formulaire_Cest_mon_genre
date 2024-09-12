$(document).ready(function () {
    // Regex Date
    $.validator.addMethod("dateFormat", function (value, element) {
        // Remplacer les espaces, points et tirets par un ou plusieurs slashs
        value = value.replace(/[\.\-\s]+/g, "/");
        
        // Tester le format de la date après remplacement
        return this.optional(element) || /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value);
    }, "Cette date n'est pas correcte");

    // Regex Email
    $.validator.addMethod("validateEmail", function (value, element) {
        let emailPattern = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,6})$/;
        return this.optional(element) || emailPattern.test(value);
    }, "Veuillez entrer une adresse email valide");

    // Regex Image
    $.validator.addMethod("imageOnly", function (value, element) {
        const file = element.files[0];
        if (file) {
            const fileType = file.type;
            const validTypes = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg'];
            return this.optional(element) || validTypes.includes(fileType);
        }
        return this.optional(element);
    }, "Veuillez télécharger une photo au format PNG, GIF, JPG, ou JPEG uniquement");
    
    // Nom en majuscule
    $('#nom').on('input', function () {
        $(this).val($(this).val().toUpperCase());
    });

    // Prenom en majuscule et minuscule
    $('#prenom').on('input', function () {
        $(this).val($(this).val().charAt(0).toUpperCase() + $(this).val().slice(1).toLowerCase());
    });


    
    // Form Validation
    $("#formValidation").validate({
        rules: {
            photo: {
                required: true,
                imageOnly: true,
            },
            nom: {
                required: true,
                minlength: 4,
            },
            prenom: {
                required: true,
                minlength: 4,
            },
            dateNaissance: {
                required: true,
                dateFormat: true,
            },
            email: {
                required: true,
                validateEmail: true,
            }
        },
        messages: {
            photo: {
                required: "Veuillez télécharger une photo (format: png, gif, jpg, jpeg)",
                imageOnly: "Veuillez télécharger une photo au format PNG, GIF, JPG, ou JPEG uniquement"
            },
            nom: {
                required: "Champ requis",
                minlength: "Le nom doit contenir au moins 4 caractères"
            },
            prenom: {
                required: "Champ requis",
                minlength: "Le prénom doit contenir au moins 4 caractères"
            },
            dateNaissance: {
                required: "Champ requis",
                date: "Veuillez entrer une date valide"
            },
            email: {
                required: "Champ requis",
                email: "Veuillez entrer une adresse email valide"
            }
        },

        // Mettre les bordures rouges pour les champs non valides
        highlight: function (element) {
            $(element).addClass('error').removeClass('valid');
            if (element.id == "dateNaissance") {
                $("#dateError").show();
            }
        },
        // Retire les bordures vertes pour les champs valides
        unhighlight: function (element) {
            $(element).removeClass('error').addClass('valid');
            if (element.id == "dateNaissance") {
                $("#dateError").hide();
            }
        },

        // Envoyer le formulaire après validation
        submitHandler: function (form) {
            alert("Confirmez-vous l’envoi des informations ?"); // Afficher l'alerte de validation
            form.submit(); // Soumettre le formulaire après l'alerte
        }
    });

    // Alerte pour le choix du bouton radio
    $("input[name='genre']").change(function () {
        alert("Vous avez choisi : " + $(this).val() + ". Tu peux encore réfléchir à ce que tu es!");
    });

    // Prévisualisation de l'image sélectionnée
    $("#photo").change(function () {
        const input = this;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('.placePhoto').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    });

    // Gestionnaire pour le bouton de réinitialisation
    $(".reset").click(function (event) {
        event.preventDefault(); // Empêche le comportement par défaut du bouton de réinitialisation
        $("#formValidation")[0].reset(); // Réinitialise le formulaire
        $('.placePhoto').attr('src', './img/noimage.png'); // Réinitialise la prévisualisation de l'image
        $(".error-message").hide(); // Cache les messages d'erreur personnalisés
        $(".error").removeClass('error'); // Retire la classe error des champs
        $(".valid").removeClass('valid'); // Retire la classe valid des champs
    });
});

