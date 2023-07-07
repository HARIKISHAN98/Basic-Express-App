const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
app.use(express.urlencoded());
app.use(express.static('Assets'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'EJS Files'));

var contactlist = [
    {Name : 'Hunny', phone:'96543566'},
    {Name : 'kapil', phone:'76543465'}
]

app.get('/',(req,res)=>{

    // Contact.find()

    // .then(contacts => {
    //     res.render('home',{
    //         title: 'Contact_list',
    //         contact_list : contacts 
    //     });
    // })

    // .catch(err => {      
    //     console.log('Error in fetching data from db');
    //     return ;
    // });

    Contact.find({})

    .then(contacts => {
        res.render('home',{
            title : "contactlist",
            contact_list : contacts
        });
    })

    .catch(err => {
        console.log('Error Occure in Fetching data from db');
        return ;
    });

});

    // res.render('home',{
    //     title : 'Contact List',
    //     contact_list : contactlist
    // });
// });

app.get('/delete-contact/',(req,res)=>{
    //get the id from query in url
    console.log(req.query);
    let id = req.query.id;

    Contact.findByIdAndDelete(id)

    .then(() => {
       return res.redirect('back');
    })

    .catch( (error) => {
        console.log('Error in deleting data from db: ',error);
        return ;
    });
});

app.post('/action',(req,res)=>{

    // contactlist.push(req.body);

    Contact.create({
        Name : req.body.Name,
        phone : req.body.phone
    })

    .then(newContact => {
        console.log('********', newContact)
        return res.redirect('back');
    })

    .catch(err => {
        console.log('error in creating a contac', err);
        return ;
    });
});

app.listen(port,(err)=>{
    if(err){
        console.log('Error Occured',err);
    }

    console.log('Express Server Run sucessfully on port :',port);
})


