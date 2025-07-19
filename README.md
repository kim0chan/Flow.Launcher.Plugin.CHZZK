# Flow.Launcher.Plugin.CHZZK
CHZZK plugin for [Flow Launcher](https://github.com/Flow-launcher/Flow.Launcher)

![demo](https://github.com/user-attachments/assets/515accae-6b66-4c11-acae-7ef20d9ec6c2)

## Installation
- Open Flow Launcher
- Enter the following command:
```shell
pm install https://github.com/kim0chan/Flow.Launcher.Plugin.CHZZK/releases/download/v1.1.1/plugin.zip
```

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