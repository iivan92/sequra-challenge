import { fetchAgreement } from "./api/payment.js";
import { templateDropdownItem } from "./templates/dropdown_tpl.js";
import { DROPDOWN_PLACEHOLDER } from "./utils/constants.js";
import { formatTextDropdownItem } from "./utils/format.js";

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

    const dataPrice = $(this).attr("data-price");
    if (dataPrice) {
      price = parseFloat(dataPrice);
      render();
    }
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

  fetchAgreement(totalPrice * 100).then((data) => {
    $(".dropdown .dropdown-menu").empty();
    data.forEach((item) => {
      const instalment = item.instalment_count || 0;
      const instalment_total = `${item.instalment_total?.string || "0 €"}`;

      const text = formatTextDropdownItem(instalment, instalment_total);
      $(".dropdown .dropdown-menu").append(
        templateDropdownItem(instalment, text)
      );
      $(`.dropdown .dropdown-menu li#item-${instalment}`).on(
        "click",
        (event) => {
          $(".dropdown button span.placeholder").text(event.target.innerText);
        }
      );
    });
    $(".dropdown button span.placeholder").text(DROPDOWN_PLACEHOLDER);
  });
};
