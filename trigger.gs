var START_ROW_KEY = "startRow";
var TRIGGER_KEY = "trigger";

// コンストラクタ
function AppTrigger() {
  this.startTime;
}
// 開始時刻を記録する
AppTrigger.prototype.recStartTime = function() {
  this.startTime = new Date();
};
// 起動時間を超えているか
AppTrigger.prototype.isNeedStop = function() {
    var diff = parseInt((new Date() - this.startTime) / (1000 * 60));
    // 起動時間が4分を超えていたら
    if(diff >= 4) {
      return true;
    }
    return false;
};
// trigger削除
AppTrigger.prototype.deleteTrigger = function() {
    var triggerId = PropertiesService.getScriptProperties().getProperty(TRIGGER_KEY);
    if(!triggerId) return;
    ScriptApp.getProjectTriggers().filter(function(trigger){
      return trigger.getUniqueId() == triggerId;
    })
    .forEach(function(trigger) {
      ScriptApp.deleteTrigger(trigger);
    });
    PropertiesService.getScriptProperties().deleteProperty(TRIGGER_KEY);
};
// triggerを設定する
AppTrigger.prototype.setTrigger = function(funcName){
    //保存しているトリガーがあったら削除
    this.deleteTrigger();   
    var dt = new Date();
    dt.setMinutes(dt.getMinutes() + 1);  //１分後に再実行
    var triggerId = ScriptApp.newTrigger(funcName).timeBased().at(dt).create().getUniqueId();
    //あとでトリガーを削除するためにトリガーIDを保存しておく
    PropertiesService.getScriptProperties().setProperty(TRIGGER_KEY, triggerId);
};
// 開始行を取得する
AppTrigger.prototype.getStartRow = function() {
    //途中から実行した場合、ここに何行目まで実行したかが入る
    var startRow = parseInt(PropertiesService.getScriptProperties().getProperty(START_ROW_KEY));
    if(!startRow) {
        //初めて実行する場合はこっち
        startRow = 0;
    }
    return startRow;
};
// 開始行を取得する
AppTrigger.prototype.setStartRow = function(rowIndex) {
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty(START_ROW_KEY, rowIndex);
};
AppTrigger.prototype.deleteStartRow = function() {
  PropertiesService.getScriptProperties().deleteProperty(START_ROW_KEY);
};
// スクリプトプロパティをログ出力する
function wirteScriptProperties() {
  var properties = PropertiesService.getScriptProperties();
  for each (var key in properties.getKeys()) {
    console.log("key : [%s] value : [%s]", key, properties.getProperty(key));
  }
}
// 全てのプロパティを削除する
function clearScriptProperties() {
  var properties = PropertiesService.getScriptProperties().deleteAllProperties();
}
