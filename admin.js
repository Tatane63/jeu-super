
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

// Générer QR code
const gameUrl = window.location.href.replace("index.html", "") + "player.html";
QRCode.toCanvas(document.getElementById("qrCode"), gameUrl);

// Afficher les phrases
db.ref("phrases").on("value", snapshot => {
  const data = snapshot.val();
  const phraseList = document.getElementById("phraseList");
  phraseList.innerHTML = "";
  if (data) {
    Object.keys(data).forEach(key => {
      const item = data[key];
      const div = document.createElement("div");
      div.innerHTML = `<strong>${item.phrase}</strong> — Votes: ${item.votes || 0}`;
      phraseList.appendChild(div);
    });
  }
});

function reveleVotes() {
  db.ref("phrases").once("value", snapshot => {
    const data = snapshot.val();
    const sorted = Object.entries(data || {}).sort((a, b) => (b[1].votes || 0) - (a[1].votes || 0));
    alert("Gagnant : " + (sorted[0] ? sorted[0][1].phrase : "aucune phrase"));
  });
}
