function consulta_deseos() {
  $.ajax({
    type: "GET",
    url: "https://proyecto-navidad.onrender.com/lista_regalos",
    success: function (data) {
      let contenedor = document.getElementById('list_deseos')
      console.log(data);
      data.forEach(deseos => {
        contenedor.innerHTML = "";

        $("#list_deseos").append(`
        <div class="col-md-3 col-sm-6 col-12 d-flex justify-content-center">
          <div class="badge bg-primary">

          <div class="badge rounded-pill bg-light text-dark mb-1">
            <span>${deseos.usuarios}</span>
          </div>
          <br>
            <div class="badge rounded-pill bg-light text-dark">
              <span>${deseos.producto}</span>
            </div>
            <div class=" d-flex justify-content-center mt-1">
              <img src="${deseos.imagen}" class=" d-flex justify-content-center rounded" width="100">
            </div>
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

  if (!usuario_form || !producto_form || !descripcion_form) {
    const toastLiveExample = document.getElementById('error')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
  } else {

    $.ajax({
      type: "POST",
      url: "https://proyecto-navidad.onrender.com/crear_regalo",
      data: {
        usuario: usuario_form,
        producto: producto_form,
        descripcion: descripcion_form,
        link: link_form,
        imagen: imagen_form
      },
      success: function (response) {
        console.log("Deseo ->",response);
        document.getElementById('name_user').innerHTML = usuario_form;

        const toastLiveExample = document.getElementById('liveToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
      },
      error: function (error) {
        // let errorCode = JSON.parse(error);
        console.error(error);
        document.getElementById('mensaje_error').innerHTML = "Error al registrar tu regalo.";

        const toastLiveExample = document.getElementById('error')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
      }
    });
  }



}

consulta_deseos();