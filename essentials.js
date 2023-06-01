const { table } = require("console");
const Discord = require("discord.js");
const fs = require("fs");
const ess = exports;

exports.sets = {
    untouchable: ["USER IDS REPLACE WITH OWN"],
    token: "TOKEN"
}

exports.crash = function(client) {
    client.user.setStatus("dnd");
    const tm = setTimeout(function() { client.user.setStatus("online"); }, 500);
}

exports.items = {
    pistol:{name:"Pistol",price:250,usable:true,description:"A thing used to make threats and shoot shit."},
    amongplush:{name:"Among Us Plushie",price:50,usable:false,description:"The SUSSY imposter at 3 AM???"},
    nword:{name:"N-Word Pass",price:5000,usable:true,description:"The sole artifact sought by many."},
    arrow:{name:"Strange Arrow",price:1000,usable:true,description:"HOLY FUCKING SHIT IS THAT A MOTHERFUCKING JOJO REFERENCE?!"},
    rope:{name:"Rope",price:25,usable:true,description:"Uses include: hanging yourself, hanging your friends, and tying up femboys to prevent their escape attempts."},
    flask:{name:"Flask",price:10,usable:true,description:"Used to contain... \"liquids\"."},
    guysex:{name:"Sextape",price:5,usable:false,description:"Full sextape featuring Guyshit and his friends."},
    trophy:{name:"Best Sex Trophy",price:10000,usable:false,description:"The sexiest living being award."},
    cyanide:{name:"Cyanide Pill",price:100,usable:true,description:"Poison yourself or your dumbass friends within seconds."},
    gamephone:{name:"Gaming Cellphone",price:4200,usable:true,description:"Cellphone made specifically for Subway Surfers."},
    plug:{name:"Buttplug",price:69,usable:true,description:"Prevents impregnation if male."},
    totem:{name:"Totem Of Undying",price:6400,usable:false,description:"Prevents death, consumed on activation."},
    cross:{name:"Holy Cross",price:440,usable:true,description:"Protection from some forms of heresey. Decreases taken damage. Must be used. Cannot be consumed."},
    mummy:{name:"Mummified Body",price:250000,usable:false,description:"Some dead fucker who walked all the way from Africa to America lmfao."}
};

exports.jobs = {
    femboy:{name:"Femboy",wage:45,difficulty:3,consec_fails_allowed:2,exp_req:750,exp_get:10},
    cashier:{name:"Cashier", wage:20,difficulty:2,consec_fails_allowed:3,exp_req:250,exp_get:5},
    crewmate:{name:"Crewmate", wage:17,difficulty:4,consec_fails_allowed:1,exp_req:25,exp_get:7},
    janitor:{name:"Janitor", wage:12,difficulty:1,consec_fails_allowed:4,exp_req:50,exp_get:2},
    journalist:{name:"Author", wage:1,difficulty:1,consec_fails_allowed:5,exp_req:0,exp_get:1},
    nftseller:{name:"NFT Seller", wage:50,difficulty:4,consec_fails_allowed:1,exp_req:1000,exp_get:15},
    minecrafter:{name:"Minecrafter", wage:40,difficulty:3,consec_fails_allowed:2,exp_req:100,exp_get:8},
    imposter:{name:"Imposter", wage:32,difficulty:4,consec_fails_allowed:1,exp_req:500,exp_get:11},
    federalagent:{name:"Federal Agent", wage:10,difficulty:2,consec_fails_allowed:3,exp_req:10,exp_get:3},
};

exports.lsts = [
    [
        ess.items.pistol,
        ess.items.amongplush,
        ess.items.nword,
        ess.items.arrow,
        ess.items.rope,
        ess.items.gamephone
    ],
    [
        ess.items.flask,
        ess.items.guysex,
        ess.items.trophy,
        ess.items.cyanide,
        ess.items.plug,
        ess.items.cross
    ],
    [
        ess.items.totem,
        ess.items.mummy
    ]
];

exports.jlsts = [
    [
        ess.jobs.cashier,
        ess.jobs.crewmate,
        ess.jobs.federalagent,
        ess.jobs.femboy,
        ess.jobs.imposter,
        ess.jobs.janitor
    ],
    [
        ess.jobs.journalist,
        ess.jobs.minecrafter,
        ess.jobs.nftseller
    ]
];

exports.shopItemsString = function(ess, pagenum, msg) {
    const lst = ess.lsts[pagenum];
    var str = "";
    for (const i in lst) {
        str = str.concat("\n`"+lst[i].name+"` - $"+lst[i].price.toString());
    }
    return str;
}

exports.jobsString = function(ess, pagenum) {
    const lst = ess.jlsts[pagenum];
    var str = "";
    for (const i in lst) {
        str = str.concat("\n`"+lst[i].name+"` - Required "+lst[i].exp_req.toString()+" XP");
    }
    return str;
}

exports.dataTemplate = {
    uid:"",
    inv:[
        {item:{},count:0}
    ],
    money:0,
    job:null,
    valentine:null,
    scores: {
        highestSex:0,
        exp:0
    }
}

exports.checkFile = function(id) {
    const fname = "./udata/"+id+".txt";
    var temp = ess.dataTemplate;
    temp.inv = [];
    temp.uid = id;
    const fdata = `[{"userData":`+JSON.stringify(temp)+"}]";
    if (fs.existsSync(fname) == false) {
        console.log("No such file");
        fs.appendFileSync(fname, fdata);
    }
    return fname;
}

exports.getUdata = function(id) {
    const fname = ess.checkFile(id);
    const dat = fs.readFileSync(fname, "utf-8");
    var udat = JSON.parse(dat);
    var data;
    if (udat[0].userData) {
        data = udat[0].userData;
        console.log("Data found for "+id);
    } else {
        console.log("No data in file");
        var obj = exports.dataTemplate;
        obj.uid = id;
        obj.inv = [];
        udat[0].userData = obj;
        fs.writeFile(fname, JSON.stringify(udat), (err, data) => { if (err) throw err; console.log(data); });
        data = obj;
    }
    if (!data) {
        console.log("No data for "+id);
        var obj = exports.dataTemplate;
        obj.uid = id;
        obj.inv = [];
        udat[0].userData = obj;
        fs.writeFile(fname, JSON.stringify(udat), (err, data) => { if (err) throw err; console.log(data); });
        data = obj;
    }
    console.log("Data collected from "+id);
    return data;
}

exports.setUdata = function(id, newData) {
    const fname = ess.checkFile(id);
    const dat = fs.readFileSync(fname, "utf-8");
    var udat = JSON.parse(dat);
    var data;
    if (udat[0].userData) {
        console.log("Data found for "+id);
        data = udat[0].userData;
    } else {
        console.log("No data in file");
        var obj = exports.dataTemplate;
        obj.uid = id;
        obj.inv = [];
        udat[0].userData = obj;
        fs.writeFile(fname, JSON.stringify(udat), (err, data) => { if (err) throw err; console.log(data); });
        data = obj;
    }
    if (!data) {
        console.log("No data for "+id);
        var obj = exports.dataTemplate;
        obj.uid = id;
        obj.inv = [];
        udat[0].userData = obj;
        fs.writeFile(fname, JSON.stringify(udat), (err, data) => { if (err) throw err; console.log(data); });
        data = obj;
    }
    newData.uid = id;
    udat[0].userData = newData;
    fs.writeFile(fname, JSON.stringify(udat), (err, data) => { if (err) throw err; console.log(data); });
}

exports.findItem = function(inv, itm) {
    for (const i in inv) {
        if (inv) {
            if (inv[i].item.name == itm.name) {
                return i;
            }
        }
    }
}

exports.buyItem = function(ess, id, page, obj, msg) {
    const lst = ess.lsts[parseInt(page)-1];
    if (lst) {
        const itm = lst[parseInt(obj)-1];
        if (itm) {
            var udat = ess.getUdata(id);
            if (udat.money >= itm.price) {
                udat.money = udat.money - itm.price;
                const iter = ess.findItem(udat.inv, itm);
                if (iter == (0 || 1 || 2)) {
                    udat.inv[iter].count = udat.inv[iter].count + 1;
                    ess.setUdata(id, udat);
                    msg.reply("Purchased one ".concat(itm.name+"."));
                    return;
                } else {
                    udat.inv.push({item:itm,count:1});
                    ess.setUdata(id, udat);
                    msg.reply("Purchased one ".concat(itm.name+"."));
                    return;
                }
            } else {
                msg.reply("Item too costly: > "+udat.money);
                return;
            }
        }
    }
    msg.reply("Purchasing items: `~buy [page:int] [item:int]`.");
}

exports.getBal = function(id, msg) {
    var udat = ess.getUdata(id);
    const mon = udat.money;
    if (udat) {
        return mon.toString();
    }
    msg.reply("Balance: `~balance [@user:optional]`.");
}

exports.getXP = function(id, msg) {
    var udat = ess.getUdata(id);
    const mon = udat.scores.exp;
    if (udat) {
        return mon.toString();
    }
    msg.reply("XP: `~xp [@user:optional]`.");
}

exports.getItemInfo = function(ess, page, itid, msg) {
    const lst = ess.lsts[page];
    if (lst) {
        const itm = lst[itid];
        if (itm) {
            return ("**Name:** "+itm.name+"\n**Price:** $"+itm.price+"\n**Description:** "+itm.description+"\n**Usable:** "+itm.usable);
        }
    }
    msg.reply("Getting item information: `~info item [page:int] [item:int]`.");
}

exports.getJobInfo = function(ess, page, itid, msg) {
    const lst = ess.jlsts[page];
    if (lst) {
        const job = lst[itid];
        if (job) {
            return ("**Name:** "+job.name+"\n**Wage:** $"+job.wage+"\n**Difficulty:** "+job.difficulty+"\n**Consecutive Allowed Fails:** "+job.consec_fails_allowed+"\n**XP Gain:** "+job.exp_get+"\n**XP Requirement:** "+job.exp_req);
        }
    }
    msg.reply("Getting job information: `~info job [page:int] [job:int]`.");
}

exports.addMoneyAndXP = function(id, amt, atm) {
    var udat = ess.getUdata(id);
    udat.money = udat.money + amt;
    udat.scores.exp = udat.scores.exp + atm;
    ess.setUdata(id, udat);
}

exports.remCF = function(id, amt) {
    var udat = ess.getUdata(id);
    udat.job.consec_fails_allowed = udat.job.consec_fails_allowed - amt;
    if (udat.job.consec_fails_allowed < 0) {
        return true;
    }
    ess.setUdata(id, udat);
    return false;
}

exports.workJob = function(id, msg) {
    var job = ess.getUdata(id).job;
    if (job) {
        const wof = (Math.floor(Math.random()*job.difficulty)+1);
        console.log(wof);
        if (wof < job.difficulty) {
            if (ess.remCF(id, 1) == true) {
                ess.jobQuit(id, msg);
            }
            msg.reply("The day at work didn't go so well...");
            return;
        } else {
            ess.addMoneyAndXP(id, job.wage, job.exp_get);
            msg.reply("Success! Earned **$"+job.wage+"** and **"+job.exp_get+" XP**.");
            return;
        }
    }
    msg.reply("No job to work.");
}

exports.askVal = function(id, targid, msg) {
    const v1 = ess.getValentine(id);
    if (v1.trf != true) {
        var dat = ess.getUdata(id);
        dat.valentine = targid;
        ess.setUdata(id, dat);
        const v2 = ess.getUdata(targid);
        if (v2.valentine == id) {
            msg.reply("You and <@"+targid+"> are now valentines!? o///o");
        } else {
            msg.reply("Now ask <@"+targid+"> to ask you back!");
        }
        return;
    } else {
        msg.reply("You already have a valentine...");
    }
}

exports.delVal = function(id, msg) {
    if (ess.getValentine(id).trf == true) {
        var dat = ess.getUdata(id);
        const targid = dat.valentine;
        dat.valentine = null;
        ess.setUdata(id, dat);
        msg.reply("<@"+targid+"> is no longer your valentine... want to hook up~?");
        return;
    } else {
        if (ess.getUdata(id).valentine != null) {
            var dat = ess.getUdata(id);
            dat.valentine = null;
            ess.setUdata(id, dat);
            msg.reply("I removed your love interest.");
            return;
        }
        msg.reply("You do not have a valentine to cut ties with, dumbass~!");
    }
}

exports.getValentine = function(id) {
    const dat = ess.getUdata(id);
    if (dat.valentine != null) {
        const da2 = ess.getUdata(dat.valentine);
        if (da2.valentine == id) {
            return { txt: "<@"+id+">'s valentine is <@"+dat.valentine+">!", trf: true };
        } else {
            return { txt: "<@"+id+"> has no valentine but is interested in <@"+dat.valentine+">!", trf: false };
        }
    } else {
        return { txt: "<@"+id+"> has no valentine...", trf: false };
    }
}

exports.jobApply = function(id, page, obj, msg) {
    const lst = ess.jlsts[parseInt(page)-1];
    if (lst) {
        const itm = lst[parseInt(obj)-1];
        if (itm) {
            var udat = ess.getUdata(id);
            if (udat.scores.exp >= itm.exp_req) {
                const iter = udat.job;
                if (iter == null) {
                    udat.job = itm;
                    ess.setUdata(id, udat);
                    msg.reply("Became a ".concat(itm.name+"."));
                    return;
                } else {
                    msg.reply("Could not apply for job. Leave your current job first.");
                    return;
                }
            } else {
                msg.reply("XP too low for job: > "+udat.scores.exp);
                return;
            }
        }
    }
    msg.reply("Apply for jobs: `~job apply [page:int] [job:int]`.");
}

exports.jobQuit = function(id, msg) {
    var udat = ess.getUdata(id);
    const iter = udat.job;
    if (iter != null) {
        udat.job = null;
        ess.setUdata(id, udat);
        msg.reply("Left job.");
        return;
    } else {
        msg.reply("No job to quit!");
        return;
    }
}

exports.isBot = function(users) {
    for (const i in users) {
        if (users[i].bot) {
            return true;
        }
    }
    return false;
}

exports.haveTime = function() {
    const dt = new Date();
    var dat = (dt.getMonth().toString()+"."+dt.getDate().toString()+"."+dt.getFullYear().toString());
    var tme = (dt.getHours().toString()+":"+dt.getMinutes().toString()+":"+dt.getSeconds().toString()+":"+dt.getMilliseconds().toString());
    return { date: dat, time: tme };
}

exports.logon = function(client) {
    let guilds = client.guilds.cache.map(gud => gud.id+" - "+gud.name+" [OWNER: "+gud.ownerId+"]");
    let channels = client.channels.cache.map(chn => chn.id+" - "+chn.name+" [GUILD: "+chn.guildId+"]");
    var finStr = "\nGUILDS:\n--------------------------------------\n";
    var finStr1 = "\nCHANNELS:\n--------------------------------------\n";
    if (guilds) {
        for (const i in guilds) {
            if (guilds[i]) {
                finStr = finStr.concat(guilds[i]+"\n");
            }
        }
    }
    if (channels) {
        for (const i in channels) {
            if (channels[i]) {
                finStr1 = finStr1.concat(channels[i]+"\n");
            }
        }
    }
    finStr = finStr.concat("--------------------------------------\n");
    finStr1 = finStr1.concat("--------------------------------------\n");
    fs.writeFile("./botInfo.txt", ("\nLOGON DATE: "+ess.haveTime().date+" @ "+ess.haveTime().time+"\n").concat(finStr.concat("\n"+finStr1+"\n")), (err, data) => { if (err) throw err; console.log(data); });
    console.log(finStr);
}

exports.timeAndUInfoLog = function(ess, msg, console) {
    const ttm = ess.haveTime();
    const initLogData = "[DATE: "+ttm.date+" "+ttm.time+"] ("+msg.author.username+"#"+msg.author.discriminator+" & "+msg.author.id+")"+"\n"+msg.content+"\n";
    console.log(initLogData);
    return initLogData;
}

exports.guildFlash = function(gid) {
}

exports.locateFlashable = function(users, members, sets) {
    for (const i in users) {
        if (!sets.untouchable.find(users[i].id) && !members[i].permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
            for (const x in client.guilds.fetch()) {
                
            }
        }
    }
}
