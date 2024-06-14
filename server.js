const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.listen(port, error => {
    if(error) throw error;
    console.log('Server running on port '+ port);
});
app.post('/bmicalc', (req, res) =>{
    let weight = parseFloat(req.body.weight);
    let InchesCentimeters = parseFloat(req.body.height);
    let height = 0;

    if(req.body.unitW == 'Ibs'){
        weight = parseFloat(weight * 0.453592); 
    }
    if(req.body.unitH == 'in'){
        InchesCentimeters = InchesCentimeters * 0.0254;
        height = InchesCentimeters * InchesCentimeters;
    }
    if(req.body.unitH == 'cm'){
        InchesCentimeters = InchesCentimeters * 0.01;
        height = InchesCentimeters * InchesCentimeters;
    }
    if(req.body.unitH == 'ft'){
        let Foot = req.body.height;
        let remainder = req.body.heightRemainder;
        let others = parseFloat(remainder / 12);
        let hold = Foot + others;
        height = hold * 0.3048;
        height = height * height;
    }
    const result = parseFloat(weight / height);
    
    res.status(200).send({result: result.toFixed(1)});
});

