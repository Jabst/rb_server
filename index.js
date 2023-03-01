var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const GeneratePdf = require('./pdf_generator.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/send', function (req, res) {
    console.log(req.body);

    let pdf = new GeneratePdf(req.body.toy, req.body.food, req.body.name, req.body.voicemail, req.body.place, req.body.total);

    pdf.addImage(7, 3, 26, 9)
    pdf.setFontWeight('small');
    pdf.addText(`TEL. 607-1437-1946`, 8, 17);
    pdf.addRectangle(3, 19, 34, 0.1);
    pdf.setFontWeight('normal');
    pdf.addText(`FOOD`, 4, 23);
    pdf.addText(`${pdf.food}`, 28, 23);
    pdf.addText(`PLACE`, 4, 28);
    pdf.addText(`${pdf.place}`, 28, 28);
    pdf.addText(`TOY`, 4, 33);
    pdf.addText(`${pdf.toy}`, 28, 33);
    pdf.addText(`VOICEMAIL`, 4, 38);
    pdf.addText(`${pdf.voicemail}`, 28, 38);
    pdf.addRectangle(3, 40, 34, 0.1);
    pdf.setFontWeight('total');
    pdf.addText(`TOTAL`, 4, 44);
    pdf.addText(`${pdf.total}`, 26, 44);
    pdf.addRectangle(3, 46, 34, 0.1);
    pdf.setFontWeight('small');
    pdf.addText(`To.`, 4, 49);
    pdf.setFontWeight('big');
    pdf.addText(`${pdf.name}`, 10, 53);
    pdf.save();

    res.status(201);
})

app.get('/', function(req, res) {
    res.send("hello clown");

    res.status(200);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Server running in http://%s:%s", host, port)
});
