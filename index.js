let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();
let porta = 3000;

app.use(cookieParser());
app.set('view engine', 'ejs');

//-------------------Routes-------------------
app.get('/', (req, res)=>{
   res.render('menu');
});

app.get('/criar', (req, res)=>{
    res.cookie("usuario1", usuario);
    res.cookie("usuario2", "fulano@gmail.com", {maxAge: 300000});
    res.send(`cookie salvo <hr><a href="/">Voltar</a>`);
});

app.get('/ler', (req, res)=>{
    const todos_cookies = JSON.stringify(req.cookies);
    const email=req.cookies.usuario2;
    let mensagem = "Não há cookies ativos";
    if (todos_cookies !== "{}"){
        mensagem = `email: ${email} <br>${todos_cookies}`;
    }
    res.send(`${mensagem} <hr> <a href="/">Voltar</a>`);
})

app.get('/deletar', (req, res)=>{
    res.clearCookie('usuario1');
    res.clearCookie('usuario2');
    res.send(`Cookie apagados <hr><a href="/">Voltar</a>`)
})

let usuario = {
    nome: "Ana",
    idade: "25"
}
app.listen(porta, () => {
    console.log(`http://localhost:${porta}`);
});