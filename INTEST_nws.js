// Import necessary libraries
const Discord = require('discord.js');
const fetch = require('node-fetch');

// Initialize the Discord client
const client = new Discord.Client();

// API endpoints and URLs
const wfoUrl = 'https://api.weather.gov/products/types/WFO/locations/{location}/issues/latest';
const spcUrl = 'https://api.weather.gov/products/types/SPC/locations/{location}/issues/latest';
const radarUrl = 'https://radar.weather.gov/ridge/lite/{id}_loop.gif';
const alertsUrl = 'https://www.weather.gov/images/hazards/';

// Fetch the latest WFO product for the specified location
async function getLatestWFO(location) {
  const url = wfoUrl.replace('{location}', location);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch WFO product for location ${location}.`);
  }
  const data = await response.json();
  return data;
}

// Fetch the latest SPC product for the specified location
async function getLatestSPC(location) {
  const url = spcUrl.replace('{location}', location);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch SPC product for location ${location}.`);
  }
  const data = await response.json();
  return data;
}

// Get the URL for the latest radar loop for the specified ID
function getLatestRadar(id) {
  const url = radarUrl.replace('{id}', id);
  return url;
}

// Get the URL for the latest alerts map for the specified type
function getLatestAlerts(type) {
  const url = alertsUrl + type + '.png';
  return url;
}

// Set up a message listener for the Discord client
client.on('message', async (message) => {
  // If the message starts with "!wfo", fetch and display the latest WFO product for the specified location
  if (message.content.startsWith('!wfo')) {
    const location = message.content.slice(5).toUpperCase();
    try {
      const latestProduct = await getLatestWFO(location);
      const embed = new Discord.MessageEmbed()
        .setTitle(`Latest WFO product for ${location}`)
        .setDescription(latestProduct.productText);
      message.channel.send(embed);
    } catch (error) {
      message.channel.send(`Failed to fetch latest WFO product for location ${location}.`);
    }
  }

  // If the message starts with "!spc", fetch and display the latest SPC product for the specified location
  if (message.content.startsWith('!spc')) {
    const location = message.content.slice(5).toUpperCase();
    try {
      const latestProduct = await getLatestSPC(location);
      const embed = new Discord.MessageEmbed()
        .setTitle(`Latest SPC product for ${location}`)
        .setDescription(latestProduct.productText);
      message.channel.send(embed);
    } catch (error) {
      message.channel.send(`Failed to fetch latest SPC product for location ${location}.`);
    }
  }

  // If the message starts with "!radar", display the latest radar loop for the specified ID
  if (message.content.startsWith('!radar')) {
    const id = message.content.slice(7).toUpperCase();
    const url = getLatestRadar(id);
    const embed = new Discord.MessageEmbed()
      .setTitle(`Latest radar loop for ${id}`)
      .setImage(url);
    message.channel.send(embed);
  }

  // If the message starts with "!alerts", display the latest alerts map for the specified type
  if (message.content.startsWith('!alerts')) {
    const type = message.content.slice(8).toLowerCase();
    const url = getLatestAlerts(type);
    const embed = new Discord.MessageEmbed()
      .setTitle(`Latest ${type} alerts map`)
      .setImage(url);
    message.channel.send(embed);
  }
});
