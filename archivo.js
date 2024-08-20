
// const sectores = {
//     1: { nombre: 'Sector GENERAL 1', tickets: [{ type: 'Entrada GENERAL 1', precio: 8000 }] },
//     2: { nombre: 'Sector VIP', tickets: [{ type: 'Entrada VIP', precio: 10000 }] },
//     3: { nombre: 'Sector GENERAL 2', tickets: [{ type: 'Entrada GENERAL 2', precio: 8000 }] },
//     4: { nombre: 'Sector BALCON 4', tickets: [{ type: 'Entrada BALCON 4', precio: 6000 }] },
//     5: { nombre: 'Sector BALCON 5', tickets: [{ type: 'Entrada BALCON 5', precio: 6000 }] },
// };

// const obtenerNombreSector = (numeroSector) => sectores[numeroSector].nombre;

// const obtenerOpcionesEntradas = (numeroSector) => sectores[numeroSector].tickets;

// const mostrarOpcionesEntradas = (numeroSector) => {
//     const nombreSector = obtenerNombreSector(numeroSector);
//     const ticket = obtenerOpcionesEntradas(numeroSector)[0];
//     const ticketInfo = `
//         <button onclick="seleccionarEntrada(${numeroSector})">${ticket.type} - $${ticket.precio}</button>
//     `;

//     document.getElementById('ticket-info').innerHTML = `
//         <h3>Opciones para ${nombreSector}</h3>
//         ${ticketInfo}
//     `;
// };


// const seleccionarEntrada = (numeroSector) => {
//     const ticket = obtenerOpcionesEntradas(numeroSector)[0];
//     const cantidad = prompt(`¿Cuántas entradas de tipo "${ticket.type}" deseas comprar?`);
//     if (cantidad !== null && !isNaN(cantidad) && cantidad > 0) {
//         const total = calcularTotal(ticket.precio, cantidad);
//         document.getElementById('ticket-info').innerHTML = `
//             <h3>Entrada Seleccionada</h3>
//             <p>Tipo: ${ticket.type}</p>
//             <p>Precio por entrada: $${ticket.precio}</p>
//             <p>Cantidad: ${cantidad}</p>
//             <p>Total a pagar: $${total}</p>
//         `;
//     } else {
//         alert('Cantidad inválida');
//     }
// };

// const calcularTotal = (precio, cantidad) => precio * cantidad;

// const asignarManejadoresEventos = () => {
//     document.querySelectorAll('.sector').forEach(sector => {
//         sector.addEventListener('click', (event) => {
//             const numeroSector = event.target.getAttribute('data-sector');
//             mostrarOpcionesEntradas(numeroSector);
//         });
//     });
// };


// asignarManejadoresEventos();

// Funciones y lógica previas...

const sectores = {
    1: { nombre: 'Sector GENERAL 1', tickets: [{ type: 'Entrada GENERAL 1', precio: 8000 }] },
    2: { nombre: 'Sector VIP', tickets: [{ type: 'Entrada VIP', precio: 10000 }] },
    3: { nombre: 'Sector GENERAL 2', tickets: [{ type: 'Entrada GENERAL 2', precio: 8000 }] },
    4: { nombre: 'Sector BALCON 4', tickets: [{ type: 'Entrada BALCON 4', precio: 6000 }] },
    5: { nombre: 'Sector BALCON 5', tickets: [{ type: 'Entrada BALCON 5', precio: 6000 }] },
};


const obtenerNombreSector = (numeroSector) => sectores[numeroSector].nombre;

const obtenerOpcionesEntradas = (numeroSector) => sectores[numeroSector].tickets;

const mostrarOpcionesEntradas = (numeroSector) => {
    const nombreSector = obtenerNombreSector(numeroSector);
    const ticket = obtenerOpcionesEntradas(numeroSector)[0];
    const ticketInfo = `
        <h3>Opciones para ${nombreSector}</h3>
        <p>${ticket.type} - $${ticket.precio}</p>
        <input type="number" id="cantidad-entradas" min="1" placeholder="Cantidad de entradas">
        <button onclick="seleccionarEntrada(${numeroSector})">Confirmar</button>
    `;

    document.getElementById('entradas').innerHTML = ticketInfo;

    // Guardar la selección del sector en localStorage
    localStorage.setItem('sectorSeleccionado', numeroSector);
};

// Variable para almacenar las entradas seleccionadas
let entradasSeleccionadas = [];

// Función para agregar entradas al arreglo y actualizar el total
const seleccionarEntrada = (numeroSector) => {
    const cantidad = document.getElementById('cantidad-entradas').value;
    const ticket = obtenerOpcionesEntradas(numeroSector)[0];

    if (cantidad && cantidad > 0) {
        // Crear un objeto con la información de la entrada seleccionada
        const seleccion = {
            sector: sectores[numeroSector].nombre,
            tipo: ticket.type,
            precio: ticket.precio,
            cantidad: parseInt(cantidad),
            total: calcularTotal(ticket.precio, cantidad)
        };

        // Agregar la selección al arreglo de entradas seleccionadas
        entradasSeleccionadas.push(seleccion);

        // Guardar las entradas seleccionadas en localStorage
        localStorage.setItem('entradasSeleccionadas', JSON.stringify(entradasSeleccionadas));

        // Actualizar la interfaz con las entradas seleccionadas
        actualizarResumenEntradas();
    } else {
        alert('Por favor ingresa una cantidad válida');
    }
};

// Función para actualizar el resumen de las entradas seleccionadas en el DOM
// Función para actualizar el resumen de las entradas seleccionadas en el DOM
const actualizarResumenEntradas = () => {
    let resumenHTML = '<h3>Resumen de tus entradas:</h3>';
    let totalFinal = 0;

    entradasSeleccionadas.forEach((entrada, index) => {
        resumenHTML += `
            <p><strong>Sector:</strong> ${entrada.sector}</p>
            <p><strong>Tipo:</strong> ${entrada.tipo}</p>
            <p><strong>Cantidad:</strong> ${entrada.cantidad}</p>
            <p><strong>Total:</strong> $${entrada.total}</p>
            <hr>
        `;
        totalFinal += entrada.total;
    });

    resumenHTML += `<h4>Total acumulado a pagar: $${totalFinal}</h4>`;

    // Añadir el botón "Iniciar Pago"
    resumenHTML += `<button id="iniciar-pago" style="margin-top: 20px;">Iniciar Pago</button>`;

    document.getElementById('total').innerHTML = resumenHTML;

    // Asignar evento al botón
    document.getElementById('iniciar-pago').addEventListener('click', () => {
        iniciarProcesoPago();
    });
};

const iniciarProcesoPago = () => {
    Swal.fire({
        title: '¿Eres mayor de edad para realizar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Perfecto!',
                'Puedes proceder con la compra.',
                'success'
            ).then(() => {
                // Vaciar entradas seleccionadas y localStorage
                entradasSeleccionadas = [];
                localStorage.removeItem('entradasSeleccionadas');

                // Recargar la página para reiniciar el proceso
                location.reload();
            });
        } else {
            Swal.fire(
                'Lo sentimos',
                'Debes ser mayor de edad para realizar la compra.',
                'error'
            );
        }
    });
};

// Cargar las entradas desde localStorage si existen
const cargarEntradasDesdeStorage = () => {
    const entradasGuardadas = localStorage.getItem('entradasSeleccionadas');
    if (entradasGuardadas) {
        entradasSeleccionadas = JSON.parse(entradasGuardadas);
        actualizarResumenEntradas();
    }
};

// Ejecutar la carga de las entradas al cargar la página
cargarEntradasDesdeStorage();

const calcularTotal = (precio, cantidad) => precio * cantidad;

const asignarManejadoresEventos = () => {
    console.log("Asignando manejadores de eventos...");
    document.querySelectorAll('.sector').forEach(sector => {
        sector.addEventListener('click', (event) => {
            const numeroSector = event.target.getAttribute('data-sector');
            mostrarOpcionesEntradas(numeroSector);
        });
    });
};

// Finalmente, llamamos a las funciones que inician la funcionalidad
asignarManejadoresEventos();
