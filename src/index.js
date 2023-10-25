
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const express = require('express');
const session = require('express-session');

const SortMiddleware = require('./app/middlewares/SortMiddleware');
const isAdminRouteMiddleware = require('./app/middlewares/isAdminRouteMiddleware');
const getCurrentUrlMiddleware = require('./app/middlewares/getCurrentUrlMiddleware');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// connect to db
db.connect();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));  // get data từ static file: img, css, ...
// 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// template engine
app.engine(
  'handlebars',
  engine({
      helpers: {
          sum: (a, b) => a + b,   // +1 index trong stored-courses.hbs
          subtraction: (a, b) => a - b,
          multiplication: (a, b) => a * b,
          mod: (a, b) => a % b,
          calculatePrice: (price, discount) => Math.ceil(price - (price * discount / 100)), 
          addDotsToNumber: (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          range: (start, end) => {
            const result = [];
            for (let i = start; i <= end; i++) {
                result.push(i);
            }
            return result;
          },
          rangeOfNumbers: (element, start, end) => {
            return element >= start && element <= end;
          },
          greaterThanOrEqualTo: (element1, element2) => {
            return element1 >= element2;
          },
          lessThanOrEqualTo: (element1, element2) => {
            return element1 <= element2;
          },
          areNotEqual: (element1, element2) => {
            return element1 !== element2;
          },
          areEqual: (element1, element2) => {
            return element1 === element2;
          },
          areNotUndefined: (element) => {
            return typeof element !== 'undefined';
          },
          getQuantityValueFromURL: (url) => {
            const currentURL = new URL(url);
            const urlParams = new URLSearchParams(currentURL.search);
            return urlParams.get('quantity');
          },
          sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';

            const icons = {
              default: 'oi oi-elevator',
              asc: 'oi oi-sort-ascending',
              desc: 'oi oi-sort-descending',
            };
            const types = {
              default: 'desc',
              asc: 'desc',
              desc: 'asc',
            };

            const icon = icons[sortType];
            const type = types[sortType];
            
            return `<a  href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`
          }
      }
  }),
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources\\views'));

// custom Middleware
app.use(SortMiddleware);
app.use(isAdminRouteMiddleware);
app.use(getCurrentUrlMiddleware);
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(methodOverride('_method'));
// Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})
