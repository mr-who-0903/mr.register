const express = require('express');
const router = express.Router();
const {Data, User} =  require('../model/userSchema');  // "User" is our collection, mernstack is our database
const {authenticate, authToGet} = require('../middleware/authenticate');
const validator = require('validator');

// FOR SIGN IN PAGE
router.post('/login', async (req, res) =>{

    const { email, password } = req.body;
  
    if(!email || !password){
        return res.status(422).json({ error: "Please fill all the details !" });
    }

    try{

        const findUser = await User.findOne({email:email});  // check if user already regestered
        
        if(!findUser){
            return res.status(400).json({ error: "Invalid credentials !" });  // when user is not found in db
        }
        else{
            
            if(password !== findUser.password){
                return res.status(400).json({ error: "Invalid credentials !" });   // if wrong password is entered 
            }
            else{  
                let token = await findUser.generateAuthToken(); // generate token in userSchema.js file, save it to db.
                console.log(token);

                res.cookie('jwtoken', token, {                // store token into cookies
                    expires: new Date(Date.now() + 300000),   // cookie will expire after 300000 milisec = 5min after login
                    httpOnly:true                                  // then user have to again log in  
                });
                return res.status(200).json({ message: "Signed in successfully !" });
            }
        }
    }
    catch(err) {
        console.log(err);
    }
});

// FOR DASHBOARD
router.get('/dashboard', authenticate, (req, res) =>{               // here authenticate is a middleware which verifies token   
                                                                    // inside cookies with the token in the db else it will 
    return res.status(200).json({ message: "token verified !!" })   // redirect user to signin page.
});


// FOR GETTING ALL DATA
router.get('/getdata', authToGet, (req, res) =>{               // here authToGet is a middleware which verifies token   
                                                               // inside cookies with the token in the db
});

// FOR GETTING USER DATA
router.get('/getuser', authenticate, (req, res) =>{               // here authenticate is a middleware which verifies token   
                                                                  // inside cookies with the token in the db else it will 
    res.send(req.rootUser);                                       // redirect user to signin page.
});

// TO DELETE DATA
router.post('/delete', authenticate, async (req, res)=>{
    
    try{
        
        const deleted = await Data.deleteOne({_id: req.body._id});
        if(deleted){
            return res.status(200).json({ message: "Deleted successsfully !" });
        }
    }
    catch(e){
        console.log(e);
    }
}) 


// FOR SENDING FORM DATA TO DB
router.post('/sendData', authenticate, async (req, res) => {
   
    const { name, email, ph, address } = req.body;   // retrive all data from user

    if(!name || !email || !ph || !address){                  // check if all details are filled or not
        return res.status(422).json({ error: "Please fill all the details !" });
    }
    else if(name.includes(" ")){
        return res.status(422).json({error: "Spaces in username not allowed !"});
    }
    else if(!validator.isEmail(email)){
        return res.status(422).json({error: "Email invalid !"});
    }
    else if(ph < 1000000000 || ph > 9999999999){
        return res.status(422).json({error: "Phone number must contain 10 digits"});
    }

    try{
        const userExist = await Data.findOne({email:email});            // check if email already exists or not

        if(userExist){
            return res.status(422).json({ error: "Email already exists !" });
        }
        else{
        
            const data = new Data({ name, email, ph, address });   // store the document in collection
            await data.save();
            res.status(201).json({ message: "Data added successfully !" });
        }
    }
    catch(err){
        console.log(err);
    }
})

// FOR LOGOUT
router.get('/logout', (req, res) =>{
    console.log('logout page');
    res.clearCookie('jwtoken', { path:'/' });
    res.status(200).send('user logout');
})

module.exports = router;
