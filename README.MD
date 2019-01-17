Chat Bot Platform version  0.01a

npm instal and npm start to run the application

Facebook integration

Things you need: 
1. Facebook developer account
2. Facebook application
3. Facebook page

Steps: 
1. Go to your facebook application and add the messenger product to your app
2. In the messenger product settings generated a page token for the page your bot will be used and copy it to the .env file as FB_PAGE_ACCESS_TOKEN
3. In the messenger product settings subcribe your page to the messenger webhook and add messaging as event 
4. In the webhooks product select to edit page webhooks 
5. Click on Edit subcription
6. Edit the subscription with the url you are hosting your app on(with added /facebook to the end) and the FB_VERIFY_TOKEN from the .env file as token
5. The FB_VERIFY_TOKEN in the .env file has to match the one in the subscription. Verify and send

The bot should be online now and open for all developers added to your facebook app. If you want to add more people to the app go to your facebook application and use the roles menu.

If you want to host it locally you can use ngrok - https://ngrok.com/

On production you have to specify the server to start on host '0.0.0.0'