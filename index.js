const imageContainer = document.getElementById("container");
const favoritesContainer = document.getElementById("favorites-container");

const data = [
  {
    id: 1,
    title: "Nike Air Force 1 '07",
    price: 90.97,
  },
  {
    id: 2,
    title: "Nike Dunk Low Retro",
    price: 119.99,
  },
  {
    id: 3,
    title: "Nike Air Max 90",
    price: 95.97,
  },
  {
    id: 4,
    title: "Nike Court Vision Mid Winter",
    price: 89.99,
  },
  {
    id: 5,
    title: "Nike Air Max Pulse",
    price: 159.99,
  },
  {
    id: 6,
    title: "Nike Air Force 1 '07",
    price: 119.99,
  },
  {
    id: 7,
    title: "Nike Dunk Low Retro",
    price: 119.99,
  },
  {
    id: 8,
    title: "Air Jordan 1 Zoom CMFT 2",
    price: 118.97,
  },
  {
    id: 9,
    title: "Nike P-6000",
    price: 109.99,
  },
  {
    id: 10,
    title: "Air Jordan 13 'Wheat'",
    price: 209.99,
  },
];

const formatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

data.forEach((product) => {
  const card = document.createElement("div");

  card.classList.add("product");
  card.style.transformOrigin = "center bottom";
  const backgroundImg = document.createElement("div");
  backgroundImg.classList.add("background-img");
  backgroundImg.style.backgroundImage = `url(./assets/nike${product.id}.jpg)`;

  card.style.opacity = 0;
  const choiceSpan = document.createElement("span");
  choiceSpan.id = "choiceSpan";

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info-div");

  const title = document.createElement("h4");
  title.classList.add("product-title");
  title.innerText = product.title;

  const price = document.createElement("p");
  price.classList.add("product-price");
  price.innerText = formatter.format(product.price);

  const fakeButtonContainer = document.createElement("div");
  fakeButtonContainer.classList.add("btn-container");

  const fakeButton = document.createElement("a");
  fakeButton.classList.add("btn");
  fakeButton.href = "#";
  fakeButton.innerText = "Lees meer";

  fakeButtonContainer.appendChild(fakeButton);

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  infoDiv.appendChild(title);
  infoDiv.appendChild(price);

  card.appendChild(backgroundImg);
  card.appendChild(choiceSpan);
  card.appendChild(infoDiv);
  card.appendChild(fakeButtonContainer);
  card.appendChild(overlay);

  imageContainer.appendChild(card);
});

imageContainer.lastChild.style.opacity = 1;
imageContainer.lastChild.previousSibling.style.opacity = 0.2;

let lastCoords = {
  x: 0,
  y: 0,
};

let mouseDown = 0;
let distance = 0;
let reqDistance = 300;

imageContainer.onpointerdown = (e) => {
  mouseDown = 1;

  lastCoords.x = e.clientX;
  lastCoords.y = e.clientY;
};

window.onpointerup = () => {
  mouseDown = 0;
  imageContainer.lastChild.style.transform = `translateX(0px)`;

  if (Math.abs(distance) > reqDistance) {
    if (distance > 0) {
      const favorite = document.createElement("div");
      favorite.classList.add("favorite");

      const backgroundImg = document.createElement("div");
      backgroundImg.classList.add("background-img");
      backgroundImg.style.backgroundImage =
        imageContainer.lastChild.getElementsByClassName(
          "background-img"
        )[0].style.backgroundImage;
      backgroundImg.style.gridArea = "image";
      favorite.appendChild(backgroundImg);

      const favoriteText = document.createElement("div");
      favoriteText.classList.add("favorite-text");

      const favoriteTitle = document.createElement("h4");
      favoriteTitle.innerText =
        imageContainer.lastChild.getElementsByClassName(
          "info-div"
        )[0].firstChild.innerText;

      favoriteText.appendChild(favoriteTitle);

      const favoritePrice = document.createElement("p");
      favoritePrice.innerText =
        imageContainer.lastChild.getElementsByClassName(
          "info-div"
        )[0].lastChild.innerText;

      favoriteText.appendChild(favoritePrice);

      favorite.appendChild(favoriteText);

      favoritesContainer.appendChild(favorite);
    }

    imageContainer.removeChild(imageContainer.lastChild);
    imageContainer.lastChild.style.opacity = 1;
    imageContainer.lastChild.previousSibling.style.opacity = 0.2;
  }
  distance = 0;
};

function onmove(e) {
  reqDistance = Math.min(300, window.innerWidth / 3);
  if (!mouseDown) {
    return;
  }
  distance = e.clientX - lastCoords.x;

  const choiceSpan = imageContainer.lastChild.getElementsByTagName("span");
  if (mouseDown && distance >= reqDistance) {
    imageContainer.lastChild.classList.add("ready");
    choiceSpan[0].innerText = "❤️";
  } else if (mouseDown && distance <= -reqDistance) {
    imageContainer.lastChild.classList.add("ready");
    choiceSpan[0].innerText = "❌";
  } else {
    imageContainer.lastChild.classList.remove("ready");
    choiceSpan[0].innerText = "";
  }

  if (mouseDown && Math.abs(distance) <= reqDistance + 200) {
    imageContainer.lastChild.style.transform = `translateX(${
      distance / 1.5
    }px) rotate(${distance / 30}deg)`;
  }
}

window.onpointermove = (e) => onmove(e);
