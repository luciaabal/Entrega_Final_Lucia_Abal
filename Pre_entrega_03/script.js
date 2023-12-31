document.addEventListener('DOMContentLoaded', function () {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let totalCarrito = 0;

    function configurarBotones() {
        const agregarBtns = document.querySelectorAll('.agregarBtn');

        agregarBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const prenda = this.getAttribute('data-prenda');
                const precio = parseFloat(this.getAttribute('data-precio'));

                const cantidadInput = document.getElementById(`cantidad-${prenda}`);
                const cantidad = parseInt(cantidadInput.value, 10);

                if (isNaN(cantidad) || cantidad <= 0) {
                    alert("Por favor, ingrese una cantidad válida.");
                    return;
                }

                agregarAlCarrito(prenda, precio, cantidad);
            });
        });

        const pagarTodoBtn = document.getElementById('pagarTodoBtn');
        pagarTodoBtn.addEventListener('click', pagarTodo);
    }

    function agregarAlCarrito(prenda, precio, cantidad) {
        const itemExistente = carrito.find(item => item.prenda === prenda);

        if (itemExistente) {
            itemExistente.cantidad += cantidad;
            itemExistente.precio += precio * cantidad;
        } else {
            carrito.push({ prenda: prenda, precio: precio * cantidad, cantidad: cantidad });
        }

        mostrarCarrito();
    }

    function mostrarCarrito() {
        const carritoElement = document.getElementById('carrito-contenido');
        carritoElement.innerHTML = "";

        for (let i = 0; i < carrito.length; i++) {
            const item = carrito[i];
            const itemHTML = document.createElement('div');
            itemHTML.innerHTML = `
                <p>${item.prenda}, Cantidad: ${item.cantidad}, Precio total: $${item.precio}</p>`;
            carritoElement.appendChild(itemHTML);
        }

        const totalCarrito = calcularTotalCarrito();
        const totalHTML = document.getElementById('total');
        totalHTML.textContent = `Total a pagar: $${totalCarrito}`;
    }

    function calcularTotalCarrito() {
        return carrito.reduce((total, item) => total + item.precio, 0);
    }

    function pagarTodo() {
        const totalVenta = calcularTotalCarrito();
        totalCarrito += totalVenta;

        if (carrito.length > 0) {
            alert(`Pago realizado. Total pagado: $${totalVenta}`);
            carrito.length = 0;
            mostrarCarrito();
            mostrarAgradecimiento();
        } else {
            alert("El carrito está vacío. Agregue productos antes de realizar un pago.");
        }
    }

    function mostrarAgradecimiento() {
        const agradecimiento = prompt("¡Gracias por tu compra! ¿Hay algo más en lo que te podamos ayudar?");
        if (agradecimiento) {
            alert("Nos alegra poder ayudarte. ¡Vuelve pronto!");
        }
    }

    configurarBotones();
});