public class ListViewController {

    @AuraEnabled
    public static List<String> getListViews(String sObjectName)
    {
       List<String> listViewNames=new List<String>();
       String userName=UserInfo.getName();
       List<ListView> listViews=[SELECT Id, Name,developerName,SobjectType, CreatedDate FROM ListView where SobjectType=:sObjectName];
        for(ListView li:listViews)
        {
            listViewNames.add(li.developerName);
        }
        
        if(listViewNames!=null && listViewNames.size()>0)
        {
            return listViewNames;
        }
        else
        {
            return null;
        }   
    }
}