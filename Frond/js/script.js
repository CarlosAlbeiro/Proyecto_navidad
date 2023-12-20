function consulta_deseos() {
  $.ajax({
    type: "GET",
    url: "https://proyecto-navidad.onrender.com/lista_regalos",
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
  let usuario=document.getElementById('usuario').value;
  let producto=document.getElementById('producto').value;
  let descripcion=document.getElementById('descripcion').value;
  let link=document.getElementById('link').value;
  let imagen=document.getElementById('imagen').value;

  $.ajax({
    type: "POST",
    url: "https://proyecto-navidad.onrender.com/crear_regalo",
    data: {
      usuario: usuario,
      producto: producto,
      descripcion: descripcion,
      link:link,
      imagen:imagen
    },
    success: function (response) {
      console.log("Deseo ->". response);
      
    },
    error: function (error) {
      console.error("Error en la solicitud AJAX:", error);
    }
  });
  
}

consulta_deseos();