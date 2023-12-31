alert("¡Bienvenido/a a nuestra tienda de ropa Rotunda!");

let nombre = prompt("Ingresa tu nombre completo :)");

alert(`¡Genial ${nombre}, a continuación entrarás a nuestra página web!`);

const catalogoRopa = [
    { prenda: "Remera", precio: 650 },
    { prenda: "Pantalon", precio: 1700 },
    { prenda: "Vestido", precio: 2500 },
    { prenda: "Pollera", precio: 850 },
    { prenda: "Campera", precio: 5000 },
    { prenda: "Championes", precio: 4000 },
];

function mostrarCatalogoRopa() {
    let mensaje = "Elige el tipo de prenda:\n\n";

    catalogoRopa.forEach(prenda => {
        mensaje += `${prenda.prenda} - Precio: $${prenda.precio}\n`;
    });

    alert(mensaje);
}

function encontrarPrendaPorTipo(tipo) {
    const prendaEncontrada = catalogoRopa.find(prenda => prenda.prenda.toLowerCase() === tipo.toLowerCase());

    if (prendaEncontrada) {
        return prendaEncontrada;
    } else {
        return null;
    }
}

let carrito = [];

do {
    mostrarCatalogoRopa();

    const tipoPrendaCliente = prompt("Ingresa el tipo de prenda que deseas comprar (o escribe 'fin' para finalizar):").toLowerCase();

    if (tipoPrendaCliente.toLowerCase() === 'fin') {
        break; 
    }

    const prendaElegida = encontrarPrendaPorTipo(tipoPrendaCliente);

    if (prendaElegida) {
        carrito.push(prendaElegida);
        const respuesta = prompt(`Se ha agregado ${prendaElegida.prenda} al carrito. ¿Queres agregar más prendas? (Si/No)`);

        if (respuesta.toLowerCase() === 'no') {
            break; 
        }
    } else {
        alert("Lo siento, no tenemos esa prenda disponible en nuestro catálogo :(");
    }
} while (true);


let totalCarrito = 0;

if (carrito.length > 0) {
    alert("Resumen del carrito:");

    for (const prenda of carrito) {
        alert(`- ${prenda.prenda}: $${prenda.precio}`);
        totalCarrito += prenda.precio;
    }

    alert(`Total a pagar: $${totalCarrito}`);

    alert("¡Gracias por comprar en nuestra tienda! Esperamos verte pronto ;)");
} else {
    alert("No se han agregado prendas al carrito. ¡Nos vemos! :)");
}