const d = document
// Area info components
const buildingLights = d.querySelector(".building_lights");
const peopleInsideBuilding = d.querySelector(".shadows");
const corpses = d.querySelector(".corpseArea")
const areaRule = d.querySelector(".lordArea")
const doorState = d.querySelector(".door_state")

//Selecting the point on the page to attach the additional visualisations
const main = document.querySelector("#main-right")

//Attaching div the  will be appended to
const e = document.createElement("div")
  e.className= "frame"

const image = () => {
let img = document.createElement("img")
  img.className= "image"
  return img
}

const getImgSrc = (url) => {
  const fullUrl = `images/${url}`
  return chrome.runtime.getURL(fullUrl)
}
//if the page has rendered the expected element, attach our div wrapper to it
  if(main) {
  main.appendChild(e)
  }

//Area alignment
const alignmentImage = () => {
  let img = image()

  if(areaRule) {
    const text = areaRule.innerText
    if(text.includes("good")){
      img.src = getImgSrc("good.svg")
    } else {
      text.includes("evil") ? img.src = getImgSrc("evil.svg") :
      img.src = getImgSrc("neutral.svg")
    }
    return img
  }
  img.src = getImgSrc("no-alignment.svg")
  return img
}

//If shadows, return the relevent image

const shadowsImage = () => {
  let img = image()

  if(peopleInsideBuilding) {
    img.src = getImgSrc("two-shadows.svg")
    return img
  } else {
    img.src = getImgSrc("no-shadows.svg")
    return img
  }
}


//If corpses, return the relevent image

const corpsesImage = () => {
  let img = image()

  if(corpses) {
    img.src = getImgSrc("dead-head.svg")
    return img
  }
  img.src = getImgSrc("no-head.svg")
  return img
}

//Image for open/closed/locked/no door
const doorImage =() => {
  let img = image()
  if(doorState) {
    const text = doorState.innerText
    if(text.includes("missing from its hinges") || text.includes("door is open")){
      img.src= getImgSrc("open-door.svg")
    }
    if(text.includes("door is closed")) {
      img.src= getImgSrc("closed-door.svg")
    }
    if(text.includes("door is closed and locked")) {
      img.src= getImgSrc("locked-door.svg")
    }
    if(text.includes("completely missing")) {
      img.src= getImgSrc("doorway.svg")
    }
    return img
  }
  img.src= getImgSrc("no-door.svg")
  return img
}

//Placeholder in the event nothing is shown (used in testing)
const placeholder = () => {
  let span = document.createElement("span")
  span.innerText="No info :("
  return span
}

//This method calls a function for each type of description being monitored
//each function either returns an image element or false
//if it returns an image, the image is appended to a document fragment to be
//attached to the DOM at our 'frame' div

  const buildHUD = (arr) => {
    var documentFragment = document.createDocumentFragment();

    arr.forEach(factor =>
      factor ? documentFragment.appendChild(factor) : factor );

    documentFragment.hasChildNodes() ? e.append(documentFragment) :
                                        e.append(placeholder())
  }


  buildHUD([shadowsImage(), corpsesImage(), alignmentImage(), doorImage()])
