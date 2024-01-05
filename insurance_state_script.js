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
  tel: "",
  email: "",
  age: 18,
  address: "",
  city: "",
  zip: "",
  state: {
    typeofstate: "",
    year: 1900,
    department: "",
  },
  insurancesS: [],
};

let users = [];

const factorsS = {
  typeofstate: {
    Edificio: 5,
    Casa: 3,
    Apartamento: 2,
    Terreno: 1,
  },
  year: {
    "1900-1950": 2.5,
    "1950-2018": 1.5,
    "2019+": 0.9,
  },
  department: {
    Canelones: 0.9,
    Montevideo: 1.8,
    Artigas: 0.6,
    CerroLargo: 0.6,
    Colonia: 1.2,
    Durazno: 1.2,
    Flores: 0.4,
    Florida: 0.3,
    Lavalleja: 0.2,
    Maldonado: 2.1,
    Paysandú: 0.9,
    RíoNegro: 0.8,
    Rivera: 0.7,
    Rocha: 1.6,
    Salto: 0.5,
    SanJosé: 1.4,
    Soriano: 1.3,
    Tacuarembó: 1.2,
    TreintayTres: 0.8,
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

const departmentSelectS = document.getElementById("sInsuranceDepartment");
const citySelectS = document.getElementById("sInsuranceCity");

/**
 * @description
 * @returns {void}
 */
departmentSelectS.addEventListener("change", () => {
  citySelectS.innerHTML = departments[departmentSelectS.value]
    .map((city) => `<option>${city}</option>`)
    .join("");
  citySelectS.value = citySelectS.children[0].value;
});

const findExistingQuoteS = () => {
  for (const quote of user.insurancesS) {
    if (
      quote.brand === user.state.typeofstate &&
      quote.model === user.state.year &&
      quote.year === user.state.department
    ) {
      return quote.price;
    }
  }
  return null;
};

/**
 * @description
 * @returns {number}
 */
const calculateQuoteS = () => {
  user.state.year = parseInt(user.state.year, 10);
  let typeofstateFactor = factorsS.typeofstate[user.state.typeofstate] || 0.4;
  let yearFactor =
    factorsS.year[user.state.year <= 2018 ? "1950-2018" : "2019+"];
  let departmentFactor = factorsS.department[user.state.department] || 0.5;
  const finalPriceS =
    5 * (typeofstateFactor + yearFactor + departmentFactor).toFixed(2);
  const now = new Date();
  let existingQuote = findExistingQuoteS();
  if (existingQuote !== null) {
    quoteResultS = existingQuote;
  } else {
    let quote = {
      name: user.name,
      surname: user.surname,
      typeofstate: user.state.typeofstate,
      year: user.state.year,
      department: user.state.department,
      price: finalPriceS,
      date: now.toLocaleString(),
    };
    user.insurancesS.push(quote);
    localStorage.setItem("userStorageS", JSON.stringify(user));
    quoteResultS = finalPriceS;
  }
  return quoteResultS;
};

const submitButtonS = document.querySelector("#submitButtonS");
const sInsuranceForm = document.querySelector("#sInsurance");
let selCityS = document.querySelector("#sInsuranceCity");

let selDepartmentS = document.querySelector("#sInsuranceDepartment");
let selYearS = document.querySelector("#sInsuranceYear");
let selTypeOfState = document.querySelector("#sInsurancetypeofstate");

let quoteResultS;

let storedUserS = JSON.parse(localStorage.getItem("userStorageS"));

if (storedUserS) {
  sInsuranceForm.elements.name.value = storedUserS.name;
  sInsuranceForm.elements.surname.value = storedUserS.surname;
  sInsuranceForm.elements.age.value = storedUserS.age;
  sInsuranceForm.elements.tel.value = storedUserS.tel;
  sInsuranceForm.elements.email.value = storedUserS.email;
  sInsuranceForm.elements.address.value = storedUserS.address;
  sInsuranceForm.elements.zip.value = storedUserS.zip;
  selCityS.value = storedUserS.city;
  selDepartmentS.value = storedUserS.state.department;
  selYearS.value = storedUserS.state.year;
  selTypeOfState.value = storedUserS.state.typeofstate;
} else {
  localStorage.setItem("userStorageS", JSON.stringify(user));
}

/**
 * @description 
 * @param {object} user
 */
submitButtonS.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !sInsuranceForm.elements.name.value ||
    !sInsuranceForm.elements.surname.value ||
    !sInsuranceForm.elements.age.value ||
    !sInsuranceForm.elements.tel.value ||
    !sInsuranceForm.elements.address.value ||
    !sInsuranceForm.elements.department.value ||
    !sInsuranceForm.elements.city.value ||
    !sInsuranceForm.elements.zip.value ||
    !sInsuranceForm.elements.typeofstate.value ||
    !sInsuranceForm.elements.year.value
  ) {
    Swal.fire({
      title: "Error",
      text: "Por favor, complete todos los campos del formulario.",
      icon: "error",
    });
    return;
  }
  user.name = sInsuranceForm.elements.name.value;
  user.surname = sInsuranceForm.elements.surname.value;
  user.age = sInsuranceForm.elements.age.value;
  user.tel = sInsuranceForm.elements.tel.value;
  user.address = sInsuranceForm.elements.address.value;
  user.zip = sInsuranceForm.elements.zip.value;
  user.email = sInsuranceForm.elements.email.value;
  user.city = selCityS.options[selCityS.selectedIndex].text;

  user.state.year = sInsuranceForm.elements.year.value;
  user.state.typeofstate =
    selTypeOfState.options[selTypeOfState.selectedIndex].text;
  user.state.department =
    selDepartmentS.options[selDepartmentS.selectedIndex].text;

  let newUser = {
    id: randomToken(),
    name: "",
    surname: "",
    tel: "",
    email: "",
    age: 18,
    address: "",
    city: "",
    zip: "",
    state: {
      typeofstate: "",
      year: 1900,
      department: "",
    },
    insurancesS: [],
  };
  let quote = {
    price: calculateQuoteS(),
    date: new Date().toLocaleString(),
  };

  newUser.insurancesS.push(quote);
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  sInsuranceForm.reset();

  localStorage.setItem(
    "userStorageS",
    JSON.stringify({
      id: randomToken(),
      name: "",
      surname: "",
      tel: "",
      email: "",
      age: 18,
      address: "",
      city: "",
      zip: "",
      state: {
        typeofstate: "",
        year: 1900,
        department: "",
      },
      insurancesS: [],
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
        if (!quoteResultS) {
          let finalPriceS = Math.round(calculateQuoteS());
          quoteResultS = `El precio de tu seguro es de U$S${finalPriceS} anuales.`;
        }
        Swal.fire({
          icon: "success",
          title: "Cotización generada",
          html: `<p>La cotizacion de su seguro tiene un valor anual de U$S ${quoteResultS}</p>`,
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
    const quotes = user.insurancesS;

    const quoteStrings = quotes.map(
      (quote) =>
        `Usuario: ${quote.name} ${quote.surname}. Inmueble: ${quote.typeofstate} - ${quote.year} - ubicado en ${quote.department}, Uruguay. Cotización: U$S ${quote.price} (anual). Fecha: ${quote.date}`
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