"use strict"

const generateRandomNumber = () => Math.trunc(Math.random() * 50) + 1
let secretNumber = generateRandomNumber()

const check = () => {
  const input = document.querySelector(".guess")
  const alert = document.querySelector(".alert")
  const checkListener = document.querySelector(".btn-check")
  const currentScore = document.querySelector(".current-score > span")
  const highScore = document.querySelector(".high-score > span")
  const numberField = document.querySelector(".number > span")

  if (
    !checkListener ||
    !input ||
    !alert ||
    !currentScore ||
    !highScore ||
    !numberField
  )
    return

  const checkHandler = () => {
    const userNumber = Number(input.value)
    if (!userNumber) return (alert.textContent = "🚫 No Number!")

    const score = Number(currentScore.textContent)
    if (userNumber === secretNumber) {
      document.body.style.backgroundColor = "#18c454cd"
      checkListener.removeEventListener("click", checkHandler)
      if (score > Number(highScore.textContent)) highScore.textContent = score
      numberField.textContent = secretNumber
      return (alert.textContent = "🥳 Correct!")
    } else if (userNumber < secretNumber) alert.textContent = "📈 Too low!"
    else if (userNumber > secretNumber) alert.textContent = "📉 Too high!"

    if (score !== 0) currentScore.textContent = score - 1
  }

  checkListener.addEventListener("click", checkHandler)

  const inputNumberHandler = e => {
    console.log(e.which)

    if ((e.which < 48 || e.which > 59) && (e.which < 96 || e.which > 105))
      return e.preventDefault()
  }
  input.addEventListener("keydown", inputNumberHandler)

  const again = () => {
    const againListener = document.querySelector(".btn-again")

    if (!againListener || !input || !alert || !currentScore || !numberField)
      return

    const againHandler = () => {
      secretNumber = generateRandomNumber()
      input.value = ""
      alert.textContent = "Start guessing... "
      currentScore.textContent = "20"
      checkListener.addEventListener("click", checkHandler)
      document.body.style.backgroundColor = ""
      numberField.textContent = "?"
    }

    againListener.addEventListener("click", againHandler)
  }

  again()
}

check()
