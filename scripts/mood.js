document.addEventListener('DOMContentLoaded', () => {

const enjoyment = document.getElementById('enjoyment');
const enjoyValue = document.getElementById('enjoyment-value');

enjoyment.addEventListener("input", () => {
    enjoyValue.value = enjoyment.value;
})

const sadness = document.getElementById('sadness');
const sadValue = document.getElementById('sadness-value');

sadness.addEventListener("input", () => {
    sadValue.value = sadness.value;
})

const anger = document.getElementById('anger');
const angerValue = document.getElementById('anger-value');

anger.addEventListener("input", () => {
    angerValue.value = anger.value;
})

const contempt = document.getElementById('contempt');
const contemptValue = document.getElementById('contempt-value');

contempt.addEventListener("input", () => {
    contemptValue.value = contempt.value;
})

const disgust = document.getElementById('disgust');
const disgustValue = document.getElementById('disgust-value');

disgust.addEventListener("input", () => {
    disgustValue.value = disgust.value;
})

const fear = document.getElementById('fear');
const fearValue = document.getElementById('fear-value');

fear.addEventListener("input", () => {
    fearValue.value = fear.value;
})

const surprise = document.getElementById('surprise');
const surpriseValue = document.getElementById('surprise-value');

surprise.addEventListener("input", () => {
    surpriseValue.value = surprise.value;
})

});