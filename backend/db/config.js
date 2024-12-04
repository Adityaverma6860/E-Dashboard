 // Connect to the MongoDB database
 const mongoose = require('mongoose');
 mongoose.connect("mongodb://127.0.0.1:27017/merndb").    
        then(()=>{
            console.log("Connected  successfully");
         }).catch((error)=> {
         console.log("error",error);
         }); 
        
     