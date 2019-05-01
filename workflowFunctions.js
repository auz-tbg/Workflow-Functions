//Parse the file name to get the order number
function getOrderNumberFromName(job) {
  var jobData = loadJobData(job);
  var fileName = jobData.fileName;
  var parsedJobName = fileName.split("-");
  var order = parsedJobName[0];

  return order;
}

//Parse the file name to grab order and job number. Find the job path on the server with that info.
function getJobPathFromName(job) {
  var jobData = loadJobData(job);
  var fileName = jobData.fileName;
  var unGroupName = jobData.unGroupName;

  if (unGroupName){
    fileName = unGroupName;
  }

  var parsedJobName = fileName.split("-");
  var order = parsedJobName[0];
  var jobNumber = parsedJobName[1];
  var flowName = jobData.flowName;
  var server = "//tbg-prod/TBG/Jobs/";

  if (flowName.find("SF") != -1){
    server = "//spdc-prod/Production/Jobs/"
  }

//search through the order folder to find the job
  var dirpath = server + order + "/";
  var dir = new Dir(dirpath);
  var folder = dir.entryList("*" + jobNumber + "*", Dir.Dirs);
  var jobPath = folder.toString();

  return jobPath;
}

function getPress(job) {
  var jobData = loadJobData(job);
  var device = jobData.device;
  var press = ''
  //Using the device location Id from the producer submit notification, this table translates the location
  if (device == "137") device = "Envelope";
  if (device == "142") press = "7K-C";
  if (device == "2792") press = "12K-A";
  if (device == "2796") press = "12K-B";
  if (device == "2799") press = "12K-C";
  if (device == "2800") press = "12K-D";
  if (device == "2759") press = "12K-E";
  if (device == "1050") press = "JPress-B";
  if (device == "1051") press = "JPress-C";
  if (device == "359") press = "Oki-A";
  if (device == "361") press = "iJet";
  if (device == "362") press = "v80-A";
  if (device == "363") press = "v80-B";
  if (device == "1205") press = "Ganging";
  if (device == "156") press = "Cutter 1";
  if (device == "157") press = "Cutter 2";
  if (device == "158") press = "Cutter 3";
  if (device == "159") press = "Cutter 4";
  if (device == "385") press = "MC";
  //Return the variable to set the Private data field
  return press;
}

function getIndigoAddress(job) {
  var jobData = loadJobData(job);
  var device = jobData.device;
  var startPath = "//10.45.135."
  var endPath = "/Jobs/Assets/"
  var ip = ''
  //Using the device location Id from the producer submit notification, this table translates the location
  if (device == "142") ip = "20"; //Set 7K-C ip
  if (device == "2792") ip = "101"; //Set 12K-A ip
  if (device == "2796") ip = "111"; //Set 12K-B ip
  if (device == "2799") ip = "121"; //Set 12K-C ip
  if (device == "2800") ip = "131"; //Set 12K-D ip
  if (device == "2759") ip = "141"; //Set 12K-E ip

  var indigoAddress = startPath + ip + endPath
  //Return the variable to set the Private data field
  return indigoAddress;
}

function getVersionHeight(versionList, versionSuffix) {
  var versionHeight = ""
  for (i = 0; i < versionList.length; i++) {
    var version = versionList.getItem(i);
    var xmlVersionName = version.evalToString("./name", null);
    var xmlVersionHeight = version.evalToString("./flatHeight", null);

    if (xmlVersionName == versionSuffix) {
      versionHeight = xmlVersionHeight
    }
  }
  return versionHeight;
}

function getVersionWidth(versionList, versionSuffix) {
  var versionWidth = ""
  for (i = 0; i < versionList.length; i++) {
    var version = versionList.getItem(i);
    var xmlVersionName = version.evalToString("./name", null);
    var xmlVersionWidth = version.evalToString("./flatWidth", null);
    if (xmlVersionName == versionSuffix) {
      versionWidth = xmlVersionWidth
    }
  }
  return versionWidth;
}

function getVersionSku(versionList, versionSuffix) {
  var versionSku = ""
  for (i = 0; i < versionList.length; i++) {
    var version = versionList.getItem(i);
    var xmlVersionName = version.evalToString("./name", null);
    var xmlVersionSku = version.evalToString("./sku", null);

    if (xmlVersionName == versionSuffix) {
      versionSku = xmlVersionSku
    }
  }
  return versionSku;
}

function getVersionQuantity(versionList, versionSuffix) {
  var versionQuantity = ""
  for (i = 0; i < versionList.length; i++) {
    var version = versionList.getItem(i);
    var xmlVersionName = version.evalToString("./name", null);
    var xmlVersionQuantity = version.evalToString("./quantity", null);

    if (xmlVersionName == versionSuffix) {
      versionQuantity = xmlVersionQuantity;
    }
  }
  return versionQuantity;
}

function getBindingStyle(operationList) {
  var bindingStyle = "";
  for (i = 0; i < operationList.length; i++) {
    var operation = operationList.getItem(i);
    var xmlOperationItem = operation.evalToString("./item", null);
    var xmlOperationChoice = operation.evalToString("./choice", null);
    var xmlOperationName = operation.evalToString("./name", null);

    if ((xmlOperationChoice.find("Saddle") != -1) ||
      (xmlOperationChoice.find("Unbound") != -1) ||
      (xmlOperationChoice.find("FoldedNotStapled") != -1)) {
      bindingStyle = "saddleStitch"
    }
    if (xmlOperationChoice.find("Calendar Saddle Stitch") != -1) {
      bindingStyle = "calendarSaddleStitch";
    }

    if ((xmlOperationChoice.find("Coil") != -1) ||
      (xmlOperationName.find("Coil") != -1)) {
      bindingStyle = "coilBook"
    }

    if (xmlOperationChoice.find("Perfect") != -1) {
      bindingStyle = "perfectBound"
    }
  }
  return bindingStyle;
}

function getBindingEdge(operationList) {
  var bindingEdge = '';
  for (i = 0; i < operationList.length; i++) {
    var operation = operationList.getItem(i);
    var xmlOperationItem = operation.evalToString("./item", null);
    var xmlOperationChoice = operation.evalToString("./choice", null);
    var xmlOperationName = operation.evalToString("./name", null);

    if (xmlOperationName.find("Binding Identifier") != -1) {
      bindingEdge = xmlOperationChoice;
    }
  }
  return bindingEdge;
}

function isFourUp(job, operationList) {
  var jobData = loadJobData(job);
  var pieceWidth = jobData.pieceWidth;
  var pieceHeight = jobData.pieceHeight;
  var is4up = false;
  var bindingStyle = getBindingStyle(operationList);
  if (bindingStyle == "saddleStitch") {
    if ((pieceWidth <= 8) &&
      (pieceWidth >= 7) &&
      (pieceHeight >= 6) &&
      (pieceHeight < 7.5)) {
      is4up = true
    }
  }
  return is4up;
}

function isSmallJob(job) {
  var jobData = loadJobData(job);
  var pieceWidth = jobData.pieceWidth;
  var pieceHeight = jobData.pieceHeight;
  var isSmallJob = false;
  if ((pieceHeight < 2) ||
    (pieceWidth < 2)) {
    isSmallJob = true;
  }
  return isSmallJob
}

function isSmallFold(job) {
  var jobData = loadJobData(job);
  var pieceWidth = jobData.pieceWidth;
  var pieceHeight = jobData.pieceHeight;
  isSmallFold = false;
  for (i = 0; i < operationList.length; i++) {
    var operation = operationList.getItem(i);
    var xmlOperationItem = operation.evalToString("./item", null);
    var xmlOperationName = operation.evalToString("./name", null);

    if (((xmlOperationName.find("Score") != -1) ||
        (xmlOperationName.find("Fold") != -1)) &&
      ((pieceWidth <= 4.5) ||
        (pieceHeight <= 4.5)))

    {
      isSmallFold = true
    }
  }
  return isSmallFold
}

function isHardProof(job) {
  var jobData = loadJobData(job);
  var proofStatus = jobData.proofStatus;
  var proofType = jobData.proofType;
  var isHardProof = false;
  if ((proofType.find("Hard Proof") != -1) &&
    (proofStatus != "Approved")) {
    isHardProof = true;
  }
  return isHardProof;
}

function getColorMode(job) {
  var jobData = loadJobData(job);
  var colorMode = "G";
  var coverSide1Ink = jobData.coverSide1Ink;
  var coverSide2Ink = jobData.coverSide2Ink;
  var fileName = jobData.fileName;
  var originalColorMode = jobData.colorMode;
  var product = jobData.product;
  var side1Ink = jobData.side1Ink;
  var side2Ink = jobData.side2Ink;

  if (originalColorMode == "WIDE_GAMUT") {
    colorMode = "W";
    job.log(2, "WIDE_GAMUT: True")
  }

  //Look for Perfect Bound Book Covers
  if ((product.find("Perfect") != -1) &&
    (fileName.find("Cover") != -1)) {
    //Check if the Cover Press Sheet has Black Ink only and if so, set colorMode to G
    if (coverSide2Ink) {
      if ((coverSide1Ink.find("Black") != -1) ||
        (coverSide2Ink.find("Black") != -1)) {
        colorMode = "G";
      }
    } else if (coverSide1Ink) {
      if (coverSide1Ink.find("Black") != -1) {
        colorMode = "G";
      }
    }
  }
  if (side2Ink) {
    if ((side1Ink.find("Black") != -1) ||
      (side2Ink.find("Black") != -1)) {
      colorMode = "G";
    }
  } else if (side1Ink.find("Black") != -1) {
    colorMode = "G";
  }
  return colorMode;
}

function getStockType(sheetName) {
  var stockType = "Coated"
  if (sheetName == "7139-STERLING_80#_LITHO_LABEL_WHITE") {
    stockType = "Coated";
  } else if ((sheetName.indexOf("_U") != -1) ||
    (sheetName.indexOf("CONQ") != -1) ||
    (sheetName.indexOf("_L") != -1) ||
    (sheetName.indexOf("_FW") != -1) ||
    (sheetName.indexOf("DVPT") != -1) ||
    (sheetName.indexOf("_Nat") != -1) ||
    (sheetName.indexOf("_Spkt") != -1) ||
    (sheetName.indexOf("SPKTN") != -1) ||
    (sheetName.indexOf("_Blk") != -1) ||
    (sheetName.indexOf("_Red") != -1) ||
    (sheetName.indexOf("_Nvy") != -1) ||
    (sheetName.indexOf("Coco") != -1) ||
    (sheetName.indexOf("ncoated") != -1) ||
    (sheetName.indexOf("ENVIRONMENT") != -1)) {
    stockType = "Uncoated";
  }
  return stockType
}

function getScodixType(operationList) {
  var scodixType = ''

  for (i = 0; i < operationList.length; i++) {
    var operation = operationList.getItem(i);
    var xmlOperationChoice = operation.evalToString("./choice", null)

    if ((xmlOperationChoice.find("Spot Gloss") != -1) ||
      (xmlOperationChoice.find("Foil Stamp") != -1) ||
      (xmlOperationChoice.find("Emboss") != -1) ||
      (xmlOperationChoice.find("Deboss") != -1) ||
      (xmlOperationChoice.find("Digital Gloss") != -1) ||
      (xmlOperationChoice.find("Digital Foil") != -1) ||
      (xmlOperationChoice.find("Digital Emboss") != -1)) {

      scodixType = xmlOperationChoice;
    }
  }
  return scodixType;
}

function getTemplate(operationList) {
  var template = "undefined";

  for (i = 0; i < operationList.length; i++) {
    var operation = operationList.getItem(i);
    var xmlOperationName = operation.evalToString("./name", null);
    var xmlOperationChoice = operation.evalToString("./choice", null)

    if ((xmlOperationName == "Outside Finishing Die Cutting") ||
      (xmlOperationName == "Outsource Finishing Die Cutting")) {
      template = xmlOperationChoice;
    }
    return template;
  }
  var scodixType = getScodixType(operationList);
  var BC = job.getPrivateData("BC");

  if ((scodixType) &&
    (BC == "true")) {
    template = "ScodixBCLarge";
  }
  return template;
}

function getVariableDataType(operationList) {
  var variableDataType = ''

  for (i = 0; i < operationList.length; i++) {
    var operation = operationList.getItem(i);
    var xmlOperationChoice = operation.evalToString("./choice", null)

    if ((xmlOperationChoice.find("Mailing") != -1) ||
      (xmlOperationChoice.find("Variable") != -1) ||
      (xmlOperationChoice.find("Sequential") != -1)) {
      variableDataType = xmlOperationChoice
    }
  }
  return variableDataType;
}

//get Total Versions in Job
function getTotalVersions(versionList) {
  var totalVersions = versionList.length

  return totalVersions
}

function getSides(job) {
  var jobData = loadJobData(job);
  var pressSheetSides = jobData.pressSheetSides;
  var coverSheetSides = jobData.coverSheetSides;
  var lfSides = jobData.lfSides;
  var fileName = jobData.fileName;
  var sides = '';
  if (pressSheetSides) {
    sides = pressSheetSides;
  }
  if (lfSides) {
    sides = lfSides;
  }
  if (fileName.find("_COVER") != -1) {
    sides = coverSheetSides;
  }
  return sides;
}

function getJobQuanity(job, qty, operationList) {
  var jobData = loadJobData(job);
  var fileName = jobData.fileName;
  var impoNumUp = jobData.impoNumUp;
  var lfGangGroup = jobData.impoNumUp;
  var product = jobData.product;
  var proofType = jobData.proofType;
  var reworkQty = jobData.reworkQty;
  var xmlPages = jobData.pages;
  var finalQty = qty * 1.05
  var bindingStyle = getBindingStyle(operationList);

  if (fileName.find("_IMPO") != -1) {
    if (impoNumUp) {
      qty = Math.ceil(qty / impoNumUp);
    } else {
      qty = 1;
    }
    finalQty = qty;
    return finalQty;
  }

  if (product == "Notepad") {
    if (qty >= 1000) {
      qty *= 1.02;
    } else {
      qty = qty * xmlPages;
    }
    finalQty = qty
  }

  if (proofType == "PR_PROOF") {
    if (bindingStyle.find("perfectBound") != -1) {
      qty = 10;
    } else {
      qty = 5;
    }
    finalQty = qty
  }

  if (bindingStyle.find("addleStitch") != -1) {
    qty += 10;
    finalQty = qty
  }
  if (bindingStyle.find("coilBook") != -1) {
    qty += 3;
    finalQty = qty
  }

  if (bindingStyle.find("perfectBound") != -1) {
    qty += 10 + Math.floor((qty - 100) / 50 * 2);
    finalQty = qty
  }

  for (i = 0; i < operationList.length; i++) {
    var operation = operationList.getItem(i);
    var xmlOperationItem = operation.evalToString("./item", null);
    var xmlOperationName = operation.evalToString("./name", null);

    if ((xmlOperationName == "Folding") ||
      (xmlOperationName.find("Scor") != -1) ||
      (xmlOperationName == "Perforating")) {
      qty += 5;
      finalQty = qty
    }
    if (xmlOperationName.find("FoldFactory") != -1) {
      qty += 40;
      finalQty = qty
    }
    if (xmlOperationName == "Inserting") {
      qty += 40;
      finalQty = qty
    }
    if (xmlOperationName.find("Outsource") != -1) {
      if (qty <= 100) {
        qty *= 1.3;
      } else if (qty <= 250) {
        qty *= 1.12;
      } else if (qty <= 500) {
        qty *= 1.08;
      } else if (qty <= 1000) {
        qty *= 1.07;
      } else if (qty > 1000) {
        qty *= 1.12;
      }
      finalQty = qty
    }
  }

  if (lfGangGroup) {
    if (reworkQty) {
      finalQty = reworkQty;
    } else {
      finalQty = qty
    }
  }
  finalQty = Math.ceil(finalQty);
  return finalQty;
}

function getSheetSize(stockName, job, operationList) {
  var jobData = loadJobData(job);
  var sheetSize = "";
  var shareID = jobData.shareID;
  var uhgProduct = getUHGProduct(job);
  var regex = /-?(\d+[X,x]\d+)-?/;
  var adLam = jobData.adLam;
  var fileName = jobData.fileName;
  var frontLam = jobData.frontLam;
  var sfLamWidth = "";
  var lfGangGroup = jobData.lfGangGroup;
  var mountSub = jobData.mountSub;
  var printSub = jobData.printSub;
  var producerSheetSize = jobData.producerSheetSize;
  var sheetHeight = jobData.sheetHeight;
  var sheetWidth = jobData.sheetWidth;

  if (producerSheetSize) {
    sheetSize = producerSheetSize;
    return sheetSize
  } else if (lfGangGroup) {
    if (lfGangGroup == "UHG") {
      sheetSize = "50X100";
      if (uhgProduct == "Car Magnet") {
        sheetSize = "48X120";
      } else if ((uhgProduct == "Coroplast Sign") ||
        (uhgProduct.indexOf("Sandwich Board Prints") != -1)) {
        sheetSize = "60X120_Coroplast";
      } else if (uhgProduct == "Foamcore Sign") {
        sheetSize = "50X110";
      } else if (uhgProduct == "Kiosk Front Graphic") {
        sheetSize = "60X119";
      } else if ((uhgProduct == "Feather Flags") ||
        (uhgProduct == "Vinyl Banner")) {
        sheetSize = "126X200";
      } else if (uhgProduct == "Table Top Banner") {
        sheetSize = "52X96";
      } else if (uhgProduct == "Roll_up Banner") {
        sheetSize = "126 Roll";
      } else if ((uhgProduct.indexOf("Poster") != -1) ||
        (uhgProduct == "Floor Graphics") ||
        (uhgProduct == "Window Graphic")) {
        sheetSize = "54 Roll";
      }
      return sheetSize

    } else if (lfGangGroup == "Target") {
      if (fileName.indexOf("NOW HIRING WINDOW BANNER") != -1) {
        sheetSize = "54X119"
      } else if (fileName.indexOf("NOW HIRING SIGNICADE") != -1) {
        sheetSize = "60X120"
      } else if (fileName.indexOf("WE_RE HIRING BANNER") != -1) {
        sheetSize = "80X200"
      }
      return sheetSize

    } else if (lfGangGroup == "LFRetail") {
      if (stockName.find("MAGNET") != -1) {
        sheetSize = "48X120";
      } else if (stockName.find("48PT") != -1) {
        sheetSize = "50X100";
      } else if (stockName.find("LEXJET") != -1) {
        sheetSize = "42X120";
      } else if ((stockName.find("SCRIM") != -1) ||
        (stockName.find("SMOOTH") != -1)) {
        sheetSize = "126X200";
      } else if (stockName.find("ECOMEDIA") != -1) {
        sheetSize = "52X96";
      } else if (stockName.find("BACKLIT") != -1) {
        sheetSize = "63X124 Q40 Backlit";
      } else {
        sheetSize = "60X120";

      }
      return sheetSize
    }
  } else if (printSub) {
    printSub = printSub.match(regex);
    var printSubSize = regex.capturedTexts[1];
    var printSubSize1 = printSubSize.split("X");
    var printSubSizeWidth = printSubSize1[0];
    if (fileName.find("Window") != -1) {
      sheetSize = printSubSize;
    }
    else if (frontLam) {
      var frontLamSize = regex.capturedTexts[1];
      sheetSize = frontLamSize;
    }
    else if (mountSub) {
      mountSub.match(regex);
      var mountSubSize = regex.capturedTexts[1].split("X");
      var mountSubSizeWidth = mountSubSize[0];
      sheetWidth = Math.min(printSubSizeWidth, mountSubSizeWidth);
      sheetSize = sheetWidth + "X119";
      if (adLam) {
        if (adLam == "Bronze Adhesive Lam") {
          sheetSize = "43X119";
        }
        return sheetSize;
      }
    }
    else sheetSize = printSubSize;
    return sheetSize;
  } else {
    for (i = 0; i < operationList.length; i++) {
      var operation = operationList.getItem(i);
      var xmlOperationItem = operation.evalToString("./item", null);
      var xmlOperationName = operation.evalToString("./name", null);
      var xmlOperationChoice = operation.evalToString("./choice", null);
      var lamResult = "";
      var lamRegEx = /_(\d+)/g
      var mountRegEx = /_(\d+X\d+)/g
      if (xmlOperationName == "LF Pre-Printing Front Laminate") {
        lamResult = xmlOperationChoice.match(lamRegEx);
        sfLamWidth = lamResult.replace("_", "");
        sheetSize = sfLamWidth + "X" + sheetHeight.replace(".0", "");
        return sheetSize;
      } else if (xmlOperationName == "LF Pre-Printing Front Laminate") {
        lamResult = xmlOperationChoice.match(lamRegEx);
        sfLamWidth = lamResult.replace("_", "");
        sheetSize = sfLamWidth + "X" + sheetHeight.replace(".0", "");
        return sheetSize;
      } else if (xmlOperationName == "LF Front Laminating") {
        lamResult = xmlOperationChoice.match(lamRegEx)
        sfLamWidth = lamResult.replace("_", "");
        sheetSize = sfLamWidth + "X" + sheetHeight.replace(".0", "");
        return sheetSize;
      } else if (xmlOperationName == "LF Back Laminating") {
        lamResult = xmlOperationChoice.match(lamRegEx)
        sfLamWidth = lamResult.replace("_", "");
        sheetSize = sfLamWidth + "X" + sheetHeight.replace(".0", "");
        return sheetSize;
      } else if (xmlOperationName.find("LF Mounting") != -1) {
        var mountSize = xmlOperationChoice.match(mountRegEx).replace("_", "");
        var mountWidth = mountSize.split("X")[0];
        sheetWidth = Math.min(sheetWidth.replace(".0", ""), mountWidth);
        sheetSize = sheetWidth + "X" + sheetHeight
        return sheetSize;
      }
    }
      if (sheetSize == "") {
        sheetSize = sheetWidth.replace(".0", "") + "X" + sheetHeight.replace(".0", "");
        return sheetSize;
      }
  }
  return sheetSize;
}

function getCustomBookletType(operationList, job) {
  var jobData = loadJobData(job);
  var product = jobData.product;
  var bindingStyle = getBindingStyle(operationList);
  var customBookletType = "";
  if (product.find("Custom Booklet") != -1) {
    if (product.find("Cover") != -1) {
      if (bindingStyle == "saddleStitch") {
        customBookletType = "customSaddleCover";
      } else if (bindingStyle == "coilBook") {
        customBookletType = "customCoilCover";
      } else if (bindingStyle == "perfectBound") {
        customBookletType = "customPerfectCover";
      }
    } else if (product.find("Interior") != -1) {
      if (bindingStyle == "saddleStitch") {
        customBookletType = "customSaddleInterior";
      } else if (bindingStyle == "coilBook") {
        customBookletType = "customCoilInterior";
      } else if (bindingStyle == "perfectBound") {
        customBookletType = "customPerfectInterior";
      }
    } else if (product.find("Insert(s)") != -1) {
      if (bindingStyle == "saddleStitch") {
        customBookletType = "customSaddleInsert";
      } else if (bindingStyle == "coilBook") {
        customBookletType = "customCoilInsert";
      } else if (bindingStyle == "perfectBound") {
        customBookletType = "customPerfectInsert";
      }
    }
  }
  return customBookletType;
}

function getUHGProduct(job) {
  var jobData = loadJobData(job);
  var shareID = jobData.shareID;
  shareID = "," + shareID + ","

  function isInDBFile(filePath) {
    var file = new File(filePath);
    file.open(File.ReadOnly);
    var data = file.read();
    file.close();

    if (data.indexOf(shareID) != -1) {
      return true;
    }
    return false;
  }

  var dirpath = "//tbg-prod/RIP/TBG Automation/UHG_Products/";
  var dir = new Dir(dirpath);
  var fileList = dir.entryList("*.txt", Dir.Files);
  //job.log(2, "Prod List: " + fileList);

  for (var a in fileList) {
    var fileName = fileList[a];
    var filePath = dirpath + fileName

    if (isInDBFile(filePath)) {
      return fileName.replace(".txt", "");
    }
  }
  return "Not Configured";
}

function getNumberAcross(tWidth, sheetWidth) {
  sheetWidth += 2
  var numAcross = 0;

  numAcross = Math.floor(sheetWidth / tWidth)

  return numAcross;
}

function getNumberDown(tHeight, sheetHeight) {
  sheetHeight += 2
  var numDown = 0;

  numDown = Math.floor(sheetHeight / tHeight)

  return numDown;
}

function getCurrentTimeStamp() {
  var today = new Date();
  var timeStamp = today.getTime();

  return timeStamp
}

function getElaspsedTime(startTime) {
  var timeStamp = getCurrentTimeStamp();
  var elapsedTime = (timeStamp - startTime) / 1000;

  return elapsedTime
}

function getGoogleID(userName) {
  var googleID = 'undefined'
  var userKey = userName.toLowerCase().replace(' ', '');


  switch (userKey) {
  case "alanstratton":
    googleID = '105319433137268781003';
    break;
  case "alissadole":
    googleID = '114108486235181002384';
    break;
  case "andrewoswood":
    googleID = '100634920171074119711';
    break;
  case "barbyoung":
    googleID = '117591163301022489322';
    break;
  case "brendacloutier":
    googleID = '111540185182795186848';
    break;
  case "coryfeil":
    googleID = '109655500669959769376';
    break;
  case "danholley":
    googleID = '112179811994858754400';
    break;
  case "daveyerxa":
    googleID = '102242822331687709628';
    break;
  case "debangell":
    googleID = '110577953053513546451';
    break;
  case "dianasammler":
    googleID = '114824163981712422936';
    break;
  case "diegodiaz":
    googleID = '116615107094393692813';
    break;
  case "dontewhite":
    googleID = '113404198977414094431';
    break;
  case "edgarrivera":
    googleID = '112248663302833325607';
    break;
  case "erikotto":
    googleID = '105356723970043743228';
    break;
  case "janapederson":
    googleID = '110943842888774790056';
    break;
  case "jeffgolfis":
    googleID = '103706255863768882779';
    break;
  case "jerryfritz":
    googleID = '113039384763249870070';
    break;
  case "joekadlec":
    googleID = '102320879515205637964';
    break;
  case "kellybergeron":
    googleID = '112538674769358419382';
    break;
  case "keishabigelow":
    googleID = '108902209270830568099';
    break;
  case "kurtpeters":
    googleID = '109098933375591108116';
    break;
  case "leerogers":
    googleID = '107695763694134037464';
    break;
  case "lucyworrel":
    googleID = '103348019010473666703';
    break;
  case "mattblum":
    googleID = '102722980113446282164';
    break;
  case "melissamorrison":
    googleID = '113567893227891159851';
    break;
  case "michaelbrowning":
    googleID = '117315350860053748946';
    break;
  case "renaepille":
    googleID = '116871546140706638781';
    break;
  case "thomascosgrove":
    googleID = '107301505193925122944';
    break;
  case "tytschumperlin":
    googleID = '111451475544037242055';
    break;
  case "waynekalal":
    googleID = '105797213364342459130';
    break;

  default:
    googleID = 'undefined';
    break;

}

return googleID
}

function getTotalJobsForGangPWAssemble(products, job) {
  var phoenixData = loadPhoenixData(job);
  var jobData = loadJobData(job);
  var fileName = jobData.fileName
  var newLayoutNumber = 1
  var totalJobs = 1;
  for (i = 0; i < products.length; i++) {
    var productName = products.getItem(i).evalToString("./name", null);
    var layoutNumber = products.getItem(i).evalToString("./layouts/layout/@index", null);

    if (productName == fileName) {
      newLayoutNumber = layoutNumber;

      var notification = new Document(job.getDataset("Phoenix Plan").getPath());
      var layout = notification.evalToNodes("/job/layouts/layout", null);

      for (j = 0; j < layout.length; j++) {
        var layoutIndex = layout.getItem(j).evalToString("./index", null);

        if (newLayoutNumber == layoutIndex) {
          totalJobs = layout.getItem(j).evalToNumber("./product-count", null) + 1;
        }
      }
    }
  }
  return totalJobs
}

function getLayoutNumber(products, totalVersions, job) {
  var phoenixData = loadPhoenixData(job);
  var jobData = loadJobData(job);
  var fileName = jobData.fileName
  var phoenixID = phoenixData.phoenixID
  var newLayoutNumber = null;
  for (i = 0; i < products.length; i++) {
    var productName = products.getItem(i).evalToString("./name", null);
    var layoutNumber = products.getItem(i).evalToString("./layouts/layout/@index", null);
    var fileName = job.getNameProper();
    if ((totalVersions > 1) && (productName.find("-Set") == -1)) {
      fileName += " - 1";
    }
    if (productName.replace("-Set - 1", "") == fileName) {
      newLayoutNumber = layoutNumber;
    }
    if (productName.replace("-Set", "") == fileName) {
      newLayoutNumber = layoutNumber;
    }
  }
  newLayoutNumber = parseFloat(newLayoutNumber);
  if (newLayoutNumber < 10) {
    newLayoutNumber = "0" + newLayoutNumber;
  }
  return newLayoutNumber
}

function isBucketJob(operationList) {
  var isBucketJob = "false";

  for (i = 0; i < operationList.length; i++) {
    var operation = operationList.getItem(i);
    var xmlOperationName = operation.evalToString("./name", null);
    var xmlOperationChoice = operation.evalToString("./choice", null);

    if (xmlOperationName == "LF Bucket Job") {
      if (xmlOperationChoice.find("Yes") != -1) {
        isBucketJob = "true";
      }
    }
  }
  return isBucketJob
}

function getPhoenixCoverSheetMarks(job, taskList, taskListDetail){
//Phoenix Routing Map v2.2
//This script is common to Step & Repeat and Chop Cut configurators in Imposition Setup Phoenix
//Also common to Booklet Imposition flow, but requires one mark swap (see below)
//Please apply any updates to all three
var jobData = loadJobData(job);
var shipmentType = jobData.shipmentType;
var singleJobShipment = jobData.singleJobShipment;
var smallJob = isSmallJob(job);
var pieceWidth = jobData.pieceWidth;
var pieceHeight = jobData.pieceHeight;
var qty = jobData.qty;
var pages = jobData.pages;


if (smallJob){
  return
}
//create empty object
var mark = {};

//***COMMENT OUT MARKS ACCORDING TO FLOW***
//Imposition Setup Phoenix flow only, comment out if Booklet Imposition:
//Booklet Imposition flow only, comment out if Imposition Setup Phoenix:
// mark["ProductSize v2"] = true;

//***SCRIPT COMMON FROM THIS POINT FORWARD***
mark["Product Index Number v1"] = true;

//create keys and values within object
for (i = 0; i < taskList.length; i++) {
  var task = taskList.getItem(i);
  var taskName = task.evalToString("./name", null);
  var taskDetail = task.evalToString("./details/item/title", null);
  //laminating group
  if (taskName == "Laminate") {
    mark["Bindery Tasks/compositeCoat"] = true;
    if (taskDetail.find("Gloss") != -1) {
      mark["Bindery Tasks/compositeCoatLG"] = true;
    }
    if (taskDetail.find("Matte") != -1) {
      mark["Bindery Tasks/compositeCoatLM"] = true;
    }
    if (taskDetail.find("Other") != -1) {
      mark["Bindery Tasks/compositeCoatLO"] = true;
    }
    if (taskDetail.find("Soft") != -1) {
      mark["Bindery Tasks/compositeCoatLS"] = true;
    }
  }
  //coating group
  if (taskName == "Coat") {
    mark["Bindery Tasks/compositeCoat"] = true;
    if (taskDetail.find("Gloss") != -1) {
      mark["Bindery Tasks/compositeCoatUVG"] = true;
    }
    if (taskDetail.find("Matte") != -1) {
      mark["Bindery Tasks/compositeCoatUVM"] = true;
    }
    if (taskDetail.find("Soft") != -1) {
      mark["Bindery Tasks/compositeCoatST"] = true;
    }
  }
  //saddle stitch group, loop through item-detail-item-titles looking for square back
  if (taskName == "Bind") {
    mark["Bindery Tasks/compositeBinding"] = true;
    for (j = 0; j < taskListDetail.length; j++) {
      var taskDetail = taskListDetail.getItem(j);
      var taskDetailTitle = taskDetail.evalToString("./title");
      if ((taskDetailTitle == "Saddle Stitch") ||
        (taskDetailTitle == "Calendar Saddle Stitch")) {
        mark["Bindery Tasks/compositeSaddleStitch2"] = true;
      }
      if (taskDetailTitle == "Saddle Stitch with Square Back") {
        mark["Bindery Tasks/compositeSquareBack"] = true;
      }
    }
  }
  //simple tasks
  if (taskName == "Perfect Bind") {
    mark["Bindery Tasks/compositeBinding"] = true;
    mark["Bindery Tasks/compositePerfectBind"] = true;
  }
  if (taskName == "Magnetize") {
    mark["Bindery Tasks/compositeMagnetize"] = true;
    mark["Bindery Tasks/compositeMagnetize2"] = true;
  }
  if (taskName == "Guillotine Cut") {
    mark["Bindery Tasks/compositeGuillotine"] = true;
    mark["Bindery Tasks/compositeGuillotine2"] = true;
  }
  if (taskName == "Duplo Cut") {
    mark["Bindery Tasks/compositeDuploCut"] = true;
    mark["Bindery Tasks/compositeDuploCut2"] = true;
  }
  if (taskName == "Motion Cut") {
    mark["Bindery Tasks/compositeMotionCut"] = true;
    mark["Bindery Tasks/compositeMotionCut2"] = true;
  }
  if (taskName.find("Fold") != -1) {
    mark["Bindery Tasks/compositeFold"] = true;
    mark["Bindery Tasks/compositeFold2"] = true;
  }
  if (taskName == "Perforate") {
    mark["Bindery Tasks/compositePerforate"] = true;
    mark["Bindery Tasks/compositePerforate2"] = true;
  }
  if (taskName.find("Score") != -1) {
    mark["Bindery Tasks/compositeFold"] = true;
    mark["Bindery Tasks/compositeScore2"] = true;
  }
  if (taskName.find("Drill") != -1) {
    mark["Bindery Tasks/compositeDrill"] = true;
    mark["Bindery Tasks/compositeDrill2"] = true;
  }
  if (taskName.find("Round Corner") != -1) {
    mark["Bindery Tasks/compositeRoundCorner"] = true;
    mark["Bindery Tasks/compositeRoundCorner2"] = true;
  }
  if (taskName == "Coil Bind") {
    mark["Bindery Tasks/compositeCoilBind"] = true;
    mark["Bindery Tasks/compositeCoilBind2"] = true;
  }
  if (taskName == "Staple") {
    mark["Bindery Tasks/compositeStaple"] = true;
    mark["Bindery Tasks/compositeStaple2"] = true;
  }
  if (taskName == "Fan Apart Glue") {
    mark["Bindery Tasks/compositePadding"] = true;
    mark["Bindery Tasks/compositeFanApart"] = true;
  }
  if (taskName == "Pad") {
    mark["Bindery Tasks/compositePadding"] = true;
    mark["Bindery Tasks/compositePadding2"] = true;
  }
  if (taskName.find("Shrink Wrap") != -1) {
    mark["Bindery Tasks/compositeShrinkWrap"] = true;
    mark["Bindery Tasks/compositeShrinkWrap2"] = true;
  }
  if (taskName == "Belly Band") {
    mark["Bindery Tasks/compositeBellyBand"] = true;
    mark["Bindery Tasks/compositeBellyBand2"] = true;
  }
  if (taskName.find("Tabbing") != -1) {
    mark["Bindery Tasks/compositeTabbing"] = true;
    mark["Bindery Tasks/compositeTabbing2"] = true;
  }
  if (taskName.find("Insert") != -1) {
    mark["Bindery Tasks/compositeInserting"] = true;
    mark["Bindery Tasks/compositeInserting2"] = true;
  }
  if (taskName.find("Glue / Perf / Fold") != -1) {
    mark["Bindery Tasks/compositeGluing"] = true;
    mark["Bindery Tasks/compositeGluing2"] = true;
  }
  if (taskName.find("Kit") != -1) {
    mark["Bindery Tasks/compositeKitting"] = true;
    mark["Bindery Tasks/compositeKitting2"] = true;
  }
  if (taskName.find("Outsource") != -1) {
    mark["Bindery Tasks/compositeOutsource"] = true;
    mark["Bindery Tasks/compositeOutsource2"] = true;
  }
  if (taskName == "Special Shipping") {
    mark["Bindery Tasks/compositeShip"] = true;
    mark["Bindery Tasks/compositeShip2"] = true;
  }
  if (taskName == "Mail") {
    mark["Bindery Tasks/compositeMail"] = true;
    mark["Bindery Tasks/compositeMail2"] = true;
  }
}
//exception: use only fold mark if both fold and score exist
if (("Bindery Tasks/compositeFold2" in mark) && ("Bindery Tasks/compositeScore2" in mark)) {
  mark["Bindery Tasks/compositeScore2"] = false;
}
//exception: if both soft touch and motion cut, change soft touch from laminate to coating
if (("Bindery Tasks/compositeCoatLS" in mark) && ("Bindery Tasks/compositeMotionCut2" in mark)) {
  mark["Bindery Tasks/compositeCoatLS"] = false;
  mark["Bindery Tasks/compositeCoatST"] = true;
  job.log(2, "Routing Map: Soft Touch Lam LS Converted to Coating ST");
}
//exception: use S1 if a SS Book is wider than or equal to  18.5" OR Taller than or equal to 12"
if (("Bindery Tasks/compositeSaddleStitch2") in mark &&
	((pieceWidth >= 18.5) ||
	(pieceHeight >= 12))){
	mark["Bindery Tasks/compositeSaddleStitch2"] = false;
	mark["Bindery Tasks/compositeSaddleStitch2_1"] = true;
}
//exception: use S2 if a SS Book is more than 36 pages
if (("Bindery Tasks/compositeSaddleStitch2") in mark &&
	((pages >= 36) &&
	 (pieceWidth < 18.5) &&
	(pieceHeight < 12))){
	mark["Bindery Tasks/compositeSaddleStitch2"] = false;
	mark["Bindery Tasks/compositeSaddleStitch2_2"] = true;
}
//exception: use S2 if a SS Book is set up as 2up through stitcher
if (("Bindery Tasks/compositeSaddleStitch2") in mark &&
	((pieceHeight <=6.0) &&
	 (pieceWidth <= 18.0) &&
	 (pieceWidth >= pieceHeight) &&
	 (qty >= 99))){
	mark["Bindery Tasks/compositeSaddleStitch2"] = false;
	mark["Bindery Tasks/compositeSaddleStitch2_2"] = true;
}
//create array and push mark keys with value "true" into it
var marks = [];
for (var a in mark) {
  if (mark[a]) marks.push(a);
}
//insert shipping marks at beginning of array
if (shipmentType) {
  marks.unshift(shipmentType);
} else {
  if (singleJobShipment == "True") {
    marks.unshift("SINGLE_SHIPMENT_SINGLE_JOB");
  } else {
    marks.unshift("SINGLE_SHIPMENT_MULTIPLE_JOB");
  }
}

//format array to be newline-delimited for Phoenix
var newMark = marks.join("\n");
return newMark;
}
function getLamCoatType(taskList){
//create keys and values within object
for (i = 0; i < taskList.length; i++) {
  var task = taskList.getItem(i);
  var taskName = task.evalToString("./name", null);
  var taskDetail = task.evalToString("./details/item/title", null);
  //laminating group
  if (taskName == "Laminate") {
    return taskDetail;
  }
  //coating group
  if (taskName == "Coat") {
    return taskDetail;
  }
}
}

function getTotalJobsForGangPWAssemble(products, job) {
  var phoenixData = loadPhoenixData(job);
  var jobData = loadJobData(job);
  var fileName = jobData.fileName
  var newLayoutNumber = 1
  var totalJobs = 1;
  for (i = 0; i < products.length; i++) {
    var productName = products.getItem(i).evalToString("./name", null);
    var layoutNumber = products.getItem(i).evalToString("./layouts/layout/@index", null);

    if (productName == fileName) {
      newLayoutNumber = layoutNumber;

      var notification = new Document(job.getDataset("Phoenix Plan").getPath());
      var layout = notification.evalToNodes("/job/layouts/layout", null);

      for (j = 0; j < layout.length; j++) {
        var layoutIndex = layout.getItem(j).evalToString("./index", null);

        if (newLayoutNumber == layoutIndex) {
          totalJobs = layout.getItem(j).evalToNumber("./product-count", null) + 1;
        }
      }
    }
  }
  return totalJobs
}

function getLayoutNumber(products, totalVersions, job) {
  var phoenixData = loadPhoenixData(job);
  var jobData = loadJobData(job);
  var fileName = jobData.fileName
  var phoenixID = phoenixData.phoenixID
  var newLayoutNumber = null;
  for (i = 0; i < products.length; i++) {
    var productName = products.getItem(i).evalToString("./name", null);
    var layoutNumber = products.getItem(i).evalToString("./layouts/layout/@index", null);
    var fileName = job.getNameProper();
    if ((totalVersions > 1) && (productName.find("-Set") == -1)) {
      fileName += " - 1";
    }
    if (productName.replace("-Set - 1", "") == fileName) {
      newLayoutNumber = layoutNumber;
    }
    if (productName.replace("-Set", "") == fileName) {
      newLayoutNumber = layoutNumber;
    }
  }
  newLayoutNumber = parseFloat(newLayoutNumber);
  if (newLayoutNumber < 10) {
    newLayoutNumber = "0" + newLayoutNumber;
  }
  return newLayoutNumber
}

function loadJobData(job) {
  return {
    adLam: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/adhesiveLaminateAProductionName",Dataset="Xml",Model="XML"]'),
    csr: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderCSR",Dataset="Xml",Model="XML"]'),
    colorMode: job.getVariableAsString('[Metadata.Text:Path="/notification/colorMode",Dataset="Xml",Model="XML"]'),
    coverSheetName: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/coverPressSheet/name",Dataset="Xml",Model="XML"]'),
    coverSheetSides: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/coverPressSheet/sides",Dataset="Xml",Model="XML"]'),
    coverSide1Ink: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/coverPressSheet/side1Ink",Dataset="Xml",Model="XML"]'),
    coverSide2Ink: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/coverPressSheet/side2Ink",Dataset="Xml",Model="XML"]'),
    device: job.getVariableAsString('[Metadata.Text:Path="/notification/locationId",Dataset="Xml",Model="XML"]'),
    fileName: job.getNameProper().toUpperCase(),
    flowName: job.getVariableAsString('[Switch.FlowName]'),
    frontLam: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/frontLaminateProductionName",Dataset="Xml",Model="XML"]'),
    impoNumUp: job.getVariableAsNumber('[Metadata.Text:Path="pdf:Subject",Dataset="Xmp",Model="XMP"]'),
    lfGangGroup: job.getPrivateData("group"),
    lfSides: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/sides",Dataset="Xml",Model="XML"]'),
    mountSub: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/mountSubstrateProductionName",Dataset="Xml",Model="XML"]'),
    nestName: job.getVariableAsString('[Metadata.Text:Path="/notification/nestName",Dataset="ComboXml",Model="XML"]'),
    paceComboNumber: job.getVariableAsString('[Metadata.Text:Path="/notification/comboJob",Dataset="ComboXml",Model="XML"]'),
    pages: job.getVariableAsNumber('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pages",Dataset="Xml",Model="XML"]'),
    pieceHeight: job.getVariableAsNumber('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pieceHeight",Dataset="Xml",Model="XML"]'),
    pieceWidth: job.getVariableAsNumber('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pieceWidth",Dataset="Xml",Model="XML"]'),
    pressSheetName: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pressSheet/name",Dataset="Xml",Model="XML"]'),
    pressSheetSides: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pressSheet/sides",Dataset="Xml",Model="XML"]'),
    printSub: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/printSubstrateAProductionName",Dataset="Xml",Model="XML"]'),
    producerSheetSize: job.getVariableAsString('[Metadata.Text:Path="/notification/sheetSize",Dataset="Xml",Model="XML"]'),
    product: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/itemProduct",Dataset="Xml",Model="XML"]'),
    proofStatus: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/itemProofStatus",Dataset="Xml",Model="XML"]'),
    proofType: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/itemProofType",Dataset="Xml",Model="XML"]'),
    qty: job.getVariableAsNumber('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/versions/item[1]/quantity",Dataset="Xml",Model="XML"]'),
    reworkQty: job.getPrivateData("reworkQty"),
    shareID: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/itemShareId",Dataset="Xml",Model="XML"]'),
    sheetHeight: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pressSheet/height",Dataset="Xml",Model="XML"]'),
    sheetWidth: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pressSheet/width",Dataset="Xml",Model="XML"]'),
    shipmentType: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/shipmentType",Dataset="Xml",Model="XML"]'),
    side1Ink: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pressSheet/side1Ink",Dataset="Xml",Model="XML"]'),
    side2Ink: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/orderItemPrintJob/pressSheet/side2Ink",Dataset="Xml",Model="XML"]'),
    singleJobShipment: job.getVariableAsString('[Metadata.Text:Path="/notification/order/orderItem/singleJobShipment",Dataset="Xml",Model="XML"]'),
    siteName: job.getVariableAsString('[Metadata.Text:Path="/notification/workflow/sitename",Dataset="Xml",Model="XML"]'),
    unGroupName: job.getPrivateData("Ungroup.JobName")
  }
}

function loadPhoenixData(job) {
  return {
    phoenixID: job.getVariableAsString('[Metadata.Text:Path="/job/id",Dataset="Phoenix Plan",Model="XML"]'),
    layoutCount: job.getVariableAsString('[Metadata.Text:Path="/job/layout-count",Dataset="Phoenix Plan",Model="XML"]'),
    layoutIndex: job.getVariableAsString('[Metadata.Text:Path="/job/layouts/layout/index",Dataset="Phoenix Plan",Model="XML"]'),
    layoutVersions: job.getVariableAsNumber('[Metadata.Text:Path="/job/layouts/layout/product-count",Dataset="Phoenix Plan",Model="XML"]'),
    layoutRunLength: job.getVariableAsString('[Metadata.Text:Path="/job/layouts/layout/run-length",Dataset="Phoenix Plan",Model="XML"]'),
    productPlaced: job.getVariableAsString('[Metadata.Text:Path="/job/products/product/placed",Dataset="Phoenix Plan",Model="XML"]')
  };
}

(function() {
  /**
   Returns an object to eval()

  */
  var returnObject = {
    getOrderNumberFromName: getOrderNumberFromName,
    getJobPathFromName: getJobPathFromName,
    getPress: getPress,
    getIndigoAddress: getIndigoAddress,
    getVersionHeight: getVersionHeight,
    getVersionWidth: getVersionWidth,
    getVersionSku: getVersionSku,
    getVersionQuantity: getVersionQuantity,
    getBindingStyle: getBindingStyle,
    getBindingEdge: getBindingEdge,
    isBucketJob: isBucketJob,
    isFourUp: isFourUp,
    getLamCoatType: getLamCoatType,
    isSmallJob: isSmallJob,
    isSmallFold: isSmallFold,
    isHardProof: isHardProof,
    getColorMode: getColorMode,
    getStockType: getStockType,
    getTotalVersions: getTotalVersions,
    getVariableDataType: getVariableDataType,
    getScodixType: getScodixType,
    getTemplate: getTemplate,
    getSides: getSides,
    getJobQuanity: getJobQuanity,
    getSheetSize: getSheetSize,
    getCustomBookletType: getCustomBookletType,
    getUHGProduct: getUHGProduct,
    getNumberAcross: getNumberAcross,
    getNumberDown: getNumberDown,
    getCurrentTimeStamp: getCurrentTimeStamp,
    getGoogleID: getGoogleID,
    getPhoenixCoverSheetMarks: getPhoenixCoverSheetMarks,
    loadJobData: loadJobData,
    loadPhoenixData: loadPhoenixData
  }

  return returnObject;
}())
