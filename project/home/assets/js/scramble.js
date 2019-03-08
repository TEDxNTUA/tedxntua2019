class TextScramble {
  constructor(el) {
    this.el = el
    // let thought = String.fromCodePoint(0x1F4AD)
    let thought = '_'
    // let eyes = String.fromCodePoint(0xFE0F)
    // let hundred = String.fromCodePoint(0x1F4AF)
    this.chars = ['_','+','-', '/', '^', '*', '&', thought]
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
      const end = start + Math.floor(Math.random() * 178)
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
let time = 0
setTimeout(function(){fx1.setText(phrases[1])}, time);
setTimeout(function(){fx0.setText(phrases[0])}, time);
