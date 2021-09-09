$(document).ready(function() {
    // hide message after 5 sec
    $('#successMessage').delay(5000).fadeOut('slow');

    // favorites counter
    var counter = $('#favCounter').html();
    $('#favoritesCounter').html(counter);
});


// change product image
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageFile").change(function() {
    readURL(this);
});


// Add product to cart
$('#cartForm').submit((event) => {
    event.preventDefault();
    var $form = $(this),
        productId = $('#productId').val(),
        productTitle = $('#productTitle').val(),
        productDetails = $('#productDetails').val(),
        productPrice = $('#productPrice').val(),
        url = 'http://localhost:4000/product/addproductToCart',
        jsonData = { productId: productId, productTitle: productTitle, productDetails: productDetails, productPrice: productPrice };
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: jsonData,
        success: (res, textStatus, xhr) => {
            $('.toast').append(res.msg);
        },
        error: (xhr, textStatus, res) => {
            $('.toast').append(res.msg);
        }
    });
});