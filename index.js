var ts = document.getElementById("tabs");
var l = document.getElementById("list");

window.addEventListener("load", async function () {
  if (this.navigator.serviceWorker) {
    console.log("Service worker Supported");
    try {
      await this.navigator.serviceWorker.register("./sw.js");
      console.log("SW Registered");
    } catch (error) {
      console.log("SW Not Registered", error);
    }
  } else {
    console.log("Service worker Not Supported");
  }
});

//Fetching Tabs
var result = fetch("https://jsonplaceholder.typicode.com/users");
result
  .then((data) => {
    return data.json();
  })
  .then((d) => {
    Tabbing(d);
    GettingUser1(1);
  });

function Tabbing(data) {
  for (var i = 0; i < data.length; i++) {
    var tab = document.createElement("span");
    tab.innerHTML = `${data[i].name}`;
    tab.setAttribute("onclick", `GettingUser1(${i + 1})`);
    ts.append(tab);
  }
}

function Listing(data) {
  for (var i = 0; i < data.length; i++) {
    var tab = document.createElement("li");
    tab.innerHTML = `${data[i].title}`;
    l.append(tab);
  }
}

//////////////////////////////////
async function GettingUser1(id) {
  l.innerHTML = "";
  var xhr = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  var t = await xhr.json();
  Listing(t);
}
