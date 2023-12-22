document.addEventListener('DOMContentLoaded', function() {
  const destellosContainer = document.getElementById('destellos');

  document.addEventListener('mousemove', function(event) {
      crearDestello(event.pageX, event.pageY);
  });

  function crearDestello(x, y) {
      const destello = document.createElement('div');
      destello.classList.add('destello');
      destello.style.width = destello.style.height = Math.random() * 30 + 'px';
      destello.style.top = y - destello.clientHeight / 2 + 'px';
      destello.style.left = x - destello.clientWidth / 2 + 'px';
      destellosContainer.appendChild(destello);

      // Elimina el destello después de la animación
      setTimeout(function() {
        destellosContainer.removeChild(destello);
    }, 1500);
  }
});

function crearEstrella() {
  const estrella = document.createElement('div');
  estrella.className = 'estrella';
  estrella.style.left = `${Math.random() * window.innerWidth}px`;
  estrella.style.top = `${Math.random() * window.innerHeight}px`;
  document.body.appendChild(estrella);
  console.log("Estrella creada");

  // setTimeout(() => {
  //     estrella.remove();
  // }, 2000); // Eliminar la estrella después de 2 segundos
}

setInterval(() => {
  crearEstrella();
}, 500); // Crear una nueva estrella cada 3 segundos

function consulta_deseos() {
  $.ajax({
    type: "GET",
    url: "https://proyecto-navidad.onrender.com/lista_regalos",
    success: function (data) {
      let contenedor = document.getElementById('list_deseos')
      contenedor.innerHTML = "";
      console.log(data);
      data.forEach(deseos => {
        let link=!deseos.link? "sin":deseos.link;
        let color="#1C588C";
        if(deseos.usuarios=="LAURA"){
          color="pink"
        }
        $("#list_deseos").append(`
        <div id="regalo${deseos.id}" class="mt-2 col-lg-4 col-md-4 col-sm-6 col-xs-12 d-flex justify-content-center dropdown-center ">
          
          <div class="badge ml-1 dropdown-toggle regalo" data-bs-toggle="dropdown" style="background:${color};">
          <div class="badge rounded-pill bg-light text-dark mb-1">
            <span>${deseos.usuarios}  <i onclick="eliminar('${deseos.id}')" class="far fa-trash-alt"></i></span>
          </div>
          <br>
            <div class="badge rounded-pill bg-light text-dark">
              <span>${deseos.producto}</span>
            </div>
            <div class=" d-flex justify-content-center mt-1">
              <img src="${deseos.imagen}" class=" d-flex justify-content-center rounded" width="100">
            </div>
          </div>
          <div class="dropdown-menu p-1 text-center">
          ${deseos.descripcion}
          <a href="${link}" target="_blank">${link=="sin"?"":"link"}</a>
          </div>
        </div>
        `);
      });
      // Crear un nuevo elemento div
    },
    error: function (error) {
      let contenedor = document.getElementById('list_deseos')
      var nuevoDiv = document.createElement("div");
      nuevoDiv.textContent = "Error :C";
      nuevoDiv.className = "col-4 badge bg-danger m-2";
      contenedor.appendChild(nuevoDiv);
    }
  });
}

function desear() {
  let usuario_form = document.getElementById('usuario').value;
  usuario_form = usuario_form.toUpperCase();
  let producto_form = document.getElementById('producto').value;
  let descripcion_form = document.getElementById('descripcion').value;
  let link_form = document.getElementById('link').value;
  let imagen_form = document.getElementById('imagen').value;
  console.log("Usuario form:", usuario_form);
  console.log("Producto form:", producto_form);
  if (!usuario_form || !producto_form || !descripcion_form) {
    const toastLiveExample = document.getElementById('error')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
  } else {

    $.ajax({
      type: "POST",
      url: "https://proyecto-navidad.onrender.com/crear_regalo",
      contentType: "application/json", // Agrega este encabezado
      data: JSON.stringify({
        usuario: usuario_form,
        producto: producto_form,
        descripcion: descripcion_form,
        link: link_form,
        imagen: imagen_form
      }),
      success: function (response) {
        console.log("Deseo ->",response);
       // document.getElementById('name_user').innerHTML = usuario_form;
        document.getElementById('msj_exito').innerHTML = "Registro exitoso";
        const toastLiveExample = document.getElementById('exito')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
        document.getElementById('usuario').innerHTML ="";
        document.getElementById('producto').innerHTML ="";
        document.getElementById('descripcion').innerHTML ="";
        document.getElementById('link').innerHTML ="";
        document.getElementById('imagen').innerHTML ="";
        consulta_deseos()
      },
      error: function (error) {
        // let errorCode = JSON.parse(error);
        console.error(error);
        document.getElementById('msj_error').innerHTML = "Error al registrar tu regalo.";

        const toastLiveExample = document.getElementById('error')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
      }
    });
  }
}

function eliminar(id) {
  $.ajax({
    type: "POST",
    url: "https://proyecto-navidad.onrender.com/eliminar_regalo",
    contentType: "application/json", // Agrega este encabezado
    data: JSON.stringify({
      id: id
    }),
    success: function (response) {
      const toastLiveExample = document.getElementById('exito')
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
      document.getElementById(`regalo${id}`).remove();
    },
    error: function (error) {
      // let errorCode = JSON.parse(error);
      console.error(error);
      document.getElementById('msj_error').innerHTML = "Error al eliminar tu regalo.";

      const toastLiveExample = document.getElementById('error')
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
    }
  });

}

consulta_deseos();
