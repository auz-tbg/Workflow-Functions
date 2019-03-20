//////////////Load Workflow Functions//////////////////
var workflowFunctionsFile = new File("//spdc-prod/Workflow/Scripts/Configurations/Workflow-Functions/workflowFunctions.js");
workflowFunctionsFile.open(File.ReadOnly);
var workflowFunctionsTxt = workflowFunctionsFile.read();
workflowFunctionsFile.close();
var workflowFunctions = eval(workflowFunctionsTxt);
var jobData = workflowFunctions.loadJobData(job);
var phoenixData = workflowFunctions.loadPhoenixData(job);
///////////////////////////////////////////////////////

////////////////Load Operation List////////////////////
var xmlDoc = new Document(job.getDataset("XML").getPath());
var notification = xmlDoc.getDocumentElement();
var operationList = notification.evalToNodes("./order/orderItem/orderItemPrintJob/operations/item", null);
var versionList = notification.evalToNodes("./order/orderItem/orderItemPrintJob/versions/item", null);
///////////////////////////////////////////////////////

//////////////////Operation Nodes//////////////////////
var xmlOperationName = operation.evalToString("./name", null);
var xmlOperationChoice = operation.evalToString("./choice", null);
var xmlOperationAnswer = operation.evalToString("./answer", null);
///////////////////////////////////////////////////////

////////////////////Future Stuff///////////////////////
var versionSuffix = job.getVariableAsString('[Job.Name:After="-",Before=".xml"]');
///////////////////////////////////////////////////////
