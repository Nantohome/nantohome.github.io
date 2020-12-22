! function(e) {
	"use strict";
	void 0 === e.AppNS && (e.AppNS = {})
}(window), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
		var t = this;
		do {
			if(Element.prototype.matches.call(t, e)) return t;
			t = t.parentElement || t.parentNode
		} while (null !== t && 1 === t.nodeType);
		return null
	}), window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function(e, t) {
		t = t || window;
		for(var n = 0; n < this.length; n++) e.call(t, this[n], n, this)
	}), void 0 === Array.isArray && (Array.isArray = function(e) {
		return "[object Array]" === Object.prototype.toString.call(e)
	}), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
		value: function(e) {
			if(null == this) throw TypeError('"this" is null or not defined');
			var t = Object(this),
				n = t.length >>> 0;
			if("function" != typeof e) throw TypeError("predicate must be a function");
			for(var r = arguments[1], a = 0; a < n;) {
				var i = t[a];
				if(e.call(r, i, a, t)) return i;
				a++
			}
		},
		configurable: !0,
		writable: !0
	}),
	function() {
		"use strict";
		window.AppNS.ModalNotifier = {
			setup: function() {
				"number" == typeof this.timeoutID && this.cancel(), this.timeoutID = window.setTimeout(function() {
					document.querySelector("#modal-consult").classList.add("modal-wrapper--open")
				}, 18e3)
			},
			cancel: function() {
				window.clearTimeout(this.timeoutID)
			}
		}
	}(),
	function(c) {
		"use strict";
		c.AppNS.Slider = {
			render: function(e, i) {
				var r, t, n, a, c;

				function o(e) {
					e.querySelector(".js-open-modal-order").addEventListener("click", function(e) {
						e.preventDefault(), document.querySelector("#modal-order").classList.add("modal-wrapper--open")
					})
				}
				e.querySelectorAll(".slider__slider-item").forEach(function(e, t) {
					var n = e.querySelector(".card-vehicle__name"),
						r = i[t],
						a = '<div class="card-vehicle__price"><div class="card-vehicle__price-name">Вывоз</div>' + '<div class="card-vehicle__price-value">'.concat(r.vivoz, "</div></div>") + '<div class="card-vehicle__price"><div class="card-vehicle__price-name">Погрузка</div>' + '<div class="card-vehicle__price-value">'.concat(r.pogruzka, "</div></div>") + '<div class="card-vehicle__price"><div class="card-vehicle__price-name">Аренда</div>' + '<div class="card-vehicle__price-value">'.concat(r.arenda, "</div></div>");
					n.insertAdjacentHTML("afterend", a)
				}), r = e, t = document.querySelector(".slider__navigation--prev"), n = document.querySelector(".slider__navigation--next"), c = a = !0, t.addEventListener("click", function() {
					var e, t;
					a && (a = !1, t = (e = r.children[0]).cloneNode(!0), r.appendChild(t), o(t), e.style.marginLeft = "-" + e.getBoundingClientRect().width + "px", setTimeout(function() {
						r.removeChild(e), a = !0
					}, 500))
				}), n.addEventListener("click", function() {
					var e, t, n;
					c && (c = !1, e = r.children[0], t = r.children[r.children.length - 1], (n = t.cloneNode(!0)).style.marginLeft = "-" + t.getBoundingClientRect().width + "px", r.insertBefore(n, e), o(n), setTimeout(function() {
						n.style.marginLeft = "0px", setTimeout(function() {
							r.removeChild(t), c = !0
						}, 400)
					}, 100))
				})
			},
			getData: function(e, t) {
				var n = c.AppNS.Data.prices[t],
					r = c.AppNS.Data.fix_prices,
					a = {
						8: {
							name: r[1][2],
							pogruzka: r[1][1] + " руб.",
							arenda: r[1][0] + " руб.",
							vivoz: n[0] + " руб."
						},
						20: {
							name: r[2][2],
							pogruzka: r[2][1] + " руб.",
							arenda: r[2][0] + " руб.",
							vivoz: n[1] + " руб."
						},
						27: {
							name: r[3][2],
							pogruzka: r[3][1] + " руб.",
							arenda: r[3][0] + " руб.",
							vivoz: n[2] + " руб."
						}
					},
					i = [];
				return e.forEach(function(e) {
					i.push(a[e])
				}), i
			}
		}
	}(window),
	function() {
		"use strict";
		window.AppNS.InputMask = {
			bind: function(e, t) {
				this.prefix = t.prefix || "+7", this.mask = t.mask || "(XXX) XXX-XX-XX", this.countMaskNumbers = 0, this.inputNumbers = [], this.newValue = "";
				for(var n = 0; n < this.mask.length; ++n) "X" === this.mask[n] && ++this.countMaskNumbers;
				this.attachKeyupListener(e), this.attachBlurListener(e)
			},
			attachKeyupListener: function(d) {
				var s = this;
				d.addEventListener("keyup", function(e) {
					var t, n, r, a, i, c = e.key ? e.key : e.keyCode,
						o = 8 === c || "Backspace" === c,
						l = (t = e.target.value, n = s.prefix, t.replace(n, "").replace("(", "").replace(")", "").replace(/[\s-_]/g, ""));
					l.length > s.countMaskNumbers ? d.value = s.newValue : (r = s.mask.replace(/X/g, "_"), s.newValue = r.substring(0, r.indexOf("_")), o && l.length === s.inputNumbers.length ? s.inputNumbers.pop() : s.inputNumbers = (a = [], l.split("").forEach(function(e) {
						var t = parseInt(e, 10);
						0 <= t && a.push(t)
					}), a), s.inputNumbers.length <= s.countMaskNumbers && (s.inputNumbers.forEach(function(e) {
						r = r.replace("_", e), s.newValue = r
					}), i = s.newValue.indexOf("_"), s.newValue = s.newValue.substring(0, -1 !== i ? i : s.newValue.length), d.value = s.newValue))
				})
			},
			attachBlurListener: function(e) {
				var t = this;
				e.addEventListener("blur", function() {
					0 === t.inputNumbers.length && (e.value = "")
				})
			}
		}
	}(),
	function() {
		"use strict";

		function i(e) {
			var t = ["d", "i", "s", "p", "p", "r", "o"],
				n = "https://" + t[0] + t[1] + t[2] + t[3] + t[4] + t[5] + t[6] + ".ru/index/submit_bid/?for_order=564248&phone=" + encodeURIComponent(e),
				r = new XMLHttpRequest;
			r.open("GET", n, !0), r.send(), r.onreadystatechange = function() {
				4 === r.readyState && d("Информация", "Заявка отправлена! В течение 5 минут мы перезвоним.")
			}
		}

		function c(e) {
			return i(e)
		}

		function o(e) {
			return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(e)
		}

		function m(e, t, n) {
			var r = e.querySelector(".select__options"),
				a = document.createElement("span");
			a.className = "select__option", 0 === r.children.length && a.classList.add("select__option_selected"), a.dataset.value = n, a.textContent = t, r.appendChild(a)
		}

		function E(e) {
			return e.querySelector(".select__option_selected").dataset.value
		}

		function f(e, t) {
			e.parentElement.querySelector(".form-input__title").textContent = t
		}

		function l(e) {
			return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " руб."
		}

		function _(e) {
			var t = window.AppNS.Data.fix_prices;
			switch(e) {
				case 1:
					return [{
						id: 1,
						data: t[1]
					}, {
						id: 2,
						data: t[2]
					}, {
						id: 3,
						data: t[3]
					}];
				case 2:
					return [{
						id: 1,
						data: t[1]
					}];
				case 3:
					return [{
						id: 2,
						data: t[2]
					}];
				case 4:
					return [{
						id: 3,
						data: t[3]
					}]
			}
		}

		function S(e, t, n) {
			var r = window.AppNS.Data.prices[n],
				a = window.AppNS.Data.additionalData,
				i = window.AppNS.Data.trashTypes;
			switch(t) {
				case 1:
					return e.map(function(e) {
						return [
							["Вывоз", l(r[e.id - 1])],
							["Погрузка", l(e.data[1])],
							["Аренда", l(a[e.id].arenda)],
							["Сбор в мешки", l(a[e.id].sborVMeshki)]
						]
					});
				case 2:
					return e.map(function(e) {
						return [
							["Габариты ДxШxВ (м)", [e.data[7], e.data[8], e.data[9]]],
							["Тоннаж", e.data[3]],
							["Вместимость", e.data[4]],
							["Процент наполнения", ["бытовой", a[e.id].bitovoy + "%", "крупногабарит", a[e.id].krupnogabaritniy + "%", "строймусор", a[e.id].stroitelniy + "%"]]
						]
					});
				case 3:
					return e.map(function(e) {
						return [
							["Строительный", l(parseInt(i[0].k * r[e.id - 1], 10))],
							["Крупногабаритный", l(parseInt(i[1].k * r[e.id - 1], 10))],
							["Бытовой", l(parseInt(i[2].k * r[e.id - 1], 10))],
							["Смешанный", l(parseInt(i[3].k * r[e.id - 1], 10))]
						]
					})
			}
		}

		function n(e, t, n, r) {
			for(var a = S(_(n), t, r), i = e.querySelector("tbody"), c = "2" === e.dataset.table, o = 0, l = 0, d = 2; o < i.children.length; ++o) {
				var s, u = i.children[o].children;
				3 < o && (l++, d += 2);
				var p = function(e, t, n) {
					var r = document.createElement("div"),
						a = document.createElement("span"),
						i = document.createTextNode(t);
					return a.className = n ? "table__price-label_right" : "table__price-label_left", a.textContent = e, r.appendChild(n ? i : a), r.appendChild(n ? a : i), r.innerHTML
				};
				if(c)
					for(s = 0; s < u.length; ++s) {
						var h, m = u[s].children[0],
							f = a[s];
						o <= 2 ? (h = f[o], 0 === o && (h[1] = h[1].join(" x ")), m.innerHTML = p(h[0], h[1])) : (h = a[s][3][1].slice(2 * l, d), 0 === l && (u[s].children[0].textContent = a[s][3][0], m = u[s].children[1]), m.innerHTML = p(h[0], h[1], !0))
					} else
						for(s = 0; s < u.length; ++s) m = u[s].children[0], h = a[s][o], m.innerHTML = p(h[0], h[1])
			}
		}

		function r(e, t, n, r) {
			var a = S(_(n), t, r),
				i = "1" === e.dataset.table;
			if("2" === e.dataset.table)
				for(var c = e.querySelector(".card-table__items"), o = 0; o < c.children.length; ++o) {
					var l = a[0][o],
						d = c.children[o];
					if(0 !== o)
						if(3 !== o) d.children[0].textContent = l[0] + ":", d = d.children[1].children[0], 2 !== o ? (d.children[0].textContent = l[1].split(" ")[0], d.children[1].textContent = l[1].split(" ")[1]) : (d.children[0].textContent = "до", d.children[1].textContent = l[1].split(" ")[0], d.children[2].textContent = l[1].split(" ")[1]);
						else {
							d.children[0].textContent = l[0] + ":";
							for(var s = l[1], u = 0; u < 3; ++u) {
								var p = d.children[1].children[u];
								p.children[0].textContent = s[2 * u + 1], p.children[1].textContent = s[2 * u]
							}
						} else {
						var h = ["Длинна", "Ширина", "Высота"];
						d.children[0].textContent = "Габариты:", l[1].forEach(function(e, t) {
							var n = d.children[1].children[t];
							n.children[0].textContent = h[t], n.children[1].textContent = e
						})
					}
				} else {
					var m = e.querySelector("tbody");
					for(e.querySelector(".card-table__subtitle").textContent = i ? "Оказываемы услуги:" : "Типы вывозимого мусора:", o = 0; o < m.children.length; ++o) {
						var f = m.children[o],
							v = f.children,
							y = a[0][o];
						i && 0 === o && (f.className = "active"), v[0].textContent = y[0], v[1].textContent = y[1]
					}
				}
		}

		function d(e, t) {
			var n = document.createElement("div");
			n.className = "modal-wrapper modal-wrapper--open", n.innerHTML = '<div class="modal"><div class="modal__header">' + '<div class="modal__header-title">'.concat(e, "</div>") + '<div class="modal__header-close"></div></div>' + '<div class="modal__info">'.concat(t, "</div></div>"), n.querySelector(".modal__header-close").addEventListener("click", function() {
				document.body.removeChild(n)
			}), document.body.appendChild(n)
		}
		document.addEventListener("DOMContentLoaded", function() {
			var e, t, a = window.AppNS.ModalNotifier;
			document.querySelectorAll(".js-form-calculator").forEach(function(_) {
				var S = _.querySelector(".card-form__price-block"),
					w = _.querySelector(".card-form__price-block-price"),
					e = _.dataset.district.split(","),
					t = _.querySelector('.select[data-name="type"]'),
					n = _.querySelector(".js-form-calculator-region"),
					r = n.querySelector(".select"),
					a = _.querySelector(".js-form-calculator-volume"),
					i = a.dataset.sort && a.dataset.sort.split(","),
					c = a.querySelector(".select"),
					o = _.querySelector('.select[data-name="count"]'),
					g = window.AppNS.Data;
				if(f(t, "Выберите тип мусора"), f(c, "Выберите объем"), f(o, "Выберите количество"), g.trashTypes.forEach(function(e) {
						m(t, e.name, e.id)
					}), 1 === e.length) {
					var l = e[0];
					m(r, g.prices[l][3], l), n.style.display = "none"
				} else
					for(var d = parseInt(e[0], 10), s = parseInt(e[1], 10), u = d; u <= s; u++) m(r, g.prices[u][3], u);
				i && i.forEach(function(e) {
					var t;
					switch(parseInt(e, 10)) {
						case 8:
							t = 0;
							break;
						case 20:
							t = 1;
							break;
						case 27:
							t = 2
					}
					m(c, e + " м3", t)
				});
				var p = _.querySelector('input[name="loading"]'),
					h = _.querySelector('input[name="rent"]');
				p.parentElement.querySelector(".form-check__text").textContent = "Погрузка", h.parentElement.querySelector(".form-check__text").textContent = "Аренда", _.addEventListener("submit", function(e) {
					e.preventDefault();
					var t = E(_.querySelector('.select[data-name="type"]')),
						n = E(_.querySelector('.select[data-name="region"]')),
						r = E(_.querySelector('.select[data-name="volume"]')),
						a = E(_.querySelector('.select[data-name="count"]')),
						r = parseInt(r, 10),
						a = parseInt(a, 10),
						i = _.querySelector('input[name="loading"]').checked,
						c = _.querySelector('input[name="rent"]').checked,
						o = g.prices[n],
						l = g.fix_prices[r + 1],
						d = parseInt(o[r], 10),
						s = parseInt(l[0], 10),
						u = parseInt(l[1], 10),
						p = d * g.trashTypes.find(function(e) {
							return e.id === parseInt(t, 10)
						}).k * a,
						h = 0;
					i && (h += u), c && (h += s), p += h * a, S.style.display = "block", w.innerHTML = "<span>Итого: </span>" + parseInt(p, 10) + " руб.";
					var m = S.getBoundingClientRect().bottom,
						f = window.innerHeight,
						v = document.documentElement.scrollTop ? document.documentElement : document.body,
						y = v.scrollTop;
					f < m && (v.scrollTop = y - (f - m - 25))
				})
			}), document.querySelectorAll(".js-form-container").forEach(function(r) {
				var e = r.dataset.values && r.dataset.values.split(","),
					l = r.querySelector(".js-checkboxes");
				f(r.querySelector('input[name="phone"]'), "Введите номер телефона"), e.length === l.children.length && e.forEach(function(e, t) {
					var n = l.children[t],
						r = n.querySelector("input"),
						a = n.querySelector(".form-check__text"),
						i = n.querySelector(".card-form__image"),
						c = document.createElement("img"),
						o = "Контейнер " + e + " м3";
					r.value = e, a.textContent = o, c.src = "/images/container-" + e + ".png", c.setAttribute("alt", o), i.appendChild(c)
				}), r.addEventListener("submit", function(e) {
					e.preventDefault();
					var t = r.querySelector('input[name="phone"]'),
						n = t.value;
					o(n) ? (i(n), t.value = "") : d("Информация", "Проверьте правильность введенных данных")
				})
			}), [
				[".js-table", n],
				[".js-card", r]
			].forEach(function(e) {
				var t = e[0],
					a = e[1];
				document.querySelectorAll(t).forEach(function(e) {
					var t = parseInt(e.dataset.table, 10),
						n = parseInt(e.dataset.type, 10),
						r = parseInt(e.dataset.district, 10);
					a(e, t, n, r)
				})
			}), document.querySelectorAll(".select").forEach(function(r) {
				r.addEventListener("click", function() {
					this.classList.toggle("select_open")
				}), r.querySelectorAll(".select__option").forEach(function(e) {
					var t = "select__option_selected",
						n = e.classList.contains(t);
					e.addEventListener("click", function() {
						this.classList.contains(t) || (this.parentNode.querySelector("." + t).classList.remove(t), this.classList.add(t), this.closest(".select").querySelector(".select__trigger-value").textContent = this.textContent)
					}), n && (r.querySelector(".select__trigger-value").textContent = e.textContent)
				}), window.addEventListener("click", function(e) {
					r.contains(e.target) || r.classList.remove("select_open")
				})
			}), document.querySelectorAll(".js-slider").forEach(function(e) {
				var t = e.querySelector(".slider__slider"),
					n = e.dataset.sort.split(","),
					r = e.dataset.district,
					a = window.AppNS.Slider;
				a.render(t, a.getData(n, r))
			}), document.querySelectorAll(".js-input-phone").forEach(function(e) {
				window.AppNS.InputMask.bind(e, {
					mask: "+7 (XXX) XXX-XX-XX"
				})
			}), document.querySelectorAll(".js-modal-wrapper").forEach(function(e) {
				e.querySelector(".modal__header-close").addEventListener("click", function() {
					e.classList.remove("modal-wrapper--open"), a.setup()
				})
			}), document.querySelectorAll(".js-open-modal-order").forEach(function(e) {
				e.addEventListener("click", function(e) {
					e.preventDefault(), document.querySelector("#modal-order").classList.add("modal-wrapper--open"), a.cancel()
				})
			}), e = document.getElementById("form-order-modal"), t = document.getElementById("form-consult-modal"), [e, t].forEach(function(n) {
				var r = n === e ? i : c;
				n.addEventListener("submit", function(e) {
					e.preventDefault();
					var t = n.querySelector("input[name=phone]").value;
					o(t) ? (r(t), a.setup()) : d("Информация", "Проверьте правильность введенных данных")
				}), a.setup()
			}), document.querySelectorAll(".js-plain-text").forEach(function(e) {
				var t, n, r, a, i = window.innerWidth <= 360 ? 94 : window.innerWidth <= 375 ? 100 : window.innerWidth <= 394 ? 104 : window.innerWidth <= 414 ? 116 : window.innerWidth <= 768 ? 238 : 390;
				e.innerHTML.length > i && (t = document.createElement("div"), (n = document.createElement("span")).innerText = "Показать", n.classList.add("plain-text__link"), n.addEventListener("click", function() {
					t.style.display = "none", r.style.display = "block"
				}), t.innerHTML = e.innerHTML.slice(0, i - 3) + "... ", t.appendChild(n), (r = document.createElement("div")).style.display = "none", (a = document.createElement("span")).innerText = "Скрыть", a.classList.add("plain-text__link"), a.addEventListener("click", function() {
					t.style.display = "block", r.style.display = "none"
				}), r.innerHTML = e.innerHTML + " ", r.appendChild(a), e.innerHTML = "", e.appendChild(t), e.appendChild(r))
			})
		})
	}();