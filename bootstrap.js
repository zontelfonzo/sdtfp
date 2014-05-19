function bs(tabId, changeInfo, tab) {
    var store_url = tab.url;//easier to manip
    if(store_url.length > 0 && changeInfo.status === "complete"){// a basic fucking error check. If you this fails then stop, go outside, and roll around.
    	//decode the url
    	var cut_cnt = -1;//if this remains -1 then an error has occured
    	if(store_url.substr(0,5) === "http:" || store_url.substr(0,5) === "https"){
            if(store_url.substr(0,5) === "http:"){
    			cut_cnt = 7;
    		}else{
    			cut_cnt = 8; //removes the http:// from the url for easy digestion
    		}
            
    		store_url = store_url.substr(cut_cnt,store_url.length-cut_cnt);//extraction

            if(store_url.search("scrap.tf/") == 0){//are we even on Scrap.tf?
            //[Vaild url]
                chrome.pageAction.show(tabId);//here is where I point out that I need to replace all of this :P
                //chrome.tabs.executeScript(tabId, {file: "footer.js"});
    		}
    	}else{
    		//todo:Protocol Error :(
    	}
    }else{
    	if(store_url.length <= 0)
    	{
    		//todo:Page has no url
    	}
    }
};

chrome.tabs.onUpdated.addListener(bs);//entry point of background prosses