function getPress(device) {
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
//hello there
    //Return the variable to set the Private data field
    return press;
}

function getIndigoAddress(device) {
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

function isFourUp(pieceWidth, pieceHeight) {
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

function isSmallJob(pieceWidth, pieceHeight) {
    var isSmallJob = false;
    if ((pieceHeight < 2) ||
        (pieceWidth < 2)) {
        isSmallJob = true;
    }
    return isSmallJob
}

function isSmallFold(pieceWidth, pieceHeight) {
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

function isHardProof(proofStatus, proofType) {
    var isHardProof = false;
    if ((proofType.find("Hard Proof") != -1) &&
        (proofStatus != "Approved")) {
        isHardProof = true;
    }
    return isHardProof;
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
//get Total Versions in Job
function getTotalVersions(versionList) {
    var totalVersions = versionList.length

    return totalVersions
}

function getSides(pressSheetSides, coverSheetSides, lfSides, fileName) {
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

function getJobQuanity(qty, fileName, proofType, product, xmlPages, impoNumUp, reworkQty, lfGangGroup, operationList) {
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
          qty = qty * pages;
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

function getSheetSize(lfGangGroup, fileName, printSub, sheetWidth, sheetHeight, stockName, producerSheetSize, shareID) {
    var sheetSize = ''
    var uhgProduct = getUHGProduct(shareID);
    var regex = /-?(\d+[X,x]\d+)-?/;

    if (producerSheetSize) {
        sheetSize = producerSheetSize;
        return sheetSize
    }

    if (lfGangGroup) {
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
        } else {
            if (printSub) {
                printSub = printSub.match(regex);
                var printSubSize = regex.capturedTexts[1];
                var printSubSize1 = printSubSize.split("X");
                var printSubSizeWidth = printSubSize1[0];

                if (fileName.find("Window") != -1) {
                    sheetSize = printSubSize;
                } else if (frontLam) {
                    frontLam.match(regex);
                    var frontLamSize = regex.capturedTexts[1];
                    sheetSize = frontLamSize;
                } else if (mountSub) {
                    mountSub.match(regex);
                    var mountSubSize = regex.capturedTexts[1].split("X");
                    var mountSubSizeWidth = mountSubSize[0];
                    var mountSubSizeHeight = mountSubSize[1];
                    sheetWidth = Math.min(printSubSizeWidth, mountSubSizeWidth);
                    sheetSize = sheetWidth + "X119";
                    if (adLam) {
                        if (adLam == "Bronze Adhesive Lam") {
                            sheetSize = "43X119";
                        }
                    }
                } else sheetSize = printSubSize;
            } else {
                sheetSize = sheetWidth.replace(".0", "") + "X" + sheetHeight.replace(".0", "");
            }
        }
    }

    return sheetSize;
}

function getCustomBookletType(operationList, product) {
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

function getUHGProduct(shareID){
  //Pace Material ID 26
  var rollupBannerDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Roll_up Banners.txt");
  rollupBannerDB.open(File.ReadOnly);
  var rollupBanner = rollupBannerDB.read();
  rollupBannerDB.close();

  //Pace Material ID 28
  var carMagnetDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Car Magnet.txt");
  carMagnetDB.open(File.ReadOnly);
  var carMagnet = carMagnetDB.read();
  carMagnetDB.close();

  //Pace Material ID 23
  var coroplastSignDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Coroplast Sign.txt");
  coroplastSignDB.open(File.ReadOnly);
  var coroplastSign = coroplastSignDB.read();
  coroplastSignDB.close();

  //Pace Material ID 27
  var poster18x24DB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Poster 18x24.txt");
  poster18x24DB.open(File.ReadOnly);
  var poster18x24 = poster18x24DB.read();
  poster18x24DB.close();

  //Pace Material ID 38
  var poster22x28DB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Poster 22x28.txt");
  poster22x28DB.open(File.ReadOnly);
  var poster22x28 = poster22x28DB.read();
  poster22x28DB.close();

  //Pace Material ID 38
  var poster24x36DB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Poster 24x36.txt");
  poster24x36DB.open(File.ReadOnly);
  var poster24x36 = poster24x36DB.read();
  poster24x36DB.close();

  //Pace Material ID 32
  var featherFlagDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Feather Flags.txt");
  featherFlagDB.open(File.ReadOnly);
  var featherFlag = featherFlagDB.read();
  featherFlagDB.close();

  //Pace Material ID 25
  var foamCoreDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Foamcore Sign.txt");
  foamCoreDB.open(File.ReadOnly);
  var foamCore = foamCoreDB.read();
  foamCoreDB.close();

  //Pace Material ID 24
  var sandwichBoardDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Sandwich Board Prints.txt");
  sandwichBoardDB.open(File.ReadOnly);
  var sandwichBoard = sandwichBoardDB.read();
  sandwichBoardDB.close();

  //Pace Material ID 29
  var vinylBannerDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Vinyl Banner.txt");
  vinylBannerDB.open(File.ReadOnly);
  var vinylBanner = vinylBannerDB.read();
  vinylBannerDB.close();

  //Pace Material ID 37
  var tableTopBannerDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Table Top Banner.txt");
  tableTopBannerDB.open(File.ReadOnly);
  var tableTopBanner = tableTopBannerDB.read();
  tableTopBannerDB.close();

  //Pace Material ID 31
  var windowGraphicDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Window Graphic.txt");
  windowGraphicDB.open(File.ReadOnly);
  var windowGraphic = windowGraphicDB.read();
  windowGraphicDB.close();

  //Pace Material ID 30
  var kioskFrontGraphicDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Kiosk Front Graphic.txt");
  kioskFrontGraphicDB.open(File.ReadOnly);
  var kioskFrontGraphic = kioskFrontGraphicDB.read();
  kioskFrontGraphicDB.close();

  //Pace Material ID 40
  var floorGraphicsDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Floor Graphics.txt");
  floorGraphicsDB.open(File.ReadOnly);
  var floorGraphics = floorGraphicsDB.read();
  floorGraphicsDB.close();

  //Pace Material ID 42
  var sandwichBoard2sideDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Sandwich Board Prints 2-Sided.txt");
  sandwichBoard2sideDB.open(File.ReadOnly);
  var sandwichBoard2side = sandwichBoard2sideDB.read();
  sandwichBoard2sideDB.close();

  //Non-Printing Items
  var nonPrintingDB = new File("//tbg-prod/RIP/TBG Automation/UHG_Products/Non-Printing.txt");
  nonPrintingDB.open(File.ReadOnly);
  var nonPrinting = nonPrintingDB.read();
  nonPrintingDB.close();

  var uhgProduct = "Not Configured";

  shareID = "," + shareID + ","

  if (rollupBanner.indexOf(shareID) !=-1){
  uhgProduct = "Roll_up Banner"
  }

  if (carMagnet.indexOf(shareID) !=-1){
  uhgProduct = "Car Magnet"
  }

  if (coroplastSign.indexOf(shareID) !=-1){
  uhgProduct = "Coroplast Sign"
  }

  if (poster18x24.indexOf(shareID) !=-1){
  uhgProduct = "Poster 18x24"
  }

  if (poster22x28.indexOf(shareID) !=-1){
  uhgProduct = "Poster 22x28"
  }

  if (poster24x36.indexOf(shareID) !=-1){
  uhgProduct = "Poster 24x36"
  }

  if (featherFlag.indexOf(shareID) !=-1){
  uhgProduct = "Feather Flags"
  }

  if (foamCore.indexOf(shareID) !=-1){
  uhgProduct = "Foamcore Sign"
  }

  if (sandwichBoard.indexOf(shareID) !=-1){
  uhgProduct = "Sandwich Board Prints"
  }

  if (vinylBanner.indexOf(shareID) !=-1){
  uhgProduct = "Vinyl Banner"
  }

  if (tableTopBanner.indexOf(shareID) !=-1){
  uhgProduct = "Table Top Banner"
  }

  if (windowGraphic.indexOf(shareID) !=-1){
  uhgProduct = "Window Graphic"
  }

  if (kioskFrontGraphic.indexOf(shareID) !=-1){
  uhgProduct = "Kiosk Front Graphic"
  }

  if (floorGraphics.indexOf(shareID) !=-1){
  uhgProduct = "Floor Graphics"
  }

  if (sandwichBoard2side.indexOf(shareID) !=-1){
  uhgProduct = "Sandwich Board Prints 2-Sided"
  }

  if (nonPrinting.indexOf(shareID) !=-1){
  uhgProduct = "Non-Printing"
  }

  return uhgProduct;

}

function getNumberAcross(tWidth, sheetWidth){
sheetWidth += 2
var numAcross = 0;

numAcross = Math.floor(sheetWidth / tWidth)

return numAcross;
}

function getNumberDown(tHeight, sheetHeight){
sheetHeight += 2
var numDown = 0;

numDown = Math.floor(sheetHeight / tHeight)

return numDown;
}

(function() {
    /**
     Returns an object to eval()

    */
    var returnObject = {
        getPress: getPress,
        getIndigoAddress: getIndigoAddress,
        getVersionHeight: getVersionHeight,
        getVersionWidth: getVersionWidth,
        getVersionSku: getVersionSku,
        getVersionQuantity: getVersionQuantity,
        getBindingStyle: getBindingStyle,
        getBindingEdge: getBindingEdge,
        isFourUp: isFourUp,
        isSmallJob: isSmallJob,
        isSmallFold: isSmallFold,
        isHardProof: isHardProof,
				getStockType: getStockType,
        getTotalVersions: getTotalVersions,
        getSides: getSides,
        getJobQuanity: getJobQuanity,
        getSheetSize: getSheetSize,
        getCustomBookletType: getCustomBookletType,
        getUHGProduct: getUHGProduct,
        getNumberAcross: getNumberAcross,
        getNumberDown: getNumberDown
    }

    return returnObject;
}())
