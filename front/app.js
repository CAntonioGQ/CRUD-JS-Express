
const url = 'http://localhost:5500/api/articulos'

const contenedor = document.querySelector('tbody')
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const descripcion = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')
let opcion = ''

const btnCrear = document.getElementById('btnCrear')
btnCrear.addEventListener('click', () => {
    descripcion.value = ''
    precio.value = ''
    stock.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

//Funcioon para mostrar Resultados
const mostrar =(articulos)=>{
    articulos.forEach(articulo =>{
        resultados += 
        `
        <tr>
            <td>${articulo.id}</td>
            <td>${articulo.descripcion}</td>
            <td>${articulo.precio}</td>
            <td>${articulo.stock}</td>
            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a></td>
            <td class="text-center"><a class="btnBorrar btn btn-danger">Borrar</a></td>
        </tr>
        `
        
    })
    contenedor.innerHTML = resultados
}

//Procedimiento para Mostrar (Fetch)
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))




const on = (element, event, selector, handler)=>{
    
    //console.log(element)
    //console.log(event)
    element.addEventListener(event,e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}
//PROCEDIMIENTO BORRAR
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;

    alertify.confirm("¿Seguro quieres Eliminar?", function() {
        fetch(`http://localhost:5500/api/articulos/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                // La eliminación se realizó correctamente, recargar la página
                location.reload();
            } else {
                // Manejar el caso si la eliminación no se realizó correctamente
                console.error('Error al eliminar el artículo:', res.status);
                alertify.error('Error al eliminar el artículo');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el artículo:', error);
            alertify.error('Error al eliminar el artículo');
        });
    }, function() {
        alertify.error('Cancelado');
    });
});

//Procedimiento Editar

//Procedimiento Editar
let idArticuloAEditar; // Definimos una variable para almacenar el ID del artículo a editar

on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    idArticuloAEditar = fila.children[0].innerHTML; // Capturamos el ID del artículo a editar
    const descripcionForm = fila.children[1].innerHTML;
    const precioForm = fila.children[2].innerHTML;
    const stockForm = fila.children[3].innerHTML;
    descripcion.value = descripcionForm;
    precio.value = precioForm;
    stock.value = stockForm;
    opcion = 'editar';
    modalArticulo.show();
});

formArticulo.addEventListener('submit', (e) => {
    e.preventDefault();
    const descripcionValue = descripcion.value.trim();
    const precioValue = precio.value.trim();
    const stockValue = stock.value.trim();

    if (opcion == 'crear') {
        if (!descripcionValue || !precioValue || !stockValue) {
            console.error('Por favor, completa todos los campos.');
            return;
        }

        fetch(`http://localhost:5500/api/articulos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descripcion: descripcionValue,
                precio: precioValue,
                stock: stockValue,
            })
        })
        .then(response => {
            if (response.ok) {
                // Recargar la página después de agregar el artículo exitosamente
                location.reload();
            } else {
                console.error('Error al crear el artículo:', response.status);
                alertify.error('Error al crear el artículo');
            }
        })
        .catch(error => console.error('Error al crear el artículo:', error));
    }

    if (opcion == 'editar') {
        if (!idArticuloAEditar) {
            console.error('El ID del artículo a editar no está definido.');
            return;
        }

        fetch(`http://localhost:5500/api/articulos/${idArticuloAEditar}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descripcion: descripcionValue,
                precio: precioValue,
                stock: stockValue,
            })
        })
        .then(response => {
            if (response.ok) {
                // Recargar la página después de editar el artículo exitosamente
                location.reload();
            } else {
                console.error('Error al editar el artículo:', response.status);
                alertify.error('Error al editar el artículo');
            }
        })
        .catch(error => console.error('Error al editar el artículo:', error));
    }

    modalArticulo.hide();
});
