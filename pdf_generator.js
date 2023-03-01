const { jsPDF } = require("jspdf"); // will automatically load the node version
var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

let cenas = base64_encode("./assets/logo.png");

class GeneratePdf {
    constructor(toy, food, name, voicemail, place, total) {
        this.toy = toy;
        this.food = food;
        this.name = name;
        this.voicemail = voicemail;
        this.place = place;
        this.total = total;

        this.doc = new jsPDF({
            unit: "mm",
            format: [57,40]
        })

        this.doc.setFontSize(6);
    }

    addText = (text, x, y) => {
        this.doc.text(text, x, y)
    }

    addImage = (x, y, w, h) => {
        this.doc.addImage(cenas, "PNG", x, y, w, h, "logo", "NONE", 0);
    }

    addRectangle = (x,y,w,h) => {
        this.doc.rect(x,y,w,h,"F");
    }

    setFontWeight = (style) => {

        switch (style) {
            case "total":
                this.doc.setFontSize(10);
                this.doc.setFont('courier', '', 'bold');
                break;
            case "normal":
                this.doc.setFontSize(8);
                this.doc.setFont('courier', '', 'normal');
                break;
            case "big":
                this.doc.setFontSize(16);
                this.doc.setFont('courier', '', 'bold');
                break;
            case "small":
                this.doc.setFontSize(6);
                this.doc.setFont('courier', '', 'normal');
        }
        
    }

    save() {
        this.doc.save("./.output/" + Date.now().toString() +".pdf");    
    }
}

module.exports = GeneratePdf