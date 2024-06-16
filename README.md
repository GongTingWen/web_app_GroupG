# Meraki 繪本著色網站執行指南

## 重要事項
> * 可以連上 MySQL 資料庫的時間：每日中午 12:00 至午夜 12:00
> * Meraki 使用的圖床為試用版，試用期限至 2024/06/27
> * 網頁上的繪本多為示意，若要體驗填色，請閱讀《絲念》和《How to Color》兩本繪本
> * 登入獎勵政策為每連續登入三天解鎖一本繪本、每累積登入十天解鎖一本繪本；目前可供獎勵的繪本數為三本

## 執行步驟
> Step 1: 安裝 XAMPP
>   * 安裝網址 https://www.apachefriends.org/zh_tw/download.html
> 
> Step 2: 安裝 node.js
>   * 免安裝網址 https://nodejs.org/en/download/prebuilt-binaries/current
> 
> Step 3: 打開 cmd，安裝所有執行程式必要之套件
>   * 安裝語法 npm install express body-parser mysql
>
>     ![image](https://github.com/GongTingWen/web_app_GroupG/assets/124494535/c05f1610-b925-4f7c-9662-0145735b5818)
>
> Step 4: 下載 web_app_GroupG 資料夾
>
> Step 5：打開 XAMPP Control Panel，按下 Apache 和 MySQL 右方的 Start
>
> Step 6：點擊 MySQL 的 Admin 進入 phpMyAdmin 頁面
>
> Step 7：新增資料庫 meraki
>
> Step 8：┬點選匯入，選擇 web_app_GroupG 資料夾中的 meraki.sql 檔案，並按下下方的匯入按鈕
>
> Step 9: 資料成功匯入後，打開 cmd，在 node.js 路徑下，執行 node app.js
>   * 若 app.js 和 node.js 不在同一個資料夾中，須在 app.js 前加上檔案路徑
>
> Step 10: 看到終端出現 "Server is running on port http://localhost:3000" 訊息，開啟 "http://localhost:3000"
>   * 完成
>
>     ![image](https://github.com/GongTingWen/web_app_GroupG/assets/124494535/1744f681-9b38-478b-bbba-50527c42cb14)
