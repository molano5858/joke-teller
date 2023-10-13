const button = document.getElementById("button");
const button2 = document.getElementById("button2");
const audioElement = document.getElementById("audio");
const jokeContainer = document.getElementById("joke-container");

const apiUrl =
  "https://v2.jokeapi.dev/joke/Programming,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart";

// API TEXT TO SPEECH

async function textToSpeech(joke) {
  const url = `https://text-to-speech-api3.p.rapidapi.com/speak?text=${joke}&lang=en`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7b8c7066d5msh8d8509b9d89f97fp1e22acjsnb6ff6cbd25b5",
      "X-RapidAPI-Host": "text-to-speech-api3.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const audioData = await response.arrayBuffer();
    // Create a blob from audio data
    const audioBlob = new Blob([audioData], { type: "audio/mpeg" });
    // Establish audio in the audioElement
    audioElement.src = URL.createObjectURL(audioBlob);
    // Play the audio
    audioElement.play();
  } catch (error) {
    console.error(error);
  }
}

async function getJoke() {
  try {
    jokeContainer.innerHTML = "";
    jokeContainer.classList.add("joke-container-inactive");

    let joke1 = document.createElement("p");
    let joke2 = document.createElement("p");
    let response = await fetch(apiUrl);
    let data = await response.json();

    joke1.textContent = data.setup;
    joke2.textContent = data.delivery;
    let completeJoke = data.setup + "" + data.delivery;
    console.log(completeJoke);
    joke1.classList.add("joke-text");
    joke2.classList.add("joke-text");

    jokeContainer.appendChild(joke1);
    jokeContainer.appendChild(joke2);
    if (jokeContainer.children.length > 0) {
      jokeContainer.classList.remove("joke-container-inactive");
      jokeContainer.classList.add("joke-container");
    }
    textToSpeech(completeJoke);
  } catch (error) {
    console.log("Whoooops, ", error);
  }
}

button.addEventListener("click", getJoke);
