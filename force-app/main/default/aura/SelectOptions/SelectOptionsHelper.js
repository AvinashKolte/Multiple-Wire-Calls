({
	handleSobjectChange : function(component,helper) {
		  console.log("inside inputSelect-->");
        var selectCmp = component.find("InputSelectSingle");
        var selectedValue=selectCmp.get("v.value");
        console.log("selectedValue-->"+selectedValue);
		component.set("v.selectedSobject",selectedValue);
        var action=component.get("c.getListViews");
        action.setParams({"sObjectName":selectedValue});
        action.setCallback(this,function(response){
           var state=response.getState();
            alert("state:"+state);
           if (state === "SUCCESS") {
               console.log("response.getReturnValue():"+response.getReturnValue());
               if(!$A.util.isUndefinedOrNull(response.getReturnValue()) && !$A.util.isEmpty(response.getReturnValue()))
               {
                   component.set("v.listViewOptions",response.getReturnValue());
               
            
               }
               
            }
            else if (state === "INCOMPLETE") {
                // do something

            }

            else if (state === "ERROR") {

                var errors = response.getError();

                if (errors) {

                    if (errors[0] && errors[0].message) {

                        console.log("Error message: " +

                                 errors[0].message);

                    }

                } else {

                    console.log("Unknown error");

                }

            }

        });
        $A.enqueueAction(action);
	}
})