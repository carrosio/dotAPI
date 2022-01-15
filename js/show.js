function UserNme(data) {
  user_name_main.innerHTML = data.profile.personaname;
}

function MainTable(data) {
  
  let kdasum = 0
  let winsum = 0
  let losesum = 0
  for (x of data) {
    kdasum = kdasum + kda(x.kills, x.deaths, x.assists)
    if (winORlose(x)){
      winsum ++
    }
    else {
      losesum ++
    }
  }

  let kdaRatio = kdasum / data.length;
  

  tot_user_match.innerHTML = `Total Matchs:  ` + data.length;
  tot_user_win.innerHTML = `Total Wins: ` + winsum;
  tot_user_lose.innerHTML = `Total Loses: ${losesum} `;
  tot_user_wr.innerHTML =
    `Total Winrate: ` + ((winsum / data.length) * 100).toFixed(2) + `%`;
  kda_ratio.innerHTML = `KDA ratio Average*: ${kdaRatio.toFixed(2)}`;
}

function showTop3(data, order) {
  
  let newData = []
  for (x of data){
    if (x.count > globalQtyFilter){
      newData.push(x)

    }
}

  let newDataOrdered = Ordener(newData, order)

  kda_0.innerHTML = "KDA: " + newDataOrdered[2].kda.toFixed(2);
  kda_1.innerHTML = "KDA: " + newDataOrdered[0].kda.toFixed(2);
  kda_2.innerHTML = "KDA: " + newDataOrdered[1].kda.toFixed(2);

  h0_Wr.innerHTML = ` ${(Number(newDataOrdered[2].winrate) * 100).toFixed(
    2
  )}% <br> Games: ${newDataOrdered[2].count}`;
  h1_Wr.innerHTML = ` ${(Number(newDataOrdered[0].winrate) * 100).toFixed(
    2
  )}%<br> Games: ${newDataOrdered[0].count}`;
  h2_Wr.innerHTML = ` ${(Number(newDataOrdered[1].winrate) * 100).toFixed(
    2
  )}% <br> Games: ${newDataOrdered[1].count}`;

  h0_name.innerHTML = newDataOrdered[2].name;
  h1_name.innerHTML = newDataOrdered[0].name;
  h2_name.innerHTML = newDataOrdered[1].name;

  h0_pic.style.backgroundImage = `url("${newDataOrdered[2].img}")`;
  h1_pic.style.backgroundImage = `url("${newDataOrdered[0].img}")`;
  h2_pic.style.backgroundImage = `url("${newDataOrdered[1].img}")`;
}

function tableHeros(data, order) {
  let filtered = [];

  for (x of data) {
    if (x.count > globalQtyFilter) {
      filtered.push(x);
    }
  }

  let filteredAndOrderedData = Ordener(filtered, order);

  let sum = 0;
  for (x of filteredAndOrderedData) {
    sum++;
    let newTr = document.createElement("tr");
    tbody.appendChild(newTr);
    newTr.innerHTML = `
          <td>${sum}</td>
          <img class="pb-1" alt="${x.name}" src="${x.img}">
          <td>${x.count.toFixed(0)}</td>
          <td>${(x.winrate * 100).toFixed(2)}%</td>
          <td>${x.kda.toFixed(2)}</td>
          <td>${x.kills.toFixed(0)}</td>
          <td>${x.deaths.toFixed(0)}</td>
          <td>${x.assists.toFixed(0)}</td>
          <td>${x.doom.toFixed(2)}</td>`;
  }
}
