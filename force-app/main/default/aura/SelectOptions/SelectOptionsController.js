({
    doInit:function(component,event,helper)
    {
      helper.handleSobjectChange(component,helper);
    },
    onSobjectChange : function(component, event, helper) {
      helper.handleSobjectChange(component,helper);
	},
    handleListViewChange:function(component,event,helper)
    {
        var appEvent=$A.get("e.c:ListViewEvent");
        console.log("appEvent:"+appEvent);
        console.log("listViewName:"+component.get("v.selectedValue"));
        console.log("sObjectName:"+component.get("v.selectedSobject"));
        appEvent.setParams({ "listViewName" : component.get("v.selectedValue"),"sObjectName":component.get("v.selectedSobject") });
        appEvent.fire();
    }
})