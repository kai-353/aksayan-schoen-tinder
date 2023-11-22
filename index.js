const imageContainer = document.getElementById("container");

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

data.forEach((product) => {
  const card = document.createElement("div");
  card.innerText = product.id + " " + product.title;
  card.classList.add("product");
  //   card.onclick = (e) => {
  //     e.target.style.display = "none";
  //   };

  imageContainer.appendChild(card);
});

let lastCoords = {
  x: 0,
  y: 0,
  mouseDownOnEnter: false,
};

let mouseDown = 0;
window.onmousedown = () => {
  ++mouseDown;
  if (mouseDown) {
    console.log("mouse button down");
  }
};
window.onmouseup = () => {
  --mouseDown;
  if (mouseDown) {
    console.log("mouse button down");
  }
};

imageContainer.onmouseenter = (e) => {
  lastCoords.x = e.clientX;
  lastCoords.y = e.clientY;
  lastCoords.mouseDownOnEnter = mouseDown;
};

imageContainer.onpointermove = (e) => {
  //   console.log(mouseDown ? "down" : "up");
};
