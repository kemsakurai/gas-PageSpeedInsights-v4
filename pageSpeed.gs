var Logger = BetterLog.useSpreadsheet("", "Logs");
var API_KEY = Utils.getSheet("config").getRange("A2").getValue();
var PAGESPEED_URL = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed';
Logger.setLevel("INFO");

function executePageSpeed() {
    Logger.info("executePageSpeed START");
    var appTrigger = new AppTrigger();
    appTrigger.recStartTime();
    var rawIndex = appTrigger.getStartRow();
    var urls = Utils.getColumValues("config", "A", 3);
    var sheetNames = Utils.getColumValues("config", "B", 3);
    for (var index = rawIndex; index < sheetNames.length; index++) {
      if (appTrigger.isNeedStop()) {
        //5分経過していたら処理を中断
        appTrigger.setStartRow(index);
        appTrigger.setTrigger("executePageSpeed"); //トリガーを発行
        Logger.info("executePageSpeed Interruption...");
        return;
      }
      var url = urls[index];
      var sheetName = sheetNames[index];
      var sheet = Utils.getSheet(sheetName);
      var targetRowIndex = sheet.getLastRow() + 1;
      var range = sheet.getRange("A" + targetRowIndex +":AM" + targetRowIndex);
      var resultArr = new Array();
      // mobile のページスコアを取得
      result = pageSpeed_(url, "mobile","ja_JP");
      resultArr.push(new Date().toISOString());
      resultArr.push(result.ruleGroups.SPEED.score);
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberHosts));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.totalRequestBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberStaticResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.htmlResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.textResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.overTheWireResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.cssResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.imageResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.javascriptResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.flashResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.otherResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberJsResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberCssResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberRobotedResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberTransientFetchFailureResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numTotalRoundTrips));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numRenderBlockingRoundTrips));
      // desktop のぺージスコアを取得
      result = pageSpeed_(url, "desktop","ja_JP");
      resultArr.push(Utils.undefinedToBlank(result.ruleGroups.SPEED.score));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberHosts));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.totalRequestBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberStaticResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.htmlResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.textResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.overTheWireResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.cssResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.imageResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.javascriptResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.flashResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.otherResponseBytes));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberJsResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberCssResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberRobotedResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numberTransientFetchFailureResources));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numTotalRoundTrips));
      resultArr.push(Utils.undefinedToBlank(result.pageStats.numRenderBlockingRoundTrips));
      range.setValues([resultArr]);
    }
    //全て実行終えたらトリガーと何行目まで実行したかを削除する
    appTrigger.deleteTrigger();
    appTrigger.deleteStartRow();
    Logger.info("executePageSpeed END");
    return;   
}

function pageSpeed_(url, strategy, locale) {
    //URLを取得
    var url = encodeURI(url);
    locale = locale || 'ja_JP'; // default is 'en'
    strategy = strategy || 'desktop'; // 'desktop' or 'mobile'
    var fullUrl = PAGESPEED_URL + '?key=' + API_KEY + '&locale=' + locale + '&strategy=' + strategy + "&url=" + url + "&filter_third_party_resources=true"
    + "&utm_source=script.google.com&utm_campaign=PSI_TEST";
    var headers = {
    'referer': "dev.monotalk.xyz"
    };
    var options = {
     "method" : "get",
     "headers" : headers,
     "muteHttpExceptions": false
    };
    try {
      var response = UrlFetchApp.fetch(fullUrl, options);
    } catch (err) {
      throw err;
    }
    var parsedResult = JSON.parse(response.getContentText("UTF-8"));
    return parsedResult;
}
