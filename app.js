const { Socket } = require('engine.io');
const express = require('express');
const hbs = require('hbs');
const {products, category} = require('./db');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/vies/partials');

app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res){

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const categoryIndex = product.category;
        const productCategory = category[categoryIndex];
        product.produtCategory = productCategory;
      }

    res.render('index', {
        title: 'Product Catalog',
        products,
        category,
    });
});

app.get('/decrement/:id', (req, res) => {
    const {id} = req.params;
    console.log("id: ", id)
    const product = products.find((p) => p.id == id);
    product.stock -= 1
    io.emit('stock-update', {id: id, stock: product.stock});
    res.redirect('/')
})

app.get('/stock/:id/:newstock',(req, res) => {
    const {id, newstock} = req.params;
    const product = products.find((p) => p.id == id);
    if(product) {
        product.stock = parseInt(newstock);
        io.emit('stock-update', {id: id, stock: product.stock});
        res.redirect('/')
    }else{
        res.status(404).send('Product not found')
    }
    
});




const PORT = 8080;

server.listen(PORT, () => {
    console.log('Listening on port 8080')
})

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('buy_product', (id) => {
        const productIndex = products.findIndex(p => p.id === parseInt(id));
      
        if (productIndex > -1 && products[productIndex].stock > 0) {
          products[productIndex].stock--;
          const { id, stock } = products[productIndex];
          io.emit('update_stock', { id, stock });
        }
      });
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});