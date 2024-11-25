const elementSelector = '.iziToast-wrapper.iziToast-wrapper-bottomCenter';

function removeElement() {
    const elements = document.querySelectorAll(elementSelector);
    elements.forEach(element => element.remove());
    console.log(`Removed ${elements.length} element(s) matching '${elementSelector}'`);
}

window.addEventListener('load', removeElement);
