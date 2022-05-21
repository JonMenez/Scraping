class Experience {
    constructor(rol, place, period, country, description) {
        this.rol = (rol) ? rol : 'none'
        this.place = (place) ? place : 'none'
        this.period = (period) ? period : 'none'
        this.country = (country) ? country : 'none'
        this.description = (description) ? description : 'none'
    }
}

export default Experience