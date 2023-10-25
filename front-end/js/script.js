const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const modal = $('.modal');
// render product list
const app = {
    products: [
        {
            name: "Đồng Hồ Nam Rolex Máy Quarzt - Vành Benzen Tọa Độ - Kim Cọc Thép Chống Gỉ - Size Mặt 40mm - Bảo Hành 24 Tháng - Chống Nước 3ATM",
            image: "https://lzd-img-global.slatic.net/g/p/7f361df2ed2b5b7be7be83b821bce9ee.jpg_400x400q75.jpg_.webp",
            oldPrice: "₫11.999.000",
            currentPrice: "₫9.999.000",
            productSold: "Đã bán 20k",
            productOrigin: "Hàn Quốc",
            saleOffPercent: "20%"
        },
        {
            name: "Đồng Hồ Omega Speedmaster Silver Snoopy Award 310.32.42.50.02.001",
            image: "https://cdn2.chrono24.com/images/uhren/29144643-02tsxsjh7yplmmaffcxztnl2-Square360.jpg",
            oldPrice: "₫605.000.000",
            currentPrice: "₫544.500.000",
            productSold: "Đã bán 100",
            productOrigin: "Thụy Sĩ",
            saleOffPercent: "10%"
        },
        {
            name: "Đồng hồ nam Rolex Oyster Perpetual Cosmograph Daytona Rainbow 116595RBOW",
            image: "https://cdn2.chrono24.com/images/uhren/28432037-n09ruvqtj9al85ettvadikg0-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27186937-vffnxrcdmcbl4x25ti2nanwy-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27400834-wthpp5w3j3uu12f2yweasnxf-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27400834-wthpp5w3j3uu12f2yweasnxf-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27400834-wthpp5w3j3uu12f2yweasnxf-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27400834-wthpp5w3j3uu12f2yweasnxf-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27400834-wthpp5w3j3uu12f2yweasnxf-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27811998-455n98qxqmlxdmaqf6ptyk6i-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27811998-455n98qxqmlxdmaqf6ptyk6i-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27811998-455n98qxqmlxdmaqf6ptyk6i-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27811998-455n98qxqmlxdmaqf6ptyk6i-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27811998-455n98qxqmlxdmaqf6ptyk6i-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
        {
            name: "Omega Speedmaster",
            image: "https://cdn2.chrono24.com/images/uhren/27811998-455n98qxqmlxdmaqf6ptyk6i-Square390.jpg",
            oldPrice: "$20,115",
            currentPrice: "$15,115",
            productSold: "Đã bán 100",
            productOrigin: "USA",
            saleOffPercent: "20%"
        },
    ],
    render: function() {
        const htmls = this.products.map(product => {
            return `
                <div class="grid__column-2-4">
                    <a class="home-product-item" href="#">
                        <div class="home-product-item__img" style="background-image: url('${product.image}');"></div>
                        <h4 class="home-product-item__name">${product.name}</h4>
                        <div class="home-product-item__price">
                            <span class="home-product-item__price-old">${product.oldPrice}</span>
                            <span class="home-product-item__price-curr">${product.currentPrice}</span>
                        </div>
                        <div class="home-product-item__action">
                            <div class="home-product-item__rating">
                                <i class="home-product-item__star--gold fa-solid fa-star fa-sm"></i>
                                <i class="home-product-item__star--gold fa-solid fa-star fa-sm"></i>
                                <i class="home-product-item__star--gold fa-solid fa-star fa-sm"></i>
                                <i class="home-product-item__star--gold fa-solid fa-star fa-sm"></i>
                                <i class="fa-solid fa-star fa-sm"></i>
                            </div>
                            <span class="home-product-item__sold">${product.productSold}</span>
                        </div>
                        <div class="home-product-item__origin">
                            <span class="home-product-item__origin-name">${product.productOrigin}</span>
                        </div>
                        <div class="home-product-item__favourite">
                            <span class="">Yêu thích</span>
                        </div>
                        <div class="home-product-item__sale-off">
                            <span class="home-product-item__sale-off-percent">${product.saleOffPercent}</span>
                            <span class="home-product-item__sale-off-label">GIẢM</span>
                        </div>
                    </a>
                </div>
            `
        })
        $(".product-list").innerHTML = htmls.join('');
    },
    start: function() {
        this.render();
    }
}
app.start();




const categoryItems = $$(".category-item");
categoryItems.forEach(categoryItem => {
    categoryItem.onclick = function() {
        $(".category-item--active").classList.remove("category-item--active");
        this.classList.add("category-item--active");
    };
});

const selectInputItems = $$(".select-input__item");
selectInputItems.forEach(selectInputItem => {
    selectInputItem.onclick = function() {
        event.preventDefault();
        $(".select-input__item--active").classList.remove("select-input__item--active");
        this.classList.add("select-input__item--active");
        let linkText = $(".select-input__item--active").textContent;
        $(".select-input__label").textContent = linkText;
    };
});

// Button x
const closeBtn = $$(".auth-form__close-button");
for (var i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click', function(event) {
        event.preventDefault();
        var modal = this.closest('.modal');
        modal.classList.add("form--closed");
    });
}
// chuyển form login/register
var loginLink = $$('[id="login-link"]');
var registerLink = $$('[id="register-link"]');
var registerForm = document.getElementById("form-1");
var loginForm = document.getElementById("form-2");
for (var i = 0; i < loginLink.length; i++) {
    loginLink[i].addEventListener('click', function(event) {
        event.preventDefault();
        if (modal.classList.contains("form--closed")) {
            modal.classList.remove("form--closed");
            registerForm.classList.add("form--closed"); 
            loginForm.classList.remove("form--closed"); 
        }
        else {
            registerForm.classList.add("form--closed"); 
            loginForm.classList.remove("form--closed"); 
        }
    });
}
for (var i = 0; i < registerLink.length; i++) {
    registerLink[i].addEventListener('click', function(event) {
        event.preventDefault();
        if (modal.classList.contains("form--closed")) {
            modal.classList.remove("form--closed");
            loginForm.classList.add("form--closed"); 
            registerForm.classList.remove("form--closed"); 
        }
        else {
            loginForm.classList.add("form--closed"); 
            registerForm.classList.remove("form--closed"); 
        }
    });
}
// logout trên thẻ nav-user
var logout = $('.header__navbar-user-item-logout');
logout.onclick = function(event) {
    event.preventDefault();
    $('.header__navbar-user').classList.add("form--closed");
    console.log("asd");
}
// bắt lỗi định dạng input trong form login/register
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) { //while đến khi bên ngoài ko có thẻ cha
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    function validate(inputElement, rule) {
        var errMsg;
        var errElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errSelector);
        // lấy rules của selector
        var rules = selectorRules[rule.selector];
        // lặp qua từng rule & ktra
        for (var i = 0; i < rules.length; i++) {
            errMsg = rules[i](inputElement.value);
            if (errMsg) break;
        }
        if (errMsg) {
            errElement.innerText = errMsg;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
            console.log(getParent(inputElement, options.formGroupSelector));
        }
        else {
            errElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }      
        return !errMsg;  
    }
    var formElement = document.querySelector(options.form);
    if(formElement) {
        // ev submit nút đăng ký
        formElement.onsubmit = function (e) {
            var isFormValid = true;
            
            e.preventDefault();
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // submit vs js
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]'); //disabled trong th bài toán có ô ko bấm được 
                    var formValues = Array.from(enableInputs).reduce(function (values, input) { //convert nodelist -> arr
                        values[input.name] = input.value;   //th có ip ko bắt buộc nhập *
                        return values;    //return values = (values[input.name] = input.value)
                    }, {}); 
                    options.onSubmit(formValues);
                }
                else {  //submit vs hành vi mặc định
                    formElement.submit();
                }
            }
        }
        // lặp qua mỗi rule và xử lý: blur, input, ...
        options.rules.forEach(function (rule) {

            // Lưu rules cho mỗi ip
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                // blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }
                // khi nhập mất err
                inputElement.oninput = function() {
                    var errElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errSelector);
                    errElement.innerText = "";
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            }
        });
    }
}

Validator.isRequired = function(selector, msg) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : msg;
        }
    };
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Trường này phải là email";
        }
    };
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

// home page
var dot_not_selected = $('.dot--not-selected');
var dot_selected = $('.dot--selected');
dot_not_selected.onclick = function() {
    dot_selected.classList.add('dot--not-selected');
    dot_selected.classList.remove('dot--selected');
    dot_not_selected.classList.add('dot--selected');
    dot_not_selected.classList.remove('dot--not-selected');
    $('.popular-brands-list:first-child').classList.add('form--closed');
    $('.popular-brands-list:last-child').classList.remove('form--closed');
}
dot_selected.onclick = function() {
    dot_not_selected.classList.add('dot--not-selected');
    dot_not_selected.classList.remove('dot--selected');
    dot_selected.classList.add('dot--selected');
    dot_selected.classList.remove('dot--not-selected');
    $('.popular-brands-list:first-child').classList.remove('form--closed');
    $('.popular-brands-list:last-child').classList.add('form--closed');
}
// tab ui
const tabs = $$('.tab-item');
const panes = $$('.tab-pane');
console.log($$('.tab-pane:not(.form--closed)'))
tabs.forEach((tab, index) => {
    const pane = panes[index];
    tab.onclick = function(event) {
        event.preventDefault();
        $('.tab-pane:not(.form--closed)').classList.add('form--closed');
        pane.classList.remove('form--closed')
    }
})
// chuyển silde tab contact
const slides = document.querySelectorAll('.contact-adv-slider');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('contact-adv-slider-active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('contact-adv-slider-active');
}

setInterval(nextSlide, 5000); // Thay đổi slide sau mỗi 2 giây (2000ms)

//  header__cart-no-cart
// Lấy ra phần tử span có class là header__cart-notice
const cartNotice = document.querySelector('.header__cart-notice');

// Kiểm tra nếu nội dung của span là "0"
if (cartNotice.textContent === '0') {
    // Thêm class form--closed vào các phần tử cần ẩn
    const heading = document.querySelector('.header__cart-heading');
    const cartList = document.querySelector('.header__cart-list-item');
    const viewCartButton = document.querySelector('.header__cart-view-cart');
    
    heading.classList.add('form--closed');
    cartList.classList.add('form--closed');
    viewCartButton.classList.add('form--closed');
    
    // Loại bỏ class form--closed khỏi phần tử cần hiển thị
    const noCartImg = document.querySelector('.header__cart-no-cart-img');
    const noCartMsg = document.querySelector('.header__cart-list--no-cart-msg');
    const cartListContainer = document.querySelector('.header__cart-list');
    
    noCartImg.classList.remove('form--closed');
    noCartMsg.classList.remove('form--closed');
    cartListContainer.classList.add('header__cart-list--no-cart');
}


// 
const settings_tabs = document.querySelectorAll('.account__settings-tab');
const settings_panes = document.querySelectorAll('.account__settings-tab-pane');
settings_tabs.forEach((tab, index) => {
    const pane = settings_panes[index];
    tab.onclick = function (event) {
        event.preventDefault();
        document.querySelector('.account__settings-tab-pane:not(.form--closed)').classList.add('form--closed');
        pane.classList.remove('form--closed');
        document.querySelector('.account__settings-tab.account__settings-tab-active').classList.remove('account__settings-tab-active');
        this.classList.add('account__settings-tab-active')
    }
})


