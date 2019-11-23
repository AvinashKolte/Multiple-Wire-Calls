({
	fireRecordDetailEvent : function(component, event, helper) {
		
	},
    handleApplicationEvent:function(component,event,helper)
    {
           component.set("v.showList",false);
        console.log("in handler of application event-->");
        var sObjectName = event.getParam("sObjectName");
        var listViewName=event.getParam("listViewName");
        console.log("sObjectName:"+sObjectName);
        console.log("listViewName:"+listViewName);
        component.set("v.listViewN",listViewName);
        component.set("v.sObjectN",sObjectName);
        console.log("v.listViewN:"+component.get("v.listViewN"));
        console.log("v.sObjectN:"+component.get("v.sObjectN"));
        component.set("v.showList",true);

    }
    
})