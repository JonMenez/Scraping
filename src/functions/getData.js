import Education from "../model/model.education"
import Experience from "../model/model.experience"
import Contact from "../model/model.contact"
import { $, $$ } from "./selector"

function checkRegex(regex, value) {
    if (regex.test(value)) {
        return value
    } else {
        return 'none'
    }
}


export function getEducation(array) {
    const arr = []
    for (i = 0; i < array.length; i += 3) {
        arr.push(new Education(array[i], array[i + 1], array[i + 2]))
    }
    return arr
}

export function getExperience(array) {
    const experience = new Experience()

    array.map(element => {
        switch (element) {
            case checkRegex(/[a-z]/ig, element):
                return experience.rol = element
                break;
            case checkRegex(/[a-z]/ig, element):
                return experience.place = element
                break;
            case checkRegex(/^(199\d|200\d|2021)$/i, element):
                return experience.period = element
                break;
            case checkRegex([a - zA - Z], element):
                return experience.country = element
                break;
            case element.length > 10:
                return experience.description = element
                break;
            default: return null
                break;
        }
    })

    for (i = 0; i < array.length; i += 5) {

        arr.push()
    }
    return arr
}

export function getContactArray() {
    $("#top-card-text-details-contact-info").click()
    const links = $$(".pv-contact-info__contact-link").map(element => element.href)
    $(".artdeco-modal__dismiss").click()
    return links
}




export const getContactInfo = (array) =>

    new Promise((resolve, reject) => {

        const contact = new Contact()

        array.map(element => {
            switch (element) {
                case checkRegex(/linkedin/, element):
                    return contact.urlProfile = element
                    break;
                case checkRegex(/@/, element):
                    return contact.email = element
                    break;
                case checkRegex(/www/, element):
                    return contact.webSite = element
                    break;
                case checkRegex(/twitter|facebook|instagram/, element):
                    return contact.social = element
                    break;
                default: return null
                    break;
            }
        })

        resolve(contact)
    })


