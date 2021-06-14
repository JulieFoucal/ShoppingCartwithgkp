
//AddToCart
function addToCart(event) {
    const button = event.target
    const imageUrl =
      button.parentElement.parentElement.querySelector('.shop-item-image').src
    const title =
      button.parentElement.parentElement.querySelector(
        '.shop-item-title'
      ).innerText
    const price = button.parentElement.querySelector('.shop-item-price').innerText
    const itemsContainer = document.querySelector('.cart-items')
  
    //CheckNames
    const cartItemNames = itemsContainer.querySelectorAll('.cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText === title) {
        return alert('Ce produit est déjà dans votre panier')
      }
    }
  
    //ADD new item
    const newItem = document.createElement('div')
    newItem.classList.add('cart-row')
    itemsContainer.append(newItem)
    newItem.innerHTML = `<div class="cart-item cart-column">
              <img
                class="cart-item-image"
                src="${imageUrl}"
                width="100"
                height="100"
              />
              <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" value="1" />
              <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
  
    newItem
      .querySelector('.btn-danger')
      .addEventListener('click', removeItemFromCard)
  
    newItem
      .querySelector('.cart-quantity-input')
      .addEventListener('change', quantityChange)
  
    //
    updateCartTotal()
  
    alert('Vous avez ajouté ce produit dans votre panier')
  }
  
  //Remove
  function removeItemFromCard(event) {
    let button = event.target
    button.parentElement.parentElement.remove()
    updateCartTotal()
  }
  
  //quantityChange
  function quantityChange(event) {
    let inputValue = event.target.value
  
    if (isNaN(inputValue) || inputValue <= 0) {
      event.target.value = 1
    }
    updateCartTotal()
  }
  
  //UpdateCartTotal
  function updateCartTotal() {
    const cartItemContainer = document.querySelector('.cart-items')
    const cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
  
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i]
      let priceElement = cartRow.querySelectorAll('.cart-price')[0]
      let quantityElement = cartRow.getElementsByClassName(
        'cart-quantity-input'
      )[0]
  
      const price = parseFloat(priceElement.innerText.replace('$', ''))
      const quantity = quantityElement.value
      total = total + quantity * price
    }
    total = Math.round(total * 100) / 100
    document.querySelector('.cart-total-price').innerText = `$${total}`
  }