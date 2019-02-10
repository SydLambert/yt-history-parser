const {JSDOM}=require("jsdom");
const fs=require("fs");

console.log("Parsing HTML...");
let document=new JSDOM(fs.readFileSync("watch-history.html")).window.document;

console.log("Extracting data...");
let views=document.querySelectorAll(".content-cell.mdl-cell.mdl-cell--6-col.mdl-typography--body-1");

console.log("Processing data...");
views=[...views].reduce((a,e,i)=>{
	let links=[...e.querySelectorAll("a")];
	if(links.length>=2){
		a.push({
			viewId:i,
			videoTitle:links[0].textContent,
			videoLink:links[0].href,
			videoId:links[0].href.split("=")[1],
			channelName:links[1].textContent,
			channelLink:links[1].href,
			channelId:links[1].href.split("/")[4],
			date:new Date(e.childNodes[5].textContent),
		});
	}

	return a;
},[]);

views.forEach((e,i)=>
	views[i]["display"]=`Title: ${e.videoTitle}\nChannel: ${e.channelName}\nLink: ${e.videoLink}`
);

console.log("Top 20 most viewed videos:");
let videoIds=views.map(e=>e.videoId);
videoIds=[...new Set(videoIds)].map(e=>({
	videoId:e,
	views:videoIds.filter(t=>t==e).length
}));
videoIds.sort((a,b)=>b.views-a.views);
console.log(videoIds.slice(0,20).map(e=>views.find(v=>v.videoId==e.videoId).display+`\nViews: ${e.views}\n`).join("\n"));

console.log("Top 30 most viewed channels:")
let channels=[...new Set(views.map(e=>e.channelName))];
channels=channels.map(e=>({name:e,views:views.filter(v=>v.channelName==e).length}));
channels.sort((a,b)=>b.views-a.views);
channels=channels.slice(0,30);
let maxNameLength=channels.reduce((a,e)=>Math.max(a,e.name.length),0);
console.log(channels.map(e=>`\t${e.name+" ".repeat(maxNameLength-e.name.length)} - viewed ${e.views} times`).join("\n"))