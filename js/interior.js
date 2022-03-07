//get interior doc from db
db.collection("interior").onSnapshot((snapshot) => {
  fetchInterior(snapshot.docs);
});

// --------------------fetch interior from backend --------------------
const interiorContainer = document.querySelector(".interiorWrapper");

const fetchInterior = (data) => {
  let html = "";
  data.forEach((doc) => {
    const interior = doc.data();
    const li = `
    <div class="exterior">
    <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
    <img class="activator" src="${interior.image}">
    </div>
    <div class="card-content">
          <span class="cad-title activator black-text text-darken-1"><h6>${interior.name}</h6><i class="material-icons three-dots right">more_vert</i></span>
          <h6>₹. ${interior.price}</h6>
          <button class="btn btn-add-to-cart" type="submit" name="action" onClick="addToCart('${interior.name}','${interior.price}', '${interior.image}')">Add to cart
          <i class="material-icons right">shopping_cart</i>
          </button>
          </div>
      <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Specs<i class="material-icons right">close</i></span>
          <label>Color:</label>
             <li>${interior.color}</li>
             <label>Description:</label>
             <li>${interior.description}</li>
          </div>
          </div>
          </div>
          `;

    html += li;
  });

  interiorContainer.innerHTML = html;
};

// --------------------add to cart from frontend--------------------
function addToCart(name, price, image) {
  var user = firebase.auth().currentUser;

  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
    M.toast({ html: "Please Login or Signup" });
  }

  db.doc(`users/${user.email}`)
    .collection("usercart")
    .doc(`${name}`)
    .get()
    .then((doc) => {
      console.log(doc.exists);
      if (doc.exists) {
        M.toast({ html: "Item already added to your cart" });
      } else {
        db.doc(`users/${user.email}`)
          .collection(`usercart`)
          .doc(`${name}`)
          .set({
            useruid: user.uid,
            name: name,
            price: Number(price),
            image: image,
          })
          .then(() => {
            M.toast({ html: "Item added to your cart" });
          });
      }
    });
}
