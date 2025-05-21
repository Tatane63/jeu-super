
const firebaseConfig = {
  apiKey: "votre-api-key",
  authDomain: "votre-domaine.firebaseapp.com",
  databaseURL: "https://votre-projet.firebaseio.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "votre-id",
  appId: "votre-app-id"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function submitPhrase() {
  const phrase = document.getElementById("phraseInput").value;
  const id = Date.now();
  db.ref("phrases/" + id).set({ phrase: phrase, votes: 0 });
}

db.ref("phrases").on("value", snapshot => {
  const data = snapshot.val();
  const container = document.getElementById("phrasesToVote");
  container.innerHTML = "";
  if (data) {
    Object.keys(data).forEach(key => {
      const item = data[key];
      const btn = document.createElement("button");
      btn.innerText = item.phrase;
      btn.onclick = () => {
        db.ref("phrases/" + key + "/votes").transaction(v => (v || 0) + 1);
        alert("Vote enregistré !");
      };
      container.appendChild(btn);
    });
  }
});
