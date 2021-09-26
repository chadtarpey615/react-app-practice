const Dragon = require("./dragon.js")

const fooey = new Dragon({ birthdate: new Date(), nickname: "fooey" })
const baloo = new Dragon({ birthdate: new Date(), nickname: "baloo" })


setTimeout(() => {
    const tip = new Dragon()
    console.log("tip", tip)
}, 3000)

console.log("fooey", fooey)
console.log("baloo", baloo)