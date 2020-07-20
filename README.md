# 準備
0. New Relic のInsert Keyを作成する  
  https://docs.newrelic.com/docs/apis/get-started/intro-apis/types-new-relic-api-keys#event-insert-key

1. Lambda 関数のコードをダウンロードする  
  https://github.com/nrkk-azuma/nr-sns-logger-lambda/releases/tag/0.0.1  
  nr-sns-logger.zip  

2. AWS Lambda 関数を作成する  

 - AWS Lambda > 関数 > 関数の作成  
 - 関数名を入力 ( 例： nr-sns-security-logger )  
 - ランタイム "Node.js 12.x" を選択  
 - 実行ロール "基本的な Lambda アクセス権で新しいロールを作成" を選択  
 - 二段目 "関数コード" パネルのアクション ".zip ファイルのアップロード"　を選択  
 - ダウンロードしたzipファイルを選択し保存  
 - "デザイナー"パネルの"トリガーを追加"をクリック  
 - "トリガーの設定"で、SNSを選び、SNSトピックとしてDeepSecurityで利用しているSNSトピックを選択  
 - "環境変数" で 変数の追加、　キー"NR_INSERT_KEY" 値"0で作成したNew RelicのInsertKey"を入力し保存  

3. 動作確認
 eicarなどでds設定確認
