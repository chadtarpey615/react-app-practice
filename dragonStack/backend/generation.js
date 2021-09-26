const { REFRESH_RATE, SECONDS } = require("./config")


const refreshRate = REFRESH_RATE * SECONDS

class Generation {
    constructor() {

        const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2))

        const msUntilexpiration = Math.random() < 0.5 ? refreshRate = expirationPeriod : refreshRate + expirationPeriod

        this.expiration = new Date(Date.now() + msUntilexpiration)
    }
}