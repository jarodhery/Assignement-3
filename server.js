const express = require('express');
const app = express();
const path = require('path');
const HTTP_PORT = process.env.PORT || 8080;
const legoData = require('./modules/legoSets');


app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => 
{
    res.sendFile(path.join(__dirname, '/public/views/index.html'));
});


app.get('/about', (req, res) => 
{
    res.sendFile(path.join(__dirname, '/public/views/about.html'));
});


app.get('/lego/sets', (req, res) => 
  {
    let { theme } = req.query;

    if (theme) 
    {
        let setsByTheme = legoData.getSetsByTheme(theme);
        if (setsByTheme.length > 0) 
        {
            res.json(setsByTheme);
        } 
        else 
        {
            res.status(404).send(`No sets found for theme: ${theme}`);
        }
    } 
    else 
    {
      let allSets = legoData.getAllSets();
      if (allSets.length > 0) 
        {
          res.json(allSets);
        } 
        else 
        {
          res.status(404).send('No Lego sets found.');
        }
  }
});


app.get('/lego/sets/:set_num', (req, res) => 
  {
    let { set_num } = req.params;

    let set = legoData.getSetByNum(set_num);
    if (set) 
      {
        res.json(set);
      }
      else 
      {
        res.status(404).send(`No set found with set number: ${set_num}`);
      }
});


app.use((req, res) => 
{
    res.status(404).sendFile(path.join(__dirname, 'public/views/404.html'));
});


legoData.initialize(); 


app.listen(HTTP_PORT, () => 
{
    console.log(`Server running on port ${HTTP_PORT}`);
});
