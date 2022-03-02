const menulist = document.querySelectorAll('.nav__item');
const ul = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const openmdl = document.querySelectorAll('.btn--show-modal');
const modal = document.querySelector('.modal');
const opas = document.querySelector('.overlay');
const closemdl = document.querySelectorAll('.btn--close-modal');
const sec1 = document.querySelector('#section--1');
const skrolbtn = document.querySelector('.btn--scroll-to');
const header = document.querySelector('.header');
const AllSections = document.querySelectorAll('.section');

openmdl.forEach(function (i) {
  i.addEventListener('click', function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    opas.classList.remove('hidden');
  });
});

closemdl.forEach(function (i) {
  i.addEventListener('click', function (e) {
    modal.classList.add('hidden');
    opas.classList.add('hidden');
  });
});

skrolbtn.addEventListener('click', function (e) {
  const sec1coor = sec1.getBoundingClientRect();

  window.scrollTo({
    top: sec1coor.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

// menularni scroll qilish kerak:

function add(id) {
  const section = document.querySelector(`#${id}`);
  const sectioncoord = section.getBoundingClientRect();

  window.scrollTo({
    top: sectioncoord.top + window.pageYOffset,
    behavior: 'smooth',
  });
}

ul.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.closest('#feature')) {
    add('section--1');
  } else if (e.target.closest('#operation')) {
    add('section--2');
  } else if (e.target.closest('#testtimon')) {
    add('section--3');
  }
});

// header bilan ishlash navni sticki qilish;
const navHeight = nav.getBoundingClientRect().height;
let options3 = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(sticyNav, options3);
function sticyNav(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}
headerObserver.observe(header);

// reveal-oshkor qilish, sectionlarni sekin paydo qilish skroll qilinganda:

function revealnSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
  console.log(entry);
}
const sectionObserver = new IntersectionObserver(revealnSection, {
  root: null,
  threshold: 0.15,
});
AllSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// imglarni blurdan chiqarish Lazy-loading:

const imgTargets = document.querySelectorAll('img[data-src]');

function loadImg(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  console.log(entry.target.src);
  entry.target.src = entry.target.dataset.src; // data-src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}
const imgobserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.3,
  rootMargin: '0px',
});

imgTargets.forEach(img => imgobserver.observe(img));

// tablarni yasash haqida:

const groupbtn = document.querySelector('.operations__tab-container');
const tabcontent = document.querySelectorAll('.operations__content');
const tabbtns = document.querySelectorAll('.operations__tab');

groupbtn.addEventListener('click', function (e) {
  e.preventDefault();

  tabbtns.forEach(function (i) {
    if (i.classList.contains('operations__tab--active')) {
      i.classList.remove('operations__tab--active');
    }
  });
  tabcontent.forEach(function (i) {
    if (i.classList.contains('operations__content--active')) {
      i.classList.remove('operations__content--active');
    }
  });

  let number = e.target.dataset.tab;
  console.log(number);
  e.target.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${number}`)
    .classList.add('operations__content--active');
});

//

//menudagi nav-item larni opasitisini o'zgartirish;

const menulink = document.querySelectorAll('.nav__link');

ul.addEventListener('mouseover', function (e) {
  e.preventDefault();
  menulink.forEach(function (i) {
    i.style.opacity = '0.5';
  });
  e.target.style.opacity = '1';
});

ul.addEventListener('mouseout', function (e) {
  e.preventDefault();
  menulink.forEach(function (i) {
    i.style.opacity = '1';
  });
});
//
// slider yasash:

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      // curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      // curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
};
slider();

// life circuleDOM;
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('hTML parsed and tree build!', e);
});
window.addEventListener('load', function (e) {
  // animation=false;
  console.log('page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = "Saqlanmagan Ma'lumotlar bor!";
});
window.addEventListener('unload', function (e) {
  e.preventDefault();
  console.log(e);
  console.log('leave');
});
