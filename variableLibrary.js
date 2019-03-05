//////////////Load Workflow Functions//////////////////
var workflowFunctionsFile = new File("//spdc-prod/Workflow/Scripts/Configurations/Workflow-Functions/workflowFunctions.js");
workflowFunctionsFile.open(File.ReadOnly);
var workflowFunctionsTxt = workflowFunctionsFile.read();
workflowFunctionsFile.close();
var workflowFunctions = eval(workflowFunctionsTxt);
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

///////////////////XML variables///////////////////////
var coverSheetName = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/coverPressSheet/name",Dataset="Xml",Model="XML"]');
var coverSheetSides = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/coverPressSheet/sides",Dataset="Xml",Model="XML"]');
var device = job.getVariableAsString('[Metadata.Text:Path="/notification/locationId",Dataset="Xml",Model="XML"]');
var fileName = job.getNameProper().toUpperCase();
var impoNumUp = job.getVariableAsNumber('[Metadata.Text:Path="pdf:Subject",Dataset="Xmp",Model="XMP"]');
var lfSides = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/sides",Dataset="Xml",Model="XML"]');
var pieceHeight = job.getVariableAsNumber('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pieceHeight",Dataset="Xml",Model="XML"]');
var pieceWidth = job.getVariableAsNumber('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pieceWidth",Dataset="Xml",Model="XML"]');
var pressSheetName = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pressSheet/name",Dataset="Xml",Model="XML"]');
var pressSheetSides = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pressSheet/sides",Dataset="Xml",Model="XML"]');
var printSub = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/printSubstrateAProductionName",Dataset="Xml",Model="XML"]');
var producerSheetSize = job.getVariableAsString('[Metadata.Text:Path="/notification/sheetSize",Dataset="Xml",Model="XML"]');
var product = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/itemProduct",Dataset="Xml",Model="XML"]');
var proofStatus = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/itemProofStatus",Dataset="Xml",Model="XML"]');
var proofType = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/itemProofType",Dataset="Xml",Model="XML"]');
var qty = job.getVariableAsNumber('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/versions/item[1]/quantity",Dataset="Xml",Model="XML"]');
var shareID = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/itemShareId",Dataset="Xml",Model="XML"]');
var sheetHeight = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pressSheet/height",Dataset="Xml",Model="XML"]');
var sheetWidth = job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pressSheet/width",Dataset="Xml",Model="XML"]');
///////////////////////////////////////////////////////

////////////////////Future Stuff///////////////////////
var versionSuffix = job.getVariableAsString('[Job.Name:After="-",Before=".xml"]');
///////////////////////////////////////////////////////
