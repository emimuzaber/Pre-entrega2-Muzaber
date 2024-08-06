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
        <button onclick="seleccionarEntrada(${numeroSector})">${ticket.type} - $${ticket.precio}</button>
    `;

    document.getElementById('ticket-info').innerHTML = `
        <h3>Opciones para ${nombreSector}</h3>
        ${ticketInfo}
    `;
};


const seleccionarEntrada = (numeroSector) => {
    const ticket = obtenerOpcionesEntradas(numeroSector)[0];
    const cantidad = prompt(`¿Cuántas entradas de tipo "${ticket.type}" deseas comprar?`);
    if (cantidad !== null && !isNaN(cantidad) && cantidad > 0) {
        const total = calcularTotal(ticket.precio, cantidad);
        document.getElementById('ticket-info').innerHTML = `
            <h3>Entrada Seleccionada</h3>
            <p>Tipo: ${ticket.type}</p>
            <p>Precio por entrada: $${ticket.precio}</p>
            <p>Cantidad: ${cantidad}</p>
            <p>Total a pagar: $${total}</p>
        `;
    } else {
        alert('Cantidad inválida');
    }
};

const calcularTotal = (precio, cantidad) => precio * cantidad;

const asignarManejadoresEventos = () => {
    document.querySelectorAll('.sector').forEach(sector => {
        sector.addEventListener('click', (event) => {
            const numeroSector = event.target.getAttribute('data-sector');
            mostrarOpcionesEntradas(numeroSector);
        });
    });
};


asignarManejadoresEventos();