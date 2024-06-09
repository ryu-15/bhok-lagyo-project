document.addEventListener('DOMContentLoaded', function() {
    const addBtns = document.querySelectorAll('.add-btn');
    const minusBtns = document.querySelectorAll('.minus-btn');
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const deliveryCost = 100;

    const cart = {};

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        for (const [name, item] of Object.entries(cart)) {
            const { quantity, price } = item;
            if (quantity > 0) {
                const li = document.createElement('li');
                li.textContent = `${quantity} x ${name} - Rs. ${price * quantity}`;
                cartItemsContainer.appendChild(li);
                subtotal += price * quantity;
            }
        }

        subtotalElement.textContent = subtotal;
        totalElement.textContent = subtotal + deliveryCost;
    }

    addBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const menuItem = btn.closest('.menu-item');
            const name = menuItem.getAttribute('data-name');
            const price = parseInt(menuItem.getAttribute('data-price'));
            const quantitySpan = btn.previousElementSibling;
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;

            if (!cart[name]) {
                cart[name] = { price, quantity };
            } else {
                cart[name].quantity = quantity;
            }

            quantitySpan.textContent = quantity;
            updateCart();
        });
    });

    minusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const menuItem = btn.closest('.menu-item');
            const name = menuItem.getAttribute('data-name');
            const price = parseInt(menuItem.getAttribute('data-price'));
            const quantitySpan = btn.nextElementSibling;
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantity--;
                cart[name].quantity = quantity;
                quantitySpan.textContent = quantity;
                updateCart();
            }
        });
    });
});
