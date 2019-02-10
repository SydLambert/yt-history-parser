# yt-history-parser
Parses Youtube watch history into manageable JS objects. By default lets you see your most viewed videos and the channels you viewed the most videos from. Very easy to modify and find out some interesting statistics.

## How to use
### Prerequisites
- [NodeJS](https://nodejs.org/en/download/)

### Installation
```sh
git clone https://github.com/SydLambert/yt-history-parser.git
cd yt-history-parser
npm install
```

### Usage
1. Go to [Google Takeout](https://takeout.google.com/)
2. Deselect all Google products except Youtube.
3. In the Youtube data section, choose "Select specific data" and select only "history".
4. Set the data format to JSON and download the archive.
5. Extract the .zip and move watch-history.html into the root directory of yt-history-parser.
6. `npm run start`