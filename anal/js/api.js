function progressData() {
    function t(t, e) {
        function o(t, e) {
            return t["column-2"] === e["column-2"] ? 0 : t["column-2"] < e["column-2"] ? -1 : 1
        }
        for (var a = [], l = {}, r = null, n = 0; n < t.length; n++) r = t[n], l[r.category] ? l[r.category]["column-2"] += r["column-2"] : l[r.category] = r;
        for (var c in l) a.push(l[c]);
        a.sort(o), "votes" === e && (localStorage.setItem("VOTES", JSON.stringify(a)), buildChart(a, "vote-container", "График взаимодействия голосований, обмен голосами. @" + account)), "comments" === e && (localStorage.setItem("COMMENTS", JSON.stringify(a)), buildChart(a, "comments-container", "График взаимодействия комментариев @" + account)), "flags" === e && (localStorage.setItem("FLAG", JSON.stringify(a)), buildChart(a, "flag-container", "График взаимодействия флагов @" + account))
    }

    function e(t, e) {
        t.sort();
        var o = null,
            a = 0;
        console.log(t, e);
        for (var l = 0; l < t.length; l++)
            if (t[l] != o) {
                if (a > 0) {
                    var r = {
                            category: o,
                            "column-1": a,
                            "column-2": 0
                        },
                        n = {
                            category: o,
                            "column-1": 0,
                            "column-2": a
                        };
                    "inVote" === e && chartItems.push(r), "outVote" === e && chartItems.push(n), "inComm" === e && chartItemsComm.push(r), "outComm" === e && chartItemsComm.push(n), "inFlag" === e && chartItemsFLAG.push(r), "outFlag" === e && chartItemsFLAG.push(n)
                }
                o = t[l], a = 1
            } else a++;
        if (a > 0) {
            var r = {
                    category: o,
                    "column-1": a,
                    "column-2": 0
                },
                n = {
                    category: o,
                    "column-1": 0,
                    "column-2": a
                };
            "inVote" === e && chartItems.push(r), "outVote" === e && chartItems.push(n), "inComm" === e && chartItemsComm.push(r), "outComm" === e && chartItemsComm.push(n), "inFlag" === e && chartItemsFLAG.push(r), "outFlag" === e && chartItemsFLAG.push(n)
        }
    }
    e(inVote, "inVote"), e(outVote, "outVote"), e(inComm, "inComm"), e(outComm, "outComm"), e(inFlag, "inFlag"), e(outFlag, "outFlag"), t(chartItems, "votes"), t(chartItemsComm, "comments"), t(chartItemsFLAG, "flags")
}

function buildChart(t, e, o) {
    AmCharts.makeChart(e, {
        type: "serial",
        pathToImages: "https://upvote.tk/img/",
        categoryField: "category",
        maxSelectedSeries: 10,
        mouseWheelScrollEnabled: !0,
        rotate: !0,
        angle: 20,
        autoMarginOffset: 5,
        depth3D: 20,
        zoomOutText: "",
        startDuration: 1,
        accessibleTitle: "",
        color: "#3D3D3D",
        fontFamily: "arial",
        fontSize: 12,
        theme: "light",
        categoryAxis: {
            gridPosition: "start",
            offset: -1
        },
        chartScrollbar: {
            enabled: !0,
            hideResizeGrips: !0,
            resizeEnabled: !1,
            backgroundAlpha: 1,
            backgroundColor: "#BCD0FF",
            dragIcon: "",
            graphFillAlpha: 0,
            graphFillColor: "#091E51",
            graphLineColor: "#4242FF",
            gridAlpha: 1,
            hideResizeGrips: !0,
            maximum: 1,
            offset: 30,
            scrollbarHeight: 20,
            selectedBackgroundAlpha: 1,
            selectedBackgroundColor: "#659CFF",
            selectedGraphFillAlpha: 1,
            selectedGraphFillColor: "#FF4949",
            selectedGraphLineColor: "#FF5D5D",
            updateOnReleaseOnly: !0
        },
        trendLines: [],
        graphs: [{
            balloonText: "[[title]] >>> [[category]]:[[value]]",
            color: "#333333",
            fillAlphas: 1,
            fillColors: "#5050FF",
            fontSize: 12,
            id: "AmGraph-1",
            labelText: "[[value]]",
            title: "Активность пользователя в ваш адрес",
            type: "column",
            lineColor: "#FFFFFF",
            lineThickness: 0,
            valueField: "column-1"
        }, {
            balloonColor: "#FF6161",
            balloonText: "[[title]] >>> [[category]]:[[value]]",
            bullet: "round",
            bulletBorderColor: "#6E6EFF",
            bulletColor: "#FF4343",
            bulletHitAreaSize: 4,
            bulletSize: 22,
            columnWidth: 0,
            fillColors: "#FF0000",
            fontSize: 14,
            id: "AmGraph-2",
            labelOffset: -1,
            labelText: "[[value]]",
            lineColor: "#FF8A8A",
            lineThickness: 2,
            title: "Ваша активность в адрес пользователя",
            valueField: "column-2"
        }],
        guides: [],
        valueAxes: [{
            id: "ValueAxis-1",
            title: ""
        }],
        allLabels: [],
        balloon: {
            animationDuration: 0,
            fadeOutDuration: 0
        },
        legend: {
            enabled: !0,
            useGraphSettings: !0
        },
        titles: [{
            id: "Title-1",
            size: 16,
            text: o
        }],
        dataProvider: t
    }), loadBar.remove("show"), loaderplace.remove("bg"), dynamic.remove("hide")
}

function run() {
    loadBar.add("show"), loaderplace.add("bg"), dynamic.add("hide"), l = 2e3, f = l, next = 0, mostpopular = [], chartItems = [], chartItemsComm = [], chartItemsFLAG = [], outVote = [], inVote = [], inComm = [], outComm = [], inReblog = [], outReblog = [], inFlag = [], outFlag = [], mostTags = [], acc = document.getElementById("login").value, account = acc.toLowerCase().replace("@", ""), getStat(f);
	startBlock = document.getElementById("startblock").value;
}
var loadBar = document.getElementById("loadbar").classList,
    loaderplace = document.getElementById("loaderplace").classList,
    dynamic = document.getElementById("dynamic").classList,
    account = "vik",
    l = 2e3,
    f = l,
    next = 0,
    mostpopular = [],
    chartItems = [],
    chartItemsComm = [],
    chartItemsFLAG = [],
    outVote = [],
    inVote = [],
    inComm = [],
    outComm = [],
    inReblog = [],
    outReblog = [],
    inFlag = [],
    outFlag = [],
    mostTags = [],
    count = 0;
if ("VOTES" in localStorage) {
    var ch = localStorage.getItem("VOTES");
    buildChart(JSON.parse(ch), "vote-container", "Голосования. (Для обновления проанализируйте аккаунт снова)")
} else buildChart(FallbackUPVOTES, "vote-container", "График входящих/исходящих голосов аккаунта @vik");
if ("COMMENTS" in localStorage) {
    var ch = localStorage.getItem("COMMENTS");
    buildChart(JSON.parse(ch), "comments-container", "График взаимодействия комментариев. (Для обновления проанализируйте аккаунт снова)")
} else buildChart(FallbackCOMMENTS, "comments-container", "График входящих/исходящих комментариев аккаунта @vik");
if ("FLAG" in localStorage) {
    var ch = localStorage.getItem("FLAG");
    buildChart(JSON.parse(ch), "flag-container", "График взаимодействия ФЛАГОВ. (Для обновления проанализируйте аккаунт снова)")
} else buildChart(FallbackFLAG, "flag-container", "График входящих/исходящих флагов аккаунта @vik");
var getStat = function t(e) {
    steem.api.getAccountHistory(account, e, l, function(o, a) {
        o && console.log(o);
		
	
        var r = 0,
            n = a.length;
        for (r = 0; n > r; r++) {
            var c = a[r],
                i = c[1].op[0],
                u = c[1].op[1];
					
				if(c[1].block > startBlock){
					console.log(c[1].block);
            if ("vote" === i) {
                var s = u.voter,
                    m = u.author,
                    h = u.weight > 1,
                    g = u.weight < 0;
                m === account && h && inVote.push(s), s === account && h && outVote.push(m), m === account && g && inFlag.push(s), s === account && g && outFlag.push(m)
            } else "comment" === i && (u.parent_author === account ? inComm.push(u.author) : "" !== u.parent_author && u.author === account ? outComm.push(u.parent_author) : "" === u.parent_author && u.author === account && mostTags.push(u.parent_permlink))
        }
		}
        var d = a[a.length - 1][0];
        d === e ? (e += l, t(e)) : e > d && progressData()
    })
};
