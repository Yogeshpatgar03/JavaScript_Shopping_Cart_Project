var cartVisible = false;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
  for (var i = 0; i < botonesEliminarItem.length; i++) {
    var button = botonesEliminarItem[i];
    button.addEventListener('click', eliminarItemCart);
  }

  var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
  for (var i = 0; i < botonesSumarCantidad.length; i++) {
    var button = botonesSumarCantidad[i];
    button.addEventListener('click', sumarCantidad);
  }

  var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
  for (var i = 0; i < botonesRestarCantidad.length; i++) {
    var button = botonesRestarCantidad[i];
    button.addEventListener('click', restarCantidad);
  }

  var botonesAgregarAlCart = document.getElementsByClassName('button-item');
  for (var i = 0; i < botonesAgregarAlCart.length; i++) {
    var button = botonesAgregarAlCart[i];
    button.addEventListener('click', agregarAlCartClicked);
  }

  document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

function pagarClicked() {
  alert("Your Order is Successfully Placed. Thank you for purchasing!");

  var cartItems = document.getElementsByClassName('cart-items')[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  
  actualizarTotalCart();
  ocultarCart();
}

function agregarAlCartClicked(event) {
  var button = event.target;
  var item = button.parentElement;
  var total = item.getElementsByClassName('total-item')[0].innerText;
  var precio = item.getElementsByClassName('product-item')[0].innerText;
  var imagenSrc = item.getElementsByClassName('img-item')[0].src;

  agregarItemAlCart(total, precio, imagenSrc);

  hacerVisibleCart();
}

function hacerVisibleCart() {
  cartVisible = true;
  var cart = document.getElementsByClassName('cart')[0];
  cart.style.marginRight = '0';
  cart.style.opacity = '1';

  var items = document.getElementsByClassName('container-items')[0];
  items.style.width = '60%';
}

function agregarItemAlCart(total, precio, imagenSrc) {
  var item = document.createElement('div');
  item.classList.add('item');
  var itemsCart = document.getElementsByClassName('cart-items')[0];

  var nombresItemsCart = itemsCart.getElementsByClassName('cart-item-total');
  for (var i = 0; i < nombresItemsCart.length; i++) {
    if (nombresItemsCart[i].innerText == total) {
      alert("This item is already in the cart");
      return;
    }
  }

  var itemCartContenido = `
    <div class="cart-item">
      <img src="${imagenSrc}" width="80px" alt="" style="height: 120px; width: 80px;">
      <div class="cart-item-detalles">
        <span class="cart-item-total">${total}</span>
        <div class="selector-cantidad">
          <i class="fa-solid fa-minus restar-cantidad"></i>
          <input type="text" value="1" class="cart-item-cantidad" disabled>
          <i class="fa-solid fa-plus sumar-cantidad"></i>
        </div>
        <span class="cart-item-precio">${precio}</span>
      </div>
      <button class="btn-eliminar">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  item.innerHTML = itemCartContenido;
  itemsCart.append(item);

  item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCart);

  var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
  botonRestarCantidad.addEventListener('click', restarCantidad);

  var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
  botonSumarCantidad.addEventListener('click', sumarCantidad);

  actualizarTotalCart();
}

function sumarCantidad(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var cantidadActual = parseInt(selector.getElementsByClassName('cart-item-cantidad')[0].value);
  cantidadActual++;
  selector.getElementsByClassName('cart-item-cantidad')[0].value = cantidadActual;
  actualizarTotalCart();
}

function restarCantidad(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var cantidadActual = parseInt(selector.getElementsByClassName('cart-item-cantidad')[0].value);
  cantidadActual--;
  if (cantidadActual >= 1) {
    selector.getElementsByClassName('cart-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCart();
  }
}

function eliminarItemCart(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  actualizarTotalCart();
  ocultarCart();
}

function ocultarCart() {
  var cartItems = document.getElementsByClassName('cart-items')[0];
  if (cartItems.childElementCount === 0) {
    var cart = document.getElementsByClassName('cart')[0];
    cart.style.marginRight = '-100%';
    cart.style.opacity = '0';
    cartVisible = false;

    var items = document.getElementsByClassName('container-items')[0];
    items.style.width = '100%';
  }
}

function actualizarTotalCart() {
  var cartContainer = document.getElementsByClassName('cart')[0];
  var cartItems = cartContainer.getElementsByClassName('cart-item');
  var total = 0;

  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var precioElemento = item.getElementsByClassName('cart-item-precio')[0];
    var precio = parseFloat(precioElemento.innerText.replace('₹', '').replace(',', ''));
    var cantidadItem = item.getElementsByClassName('cart-item-cantidad')[0];
    var cantidad = parseInt(cantidadItem.value);
    total = total + (precio * cantidad);
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-precio-total')[0].innerText = '₹' + total.toLocaleString("es")
}
