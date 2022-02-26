import { fetchAgreement } from "./api/payment.js";

let price = 399.99;
let qty = 1;
let totalPrice;

$(document).ready(function () {
  init();
});

const init = async () => {
  initComponents();
  render();
};

const initComponents = () => {
  $("ul.menu-items > li").on("click", function () {
    $("ul.menu-items > li").removeClass("active");
    $(this).addClass("active");
  });

  $(".attr,.attr2").on("click", function () {
    const clase = $(this).attr("class");

    $("." + clase).removeClass("active");
    $(this).addClass("active");
    price = parseFloat($(this).attr("data-price"));
    render();
  });

  $(".btn-minus").on("click", function () {
    if (qty > 1) {
      qty--;
    }
    render();
  });

  $(".btn-plus").on("click", function () {
    qty++;
    render();
  });
};

const render = () => {
  totalPrice = price * qty;
  $(".section > div > input").val(qty);
  $("#product-price").text(`${price}€`);
  $("#total-price").text(`${totalPrice}€`);

  fetchAgreement(totalPrice).then((value) => {
    console.log("🚀 ~ file: main.js ~ line 11 ~ init ~ value", value);
  });
};
