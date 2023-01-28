"use strict"

const inputNumberHandler = e => {
  if (
    (e.which < 48 || e.which > 59) &&
    (e.which < 96 || e.which > 105) &&
    e.which !== 46 &&
    e.which !== 8 &&
    e.which !== 116 &&
    e.which !== 37 &&
    e.which !== 38 &&
    e.which !== 39 &&
    e.which !== 40
  )
    return e.preventDefault()
}

const generateRandomNumber = () => Math.trunc(Math.random() * 50) + 1
let secretNumberState = generateRandomNumber()

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

  let scoreState = 20
  let highScoreState = 0
  const checkHandler = () => {
    const userNumber = Number(input.value)
    if (!userNumber) return (alert.textContent = "🚫 No Number!")

    if (userNumber === secretNumberState) {
      document.body.style.backgroundColor = "#18c454cd"
      checkListener.removeEventListener("click", checkHandler)
      if (scoreState > highScoreState) highScoreState = scoreState

      highScore.textContent = highScoreState
      numberField.textContent = secretNumberState
      numberField.style.width = "24rem"
      alert.textContent = "🥳 Correct!"
      return
    } else if (userNumber < secretNumberState) alert.textContent = "📈 Too low!"
    else if (userNumber > secretNumberState) alert.textContent = "📉 Too high!"

    if (scoreState > 1) currentScore.textContent = --scoreState
    else {
      currentScore.textContent = --scoreState
      alert.textContent = "💥 You loose!"
      checkListener.removeEventListener("click", checkHandler)
      document.body.style.backgroundColor = "orangered"
    }
  }

  checkListener.addEventListener("click", checkHandler)

  input.addEventListener("keydown", inputNumberHandler)

  const again = () => {
    const againListener = document.querySelector(".btn-again")

    if (!againListener || !input || !alert || !currentScore || !numberField)
      return

    const againHandler = () => {
      secretNumberState = generateRandomNumber()
      scoreState = 20
      input.value = ""
      alert.textContent = "Start guessing... "
      currentScore.textContent = scoreState
      checkListener.addEventListener("click", checkHandler)
      document.body.style.backgroundColor = ""
      numberField.style.width = ""
      numberField.textContent = "?"
    }

    againListener.addEventListener("click", againHandler)
  }

  again()
}

check()
