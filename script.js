
function sayHello() {
  const lang = document.getElementById("lang").value;

  const messages = {
    "en-US": "Hello! I am your voice assistant.",
    "ur-PK": "السلام علیکم، میں آپ کا اسسٹنٹ ہوں۔",
    "hi-IN": "नमस्ते, मैं आपका सहायक हूँ।"
  };

  const msg = messages[lang] || messages["en-US"];
  document.getElementById("reply").textContent = msg;

  const speech = new SpeechSynthesisUtterance(msg);
  speech.lang = lang;
  speechSynthesis.speak(speech);
}

function listen() {
  const Recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!Recognition) {
    document.getElementById("reply").textContent =
      "Please open this assistant in Chrome.";
    return;
  }

  const rec = new Recognition();
  rec.lang = document.getElementById("lang").value;

  rec.onresult = function(event) {
    const words = event.results[0][0].transcript;
    document.getElementById("reply").textContent = words;
  };

  rec.onerror = function() {
    document.getElementById("reply").textContent =
      "Please allow microphone access and try again.";
  };

  rec.start();
}
