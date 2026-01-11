/* --- script.js --- */

// 1. Funcția care setează limba
function setLimba(limba) {
    var body = document.body;
    
    // Resetăm clasele
    body.classList.remove("limba-ro", "limba-en");
    
    // Adăugăm clasa nouă
    if (limba === 'ro') {
        body.classList.add("limba-ro");
    } else {
        body.classList.add("limba-en");
    }

    // Salvăm preferința în memoria browserului
    localStorage.setItem('limbaPreferata', limba);

    // Actualizăm vizual steagurile
    actualizeazaSteaguriActive(limba);
}

// 2. Funcția care evidențiază steagul activ
function actualizeazaSteaguriActive(limba) {
    var toateSteagurile = document.querySelectorAll('.steag');
    
    toateSteagurile.forEach(function(img) {
        // Resetăm starea tuturor steagurilor
        img.classList.remove('steag-activ');
        
        // Activăm steagul corect
        if (limba === 'ro' && img.src.includes('ro.png')) {
            img.classList.add('steag-activ');
        } else if (limba === 'en' && img.src.includes('gb.png')) {
            img.classList.add('steag-activ');
        }
    });
}

// 3. Funcția pentru meniul de mobil (Burger Menu)
function toggleMobileMenu() {
    var menu = document.getElementById("mobileMenu");
    if (menu.style.width === "100%") {
        menu.style.width = "0";
    } else {
        menu.style.width = "100%";
    }
}

// 4. LA ÎNCĂRCAREA PAGINII (Se execută automat pe orice pagină)
window.onload = function() {
    // Verificăm dacă există o limbă salvată, altfel punem Româna default
    var limbaSalvata = localStorage.getItem('limbaPreferata') || 'ro';
    
    // Aplicăm limba
    setLimba(limbaSalvata);

    // Codul pentru Galerie (Modal) - Doar dacă există galeria pe pagină
    var modal = document.getElementById("modal-poza");
    if (modal) {
        var imgMare = document.getElementById("img-mare");
        var textDescriere = document.getElementById("text-descriere");
        var imaginiGalerie = document.querySelectorAll(".card-poza img");
        var span = document.getElementsByClassName("inchide")[0];

        imaginiGalerie.forEach(function (img) {
            img.onclick = function () {
                modal.style.display = "block";
                imgMare.src = this.src;
                textDescriere.innerHTML = this.alt;
            }
        });

        span.onclick = function () {
            modal.style.display = "none";
        }

        modal.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }
};