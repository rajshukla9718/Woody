//default exterior

db.collection("exterior")
  .orderBy("name", "asc")
  .onSnapshot((snapshot) => {
    fetchexterior(snapshot.docs);
  });

// ---------------fetch products(exterior) from databse ---------------

const exteriorContainer = document.querySelector(".exteriorWrapper");
const fetchexterior = (data) => {
  let html = "";
  data.map((doc) => {
    const exterior = doc.data();
    const li = `
    <div class="exterior">
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${exterior.image}">
      </div>
      <div class="card-content">
          <span class="card-title activator black-text text-darken-1"><h6>${exterior.name}</h6><i class="material-icons three-dots right">more_vert</i></span>
           <h6>₹. ${exterior.price}</h6>
          <button class="btn btn-add-to-cart" type="submit" name="action" onClick="addToCart('${exterior.name}','${exterior.price}', '${exterior.image}')">Add to cart
          <i class="material-icons right">shopping_cart</i>
          </button>
      </div>
      <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Specs<i class="material-icons right">close</i></span>
          <label>Color:</label>
             <li>${exterior.color}</li>
             <label>Description:</label>
             <li>${exterior.description}</li>
      </div>
    </div>
    </div>

        `;

    html += li;
  });
  exteriorContainer.innerHTML = html;
};
// ----------------add to cart from frontend----------------
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

// search result for exterior 
// search result for exterior 

const exteriorForm = document.querySelector(".search-exterior-form");
exteriorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let exteriorSearch = document.querySelector(".search-exterior").value;
  let searchToLowerCase = exteriorSearch.toLowerCase();
  db.collection("exterior")
    .where("brand", "==", `${searchToLowerCase}`)
    .onSnapshot((snapshot) => {
      fetchexterior(snapshot.docs);
    });

  // ---------------fetch products(exterior) from databse ---------------
  const exteriorContainer = document.querySelector(".exteriorWrapper");
  const fetchexterior = (data) => {
    let html = "";
    data.map((doc) => {
      const exterior = doc.data();
      const li = `
      <div class="exterior">
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${exterior.image}">
      </div>
      <div class="card-content">
          <span class="card-title activator black-text text-darken-1"><h6>${exterior.name}</h6><i class="material-icons three-dots right">more_vert</i></span>
           <h6>₹. ${exterior.price}</h6>
          <p><button style= "font-size: 11px" class="btn " type="submit" name="action" onClick="addToCart('${exterior.name}','${exterior.price}', '${exterior.image}')">Add to cart
          <i class="material-icons right">shopping_cart</i>
          </button></p>
      </div>
      <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Specs<i class="material-icons right">close</i></span>
          <label>Color:</label>
             <li>${exterior.color}</li>
             <label>Description:</label>
             <li>${exterior.description}</li>
      </div>
    </div>
    </div>
        `;

      html += li;
    });
    exteriorContainer.innerHTML = html;
  };
  // ----------------add to cart from frontend----------------
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
          M.toast({
            html: "Item already added to your cart",
          });
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
});

const closeSearch = document.querySelector(".close");
closeSearch.addEventListener("click", (e) => {
  console.log("close Search");
  location.reload();
});
