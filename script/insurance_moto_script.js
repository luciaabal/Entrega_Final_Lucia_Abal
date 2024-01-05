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
  motorcycle: {
    brand: "",
    model: "",
    year: 0,
  },
  insurancesM: [],
};

let users = [];

const factorsM = {
  age: {
    "18-21": 120,
    "22+": 80,
  },
  brand: {
    HarleyDavidson: 0.9,
    Ducati: 0.9,
    Ecosse: 0.8,
    Dodge: 0.8,
    Suzuki: 0.8,
    Kawasaki: 0.7,
    Yamaha: 0.7,
    Honda: 0.6,
    Triumph: 0.6,
    KTM: 0.6,
    Vespa: 0.6,
    Bajaj: 0.5,
    Otra: 0.4,
  },
  year: {
    "1950-2018": 0.8,
    "2019+": 0.9,
  },
  model: {
    Standar: 0.2,
    Cruiser: 0.25,
    Sports: 0.3,
    Otro: 0.1,
  },
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

const departmentSelectM = document.getElementById("mInsuranceDepartment");
const citySelectM = document.getElementById("mInsuranceCity");

/**
 * @description
 * @returns {void}
 */
departmentSelectM.addEventListener("change", () => {
  citySelectM.innerHTML = departments[departmentSelectM.value]
    .map((city) => `<option>${city}</option>`)
    .join("");
  citySelectM.value = citySelectM.children[0].value;
});

/**
 * @description
 * @returns
 */
const findExistingQuoteM = () => {
  for (const quote of user.insurancesM) {
    if (
      quote.brand === user.motorcycle.brand &&
      quote.model === user.motorcycle.model &&
      quote.year === user.motorcycle.year
    ) {
      return quote.price;
    }
  }
  return null;
};

const calculateQuoteM = () => {
  user.age = parseInt(user.age, 10);
  user.motorcycle.year = parseInt(user.motorcycle.year, 10);
  let ageFactor = factorsM.age[user.age < 22 ? "18-21" : "22+"];
  let brandFactor = factorsM.brand[user.motorcycle.brand] || 0.4;
  let yearFactor =
    factorsM.year[user.motorcycle.year <= 2018 ? "1950-2018" : "2019+"];
  let modelFactor = factorsM.model[user.motorcycle.model] || 0.1;
  const finalPriceM =
    5 * (ageFactor + brandFactor + yearFactor + modelFactor).toFixed(2);
  const now = new Date();
  let existingQuote = findExistingQuoteM();
  if (existingQuote !== null) {
    quoteResultM = existingQuote;
  } else {
    let quote = {
      name: user.name,
      surname: user.surname,
      brand: user.motorcycle.brand,
      model: user.motorcycle.model,
      year: user.motorcycle.year,
      price: finalPriceM,
      date: now.toLocaleString(),
    };
    user.insurancesM.push(quote);
    localStorage.setItem("userStorageM", JSON.stringify(user));
    quoteResultM = finalPriceM;
  }
  return quoteResultM;
};

const submitButtonM = document.querySelector("#submitButtonM");
const mInsuranceForm = document.querySelector("#mInsurance");
let selDepartmentM = document.querySelector("#mInsuranceDepartment");
let selCityM = document.querySelector("#mInsuranceCity");
let selBrandM = document.querySelector("#mInsuranceBrand");
let selModelM = document.querySelector("#mInsuranceModel");

let quoteResultM;

let storedUserM = JSON.parse(localStorage.getItem("userStorageM"));

if (storedUserM) {
  mInsuranceForm.elements.name.value = storedUserM.name;
  mInsuranceForm.elements.surname.value = storedUserM.surname;
  mInsuranceForm.elements.age.value = storedUserM.age;
  mInsuranceForm.elements.tel.value = storedUserM.tel;
  mInsuranceForm.elements.email.value = storedUserM.email;
  mInsuranceForm.elements.address.value = storedUserM.address;
  selDepartmentM.value = storedUserM.department;
  selCityM.value = storedUserM.city;
  mInsuranceForm.elements.zip.value = storedUserM.zip;
  selBrandM.value = storedUserM.motorcycle.brand;
  selModelM.value = storedUserM.motorcycle.model;
  mInsuranceForm.elements.year.value = storedUserM.motorcycle.year;
} else {
  localStorage.setItem("userStorageM", JSON.stringify(user));
}

/**
 * @description 
 * @param {object} user 
 */
submitButtonM.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    !mInsuranceForm.elements.name.value ||
    !mInsuranceForm.elements.surname.value ||
    !mInsuranceForm.elements.age.value ||
    !mInsuranceForm.elements.tel.value ||
    !mInsuranceForm.elements.address.value ||
    !mInsuranceForm.elements.department.value ||
    !mInsuranceForm.elements.city.value ||
    !mInsuranceForm.elements.zip.value ||
    !mInsuranceForm.elements.brand.value ||
    !mInsuranceForm.elements.model.value ||
    !mInsuranceForm.elements.year.value
  ) {
    Swal.fire({
      title: "Error",
      text: "Por favor, complete todos los campos del formulario.",
      icon: "error",
    });
    return;
  }

  user.name = mInsuranceForm.elements.name.value;
  user.surname = mInsuranceForm.elements.surname.value;
  user.age = mInsuranceForm.elements.age.value;
  user.tel = mInsuranceForm.elements.tel.value;
  user.address = mInsuranceForm.elements.address.value;
  user.department = selDepartmentM.options[selDepartmentM.selectedIndex].text;
  user.city = selCityM.options[selCityM.selectedIndex].text;
  user.zip = mInsuranceForm.elements.zip.value;
  user.motorcycle.year = mInsuranceForm.elements.year.value;
  user.motorcycle.brand = selBrandM.options[selBrandM.selectedIndex].text;
  user.motorcycle.model = selModelM.options[selModelM.selectedIndex].text;

  let newUser = {
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
    motorcycle: {
      brand: "",
      model: "",
      year: 0,
    },
    insurancesM: [],
  };
  let quote = {
    price: calculateQuoteM(),
    date: new Date().toLocaleString(),
  };

  newUser.insurancesM.push(quote);
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  mInsuranceForm.reset();

  localStorage.setItem(
    "userStorageM",
    JSON.stringify({
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
      motorcycle: {
        brand: "",
        model: "",
        year: 0,
      },
      insurancesM: [],
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
        if (!quoteResultM) {
          let finalPriceM = Math.round(calculateQuoteV());
          quoteResultM = `El precio de tu seguro es de U$S${finalPriceM} anuales.`;
        }
        Swal.fire({
          icon: "success",
          title: "Cotización generada",
          html: `<p>La cotizacion de su seguro tiene un valor anual de U$S ${quoteResultM}</p>`,
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
    const quotes = user.insurancesM;

    const quoteStrings = quotes.map(
      (quote) =>
        `Usuario: ${quote.name} ${quote.surname}. Motocicleta: ${quote.brand} - ${quote.model} - ${quote.year}. Cotización: U$S ${quote.price} (anual). Fecha: ${quote.date}`
    );
    resultElement.innerHTML = `
  <div class="list-group">
  <ul>
    ${quoteStrings
        .map((quoteString) => `<div class="list-group-item">${quoteString}</div>`)
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