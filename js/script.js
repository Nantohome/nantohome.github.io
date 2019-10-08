(function () {
var password = prompt('Введите пароль');
if (new RegExp('Xena'.replace(/(\.|\+|\[|\]|\(|\)|\{|\}|\*|\?|\$|\^|\\|\/|\.)/g, '\\$1')).test(password)); else top.location.href = '/hell';
})();