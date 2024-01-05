const subscribeBtn = document.querySelector("#susBtn");
subscribeBtn.addEventListener("click", () => {
  const email = document.querySelector("#newsletter1").value;

  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Correo inválido",
      text: "Por favor ingresa una dirección de correo electrónico válida.",
    });
    return;
  }

  Swal.fire({
    title: "Enviando solicitud...",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  setTimeout(() => {
    Swal.fire({
      icon: "success",
      title: "¡Gracias por suscribirte!",
      text: "Recibirás un correo electrónico a la brevedad.",
    });
  }, 1000);
});

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value;

  if (searchTerm.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "¡Oops!",
      text: "Por favor ingrese un término de búsqueda",
    });
    return;
  }

  Swal.fire({
    title: "Buscando...",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  setTimeout(() => {
    console.log(`Realizando búsqueda con el término: ${searchTerm}`);

    Swal.fire({
      icon: "error",
      title: "No hay Resultados",
      text: "Estamos con problemas técnicos, intente su búsqueda en unos minutos.",
    });
  }, 1000);
});

const currencies = {
  USD: "Dolar Estadounidense",
  EUR: "Euro",
  UYU: "Peso Uruguayo",
  ARS: "Peso Argentino",
  BRL: "Real",
  PYG: "Guarani",
  VES: "Bolivares",
  CLP: "Peso Chileno",
  COP: "Peso Colombiano",
  MXN: "Peso Mexicano",
  PEN: "Soles",
  BOB: "Peso Boliviano",
};

const primaryCurrency = document.getElementById("primary");
const secondaryCurrency = document.getElementById("secondary");
primaryCurrency.innerHTML = getOptions(currencies);
secondaryCurrency.innerHTML = getOptions(currencies);

function getOptions(data) {
  return Object.entries(data)
    .map(
      ([country, currency]) =>
        `<option value="${country}">${country} | ${currency}</option>`
    )
    .join("");
}
document
  .getElementById("btn-convert")
  .addEventListener("click", fetchCurrencies);

function fetchCurrencies() {
  const primary = primaryCurrency.value;
  const secondary = secondaryCurrency.value;
  const amount = document.getElementById("amount").value;
  fetch(
    "https://v6.exchangerate-api.com/v6/d45639a1f701c29a33550c6d/latest/" +
    primary
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      displayCurrency(data, primary, secondary, amount);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayCurrency(data, primary, secondary, amount) {
  const calculated = (amount * data.conversion_rates[secondary]).toFixed(2);
  document.getElementById("result").setAttribute("style", "display:block");
  document.getElementById("txt-primary").innerText =
    amount + " " + primary + " = ";
  document.getElementById("txt-secondary").innerText =
    calculated + " " + secondary;
}