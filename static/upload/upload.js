var fs = require('fs'); // File System(Node API)：ファイル操作
var path = require('path'); // Path(Node API)：パスの文字列操作
var rl = require('readline'); // Readline(Node API)：読み込み可能なストリームから１行ずつデータを読み込む

var dirTarget = '.../data'; // 処理対象のフォルダ

// コマンドライン（ターミナル）の入出力の設定
var rli = rl.createInterface({ // readline.Interfaceの設定
  input: process.stdin, // 読み込み可能なストリームに標準入力を設定
  output: process.stdout, // 書き込み可能なストリームに標準出力を設定
  prompt: 'y/n?: ' // プロンプトを設定
});

var files = fs.readdirSync(dirTarget); // 指定フォルダ内のファイル、サブフォルダのリストを取得
var arFileData = []; // ファイル情報保持用の配列
files.forEach(function(file){  
    var fullPath = path.join(dirTarget, file); // フルパスを取得
    var stats = fs.statSync(fullPath); // ファイル情報の取得
    var fileData = {};
    fileData.name = file; // ファイル名
    fileData.fullPath = fullPath; // ファイルのフルパス
    fileData.birthtime = stats.birthtime; // ファイル作成日
    // ファイル作成日を表示用に成形（YYYY/MM/DD-hh:mm:ss）
    fileData.birthtimeFormat = stats.birthtime.getFullYear() // 年
        + '/' + ('0' + (stats.birthtime.getMonth() + 1)).slice(-2) // 月
        + '/' + ('0' + stats.birthtime.getDate()).slice(-2) // 日
        + '-' + ('0' + stats.birthtime.getHours()).slice(-2) // 時
        + ':' + ('0' + stats.birthtime.getMinutes()).slice(-2) // 分
        + ':' + ('0' + stats.birthtime.getSeconds()).slice(-2); // 秒
    arFileData.push(fileData); // 配列に追加
});

// ファイル作成日で昇順にソート
arFileData.sort(function(a, b){
    if(a.birthtime < b.birthtime) return -1; // -1を返す=a→bの順にする
    if(a.birthtime > b.birthtime) return 1; // 1を返す=b→aの順にする
    return 0; // 0を返す=入れ替えなし
});

// 新しいファイル名を作成
var count = 1; // 最初の番号
arFileData.forEach(function(fileData){
    var ext = path.extname(fileData.name).toLowerCase(); // 拡張子を取得（小文字にする）
    var newName = ('0' + count ++).slice(-2) + ext; // 新しいファイル名、連番は２桁
    console.log(fileData.birthtimeFormat + ' ' + fileData.name + '==>' + newName); // ファイル名を表示
    fileData.newFullPath = path.join(dirTarget, newName); // 新しいファイル名のフルパスを保持
    fileData.tempFullPath = path.join(dirTarget, 'temp_' + fileData.name); // 一時退避用の名前
});

rli.prompt(); // プロンプトを表示

// 'line'イベント
// コマンドライン（ターミナル）で『return』が押された時に発生
// 引数のlineに入力された文字が入る
rli.on('line', function(line){ 
    switch(line.trim().toLowerCase()) { // 空白文字を除去し、小文字に変換
        case 'y': 
            // 一度別名を付けて退避
            arFileData.forEach(function(fileData){
                fs.renameSync( // ファイル名を変更
                    fileData.fullPath, // 元ファイル名（フルパス）
                    fileData.tenpFullPath // 一時退避用の名前（フルパス）
                );
            });
            // 新しい名前に変更
            arFileData.forEach(function(fileData){
                fs.renameSync( // ファイル名を変更
                    fileData.tenpFullPath, // 一時退避用の名前（フルパス）
                    fileData.newFullPath // 新しい名前（フルパス）
                );
            });
            console.log('complated!'); // 完了を表示
            rli.close(); // 対話終了
            break;
        case 'n':
            console.log('canceled!'); // キャンセルを表示
            rli.close(); // 対話終了
            break;  
        default:
            rli.prompt(); // 再度プロンプトを表示
            break;
    }
});

// 'close'イベント（下記の場合に発生）
//  rl.close()が呼び出された時
//  コマンドライン（ターミナル）で『control + c』が押された時
//  コマンドライン（ターミナル）で『control + d』が押された時
rli.on('close', function(){ 
    console.log('exit!'); // 完了を表示
    process.exit(0); // プログラムを終了
});