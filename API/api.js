const express = require('express')
const cours = require('cors')
const userDB = require('./user.js')
const { Telegraf } = require('telegraf')
const app = express()

const bot = new Telegraf("")
const adminID = ""

app.use(cours())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 3000

const hasCapital = (s) => !(s === s.toLowerCase());

function hasNumbers(t){
    var regex = /\d/g;
    return regex.test(t);
}

function hasSpace(s) {
    return s.indexOf(' ') >= 0;
  }

function checkUser(username, password,callback){
    let notpassed = 0
    userDB.findUser(username,(resp)=>{
        if (username){
            if (hasSpace(username)){
                callback([false,"There can't be spaces in username"])
            }
            else if(resp.length <= 0){
                if (!password){
                    callback([false,"Password is required"])
                }
                else if(password.length < 8){
                    notpassed ++
                    callback([false,"Password must be at least 8 symbols"])
                }
                
                else if(!hasCapital(password)){
                    notpassed ++
                    callback([false,"Capital are required in password"])
                }
    
                else if(!hasNumbers(password)){
                    callback([false,"Dijits are required in password"])
                }

                else if(hasSpace(password)){
                    callback([false,"There can't be spaces in password"])
                }
                
                else if (notpassed == 0){
                    callback([true,"Succesfull"])
                }
            } else {
                callback([false,"Username already exist"])
            }
        } else{
            callback([false,"Username is required"])
        }
        
    })
}

app.post('/', (req, res) => {
    checkUser(req.body.username, req.body.password,(resp)=>{
        if(resp){
            if(resp[0]){
                userDB.addUser(req.body.username, req.body.password)
                bot.telegram.sendMessage(adminID, `User ${req.body.username} has registered succesfully!`)
                res.status(200).json({
                    status:200,
                    message:resp[1]
                })
            } else {
                res.status(400).json({
                    status:400,
                    message:resp[1]
                })
            }
        }
    })
})

bot.command("allUsers", (ctx)=>{
    userDB.allUsers((resp)=>{
        let response = ""
        for(i of resp){
            response += `\n${i.name}`
        }
        ctx.reply(`Users list: ${response}`)
    })
})

app.listen(port,()=>{
    console.log("listening on port")
})
bot.launch()
