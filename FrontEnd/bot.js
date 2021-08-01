/*
----------------------------------------------------------------------------
 Code Author:   Md Amirul Asyraf Bin Abdul Razak
 Student Number: P2043467 
 Class: DIT/FT/2B/22

 Assignment: ADES CA3 

 Project Description:
 Telegram bot design and developed to aid PCs manage their Platoons. 
---------------------------------------------------------------------------
 */



// Initailization

//import libraries
require('dotenv').config();
const telegraf = require('telegraf'); 
const axios = require('axios');

//initalize bot
const bot = new telegraf("1811102656:AAFOUUYupaHGt0cSMjmr4zcVof_Q7MjlWiE");


//messages (instructions)
const startMessage = 
`
----------- Welcome to Unit Manager Bot ----------- 
 This bot has 3 functions.
- Allows men to send their daily status
- Allows men to record any voluntary activities 
- Message Broadcasting (You will receive an activation message)

/help   - Use help command for Bot Commands list

IMPORTANT!!!
For Platoon commanders please use the Platoon Commander chat room when accessing Platoon Management Toolkit

`;

const helpMessagePC = 
`
----------- PC Bot Commands List ----------- 
 /start         - starts the bot
 /helpPC          - access this command menu
 /menStatus        - Launch Daily Status Toolkit
 /activityRecords      - Launch Activity Recorder Toolkit
 /activation    - Launch Unit Activation Toolkit
`

const helpMessageMen = 
`
----------- Bot Commands List ----------- 
 /start     - starts the bot
 /help      - access this command menu
 /status    - Launch Daily Status Toolkit
 /recorder  - Launch Activity Recorder Toolkit
`;

const statusMessage = `
----------- Submitting your Daily status ----------- 
 Base - On Duty       - In base/ON Duty
 Base - Off Duty      - In base/OFF Duty
 COM Leave            - On compassionate leave
 MED Leave            - MO Issued Medical Leave
 RSI                  - Reporting Sick Inside Camp
 RSO                  - Reporting Sick Outside Camp
    
`;

const statusConfirmationMessage =
`
--------- To confirm your daily status --------
1) Select your section 
2) Key in you name
`;

const statusUpdatedMessage = 
`
--------- Your Status has been sent --------
- Use /start to end the process and return to main screen
 
`;



const activityRecorderFunction = 
`
--------- To Update the Activity Record --------
- All recorded activites are subjected to approval by PCs
- Key in you update following this format

UPDATE FORMAT:
YOUR NAME from YOUR SECTION did VOLUNTARY ACTIVITY on - DD/MM/YY.

`;

const activityUpdatedMessage = 
`
--------- Your Avtivity has been recorded --------
- Use /start to end the process and return to main screen
 
`;

const broadcastMessage = `
----------- Broadcasting Instructions ----------- 
1) Select the unit involved
2) Select Activated or Stand Down Option

`;


const activationMessage = `
---- Activation Instructions ----
Proceed with ACTIVATION 
Proceed with Stand Down 
`;


// User Orientation commands
bot.start((ctx) =>{
    //logger(ctx);
    ctx.reply(startMessage);
})

bot.help((ctx) =>{
    bot.telegram.sendMessage(-469659080, helpMessageMen);
});

bot.command("helpPC", (ctx) => {
    bot.telegram.sendMessage(-576897364, helpMessagePC);
})

// bot.command('restart', (ctx) => {
//     console.log("User Restart Bot");
//     // Process.exit(1);
//      //bot.startPolling();
//     // process.kill();
//     //bot.launch()
//     process.exit(1);

// });

//---------------------------
//         Dev Site
//---------------------------

// bot.on("text", (ctx) => {
//     logger(ctx);
// })

// function logger(ctx){
//     console.log("Someone used the bot");
//     console.log(ctx.from);
// };


// bot.use((ctx, next) => {
//     if(ctx.updateSubTypes[0]== "text"){
//         bot.telegram.sendMessage(-576897364, ctx.from.username + " said: " + ctx.message.text);
//     } else {
//         bot.telegram.sendMessage(-576897364,ctx.from.username + " sent " + ctx.updateSubTypes[0]);
//     }
//     next();
// })



// function multipleNameEntry(message = "") {
//     this.name = "Multiple Name Entry";
//     this.message = "You have keyed in your name multiple times";
// }
// multipleNameEntry.prototype = Error.prototype;


//------------------------------------------
//          Function 1 Daily status
//------------------------------------------

bot.command("status",(ctx)  =>{
    
    bot.telegram.sendChatAction(ctx.chat.id,"typing")

    bot.telegram.sendMessage(ctx.chat.id, statusMessage,
    {
        reply_markup:{
            keyboard:
            [
                [
                    // Base on duty button
                    {text:'Base - ON Duty '}
                ],
                [
                    // Base off duty button
                    {text:'Base - OFF Duty'}
                ],
                [   
                    // Compassionate Leave Button
                    {text:'COM Leave'},
                    // Medical Leave Button
                    {text:'MED Leave'}
                ],
                [
                    // RSI Button
                    {text:'RSI', callback_data: 'RSI'},
                    // RSO Button
                    {text:'RSO', callback_data: 'RSO'}
                ]
            ]
        },
        resize_keyboard : true,
        one_time_keyboard : true
    })

})


    // On base options
    //-------------------------   ON DUTY   ----------------------------
    // setTimeout(() => {
        
    // })
    bot.hears('Base - ON Duty',ctx => {
        //ctx.answerCbQuery('ON Duty Status Updated');
        bot.telegram.sendMessage(ctx.chat.id, statusConfirmationMessage, {
            reply_markup:{
                keyboard:
                [
                    [
                         // Section Se;ection
                        {text:'Section 1', callback_data: 'at base on duty - section 1'},
                        {text:'Section 2', callback_data: 'at base on duty - section 2'},
                        {text:'Section 3', callback_data: 'at base on duty - section 3'},
                    ],
                     
                ],
                resize_keyboard : true, 
                one_time_keyboard : true

            }
        })
   

        bot.hears('Section 1', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                      bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 1 is ON duty in Base.");    
            })
            bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })

        bot.hears('Section 2', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 2 is ON duty in Base.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
                
        })
        bot.hears('Section 3', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, ) => {
                if(ctx.updateSubTypes[0]== "text") 
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 3 is ON duty in Base.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })
        
     })

//ctx.answerCbQuery('ON Duty Status Updated');
    //-------------------------   OFF DUTY   ----------------------------
    bot.hears('Base - OFF Duty',ctx => {
        //ctx.answerCbQuery('ON Duty Status Updated');
        bot.telegram.sendMessage(ctx.chat.id, statusConfirmationMessage, {
            reply_markup:{
                keyboard:
                [
                    [
                         // Section Se;ection
                        {text:'Section 1', callback_data: 'at base OFF duty - section 1'},
                        {text:'Section 2', callback_data: 'at base OFF duty - section 2'},
                        {text:'Section 3', callback_data: 'at base OFF duty - section 3'},
                    ],
                     
                ],
                resize_keyboard : true, 
                one_time_keyboard : true

            }
        })
   

        bot.hears('Section 1', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                      bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 1 is OFF duty in Base.");    
            })
            bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })

        bot.hears('Section 2', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 2 is OFF duty in Base.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
                
        })
        bot.hears('Section 3', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, ) => {
                if(ctx.updateSubTypes[0]== "text") 
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 3 is OFF duty in Base.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })
        
     })


    //Leave Options

    //-------------------------   COM LEAVE   ----------------------------
    bot.hears('COM Leave',ctx => {
        //ctx.answerCbQuery('ON Duty Status Updated');
        bot.telegram.sendMessage(ctx.chat.id, statusConfirmationMessage, {
            reply_markup:{
                keyboard:
                [
                    [
                         // Section Se;ection
                        {text:'Section 1', callback_data: 'Compassionate Leave- section 1'},
                        {text:'Section 2', callback_data: 'Comapassionate Leave- section 2'},
                        {text:'Section 3', callback_data: 'Comapassionate Leave - section 3'},
                    ],
                     
                ],
                resize_keyboard : true, 
                one_time_keyboard : true

            }
        })
   

        bot.hears('Section 1', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                      bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 1 is on Compassionate Leave.");    
            })
            bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })

        bot.hears('Section 2', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 2 is on Compassionate Leave.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
                
        })
        bot.hears('Section 3', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, ) => {
                if(ctx.updateSubTypes[0]== "text") 
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 2 is on Compassionate Leave.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })
        
     })

    //-------------------------   MED Leave   ----------------------------
    bot.hears('MED Leave',ctx => {
        //ctx.answerCbQuery('ON Duty Status Updated');
        bot.telegram.sendMessage(ctx.chat.id, statusConfirmationMessage, {
            reply_markup:{
                keyboard:
                [
                    [
                         // Section Se;ection
                        {text:'Section 1', callback_data: 'Medical Leave - section 1'},
                        {text:'Section 2', callback_data: 'Medical Leave - section 2'},
                        {text:'Section 3', callback_data: 'Medical Leave - section 3'},
                    ],
                     
                ],
                resize_keyboard : true, 
                one_time_keyboard : true

            }
        })
   

        bot.hears('Section 1', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                      bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 1 is on Medical Leave.");    
            })
            bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })

        bot.hears('Section 2', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 2 is on Medical Leave.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
                
        })
        bot.hears('Section 3', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, ) => {
                if(ctx.updateSubTypes[0]== "text") 
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 2 is on Medical Leave.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })
        
     })


    //Reporting Sick Options
    //-------------------------   RSI   ----------------------------
    bot.hears('RSI',ctx => {
        //ctx.answerCbQuery('ON Duty Status Updated');
        bot.telegram.sendMessage(ctx.chat.id, statusConfirmationMessage, {
            reply_markup:{
                keyboard:
                [
                    [
                         // Section Se;ection
                        {text:'Section 1', callback_data: 'RSI - section 1'},
                        {text:'Section 2', callback_data: 'RSI - section 2'},
                        {text:'Section 3', callback_data: 'RSI - section 3'},
                    ],
                     
                ],
                resize_keyboard : true, 
                one_time_keyboard : true

            }
        })
   

        bot.hears('Section 1', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                      bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 1 is Reporting Sick INSIDE Camp.");    
            })
            bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })

        bot.hears('Section 2', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 2 is Reporting Sick INSIDE Camp.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
                
        })
        bot.hears('Section 3', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, ) => {
                if(ctx.updateSubTypes[0]== "text") 
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 3 is Reporting Sick INSIDE Camp.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })
        
     })


    //-------------------------   RSO   ----------------------------


    bot.hears('RS0',ctx => {
        //ctx.answerCbQuery('ON Duty Status Updated');
        bot.telegram.sendMessage(ctx.chat.id, statusConfirmationMessage, {
            reply_markup:{
                keyboard:
                [
                    [
                         // Section Se;ection
                        {text:'Section 1', callback_data: 'at base on duty - section 1'},
                        {text:'Section 2', callback_data: 'at base on duty - section 2'},
                        {text:'Section 3', callback_data: 'at base on duty - section 3'},
                    ],
                     
                ],
                resize_keyboard : true, 
                one_time_keyboard : true

            }
        })
   

        bot.hears('Section 1', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                      bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 1 is Reporting Sick OUTSIDE Camp.");    
            })
            bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })

        bot.hears('Section 2', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, next) => {
                if(ctx.updateSubTypes[0]== "text")
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " ffrom Section 1 is Reporting Sick OUTSIDE Camp.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
                
        })
        bot.hears('Section 3', ctx => {
            ctx.deleteMessage(ctx.chat.id);
            bot.telegram.sendMessage(-469659080, "Key in your name");
            bot.use((ctx, ) => {
                if(ctx.updateSubTypes[0]== "text") 
                    bot.telegram.sendMessage(-576897364, ctx.message.text + " from Section 1 is Reporting Sick OUTSIDE Camp.");
                })
                bot.telegram.sendMessage(-469659080, statusUpdatedMessage);
        })
        
     })
    

    
//PC GET CMD
bot.command("menStatus", (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id,"upload_document");

    // Insert Axios


})


//------------------------------------------
//        Function 2 Activity recording

//------------------------------------------

bot.command("recorder", (ctx) =>{
    bot.telegram.sendChatAction(ctx.chat.id,"typing");
    bot.telegram.sendMessage(-469659080, "Recorder function activated");


    bot.telegram.sendMessage(-469659080, activityRecorderFunction );
    bot.use((ctx, next) => {
        if(ctx.updateSubTypes[0]== "text"){

            const requestBody = ctx.message.text;
            console.log(requestBody +"  -------Request body test");

            axios.post('URL', requestBody)
                .then((response) => {
                    bot.telegram.sendMessage(-576897364, "Activity record has been updated");
                    bot.telegram.sendMessage(-469659080, activityUpdatedMessage );
                })
                .catch((error) => {
                    console.log(error);
                    bot.telegram.sendMessage(-469659080,"Update Failed: Please contact your PC");
                })
        }
        
        
        next();
        })
    
})

bot.command("activityRecords", (ctx) => {
    bot.telegram.sendMessage(-576897364, "Loading Men's Activity");

    axios.get('URL')
        .then((response) => {
            const satutsRecord = response.data;
             console.log('--------response data--------');
             console.log(response.data.length);
             console.log('-----------------------------');
        })

        .catch((error) =>{
            console.log(error);
            bot.telegram.sendMessage(-576897364,"Load Failed: Please contact your PC");
        })
  
})

bot.command("clearActivityRecord",(ctx) => {
    bot.telegram.sendMessage(-576897364, "Deleting Men's Acitvity Records");

    axios.delete('URL')
    .then((response) => {
         console.log('--------response data--------');
         console.log(response.data.length);
         console.log('-----------------------------');
         bot.telegram.sendMessage(-576897364,"Men's Records have been deleted.");
    })

    .catch((error) =>{
        console.log(error);
        bot.telegram.sendMessage(-576897364,"Delete Failed: Please contact your PC");

    })


})


//------------------------------------------
//        Function 3 Message Broadcasting
//------------------------------------------

bot.command("activation", (ctx) =>{
    bot.telegram.sendChatAction(ctx.chat.id,"typing")
    
    bot.telegram.sendMessage(ctx.chat.id, broadcastMessage,
        {
            reply_markup:{
                inline_keyboard:
                [
                    [
                        //Section 1 button
                        {text:'Section 1', callback_data: 'Section 1'}
                    ],
                    [
                        //Section 2 Button
                        {text:'Section 2', callback_data: 'Section 2'}
                    ],
                    [
                        //Section 3 Button
                        {text:'Section 3', callback_data: 'Section 3'}
                    ],
                    [
                        // Platoon button
                        {text:'Entire Platoon', callback_data: 'Platoon'}
                    ]

                ]
            }
        })
    
    
        // 1st Section
        bot.action('Section 1',ctx => {
            ctx.answerCbQuery('Section 1 Selected');
            bot.telegram.sendMessage(-469659080, "SECTION 1 STAND BY: Prepare for potential activation");

            bot.telegram.sendMessage(ctx.chat.id, activationMessage, {
                reply_markup:{
                    inline_keyboard:
                    [
                        [
                             //Activation 
                            {text:'ACTIVATED', callback_data: 'Section 1 Activated'},
                            {text:'Stand Down', callback_data: 'Section 1 Stand Down'}
                        ],
                         
                    ]
                }
            })

            bot.action('Section 1 Activated', (ctx) =>{
                ctx.answerCbQuery('Section 1 Activated');
                bot. telegram.sendMessage(-469659080, "SECTION 1 ACTIVATED: Fall in at Coy Line");
            });

            bot.action('Section 1 Stand Down', (ctx) =>{
                ctx.answerCbQuery('Section 1 Stood down');
                bot. telegram.sendMessage(-469659080, "SECTION 1 Stand down");
            });

        });





        // 2nd Section
        bot.action('Section 2',ctx => {
            ctx.answerCbQuery('Section 2 Selected');
            bot. telegram.sendMessage(-469659080, "SECTION 2 STAND BY: Prepare for potential activation");

            bot.telegram.sendMessage(ctx.chat.id, activationMessage, {
                reply_markup:{
                    inline_keyboard:
                    [
                        [
                             //Activation
                            {text:'ACTIVATED', callback_data: 'Section 2 Activated'},
                            {text:'Stand Down', callback_data: 'Section 2 Stand Down'}
                        ],
                         
                    ]
                }
            })

            bot.action('Section 2 Activated', (ctx) =>{
                ctx.answerCbQuery('Section 2 Activated');
                bot. telegram.sendMessage(-469659080, "SECTION 2 ACTIVATED: Fall in at Coy Line");
            });

            bot.action('Section 1 Stand Down', (ctx) =>{
                ctx.answerCbQuery('Section 1 Stood down');
                bot. telegram.sendMessage(-469659080, "SECTION 2 Stand down");
            });

        });

        // 3rd Section
        bot.action('Section 3',ctx => {
            ctx.answerCbQuery('Section 3 Selected');
            bot. telegram.sendMessage(-469659080, "SECTION 3 STAND BY: Prepare for potential activation");

            bot.telegram.sendMessage(ctx.chat.id, activationMessage, {
                reply_markup:{
                    inline_keyboard:
                    [
                        [
                             //Activation
                            {text:'ACTIVATED', callback_data: 'Section 3 Activated'},
                            {text:'Stand Down', callback_data: 'Section 3 Stand Down'}
                        ],
                         
                    ]
                }
            })

            bot.action('Section 3 Activated', (ctx) =>{
                ctx.answerCbQuery('Section 3 Activated');
                bot. telegram.sendMessage(-469659080, "SECTION 3 ACTIVATED: Fall in at Coy Line");
            });

            bot.action('Section 3 Stand Down', (ctx) =>{
                ctx.answerCbQuery('Section 1 Stood down');
                bot. telegram.sendMessage(-469659080, "SECTION 3 Stand down");
            });



        });

        // Platoon 
        bot.action('Platoon',ctx => {
            ctx.answerCbQuery('Entire Platoon Selected');
            bot. telegram.sendMessage(-469659080, "Platoon STAND BY: Prepare for potential activation");

            bot.telegram.sendMessage(ctx.chat.id, activationMessage, {
                reply_markup:{
                    inline_keyboard:
                    [
                        [
                             //Activation
                            {text:'ACTIVATED', callback_data: 'Platoon Activated'},
                            {text:'Stand Down', callback_data: 'Platoon Stand Down'}
                        ],
                         
                    ]
                }
            })

            bot.action('Platoon Activated', (ctx) =>{
                ctx.answerCbQuery('Platoon Activated'); 
                bot. telegram.sendMessage(-469659080, "PLATOON ACTIVATED: Fall in at Coy Line");
            });

            bot.action('Platoon Stand Down', (ctx) =>{
                ctx.answerCbQuery('Section 1 Stood down');
                bot. telegram.sendMessage(-469659080, "Platoon Stand down");
            });

        });
    
       
        
});
    






bot.launch()