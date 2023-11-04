//Changing Title every 20 seconds
window.setInterval(function() {
    changetitle();
}, 20000);                      //20k millis ~ 20sec

let interval_no = 0;
function changetitle(){
        if(interval_no % 2 == 0) {
            document.title = "Hire Me!";
        }
        else {
            document.title = "Fabiola Flores | Front-End Web Developer";
        }
        interval_no++;
}


// ---Show Menu---
//When Nav Toggle Button is clicked the Menu is displayed
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId), 
    nav = document.getElementById(navId);

    if(toggle && nav){
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
        });
    }
}

showMenu('nav-toggle', 'nav-menu');


// ---Remove Menu Mobile---
//When a Menu Item is clicked the Menu then gets hidden
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

navLink.forEach(i => i.addEventListener('click', linkAction));


// ---Scroll Section Active Link---
//As the WebPage is navigated the active section is higlighed in the Nav Menu too
const sections = document.querySelectorAll('section[id]'); 
for(sec of sections){
    console.log(sec);
}

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        }
        else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);


// ---Change Background Header---
//The background color of the Nav Menu switches its color when the WebPage is scrolled
function scrollHeader() {
    const header = document.getElementById('header');
    if(this.scrollY >= 200)
        header.classList.add('scroll-header');
    else
        header.classList.remove('scroll-header');
}

window.addEventListener('scroll', scrollHeader);


// ---Show Scroll Top---
//A Scroll Top button appears at the bottom right when the WebPage is navigated
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    if(this.scrollY >= 560)
        scrollTop.classList.add('show-scroll');
    else
        scrollTop.classList.remove('show-scroll');
}

window.addEventListener('scroll', scrollTop);

document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('cards-container');

    function hideAllCards() {
        cardsContainer.querySelectorAll('.card').forEach(card => {
            card.style.display = 'none';
        });
    }

    function showCards(category) {
        hideAllCards();
        cardsContainer.querySelectorAll('.' + category).forEach(card => {
            card.style.display = 'flex';
        });
    }

    function deactivateAllButtons() {
        document.querySelectorAll('.filter-button').forEach(button => {
            button.classList.remove('selected');
        });
    }

    function activateButton(button) {
        button.classList.add('selected');
    }

    // Mostrar todas las cards por defecto
    showCards('card');

    // Seleccionar el botón "Mostrar Todas" al cargar la página
    const showAllButton = document.querySelector('[data-category="card"]');
    activateButton(showAllButton);

    document.getElementById('button-container').addEventListener('click', function(event) {
        if(event.target.classList.contains('filter-button')) {
            event.preventDefault();
            hideAllCards();
            showCards(event.target.dataset.category);
            deactivateAllButtons();
            activateButton(event.target);
        }
    });
});




// --- GSAP ---
// GSAP Animations is used to animate the Home Page on startup
gsap.from('.home__img', {opacity: 0, duration: 2, delay: .5, x: 60, ease: 'power2.out'});
gsap.from('.home__data', {opacity: 0, duration: 2, delay: .8, y: 25, ease: 'power2.out'});
gsap.from('.home__greeting, .home__name, .home__profession, .home__button', {opacity: 0, duration: 1, delay: 1, y: 25, ease: 'power4.out', stagger: 0.2});

gsap.from('.nav__logo .nav__toggle', {opacity: 0, duration: 1, delay: 1.5, y: 25, ease: 'power4.out', stagger: 0.2});
gsap.from('.nav__item', {opacity: 0, duration: 1, delay: 1.8, y: 25, ease: 'power4.out', stagger: 0.2});
gsap.from('.home__social-icon', {opacity: 0, duration: 1, delay: 2.2, y: 25, ease: 'power4.out', stagger: 0.2});

function animateSkillCards() {
    const skillCards = document.querySelectorAll('.swiper-container');
    skillCards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2 * index, // Aumenta el retraso para que las tarjetas se animen en secuencia
        ease: 'power2.out'
      });
    });
  }

  // Función para manejar las entradas del Intersection Observer
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillCards();

        // Vuelve a observar la sección después de aplicar la animación
        observer.observe(entry.target);
      }
    });
  }

  // Obtén la referencia al contenedor de la sección Skills
  const skillsSection = document.querySelector('.skills');

  // Crea un nuevo Intersection Observer y llámalo para manejar las entradas
  const observer = new IntersectionObserver(handleIntersection);

  // Observa la sección Skills
  observer.observe(skillsSection);



//   send form

document.getElementById("form").addEventListener('submit',(e)=>{
e.preventDefault()


const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const subject = document.getElementById('subject').value;
const number = document.getElementById('number').value;
const message = document.getElementById('message').value;

const Message = {
    subject:subject,
    name:name,
    number:number,
    from_name:email,
    message:message
}
emailjs.init('bSQQKyK0Q9i7LC2wV');
    emailjs.send('service_twu79gt', 'template_xbjekni', Message)
        .then(function(response) {
            console.log('Mensaje enviado correctamente', response.status, response.text);
            alert('Mensaje enviado correctamente');
            document.getElementById('form').reset();
        }, function(error) {
            console.log('Error al enviar el mensaje', error);
            alert('Error al enviar el mensaje. Por favor, inténtalo nuevamente.');
        });
})