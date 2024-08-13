
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutButton = document.querySelector('.checkout');
    const checkoutForm = document.querySelector('.checkout-form');
    const confirmOrderButton = document.querySelector('.confirm-order');
    const validationMessage = document.querySelector('.validation-message');
    const checkoutSection = document.querySelector('.checkout-section');
    const confirmationMessage = document.querySelector('.confirmation-message');
    const selectedItemsContainer = document.querySelector('.selected-items');
    const totalPriceContainer = document.querySelector('.total-price');
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    let selectedItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = button.parentElement;
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const quantity = parseInt(product.querySelector('#quantity').value);
            selectedItems.push({ name: productName, price: productPrice * quantity, quantity: quantity });
            
            updateOrderSummary();
        });
    });

    checkoutButton.addEventListener('click', function() {
        if (selectedItems.length === 0) {
            validationMessage.textContent = 'Please add items to your cart before proceeding to checkout.';
            validationMessage.style.display = 'block';
        } else {
            validationMessage.style.display = 'none';
            checkoutSection.style.display = 'block';
        }
    });
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;
        
        requiredFields.forEach(field => {
            if (!field.checkValidity()) {
                field.classList.add('invalid');
                field.parentNode.querySelector('.error').textContent = field.validationMessage;
                valid = false;
            } else {
                field.classList.remove('invalid');
                field.parentNode.querySelector('.error').textContent = ''; // Clear the error message
            }
        });

        if (valid) {
          
            // Send order details to server or process locally
            // Display confirmation message
            confirmationMessage.classList.remove('hidden');
            // Reset form and selected items
            checkoutForm.reset();
            selectedItems = [];
            updateOrderSummary();
        }
    });  

    

    function updateOrderSummary() {
        selectedItemsContainer.innerHTML = '';
        selectedItems.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('selected-item');
            listItem.innerHTML = `
                <div>
                    <p class="item-name">${item.name} - Quantity: ${item.quantity}(pcs) - Price: Rs. ${item.price.toFixed(2)}</p>
                </div>
            `;
            selectedItemsContainer.appendChild(listItem);
        });
        updateTotal();
    }

    function updateTotal() {
        const totalPrice = selectedItems.reduce((total, item) => {
            return total + item.price;
        }, 0);
        totalPriceContainer.textContent = `Total: Rs. ${totalPrice.toFixed(2)}`;
    }
});



window.addEventListener('scroll', function () {
    var menuIcon = document.getElementById('menu-icon');
    var headerHeight = document.querySelector('.header').offsetHeight;
    if (window.scrollY >= headerHeight) {
        menuIcon.style.top = '10%';
    } else {
        menuIcon.style.top = (headerHeight - window.scrollY);
    }
});

function openNav() {
    var navbar = document.getElementById("navbar");
    var menuIcon = document.getElementById("menu-icon");

    if (navbar.style.width === "100%") {
        navbar.style.width = "0";
        navbar.classList.remove('open');
        menuIcon.innerHTML = "&#9776;";
        menuIcon.style.transition = "transform 0.3s ease"; 
        menuIcon.style.transform = "rotate(0deg)"; 
    } else {
        navbar.style.width = "100%";
        navbar.classList.add('open');
        menuIcon.innerHTML = "&times;";
        menuIcon.style.transition = "transform 0.3s ease"; 
        menuIcon.style.transform = "rotate(90deg)"; 
    }
}

function closeNav() {
    var navbar = document.getElementById("navbar");
    var menuIcon = document.getElementById("menu-icon");
    navbar.style.width = "0";
    navbar.classList.remove('open');
    menuIcon.innerHTML = "&#9776;"; 
    menuIcon.style.transition = "transform 0.3s ease"; 
    menuIcon.style.transform = "rotate(0deg)"; 
}

document.addEventListener("DOMContentLoaded", function() {
    var currentUrl = window.location.href;

    // Highlight navbar links
    var navbarLinks = document.querySelectorAll(".overlay-content a");
    navbarLinks.forEach(function(link) {
        if (link.href === currentUrl) {
            link.classList.add("active");
        }
    });

    // Highlight footer links
    var footerLinks = document.querySelectorAll(".footerNav ul li a");
    footerLinks.forEach(function(link) {
        if (link.href === currentUrl) {
            link.classList.add("active");
        }
    });
});
