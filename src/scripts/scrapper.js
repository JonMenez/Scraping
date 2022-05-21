import autoscrolling from "../functions/autoscrolling.js";
import { getContactArray, getContactInfo, getEducation, getExperience } from "../functions/getData.js";
import { $, $$, $x } from "../functions/selector.js";
import waitForElement from "../functions/waitForElement.js";
import Education from "../model/model.education.js";
import Experience from "../model/model.experience.js";
import Profile from "../model/model.profile.js";
import SELECTORS from "./selectors.js";

waitForElement('h1')
   .then(() => {
      autoscrolling(30).then(() => {
         const contactList = getContactArray()
         getContactInfo(contactList)
      })
         .then(contact => {
            const fullName = $(SELECTORS.profile.css.fullname).textContent
            const experienceItems = $x(SELECTORS.profile.xpath.experiencieItems)
            const educationItems = $x(SELECTORS.profile.xpath.educationItems)

            const expMap = experienceItems
               .map(element => element?.textContent);

            const eduMap = educationItems
               .map(element => element?.textContent)

            const profile = new Profile(fullName, contact, getExperience(expMap), getEducation(eduMap))

            chrome.runtime.connect({ name: "safePort" }).postMessage(profile)
         })
         .catch(() => { console.log("intentelo mas tarde") })
   })
