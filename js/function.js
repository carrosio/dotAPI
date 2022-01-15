// no detecta la variable en el otro archivo

function TimeFilter(data, unit){
  
  let newData = []
 
  
  for (x of data){
    if (x.start_time > unit){
      newData.push(x)
    }
  }
  
  return newData
}

function MatchFilter(data, Minduration, leaver, ranked) {
  let newArr = [];
  
  if (ranked == `all`){
    for (x of data) {
      if (
        x.duration > Minduration &&
        x.leaver_status == leaver 
        
        )
      {
        newArr.push(x)
      }
    }
  }

  else {
    for (x of data) {
      if (
        x.duration > Minduration &&
        x.leaver_status == leaver &&
        x.lobby_type == ranked 
       
        )
      {
        newArr.push(x)
      }
    }
  }
  return newArr
}

function winORlose(data){
  
  if (data.player_slot < 128 && data.radiant_win == 1){
    return true
  }
  else if (data.player_slot >= 128 && data.radiant_win == 0){
    return true
  }
  else {
    return false
  }
}

function WinAndLose(data){
    let sumLoses = 0
    let sumWin = 0
    
    for (x of data){
      winORlose(x) ? sumWin++ : sumLoses++
    }

    let result = [sumLoses, sumWin]
    return result
}

function UserHeroList(data, heros){

 

  let simpleArr = []

  for (x of data){
    simpleArr.push(x.hero_id)
  }

  const counts = [];

  let totalHeroInfo = []

  simpleArr.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

  for (let i = 0; i < counts.length; i++) {
    for (y of heros){
      if (y.id == i){
        totalHeroInfo.push({
          "id": i,
          "count": counts[i] ? counts[i]: 0,
          "name": y.localized_name,
          "roles": y.roles,
          "img": `${baseDota}${y.img}`,
          "winCount": "",
          "winrate": "",
          "kills": "",
          "deaths": "",
          "assists": "",
          "kda": "",
          "doom": ""

        })
      }
    }
  }
 

  for (x of totalHeroInfo){
    
    let wins = 0
    let kills = 0
    let deaths = 0
    let assists = 0
    
    for (y of data){
      if (y.hero_id == x.id) {
        if (winORlose(y)){
          wins ++
        }
        
        kills += y.kills
        deaths += y.deaths
        assists += y.assists
      }
    }
    x.winCount = wins
    x.winrate = wins / x.count
    x.kills = kills
    x.deaths = deaths
    x.assists = assists
    x.kda = kda(kills, deaths, assists)
    x.doom = x.kda / x.winrate

  }

  return totalHeroInfo
}
  

function Ordener(data, order){
  let sortedData = data.sort(function (a, b){
    
      if (a[order] > b[order]) {
        return -1 
      }
      if (a[order] < b[order] )  {
        return 1 
      }
      return 0
    
    
})
    return sortedData      
}

// ============= KDA RATIO ==========
function kda(k, d, a) {
  return (k + a) / (1 + d);
}

document.addEventListener("DOMContentLoaded", async function (e) {
  
  let nameUsr = (await getJSONData(`${baseURL}/players/${user}`)).data;
  let newHeroList = (await getJSONData(`${heroList}`)).data
  let rawData = (await getJSONData(matchHistory)).data;
  
  // FILTER DATA secs, quit?, type (7 = ranked, 0 = normi, all )
  let dataFil = MatchFilter(rawData, 720, 0, `7`);
 
  let dataFilByTime = TimeFilter(dataFil, TwoYearAgo)
  // REMACH DATA BY HERO
  let dataHero = UserHeroList(dataFilByTime, newHeroList)
  //ORDER BY PROPIETY
  let dataFiltAndOrdered = Ordener(dataHero, globalOrder)


  UserNme(nameUsr);
  showTop3(dataFiltAndOrdered, globalOrder )
  tableHeros(dataFiltAndOrdered, globalOrder)
  MainTable(dataFilByTime)
  
  



});
