# Flow.Launcher.Plugin.CHZZK
CHZZK plugin for [Flow Launcher](https://github.com/Flow-launcher/Flow.Launcher)  
![GIF](https://github.com/user-attachments/assets/2590727e-66cd-4a33-9c0b-b94f084c2d39)

## Usage
Keyword|Description
---|---
`cz`|Shows basic features
`cz {query}`|Shows added channels or search on CHZZK
`cz live`|Shows top live channels
`cz category {category name}`|Search for a stream category
`cz add {channel ID}`|Add channel to list
`cz rm \| remove {channel name}`|Remove channel from the list

## API Key
- Log in to [CHZZK Developers center](https://developers.chzzk.naver.com/).
- Click '**내 서비스**(My Services)' and '**애플리케이션 등록**(Register Application)'
- If you have registered the application, now you can check 'Client ID' and 'Client Secret'.
- Go to the directory where the plug-in is installed and create `.env` file.
- Enter the issued Client-ID and Client-Secret in the `.env` file and save it.
```plaintext
CLIENT_ID={YOUR CLIENT ID}
CLIENT_SECRET={YOUR CLIENT SECRET}
```