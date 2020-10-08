import { LightningElement,wire,api,track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getObjectInfo ,getPicklistValues} from 'lightning/uiObjectInfoApi';
import StageName from '@salesforce/schema/Opportunity.StageName';
import Type from '@salesforce/schema/Opportunity.Type';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import fetchLeadSources from '@salesforce/apex/MultipleWireCalls.fetchLeadSources';
import getOpportunity from '@salesforce/apex/MultipleWireCalls.getOpporttunity';
import getLeadSouceOptions from '@salesforce/apex/MultipleWireCalls.getLeadSouceOptions';

export default class MultipleWireIssue extends LightningElement {
@api oppId;
oppRecord;
@track leadSourceOptions;
@track typeOptions;
@track stageOptions;
selectedStage;
selectedType;
selectedLeadSource;


connectedCallback()
{
    console.log("inside connected callback-->"+this.oppId);
    this.loadOpportunity();
    console.log("before get Lead-->");
    console.log('fetchLeadSources:'+fetchLeadSources);
   // this.loadPicklistValues();
    console.log("after getLead-->");
}

loadOpportunity()
{
    getOpportunity({Id:this.oppId})
    .then(result=>{
        this.oppRecord=result;
        console.log(JSON.stringify(this.oppRecord));
        console.log('StageName:'+this.oppRecord.StageName);
        console.log("type of stage Name:"+typeof this.oppRecord.StageName);
        this.selectedLeadSource=this.oppRecord.StageName;
        this.selectedType=this.oppRecord.Type;
        this.selectedLeadSource=this.oppRecord.LeadSource;

    })
    .catch(error=>{
        console.log("error"+error.body.message);
    })
}
/*
loadPicklistValues()
{
    console.log("inside loadPicklistValues:"+this.oppRecord.StageName);
    fetchLeadSources()
    .then(result=>{
        console.log("inside success :"+JSON.stringify(result));
    })
    .catch(error=>{
        console.log("error;->"+error.body.message);
    })
    console.log("end of loadPicklistValues-->");
}
*/
@wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
opportunityObject;

/*
@wire(fetchLeadSources,{stage:'$oppRecord.StageName'})
wiredLeadSourceOptions({error,data})
{
    console.log("stageName:"+this.oppRecord.StageName);
    console.log("inside wired Lead Sources");
    if(data)
    {
        let options=data;
        this.leadSourceOptions=[];
        options.forEach(element=>{
            this.leadSourceOptions.push({label:element,value:element});
        })
       
        console.log("this.leadSourceOptions:"+JSON.stringify(this.leadSourceOptions));

    }
    if(error)
    {
        console.log("inside error  getLeadSources-->"+error.body.message);
    }
    
}

*/

@wire(getLeadSouceOptions,{stage:'$oppRecord.StageName'})
wiredLeadSourceOptions({error,data})
{
    console.log("inside the lead source options");
    if(data)
    {
        this.leadSourceOptions=[];
        data.forEach(element=>{
            this.leadSourceOptions.push({label:element,value:element});
        })

        console.log("leadSourceOptions:"+JSON.stringify(this.leadSourceOptions));
    }

    if(error)
    {
        console.log("error->"+JSON.stringify(error));
    }
}

@wire(getPicklistValues,
    {
        objectApiName:OPPORTUNITY_OBJECT,
        recordTypeId: '$opportunityObject.data.defaultRecordTypeId',
        fieldApiName: Type
    }
)
wiredTypeOptions({error,data})
{
    console.log("inside wiredTypeOptions-->");
    if(data)
    {
        this.typeOptions=[];
        console.log("data"+data);
        //this.typeOptions=data.values;
        let options=data.values;
        options.forEach(element => {
            this.typeOptions.push({label:element.label,value:element.value});
        });
       //this.typeOptions=options;

        console.log(JSON.stringify(this.typeOptions));
    }

    if(error)
    {
        console.log("error in type options-->"+error.body.message);
    }
}


@wire(getPicklistValues,
    {
        objectApiName:OPPORTUNITY_OBJECT,
        recordTypeId: '$opportunityObject.data.defaultRecordTypeId',
        fieldApiName: StageName
    }
)
wiredStageOptions({error,data})
{
    console.log("inside wiredStageOptions-->");
    if(data)
    {
       this.stageOptions=[];
        console.log("data:-->"+data);
       let options=data.values;
       options.forEach(element => {
            this.stageOptions.push({label:element.label,value:element.value});
        });
        //this.stageOptions=options;
        console.log(JSON.stringify(this.stageOptions));
    }

    if(error)
    {
        console.log("error in Stage options-->"+error.body.message);
    }
}

handleChange(event)
{
 console.log("inside handleChange-->"+event.target.name);
 console.log(event.detail.value);
 //let record=JSON.parse(JSON.stringify(this.oppRecord));
 let record=this.oppRecord;
 //console.log("this.oppRecord.StageName:"+this.oppRecord.StageName);
 //console.log("this.oppRecord.LeadSource"+this.oppRecord.LeadSource);
 //console.log("this.oppRecord.Type:"+this.oppRecord.Type);
 switch(event.target.name)
 {
     case "stage":
         record.StageName=event.detail.value;
         //this.oppRecord.StageName=event.detail.value;
         console.log("this.record.StageName:"+record.StageName);
         //console.log("this.oppRecord.StageName:"+this.oppRecord.StageName);
         this.selectedStage=event.detail.value;
         break;

     case "leadsource":
        record.LeadSource=event.detail.value;
         console.log("this.record.LeadSource"+record.LeadSource);
         //this.oppRecord.LeadSource=event.detail.value;
         //console.log("this.oppRecord.LeadSource"+this.oppRecord.LeadSource);
         this.selectedLeadSource=event.detail.value;
         break;
     case "type":
         record.Type=event.detail.value;
         console.log("this.record.Type:"+record.Type);
         //this.oppRecord.Type=event.detail.value;
         //console.log("this.oppRecord.Type:"+this.oppRecord.Type);
         this.selectedType=event.detail.value;
         break;        
 }
 this.oppRecord=record;
}

}