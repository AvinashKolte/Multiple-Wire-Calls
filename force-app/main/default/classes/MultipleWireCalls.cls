public with sharing class MultipleWireCalls {

@AuraEnabled
public static Opportunity getOpporttunity(String Id){
    return [select id,Name,LeadSource,Type,StageName from Opportunity where Id=:Id limit 1];
    
}

@AuraEnabled(cacheable=true)
public static List<String> fetchLeadSources(String stage){
    //System.debug('inside getLeadSources:'+stage);

List<String> options = new List<String>();

Schema.DescribeFieldResult fieldResult =Schema.sObjectType.Opportunity.fields.LeadSource;
List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();

for( Schema.PicklistEntry f : ple)
{
options.add(f.getValue());
}       
System.debug('options:'+options);
return options;

}

@AuraEnabled(cacheable=true)
public static List<String> getLeadSouceOptions(String stage){
    
    List<String> pickListValuesList= new List<String>();
    Schema.DescribeFieldResult fieldResult = Opportunity.LeadSource.getDescribe();
    List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
    for( Schema.PicklistEntry pickListVal : ple){
        pickListValuesList.add(pickListVal.getLabel());
    }     
    return pickListValuesList;
    
}

}
