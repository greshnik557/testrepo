/*Создайте модуль, который возвращает функции нахождения аннуитетного
ипотечного платежа mortgage() и overpayment() - находящую размер переплаты.*/

let mortgage = (s, p, n) => {
    p /= 1200;
    n *= 12;
    let a = s * p / (1 - (p + 1) ** (-n));
    return a;
};

let overpayment = (s, p, n) => {
    p /= 1200;
    n *= 12;
    let o = (s * p / (1 - (p + 1) ** (-n))) * n - s;
    return o;
};

module.exports.mortgage = mortgage;
module.exports.overpayment = overpayment;