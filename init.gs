var Logger = BetterLog.useSpreadsheet("", "Logs");
Logger.setLevel("INFO");

function initialize() {
  // 測定sheet template を作成します。
  var sheet = Utils.getSheet("config");
  var sheetNames = Utils.getColumValues("config", "B", 3);
  for (var index = 0; index < sheetNames.length; index++) {
    var urlSheet = Utils.getSheet(sheetNames[index]);
    // sheetが存在しない場合、初期化して作成する
    if(urlSheet == null) {
       var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
       newSheet = activeSpreadsheet.insertSheet();
       newSheet.setName(sheetNames[index]);
       newSheet.clear();
       var range = newSheet.getRange("A1:AM1");
       range.setBackground("lightsteelblue");
       var headers = new Array();
       headers.push("DATE");
       headers.push("MOBILE.SPEED SCORE");
       headers.push("MOBILE.numberResources");
       headers.push("MOBILE.numberHosts");
       headers.push("MOBILE.totalRequestBytes");
       headers.push("MOBILE.numberStaticResources");
       headers.push("MOBILE.htmlResponseBytes");
       headers.push("MOBILE.textResponseBytes");
       headers.push("MOBILE.overTheWireResponseBytes");
       headers.push("MOBILE.cssResponseBytes");
       headers.push("MOBILE.imageResponseBytes");
       headers.push("MOBILE.javascriptResponseBytes");
       headers.push("MOBILE.flashResponseBytes");
       headers.push("MOBILE.otherResponseBytes");
       headers.push("MOBILE.numberJsResources");
       headers.push("MOBILE.numberCssResources");
       headers.push("MOBILE.numberRobotedResources");
       headers.push("MOBILE.numberTransientFetchFailureResources");
       headers.push("MOBILE.numTotalRoundTrips");
       headers.push("MOBILE.numRenderBlockingRoundTrips");
       headers.push("PC.SPEED SCORE");
       headers.push("PC.numberResources");
       headers.push("PC.numberHosts");
       headers.push("PC.totalRequestBytes");
       headers.push("PC.numberStaticResources");
       headers.push("PC.htmlResponseBytes");
       headers.push("PC.textResponseBytes");
       headers.push("PC.overTheWireResponseBytes");
       headers.push("PC.cssResponseBytes");
       headers.push("PC.imageResponseBytes");
       headers.push("PC.javascriptResponseBytes");
       headers.push("PC.flashResponseBytes");
       headers.push("PC.otherResponseBytes");
       headers.push("PC.numberJsResources");
       headers.push("PC.numberCssResources");
       headers.push("PC.numberRobotedResources");
       headers.push("PC.numberTransientFetchFailureResources");
       headers.push("PC.numTotalRoundTrips");
       headers.push("PC.numRenderBlockingRoundTrips");
       range.setValues([headers]);
    }
  }
  return;
}
