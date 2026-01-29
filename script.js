let teamLogos =
{
    "サントリーサンバーズ大阪": "img/サントリー.png",
    "大阪ブルテオン": "img/ブルテオン.png",
    "ウルフドッグス名古屋": "img/ウルフドッグ.png",
    "東京グレートベアーズ": "img/グレートベアーズ.png",
    "ジェイテクトSTINGS愛知": "img/愛知.png",
    "ヴォレアス北海道": "img/北海道.png",
    "VC長野トライデンツ": "img/長野.png",
    "東レアローズ静岡": "img/アローズ.png",
    "日本製鉄堺ブレイザーズ": "img/堺.png",
    "広島サンダーズ": "img/サンダーズ.png"
};

let saveBtn = document.getElementById("save");
let recordsDiv = document.getElementById("records");

function createTeam(name, logo)
{
    let team = document.createElement("div");
    team.className = "team";

    if (logo)
    {
        let img = document.createElement("img");
        img.src = logo;
        img.className = "logo";
        team.appendChild(img);
    }

    team.append(name);
    return team;
}

function createCard(rec, index)
{
    let card = document.createElement("div");
    card.className = "card";

    let dateEl = document.createElement("strong");
    dateEl.textContent = rec.date;
    card.append(dateEl, document.createElement("br"), document.createElement("br"));

    let match = document.createElement("div");
    match.className = "match";

    let vs = document.createElement("div");
    vs.className = "vs";
    vs.textContent = "vs";

    match.appendChild(createTeam(rec.home, rec.homeLogo));
    match.appendChild(vs);
    match.appendChild(createTeam(rec.away, rec.awayLogo));

    card.appendChild(match);

    let center = document.createElement("div");
    center.className = "center-info";
    center.innerHTML =
    "会場: " + rec.venue + "<br>" +
    "スコア: " + rec.score + "<br>" +
    "メモ: " + rec.memo;

    card.appendChild(center);

    let footer = document.createElement("div");
    footer.className = "footer";

    let timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    timestamp.textContent = "保存日時: " + rec.savedAt;
    footer.appendChild(timestamp);

    card.appendChild(footer);

    let btn = document.createElement("button");
    btn.className = "delete-btn";
    btn.textContent = "削除";
    btn.addEventListener("click", function () 
    {
        deleteRecord(index);
    });
    card.appendChild(btn);

    return card;
}

function loadRecords()
{
    let records = JSON.parse(localStorage.getItem("volleyballRecords") || "[]");
    recordsDiv.innerHTML = "";

    records.forEach(function (rec, index)
    {
        let card = createCard(rec, index);
        recordsDiv.appendChild(card);
    });
}

function saveRecord()
{
    let homeScore = scoreHome.value;
    let awayScore = scoreAway.value;

    let scoreText = homeScore + "-" + awayScore;

    let now = new Date();
    let timestamp = now.toLocaleString("ja-JP");

    let record =
    {
        date: date.value,
        home: home.value,
        away: away.value,
        venue: venue.value,
        score: scoreText,   
        memo: memo.value,
        savedAt: timestamp,
        homeLogo: teamLogos[home.value] || "",
        awayLogo: teamLogos[away.value] || ""
    };

    let records = JSON.parse(localStorage.getItem("volleyballRecords") || "[]");
    records.push(record);
    localStorage.setItem("volleyballRecords", JSON.stringify(records));

    alert("保存しました。");
    loadRecords();

    date.value = "";
    home.value = "";
    away.value = "";
    venue.value = "";
    scoreHome.value = "";
    scoreAway.value = "";
    memo.value = "";
}

function deleteRecord(index)
{
    let records = JSON.parse(localStorage.getItem("volleyballRecords") || "[]");
    records.splice(index, 1);
    localStorage.setItem("volleyballRecords", JSON.stringify(records));

    alert("削除しました。");
    loadRecords();
}

saveBtn.addEventListener("click", saveRecord);
loadRecords();