// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
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
      const end = start + Math.floor(Math.random() * 15)
      this.queue.push({ from, to, start, end })
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
      let { from, to, start, end, char } = this.queue[i]
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
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'TEDxNTUA',
   'Enigma',
  'April 06, 2019',
  'Hellenic Cosmos',
  'Peiraios 254, Tavros'
]

var ted = document.querySelector('.textTed')
var enigma = document.querySelector('.textEnigma')
var date = document.querySelector('.textDate')
var venue = document.querySelector('.textVenue')
var address = document.querySelector('.textAddress')
var fx0 = new TextScramble(ted)
var fx1 = new TextScramble(enigma)
var fx2 = new TextScramble(date)
var fx3 = new TextScramble(venue)
var fx4 = new TextScramble(address)

time = 900;
setTimeout(function(){fx0.setText(phrases[0])}, time);
time += 800;
setTimeout(function(){fx1.setText(phrases[1])}, time);
time += 900;
setTimeout(function(){fx2.setText(phrases[2])}, time);
time += 900;
setTimeout(function(){fx3.setText(phrases[3])}, time);
time += 900;
setTimeout(function(){fx4.setText(phrases[4])}, time);

next()
