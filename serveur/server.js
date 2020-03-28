let express = require('express');
let mongoose = require('mongoose');
var unirest = require('unirest');
let bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/apinode', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

let StockSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number
});


let PersonneSchema = new mongoose.Schema({
  name : String,
  solde : Number,
  nbactionpossede : Number,
  nbactionvendu : Number,
  depense : Number,
  revenu : Number
});

// eslint-disable-next-line no-unused-vars
let Personne = mongoose.model('Personne',PersonneSchema);


/*
let p = new Personne({
  name: "Kebab",
  solde : 10000,
  nbactionpossede : 0,
  nbactionvendu : 0,
  depense : 0,
  revenu : 0
});
p.save();
*/
let Stock = mongoose.model('Stock', StockSchema);
/*let s = new Stock({
   name : "Apple",
   symbol: "AAPL",
   price: 100.10
});


s.save();
*/
let app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//retourne les assets
app.get("/alpaca", (request, response) => {
  let result = "[";
  var req = unirest('GET', 'https://paper-api.alpaca.markets/v2/assets/AAPL')
    .headers({
      'APCA-API-KEY-ID': 'PKILT53XG8Q2IU7VPJG9',
      'APCA-API-SECRET-KEY': 'IblZbwglL09mRQOHV1GNjY5xZe7cyOt9gDPJC9Eo'
    })
    .end(function (res) {
      if (res.error) throw new Error(res.error);
      result += JSON.stringify(res.body);

      var req = unirest('GET', 'https://paper-api.alpaca.markets/v2/assets/EWRE')
        .headers({
          'APCA-API-KEY-ID': 'PKILT53XG8Q2IU7VPJG9',
          'APCA-API-SECRET-KEY': 'IblZbwglL09mRQOHV1GNjY5xZe7cyOt9gDPJC9Eo'
        })
        .end(function (res) {
          if (res.error) throw new Error(res.error);
          result +=","+JSON.stringify(res.body);

          var req = unirest('GET', 'https://paper-api.alpaca.markets/v2/assets/CDOR')
            .headers({
              'APCA-API-KEY-ID': 'PKILT53XG8Q2IU7VPJG9',
              'APCA-API-SECRET-KEY': 'IblZbwglL09mRQOHV1GNjY5xZe7cyOt9gDPJC9Eo'
            })
            .end(function (res) {
              if (res.error) throw new Error(res.error);
              result +=","+JSON.stringify(res.body);


              var req = unirest('GET', 'https://paper-api.alpaca.markets/v2/assets/FLIR')
                .headers({
                  'APCA-API-KEY-ID': 'PKILT53XG8Q2IU7VPJG9',
                  'APCA-API-SECRET-KEY': 'IblZbwglL09mRQOHV1GNjY5xZe7cyOt9gDPJC9Eo'
                })
                .end(function (res) {
                  if (res.error) throw new Error(res.error);
                  result +=","+JSON.stringify(res.body);
                  result+="]";
                  response.json(JSON.parse(result));

                })
            })
        })

    })
});


//retournes le pricing d'un asset
app.get('/alpaca/:stockSymbol', (request, response, next) => {
  var req = unirest('GET', 'https://data.alpaca.markets/v1/bars/day?symbols='+request.params.stockSymbol)
    .headers({
      'APCA-API-KEY-ID': 'PKILT53XG8Q2IU7VPJG9',
      'APCA-API-SECRET-KEY': 'IblZbwglL09mRQOHV1GNjY5xZe7cyOt9gDPJC9Eo'
    })
    .end(function (res) {
      if (res.error) throw new Error(res.error);
      response.json(res.body);
    });
});

/*
app.get('/stocks', (request, response, next) => {
    Stock.find({}, (err, stocks) => {
        if (err) {
            return next(err);
        }

        response.json(stocks);
    })
});*/

//find all de la base en get ou create en post
app.route('/stocks')
  .get((request, response, next) => {
    Stock.find({}, (err, stocks) => {
      if (err) {
        return next(err);
      }

      response.json(stocks);
    })
  })
  .post((request, response, next) => {
    let stock = new Stock(request.body);
    stock.save((err) => {
      if (err) {
        return next(err)
      }
      response.json(stock);
    })
  });
// find my symbol dans la bdd
app.get('/stocks/:stockSymbol', (request, response, next) => {
  Stock.find({symbol: request.params.stockSymbol}, (err, stock) => {
    if (err) {
      return next(err);
    }

    response.json(stock);
  })
});

app.route('/personnes')
  .get((request, response, next) => {
    Personne.find({}, (err, stocks) => {
      if (err) {
        return next(err);
      }

      response.json(stocks);
    })
  })
  .post((request, response, next) => {
    let personne = new Personne(request.body);
    personne.save((err) => {
      if (err) {
        return next(err)
      }
      response.json(personne);
    })
  });

app.use(express.static("./public"));


app.listen(3000);
console.log("wesh alors !");

