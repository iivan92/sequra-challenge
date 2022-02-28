import { fetchAgreement } from "./api/payment.js";
import { templateDropdownItem } from "./templates/dropdown_tpl.js";
import { DROPDOWN_PLACEHOLDER } from "./utils/constants.js";
import { formatTextDropdownItem } from "./utils/format.js";
import { trackEvent } from "./utils/tracking.js";

let price = 399.99;
let qty = 1;
let totalPrice;
let instalment_fee;

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
    trackEvent("info", "tab_changed");
  });

  $(".attr").on("click", function () {
    const clase = $(this).attr("class");

    $("." + clase).removeClass("active");
    $(this).addClass("active");
    trackEvent("product", "color_changed");
  });

  $(".attr2").on("click", function () {
    const clase = $(this).attr("class");

    $("." + clase).removeClass("active");
    $(this).addClass("active");

    price = parseFloat($(this).attr("data-price"));
    render();
    trackEvent("product", "capacity_changed");
  });

  $(".btn-minus").on("click", function () {
    if (qty > 1) {
      qty--;
    }
    render();
    trackEvent("product", "qty_changed");
  });

  $(".btn-plus").on("click", function () {
    qty++;
    render();
    trackEvent("product", "qty_changed");
  });

  $("#modalInfo").on("show.bs.modal", () => {
    if (instalment_fee) {
      $("#modalInfo p.fee_info").css("display", "block");
      $("#modalInfo p.fee_info b").text(instalment_fee);
    } else {
      $("#modalInfo p.fee_info").css("display", "none");
    }
    trackEvent("checkout", "modal_opened");
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
      const instalment_total = item.instalment_total?.string || "0 €";

      const text = formatTextDropdownItem(instalment, instalment_total);
      $(".dropdown .dropdown-menu").append(
        templateDropdownItem(instalment, text)
      );
      $(`.dropdown .dropdown-menu li#item-${instalment}`).on(
        "click",
        (event) => {
          $(".dropdown button span.placeholder").text(event.target.innerText);
          instalment_fee = item.instalment_fee?.string || "0 €";
          trackEvent("checkout", "instalment_changed", {
            selectedInstalment: instalment,
          });
        }
      );
    });
    $(".dropdown button span.placeholder").text(DROPDOWN_PLACEHOLDER);
    instalment_fee = undefined;
  });
};
