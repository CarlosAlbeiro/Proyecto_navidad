function consulta_deseos() {
  $.ajax({
    type: "GET",
    url: "https://proyecto-navidad.onrender.com/deseos",
    success: function (data) {
      let contenedor = document.getElementById('list_deseos')
      console.log(data);
      // data.forEach(deseos => {
      //   console.log(deseos.name);
      //   var nuevoDiv = document.createElement("div");

      //   // Configurar propiedades del nuevo div (opcional)
      //   nuevoDiv.textContent = deseos.name;
      //   if (deseos.id == 1) {
      //     nuevoDiv.className = "col-4 badge bg-primary m-2";
      //   } else {
      //     nuevoDiv.className = "col-4 badge bg-danger m-2";
      //   }

      //   // Agregar el nuevo div al contenedor
      //   contenedor.appendChild(nuevoDiv);
      // });
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

function desear(){
  let deseo=document.getElementById('name_deseo').value;
  let link=document.getElementById('link_deseo').value;
  let descripcion=document.getElementById('descripcion').value;
  let user=document.getElementById('id_user').value;

  $.ajax({
    type: "GET",
    url: "https://proyecto-navidad.onrender.com/crear_deseos",
    data: {
      id_usuario: user,
      nombre: deseo,
      link:link,
      descripcion:descripcion
    },
    success: function (response) {
      console.log("Deseo ->". response);
      abrirCerrarModal("deseo")
      Usuarios();
    },
    error: function (error) {
      console.error("Error en la solicitud AJAX:", error);
    }
  });
  
}

function ingresar() {
  let usuario_form=document.getElementById('user_name').value;
  let password_form=document.getElementById('user_password').value;

  $.ajax({
    type: "GET",
    url: "https://proyecto-navidad.onrender.com/login",
    data: {
      usuario: usuario_form,
      password: password_form
    },
    success: function (response) {
      let menu=document.getElementById("menu");

      let agregar=document.createElement("li");
      agregar.className="list-inline-item";

      let link=document.createElement("a");
      link.type="button";
      link.onclick = function() {
        abrirCerrarModal('deseo');
      };

      let imagen=document.createElement("img")
      imagen.src="css/img/sorpresa.png";
      imagen.width="50";
      imagen.title="Agregar Deseo"

      link.appendChild(imagen);

      agregar.appendChild(link);

      menu.innerHTML="";
      menu.appendChild(agregar);

      document.getElementById("id_user").value=response[0].id;


      abrirCerrarModal('login')
      console.log(response[0].id);
    },
    error: function (error) {
      console.error("Error en la solicitud AJAX:", error);
    }
  });
}

function abrirCerrarModal(id) {
  console.log(id);
  $(`#${id}`).modal("toggle");
}

consulta_deseos();