/**
 * @description 
 * @returns
 */
function randomToken() {
  let token = Math.random().toString(36).substr(2);
  while (token.startsWith("0")) {
    token = token.substr(1);
  }
  return parseInt(token, 36);
}

let user = {
  id: randomToken(),
  name: "",
  surname: "",
  age: 0,
  tel: "",
  email: "",
  address: "",
  department: "",
  city: "",
  zip: "",
  vehicle: [{ brand: "", model: "", year: 0 }],
  insurancesV: [],
};

let users = [];

const factorsV = {
  age: { "18-21": 120, "22+": 80 },
  brand: {
    Ferrari: 0.9,
    Lamborghini: 0.9,
    MercedezBenz: 0.8,
    BMW: 0.8,
    Audi: 0.8,
    Toyota: 0.7,
    Nissan: 0.7,
    Renault: 0.6,
    Citroen: 0.6,
    Ford: 0.6,
    Volkswagen: 0.6,
    Fiat: 0.5,
    Chevrolet: 0.5,
    Otra: 0.4,
  },
  year: { "1950-2018": 0.8, "2019+": 0.9 },
  model: { Coupe: 0.2, SUV: 0.25, Truck: 0.3, Otro: 0.1 },
};

const departments = {
  Artigas: ["Artigas"],
  Canelones: ["Canelones"],
  CerroLargo: ["Melo"],
  Colonia: ["Colonia"],
  Durazno: ["Durazno"],
  Flores: ["Trinidad"],
  Florida: ["Florida"],
  Lavalleja: ["Minas"],
  Maldonado: ["Maldonado"],
  Montevideo: ["Montevideo"],
  Paysandú: ["Paysandú"],
  RíoNegro: ["FrayBentos"],
  Rivera: ["Rivera"],
  Rocha: ["Rocha"],
  Salto: ["Salto"],
  SanJosé: ["SanJosé"],
  Soriano: ["Mercedes"],
  Tacuarembó: ["Tacuarembó"],
  TreintayTres: ["TreintayTres"],
};

const departmentSelectV = document.getElementById("vInsuranceDepartment");
const citySelectV = document.getElementById("vInsuranceCity");

/**
 * @description 
 * @returns {void}
 */
departmentSelectV.addEventListener("change", () => {
  citySelectV.innerHTML = departments[departmentSelectV.value]
    .map((city) => `<option>${city}</option>`)
    .join("");
  citySelectV.value = citySelectV.children[0].value;
});

/**
 * @description
 * @returns
 */
const findExistingQuoteV = () => {
  for (const quote of user.insurancesV) {
    if (
      quote.brand === user.vehicle.brand &&
      quote.model === user.vehicle.model &&
      quote.year === user.vehicle.year
    ) {
      return quote.price;
    }
  }
  return null;
};

const calculateQuoteV = () => {
  user.age = parseInt(user.age, 10);
  user.vehicle.year = parseInt(user.vehicle.year, 10);
  let ageFactor = factorsV.age[user.age < 22 ? "18-21" : "22+"];
  let brandFactor = factorsV.brand[user.vehicle.brand] || 0.4;
  let yearFactor =
    factorsV.year[user.vehicle.year <= 2018 ? "1950-2018" : "2019+"];
  let modelFactor = factorsV.model[user.vehicle.model] || 0.1;
  const finalPriceV =
    5 * (ageFactor + brandFactor + yearFactor + modelFactor).toFixed(2);
  const now = new Date();
  let existingQuote = findExistingQuoteV();
  if (existingQuote !== null) {
    quoteResultV = existingQuote;
  } else {
    let quote = {
      name: user.name,
      surname: user.surname,
      brand: user.vehicle.brand,
      model: user.vehicle.model,
      year: user.vehicle.year,
      price: finalPriceV,
      date: now.toLocaleString(),
    };
    user.insurancesV.push(quote);
    localStorage.setItem("userStorageV", JSON.stringify(user));
    quoteResultV = finalPriceV;
  }
  return quoteResultV;
};

const submitButtonV = document.querySelector("#submitButtonV");
const vInsuranceForm = document.querySelector("#vInsurance");
let selDepartmentV = document.querySelector("#vInsuranceDepartment");
let selCityV = document.querySelector("#vInsuranceCity");
let selBrandV = document.querySelector("#vInsuranceBrand");
let selModelV = document.querySelector("#vInsuranceModel");

let quoteResultV;
let storedUserV = JSON.parse(localStorage.getItem("userStorageV"));

if (storedUserV) {
  user.id = storedUserV.id;
  vInsuranceForm.elements.name.value = storedUserV.name;
  vInsuranceForm.elements.surname.value = storedUserV.surname;
  vInsuranceForm.elements.age.value = storedUserV.age;
  vInsuranceForm.elements.tel.value = storedUserV.tel;
  vInsuranceForm.elements.email.value = storedUserV.email;
  vInsuranceForm.elements.address.value = storedUserV.address;
  selDepartmentV.value = storedUserV.department;
  selCityV.value = storedUserV.city;
  vInsuranceForm.elements.zip.value = storedUserV.zip;
  selBrandV.value = storedUserV.vehicle.brand;
  selModelV.value = storedUserV.vehicle.model;
  vInsuranceForm.elements.year.value = storedUserV.vehicle.year;
} else {
  localStorage.setItem("userStorageV", JSON.stringify(user));
}

/**
 * @description 
 * @param {object} user 
 */
submitButtonV.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    !vInsuranceForm.elements.name.value ||
    !vInsuranceForm.elements.surname.value ||
    !vInsuranceForm.elements.age.value ||
    !vInsuranceForm.elements.tel.value ||
    !vInsuranceForm.elements.address.value ||
    !vInsuranceForm.elements.department.value ||
    !vInsuranceForm.elements.city.value ||
    !vInsuranceForm.elements.zip.value ||
    !vInsuranceForm.elements.brand.value ||
    !vInsuranceForm.elements.model.value ||
    !vInsuranceForm.elements.year.value
  ) {
    Swal.fire({
      title: "Error",
      text: "Por favor, complete todos los campos del formulario.",
      icon: "error",
    });
    return;
  }

  user.id = randomToken();
  user.name = vInsuranceForm.elements.name.value;
  user.surname = vInsuranceForm.elements.surname.value;
  user.age = vInsuranceForm.elements.age.value;
  user.tel = vInsuranceForm.elements.tel.value;
  user.address = vInsuranceForm.elements.address.value;
  user.department = selDepartmentV.options[selDepartmentV.selectedIndex].text;
  user.city = selCityV.options[selCityV.selectedIndex].text;
  user.zip = vInsuranceForm.elements.zip.value;
  user.vehicle.year = vInsuranceForm.elements.year.value;
  user.vehicle.brand = selBrandV.options[selBrandV.selectedIndex].text;
  user.vehicle.model = selModelV.options[selModelV.selectedIndex].text;

  let newUser = {
    id: randomToken(),
    name: vInsuranceForm.elements.name.value,
    surname: vInsuranceForm.elements.surname.value,
    age: vInsuranceForm.elements.age.value,
    tel: vInsuranceForm.elements.tel.value,
    email: vInsuranceForm.elements.email.value,
    address: vInsuranceForm.elements.address.value,
    department: selDepartmentV.value,
    city: selCityV.value,
    zip: vInsuranceForm.elements.zip.value,
    vehicle: [
      {
        brand: selBrandV.value,
        model: selModelV.value,
        year: vInsuranceForm.elements.year.value,
      },
    ],
    insurancesV: [],
  };

  let quote = {
    price: calculateQuoteV(),
    date: new Date().toLocaleString(),
  };

  newUser.insurancesV.push(quote);

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  vInsuranceForm.reset();

  localStorage.setItem(
    "userStorageV",
    JSON.stringify({
      id: user.id,
      name: user.name,
      surname: user.surname,
      age: user.age,
      tel: user.tel,
      email: user.email,
      address: user.address,
      department: user.department,
      city: user.city,
      zip: user.zip,
      vehicle: [
        {
          brand: user.vehicle.brand,
          model: user.vehicle.model,
          year: user.vehicle.year,
        },
      ],
      insurancesV: [],
    })
  );

  function showLoadingAndCalculateQuote() {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Cotizando",
        html: "Estamos procesando tu cotización...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then(() => {

        if (!quoteResultV) {
          let finalPriceV = Math.round(calculateQuoteV());
          quoteResultV = `El precio de tu seguro es de U$S${finalPriceV} anuales.`;
        }

        Swal.fire({
          icon: "success",
          title: "Cotización generada",
          html: `<p>La cotizacion de su seguro tiene un valor anual de U$S ${quoteResultV}</p>`,
        }).then(() => {

          resolve();
        });
      });
    });
  }

  showLoadingAndCalculateQuote().then(() => {
    console.log("Cotización generada exitosamente");
  });

  const showInsurancesButton = document.getElementById("show-insurances");
  const resultElement = document.getElementById("result");

  showInsurancesButton.addEventListener("click", () => {
    const quotes = user.insurancesV;

    const quoteStrings = quotes.map(
      (quote) =>
        `Usuario: ${quote.name} ${quote.surname}. Vehiculo: ${quote.brand} - ${quote.model} - ${quote.year}. Cotización: U$S ${quote.price} (anual). Fecha: ${quote.date}`
    );
    resultElement.innerHTML = `
    <div class="list-group">
    <ul>
      ${quoteStrings
        .map(
          (quoteString) => `<div class="list-group-item">${quoteString}</div>`
        )
        .join("")}
    </ul>
    </div>
    <button id="delete-insurances" class="btn btn-danger mt-2">Ocultar cotizaciones</button>
  `;
    resultElement.style.display = "block";
    const deleteInsurancesButton = document.getElementById("delete-insurances");
    deleteInsurancesButton.addEventListener("click", () => {
      resultElement.innerHTML = "";
    });
  });
});