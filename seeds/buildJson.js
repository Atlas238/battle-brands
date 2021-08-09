const brandSeeds = require('./brand-seeds.json');
const browserSeeds = require('./browser-seeds.json');
const chatSeeds = require('./chat-seeds.json');
const mediaSeeds = require('./media-seeds.json');
const osSeeds = require('./os-seeds');
const photoSeeds = require('./photo-seeds.json');
const socialSeeds = require('./social-seeds.json');
const fs = require('fs');

let businesses = brandSeeds.map(data => {
    return {
        type:1,
        name : data.title,
        icon : data.icon,
        base_hp : 8 + Math.floor(Math.random() * 4),
        base_atk: Math.floor(Math.random() * 4),
        base_def : Math.floor(Math.random() * 4),
    };
});

let browsers = browserSeeds.map(data => {
    return {
        type:2,
        name : data.title,
        icon : data.icon,
        base_hp : 8 + Math.floor(Math.random() * 4),
        base_atk: Math.floor(Math.random() * 4),
        base_def : Math.floor(Math.random() * 4),
    };
});

let chats = chatSeeds.map(data => {
    return {
        type:3,
        name : data.title,
        icon : data.icon,
        base_hp : 8 + Math.floor(Math.random() * 4),
        base_atk: Math.floor(Math.random() * 4),
        base_def : Math.floor(Math.random() * 4),
    };
});
let media = mediaSeeds.map(data => {
    return {
        type:4,
        name : data.title,
        icon : data.icon,
        base_hp : 8 + Math.floor(Math.random() * 4),
        base_atk: Math.floor(Math.random() * 4),
        base_def : Math.floor(Math.random() * 4),
    };
});

let os = osSeeds.map(data => {
    return {
        type:5,
        name : data.title,
        icon : data.icon,
        base_hp : 8 + Math.floor(Math.random() * 4),
        base_atk: Math.floor(Math.random() * 4),
        base_def : Math.floor(Math.random() * 4),
    };
});

let photo = photoSeeds.map(data => {
    return {
        type:6,
        name : data.title,
        icon : data.icon,
        base_hp : 8 + Math.floor(Math.random() * 4),
        base_atk: Math.floor(Math.random() * 4),
        base_def : Math.floor(Math.random() * 4),
    };
});

let social = socialSeeds.map(data => {
    return {
        type:7,
        name : data.title,
        icon : data.icon,
        base_hp : 8 + Math.floor(Math.random() * 4),
        base_atk: Math.floor(Math.random() * 4),
        base_def : Math.floor(Math.random() * 4),
    };
});

const finalArr = [...businesses,...browsers,...chats,...media,...os,...photo,...social];

let newJson = [];

for(let i = 0; i < finalArr.length; i++){
    newJson.push({
        id:i+1,
        type: finalArr[i].type,
        title:finalArr[i].name,
        icon:finalArr[i].icon,
    });
}

fs.writeFile('all-seeds.json',JSON.stringify(newJson,null,' '),'utf-8',err => {
    if(err){
        console.log('Something went wrong');
    }
});