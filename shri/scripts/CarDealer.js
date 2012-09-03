if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
}


/**
 * Создает экземпляр Машины
 * @this {Car}
 * @param {string} manufacturer Производитель
 * @param {string} model Модель
 * @param {number} year Год производство
 */
function Car(manufacturer, model, year) {
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year || new Date().getFullYear();
	this.getInfo = function () {
		return this.toString();
	}
	this.getDetailedInfo = function () {
		return 'Производитель: '+this.manufacturer+'.  Модель: '+this.model+'. Год: '+this.year;
	}
}

Car.prototype.toString = function () {
	return this.manufacturer+' '+this.model+' '+this.year;
}

// + @TODO: если конструктор вызывается без указания текущего года, то подставлять текущий
// + @TODO: реализовать методы вывода информации о машине: 
// + console.log('Car: ' + bmw); // Car: BMW X5 2010
// + console.log(bmw.getInfo()); // BMW X5 2010
// + console.log(bmw.getDetailedInfo()); // Производитель: BMW. Модель: X5. Год: 2010

var bmw = new Car("BMW", "X5", 2010),
    audi = new Car("Audi", "Q5", 2012),
    toyota = new Car("Toyota", "Camry");


/**
 * Создает экземпляр Автосалона
 * @this {CarDealer}
 * @param {string} name Название автосалона
 */
function CarDealer(name) {
    this.name = name;
    this.cars = [];
	this.add = function () {
		for(var i=0;i<arguments.length;i++) {
			this.cars.push({
				car:arguments[i], 
				price:undefined,
				toString: function () {return this.car.toString()}
			});
		}
		return this;	
	}
	this.setPrice = function (car, price) {
		for(var i=0;i<this.cars.length;i++) {
			if (car == this.cars[i].car.getInfo()) {
				this.cars[i].price = price;
				break;
			}
		}
		return this;
	}
	this.list = function () {
		return this.cars.join(', ');
	}
	this.listByCountry = function (country) {
		return this.cars.filter(function(x) {return x.car.getCountry() == country;}).join(', ');
	}
	this.listPrice = function () {
		var list = '';
		for (var i=0;i<this.cars.length;i++) {
			list+=', '+this.cars[i].toString()+' : '+getRubPrice(this.cars[i].price)+' руб.';
		}
		return list.substr(2);
	}
}

var yandex = new CarDealer('Яндекс.Авто');

// + @TODO: реализовать метод добавления машин в автосалон. Предусмотреть возможность добавления одной машины, нескольких машин.
yandex
    .add(toyota)
    .add(bmw, audi);

// + @TODO: реализовать метод установки цены на машину
/**
 * Установить цену на машину
 * @param {string} car идентификатор машины
 * @param {string} price стоимость
 */
// + идентификатор машины составляется следующим образом "производитель модель год"
// + стоимость машины может быть задана в двух валютах: йена и евро.
yandex
    .setPrice('BMW X5 2010', '€2000')
    .setPrice('Audi Q5 2012', '€3000')
    .setPrice('Toyota Camry 2012', '¥3000');


// + @TODO: реализовать вывод списка автомобилей в продаже, с фильтрацией по стране производителю, используя метод getCountry:
Car.prototype.getCountry = function () {
    switch (this.manufacturer.toLowerCase()) {
    case 'bmw':
	case 'audi':
    	return 'Germany';
	case 'toyota':
        return 'Japan';
	}
}

yandex.list(); // + BMW X5 2010, Audi Q5 2012, Toyota Camry 2012
yandex.listByCountry('Germany'); // + BMW X5 2010, Audi Q5 2012

// @TODO: + бонус! выводить список машин с ценой в рублях.

var Rate = undefined;

function getRubPrice (price) {
	var currency = price[0];
	var price = price.substr(1);
	Rate = Rate || getRate();
	return price*Rate[currency];
}

function getRate () {
// @TODO: загружать с сервера курс валют в любом удобном формате
	return {'€':40.725, '¥':0.415};
}
