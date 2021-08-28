// ——————————————————————————————————————————————————
//BUTTON CUSTOM MENU
// ——————————————————————————————————————————————————
/* menu */
document.querySelector(".menu").addEventListener("click", () => {
  for (let i = 0; i <= 3; i++) {
    document.querySelector(".box").classList.remove("box-show");
    document
      .getElementsByClassName("nav-items")[i].classList.toggle("show-menu");


  }
});

// ——————————————————————————————————————————————————
// TEXT BANNER TITLE
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#°¬________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({
        from,
        to,
        start,
        end
      })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let {
        from,
        to,
        start,
        end,
        char
      } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Text BANNER TITLE 
// ——————————————————————————————————————————————————

const phrases = [
  'Desarrollador',
  'freelancer',
  'diseñador',
  'emprendedor',
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

next()



// ——————————————————————————————————————————————————
// BRAND NAME ANIMATION
// ——————————————————————————————————————————————————


$(function () {
  var text = $(".text-name");
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll <= 100) {
      text.removeClass("hidden");
    } else {
      text.addClass("hidden");
    }

  });

})



// ——————————————————————————————————————————————————
// LAYOUT PROYECTS
// ——————————————————————————————————————————————————
$(window).on('load', function () {
  const proyectosIsotope = $('.proyectos-container').isotope({
    itemSelector: '.proyectos-item',
    layoutMode: 'fitRows'
  });

  $('#proyectos-filters li').on('click', function () {
    $("#proyectos-filters li").removeClass('filter-active');
    $(this).addClass('filter-active');
    proyectosIsotope.isotope({
      filter: $(this).data('filter')
    });
  });

});