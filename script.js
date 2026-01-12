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
        img.classList.remove('steag-activ');
        
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

// 4. Funcția pentru textul dinamic (NOUĂ)
function startTextDinamic() {
    // Liste separate pentru fiecare limbă
    const cuvinteRO = ["clasică", "acustică", "electrică"]; // Corectat typo
    const cuvinteEN = ["classical", "acoustic", "rock"];   
    
    let index = 0;
    
    // Luăm ambele elemente (Asigură-te că în HTML ai id="text-dinamic" pt RO și id="text-dinamic-en" pt EN)
    const elementRo = document.getElementById("text-dinamic");
    const elementEn = document.getElementById("text-dinamic-en");

    setInterval(() => {
        index++;
        // Resetăm indexul dacă ajunge la final
        if (index >= cuvinteRO.length) {
            index = 0;
        }

        // Actualizăm textul de ROMÂNĂ (dacă există elementul)
        if (elementRo) {
            elementRo.textContent = cuvinteRO[index];
        }

        // Actualizăm textul de ENGLEZĂ (dacă există elementul)
        if (elementEn) {
            elementEn.textContent = cuvinteEN[index];
        }
        
    }, 1000);
}

// 5. LA ÎNCĂRCAREA PAGINII
window.onload = function() {
    // A. Setări Limbă
    var limbaSalvata = localStorage.getItem('limbaPreferata') || 'ro';
    setLimba(limbaSalvata);

    // B. Pornim animația textului
    startTextDinamic();

    // C. Observer pentru animații (Ease In)
    // Punem și observerul aici ca să fie totul într-un loc
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('vizibil');
            } else {
                if (entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove('vizibil');
                }
            }
        });
    }, { threshold: 0.1 });

    // Observăm secțiunile (verificăm dacă există înainte să dăm eroare)
    const sectiuneText = document.getElementById("sectiune-cezar");
    if(sectiuneText) observer.observe(sectiuneText);

    const toatePozele = document.querySelectorAll('.card-poza');
    toatePozele.forEach((poza) => observer.observe(poza));


    // D. Codul pentru Galerie (Modal)
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

        if(span) {
            span.onclick = function () {
                modal.style.display = "none";
            }
        }

        modal.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }
};