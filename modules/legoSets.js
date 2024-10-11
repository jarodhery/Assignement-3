const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize()
{

    setData.forEach(set => 
    {
        let themeName = "";

        themeData.forEach(theme => 
        {
            if (set.theme_id === theme.id) 
            {
                themeName = theme.name;
            }
        });

        let newSet = 
        {
            ...set,  
            theme: themeName  
        };

        sets.push(newSet);  
    });

}

function getAllSets()
{
    return sets;
}

function getSetByNum(setNum)
{
    let match;

    sets.forEach(set => 
    {
        if (set.set_num === setNum) 
        {
            match = set;
        }
    });

    return match
}


function getSetsByTheme(theme)
{
    let currentTheme = theme.toLowerCase();

    let filteredSets = sets.filter(function(set) 
    {
        return set.theme.toLowerCase().includes(currentTheme);
    });

    return filteredSets;
}


module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme }