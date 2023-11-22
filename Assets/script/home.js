
document.addEventListener("DOMContentLoaded", function () {
    //Проверка формы "Заказать звонок"
    document.querySelector('.right__form-btn').addEventListener('click', (event) => {
        event.preventDefault();
        let blockname = document.querySelector(".right__form-input-full.name-full");
        let blockphone = document.querySelector(".right__form-input-full.phone-full");
        let name = blockname.querySelector('input').value;
        let phone = blockphone.querySelector('input').value;
        let errorname = blockname.querySelector('.input_error');
        let errorphone = blockphone.querySelector('.input_error');
        const phonePattern = /^(\+7|8)\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
        if (name == '') {
            errorname.innerHTML = `Обязательное поле!`;
            blockname.classList.add("with-error");
        }
        else {
            errorname.innerHTML = ``;
            blockname.classList.remove("with-error");
        }
        if (phone == '') {
            errorphone.innerHTML = `Обязательное поле!`;
            blockphone.classList.add("with-error");
        }
        else {
            if (phonePattern.test(phone)) {
                errorphone.innerHTML = ``;
                blockphone.classList.remove("with-error");
            }

            else {
                errorphone.innerHTML = `Не правильный номер!`;
                blockphone.classList.add("with-error");
            }
        }
    });

    document.querySelector('.client__right__form-btn').addEventListener('click', (event) => {
        event.preventDefault();
        let popup = document.querySelector(".message");
        let name = document.querySelector('.fio').value;
        let phone = document.querySelector('.telefon').value;
        const phonePattern = /^(\+7|8)\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
        let error = "";
        if (name == '') {
            error += "Не указано ФИО!";
            if (phone == "") {
                error += "<br>Не указан телефон!";
            }
            else {
                if (!phonePattern.test(phone)) {
                    error += "<br>Не правильно указан телефон!";
                }
            }
        }
        else {
            if (phone == "") {
                error += "Не указан телефон!";
            }
            else {
                if (!phonePattern.test(phone)) {
                    error += "Не правильно указан телефон!";
                }
            }
        }
        if (showPopap(error, popup)) {

        }
    });
    document.querySelector('.close-message').addEventListener('click', () => {
        let popup = document.querySelector(".message");
        popup.classList.add('message-hidden');
    });
});

function showPopap(error, popup) {
    document.querySelector('.message-text').innerHTML = "";
    popup.classList.remove("message-hidden");
    if (error != "") {
        document.querySelector('.message-text').innerHTML = error;
        popup.classList.remove('true-message');
        popup.classList.add('error-message');
    }
    else {
        document.querySelector('.message-text').innerHTML = "Форма успешно отправлена!";
        popup.classList.remove('error-message');
        popup.classList.add('true-message');
    }
}

// Маска телефона

// Функция определяющая каким образом будет выводиться маска
function replaceNumberForInput(value) {
    let val = ''
    const x = value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
    if (x[1] === '') {
        val = '';
    } else if (!x[2] && x[1] !== '') {
        if (x[1] === '8' || x[1] === '7') {
            val = '+7';
        } else {
            val = '+7' + x[1];
        }
    } else {
        val = !x[3] ? '+7' + x[2] : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    }

    return val
}
// Функция определяющая начало ввода
function replaceNumberForPaste(value) {
    const r = value.replace(/\D/g, '');
    let val = r;
    if (val.charAt(0) === '7') {
        val = '8' + val.slice(1);
    }
    return replaceNumberForInput(val);
}


const ele = document.querySelectorAll('input[type="tel"]');

// Метод, пропускающий по циклу все элементы input type="tel"
ele.forEach(el => {
    el.oninput = function (e) {
        if (!e.isTrusted) {
            return;
        }
        this.value = replaceNumberForInput(this.value);
    }

    el.onpaste = function () {
        setTimeout(() => {
            const pasteVal = el.value;
            this.value = replaceNumberForPaste(pasteVal);
        })
    }

    el.onchange = function () {
        setTimeout(() => {
            const pasteVal = el.value;
            this.value = replaceNumberForPaste(pasteVal);
        })
    }
});
