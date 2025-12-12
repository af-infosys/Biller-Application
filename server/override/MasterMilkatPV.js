<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head id="ctl00_Head1">
        <script type="text/javascript">
            document.onmousedown = disableclick;
            status = "Right Click Disabled";
            function disableclick(event) {
                if (event.button == 2) {
                    alert(status);
                    return false;
                }
            }
            document.onkeydown = function(e) {
                if (window.event.keyCode == 123 || e.button == 2) {
                    alert("Right Click Disabled");
                    return false;
                }
            }
            //document.onkeydown = function (e) {
            //    if (window.event.keyCode == 17 && event.which == 86) {
            //        alert("Disabled");
            //        return false;
            //    }
            //}
            //document.onkeydown = function (e) {
            //    if (window.event.keyCode == 16 || event.which == 45) {
            //        alert("Insert Disabled");
            //        return false;
            //    }
            //}
            //function disablef12(event){
            //    var x;
            //    if(event.keyCode == "123"){
            //        x = window.alert("Sure?")
            //        return false;
            //        if(x==true) {
            //            window.close();
            //        }
            //    }
            //}
        </script>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <!-- Meta, title, CSS, favicons, etc. -->
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <!-- Bootstrap core CSS -->
        <link href="../css/bootstrap.min.css" rel="stylesheet"/>
        <link href="../fonts/css/font-awesome.min.css" rel="stylesheet"/>
        <link href="../css/animate.min.css" rel="stylesheet"/>
        <!-- Custom styling plus plugins -->
        <link href="../css/custom.css" rel="stylesheet"/>
        <link href="../css/icheck/flat/green.css" rel="stylesheet"/>
        <link href="../css/floatexamples.css" rel="stylesheet" type="text/css"/>
        <link href="../css/datatables/tools/css/dataTables.tableTools.css" rel="stylesheet"/>
        <script src="../js/jqueryNew.js" type="text/javascript"></script>
        <link href="../fonts/GUJ_OS/fonts.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript">

            //function notify(head,body)
            //{
            //    $('#myModel').modal('show');
            //    $('.modal-body').html('<div class="row"><div class="col-sm-7"><h2>'+head+'</h2></div>'+ 
            //    '<div class="col-sm-2"><button class="btn btn-default" style="width:60px;" id="btnNo" >ના</button></div>' +
            //    '<div class="col-sm-2"><button class="btn btn-primary" style="width:60px;" id="btnYes" >હા</button></div></div>' + 
            //    ''+'<br/>'+'<p>'+body+'</p><br/>');
            //    $('#btnNo').click(function() {
            //        return false;
            //    });

            //    $('#btnYes').click(function() {
            //        return true;
            //    })
            //}
        </script>
        <title>પંચાયત
</title>
        <script type="text/javascript">
            function pageLoad() {

                $.ajax({
                    url: "TaxMaster.asmx/SearchTaxChildMaster",
                    data: "{ 'Query':'Cnt'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {

                        if (parseInt(data.d.cChildCount) == 0) {
                            alert("ટેક્ષ માસ્ટર અપુણ હોવા ને કારણે મિલકત બનાવી શકસો નહિ");
                            location.href = "ListMasterTaxPV.aspx";
                        }
                    }
                });

                var inputs = $(':input').keypress(function(e) {
                    if (e.which == 13) {
                        e.preventDefault();

                        //var nextInput = inputs.get(inputs.index(this) + 1);
                        //if (nextInput) {
                        //    nextInput.focus();
                        //}
                    }
                });

                $(document).ready(function(eOuter) {
                    $('input').bind('keypress', function(eInner) {
                        if (eInner.keyCode == 13) //if its a enter key
                        {
                            var tabindex = $(this).attr('tabindex');
                            tabindex++;
                            //increment tabindex

                            //after increment of tabindex ,make the next element focus                    
                            //if ($('[tabindex=' + tabindex + ']').is(':hidden') == true || $('[tabindex=' + tabindex + ']').is(':hidden') == undefined) {
                            //    tabindex++; //increment tabindex
                            //}

                            if ($('[tabindex=' + tabindex + ']').is(':disabled') == true) {
                                for (var j = 0; j < 10; j++) {
                                    tabindex++;
                                    if ($('[tabindex=' + tabindex + ']').is(':disabled') == false) {
                                        break;
                                    }
                                }
                            }
                            $('[tabindex=' + tabindex + ']').focus();
                            return false;
                            // to cancel out Onenter page postback in asp.net
                        }
                    });

                    $('#ctl00_ContentPlaceHolder1_DDLSociety').bind('keypress', function(e) {
                        if (e.keyCode == 13) //if its a enter key
                        {
                            e.preventDefault();
                            var tabindex = $(this).attr('tabindex');
                            tabindex++;
                            //increment tabindex
                            $('[tabindex=' + tabindex + ']').focus();
                        }
                    });

                    $('#ctl00_ContentPlaceHolder1_DDLnLoan').bind('keypress', function(e) {
                        if (e.keyCode == 13) //if its a enter key
                        {
                            e.preventDefault();
                            if ($('#ctl00_ContentPlaceHolder1_DDLnLoan').val() == "1") {
                                $('#ctl00_ContentPlaceHolder1_TxtcBojoRemarks').focus();
                            } else {
                                $('#ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding').focus();
                            }
                            //var tabindex = $(this).attr('tabindex');
                            //tabindex++; //increment tabindex
                            //$('[tabindex=' + tabindex + ']').focus();
                        }
                    });

                    $('#ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding').bind('keypress', function(e) {
                        if (e.keyCode == 13) //if its a enter key
                        {
                            e.preventDefault();
                            var tabindex = $(this).attr('tabindex');
                            tabindex++;
                            //increment tabindex
                            $('[tabindex=' + tabindex + ']').focus();
                        }
                    });

                    $('#ctl00_ContentPlaceHolder1_DDLnPipeLineID').bind('keypress', function(e) {
                        if (e.keyCode == 13) //if its a enter key
                        {
                            e.preventDefault();
                            var tabindex = $(this).attr('tabindex');
                            tabindex++;
                            //increment tabindex
                            $('[tabindex=' + tabindex + ']').focus();
                        }
                    });

                    $('#ctl00_ContentPlaceHolder1_DDLCityOffice').bind('keypress', function(e) {
                        if (e.keyCode == 13) //if its a enter key
                        {
                            e.preventDefault();
                            var tabindex = $(this).attr('tabindex');
                            tabindex++;
                            //increment tabindex
                            $('[tabindex=' + tabindex + ']').focus();
                        }
                    });

                    $('#ctl00_ContentPlaceHolder1_DDLCityWard').bind('keypress', function(e) {
                        if (e.keyCode == 13) //if its a enter key
                        {
                            e.preventDefault();
                            var tabindex = $(this).attr('tabindex');
                            tabindex++;
                            //increment tabindex
                            $('[tabindex=' + tabindex + ']').focus();
                        }
                    });

                    $('#ctl00_ContentPlaceHolder1_DDLPanchayat').bind('keypress', function(e) {
                        if (e.keyCode == 13) //if its a enter key
                        {
                            e.preventDefault();
                            var tabindex = $(this).attr('tabindex');
                            tabindex++;
                            //increment tabindex
                            $('[tabindex=' + tabindex + ']').focus();
                        }
                    });

                    $("input:text").focus(function() {
                        $(this).select();
                    });
                    document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").focus();
                });

                var ID = GetParameterValues('ID');

                function GetParameterValues(param) {
                    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0] == param) {
                            return urlparam[1];
                        }
                    }
                }

                if (ID == undefined) {
                    document.getElementById("ctl00_ContentPlaceHolder1_TxtcMilkatNos").focus();
                    //var CalendarExtenderBehavior = $find("CalendarExtender");
                    //CalendarExtenderBehavior.set_selectedDate(getDateDJ(new Date().format('dd/MM/yyyy'), 'MM/dd/yyyy', 'dd/MM/yyyy'));
                } else {
                    document.getElementById("ctl00_ContentPlaceHolder1_TxtcMilkatNos").setAttribute('disabled', 'disabled');
                    document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").focus();
                }
                //document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").focus();
            }

            function calcTotal() {

                var ID = GetParameterValues('ID');

                function GetParameterValues(param) {
                    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0] == param) {
                            return urlparam[1];
                        }
                    }
                }

                var GdRow = $("#ctl00_ContentPlaceHolder1_GVTax tr").length;
                var grid = document.getElementById("ctl00_ContentPlaceHolder1_GVTax");
                var inputs = grid.getElementsByTagName("input");

                if (ID != undefined) {
                    if ($('#ctl00_ContentPlaceHolder1_HFExists').val() == "1") {
                        for (var i = 0; i < inputs.length - 3; i++) {
                            if (i % 2 == 0) {
                                if (parseFloat(inputs[i].value) < parseFloat($('#HFnNetTaxPaid_' + i + '').val())) {
                                    //alert(i);
                                    //change by drp 23042021
                                    //alert("આના કરતા વધારે રૂપિયાની બીલની પહોચ બની ગઈ છે!");
                                    //change by drp 23022019
                                    //inputs[i].value = $('#HFnNetTaxPaid_' + i + '').val();
                                    break;
                                }
                            } else {
                                if (parseFloat(inputs[i].value) < parseFloat($('#HFnBalancePaid_' + i + '').val())) {
                                    //alert(i);
                                    //alert("આના કરતા વધારે રૂપિયાની બીલની પહોચ બની ગઈ છે!");
                                    //inputs[i].value = $('#HFnBalancePaid_' + i + '').val();
                                    break;
                                }
                            }

                        }
                    }
                }

                var cols;
                var totalcols = 0;
                //var SocietyID = DXSociety.GetValue();
                var SocietyID = $('#ctl00_ContentPlaceHolder1_HFnSocietyID').val();

                inputs[inputs.length - 2].value = 0;
                inputs[inputs.length - 3].value = 0;
                inputs[inputs.length - 1].value = 0;
                for (var i = 0; i < inputs.length - 3; i++) {

                    if (i % 2) {
                        inputs[inputs.length - 2].value = parseFloat(isNaN(parseFloat(inputs[inputs.length - 2].value)) ? 0 : parseFloat(inputs[inputs.length - 2].value)) + parseFloat(isNaN(parseFloat(inputs[i].value)) ? 0 : parseFloat(inputs[i].value));

                    } else {
                        inputs[inputs.length - 3].value = parseFloat(isNaN(parseFloat(inputs[inputs.length - 3].value)) ? 0 : parseFloat(inputs[inputs.length - 3].value)) + parseFloat(isNaN(parseFloat(inputs[i].value)) ? 0 : parseFloat(inputs[i].value));

                    }
                }
                inputs[inputs.length - 1].value = parseFloat(inputs[inputs.length - 2].value) + parseFloat(inputs[inputs.length - 3].value);

            }

            function calcTax() {

                var ID = GetParameterValues('ID');

                function GetParameterValues(param) {
                    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0] == param) {
                            return urlparam[1];
                        }
                    }
                }

                if (ID == undefined) {

                    var confirm_value1 = document.createElement("INPUT");
                    confirm_value1.type = "hidden";
                    confirm_value1.name = "confirm_value";

                    var GdRow = $("#ctl00_ContentPlaceHolder1_GVTax tr").length;
                    var grid = document.getElementById("ctl00_ContentPlaceHolder1_GVTax");
                    var inputs = grid.getElementsByTagName("input");

                    var cols;
                    var totalcols = 0;
                    //var SocietyID = DXSociety.GetValue();
                    var SocietyID = $('#ctl00_ContentPlaceHolder1_HFnSocietyID').val();

                    $.ajax({
                        type: "POST",
                        url: "MilkatMaster.asmx/CalculateTax",
                        //data: "{'NID':'" + ID + "','SocietyID':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNSocietyId").value + "','PropertyType':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value + "','PropertyValue':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value + "','PropertyArea':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value + "','WaterConn':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value + "'}",
                        data: "{'NID':'" + ID + "','SocietyID':'" + SocietyID + "','PropertyType':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value + "','PropertyValue':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value + "','PropertyArea':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value + "','WaterConn':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(response) {
                            if (response.d[0].Msg != null) {
                                alert(response.d[0].Msg);
                                return;
                            }
                            //BindTable(response.d);
                            for (var i = 0; i < inputs.length - 3; i++) {

                                $.each(response.d, function(index, Receipt1) {
                                    if (i == index && i == 0) {
                                        inputs[index].value = Receipt1.TaxAmounts;
                                    } else if (i == index) {
                                        inputs[index + i].value = Receipt1.TaxAmounts;
                                    }
                                });
                            }
                            calcTotal();

                        },
                        failure: function(msg) {
                            alert(msg);
                        }
                    });

                } else {

                    var confirm_value1 = document.createElement("INPUT");
                    confirm_value1.type = "hidden";
                    confirm_value1.name = "confirm_value";

                    if (confirm("તમે વેરાની ગણતરી કરવા માગો છો?")) {

                        var GdRow = $("#ctl00_ContentPlaceHolder1_GVTax tr").length;
                        var grid = document.getElementById("ctl00_ContentPlaceHolder1_GVTax");
                        var inputs = grid.getElementsByTagName("input");

                        var cols;
                        var totalcols = 0;
                        //var SocietyID = DXSociety.GetValue();
                        var SocietyID = $('#ctl00_ContentPlaceHolder1_HFnSocietyID').val();

                        $.ajax({
                            type: "POST",
                            url: "MilkatMaster.asmx/CalculateTax",
                            //data: "{'NID':'" + ID + "','SocietyID':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNSocietyId").value + "','PropertyType':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value + "','PropertyValue':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value + "','PropertyArea':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value + "','WaterConn':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value + "'}",
                            data: "{'NID':'" + ID + "','SocietyID':'" + SocietyID + "','PropertyType':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value + "','PropertyValue':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value + "','PropertyArea':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value + "','WaterConn':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function(response) {
                                if (response.d[0].Msg != null) {
                                    alert(response.d[0].Msg);
                                    return;
                                }
                                //BindTable(response.d);
                                for (var i = 0; i < inputs.length - 3; i++) {

                                    $.each(response.d, function(index, Receipt1) {

                                        if (i == index && i == 0) {
                                            inputs[index].value = Receipt1.TaxAmounts;
                                        } else if (i == index) {
                                            inputs[index + i].value = Receipt1.TaxAmounts;
                                        }
                                    });
                                }
                                calcTotal();

                            },
                            failure: function(msg) {
                                alert(msg);
                            }
                        });
                    }
                }

            }

            function MilkatMaster() {

                var ID = GetParameterValues('ID');
                var E = GetParameterValues('E');
                var D = GetParameterValues('D');
                var Query = '';
                var NID = '';

                function GetParameterValues(param) {
                    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0] == param) {
                            return urlparam[1];
                        }
                    }
                }

                var grid = document.getElementById("ctl00_ContentPlaceHolder1_GVTax");
                var inputs = grid.getElementsByTagName("input");
                var labels = grid.getElementsByTagName("span");

                //var SocietyID = DXSociety.GetValue();
                var SocietyID = $('#ctl00_ContentPlaceHolder1_HFnSocietyID').val();

                var TaxAmounts = "";
                //            var TaxNames = "";

                var flag = '0';
                //            for (i = 0; i < labels.length; i++) {
                //                var TaxNames = TaxNames + labels[i].innerHTML + "¶";
                //            }

                //            for (i = 0; i < inputs.length; i++) {
                //                var TaxAmounts = TaxAmounts + inputs[i].value + "¶";
                //            }
                var currval = ""
                var j = 0;
                for (i = 0; i < inputs.length; i++) {
                    if (flag == '0') {
                        currval = labels[j].innerHTML;
                        if (currval == "") {
                            currval = "0";
                        }
                        var TaxAmounts = TaxAmounts + currval + "¶";
                        flag = '1';
                        j = j + 1;
                    } else {
                        flag = '0';
                    }
                    currval = inputs[i].value;
                    if (currval == "") {
                        currval = "0";
                    }
                    var TaxAmounts = TaxAmounts + currval + "¶";

                }

                var cSurveyType = '';
                if (document.getElementById("ctl00_ContentPlaceHolder1_RBSurveyNo").checked == true) {
                    cSurveyType = '1';
                } else if (document.getElementById("ctl00_ContentPlaceHolder1_RBCitySurveyNo").checked == true) {
                    cSurveyType = '2';
                } else {
                    cSurveyType = '0';
                }

                //add by drp 08072023
                var grid = document.getElementById("ctl00_ContentPlaceHolder1_GVTax");
                var TxtCurrAmt = $("input[id*=TxtCurrAmt]");
                var TxtPreAmt = $("input[id*=TxtPreAmt]");
                var nTxtCurrAmt1 = TxtCurrAmt[0].value;
                var nTxtCurrAmt2 = TxtCurrAmt[1].value;
                var nTxtCurrAmt3 = TxtCurrAmt[2].value;
                var nTxtCurrAmt4 = TxtCurrAmt[3].value;
                var nTxtCurrAmt5 = TxtCurrAmt[4].value;
                var nTxtCurrAmt6 = TxtCurrAmt[5].value;
                var nTxtCurrAmt7 = TxtCurrAmt[6].value;
                var nTxtCurrAmt8 = TxtCurrAmt[7].value;
                var nTxtCurrAmt9 = TxtCurrAmt[8].value;
                var nTxtCurrAmt10 = TxtCurrAmt[9].value;
                var nTxtCurrAmt11 = TxtCurrAmt[10].value;
                var nTxtCurrAmt12 = TxtCurrAmt[11].value;
                var nTxtCurrAmt13 = TxtCurrAmt[12].value;
                var nTxtPreAmt1 = TxtPreAmt[0].value;
                var nTxtPreAmt2 = TxtPreAmt[1].value;
                var nTxtPreAmt3 = TxtPreAmt[2].value;
                var nTxtPreAmt4 = TxtPreAmt[3].value;
                var nTxtPreAmt5 = TxtPreAmt[4].value;
                var nTxtPreAmt6 = TxtPreAmt[5].value;
                var nTxtPreAmt7 = TxtPreAmt[6].value;
                var nTxtPreAmt8 = TxtPreAmt[7].value;
                var nTxtPreAmt9 = TxtPreAmt[8].value;
                var nTxtPreAmt10 = TxtPreAmt[9].value;
                var nTxtPreAmt11 = TxtPreAmt[10].value;
                var nTxtPreAmt12 = TxtPreAmt[11].value;
                var nTxtPreAmt13 = TxtPreAmt[12].value;

                if (document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").value == "") {
                    alert("મકાન માલીકનું નામ જરૂરી છે.");
                    document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").focus();
                } else if (document.getElementById("ctl00_ContentPlaceHolder1_DDLSociety").value == "00000000-0000-0000-0000-000000000000") {
                    alert("સોસાયટીનું નામ જરૂરી છે.");
                    document.getElementById("ctl00_ContentPlaceHolder1_DDLSociety").focus();
                } else if (document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value == "0") {
                    alert("મકાનની ટાઈપ જરૂરી છે.");
                    document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").focus();
                } else if (document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value == "") {
                    alert("મકાનની કીમત જરૂરી છે.");
                    document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").focus();
                } else if (document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value == "0") {
                    alert("નળ કનેક્શન જરૂરી છે.");
                    document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").focus();
                }
                else {
                    if (ID == undefined) {
                        document.getElementById("ctl00_ContentPlaceHolder1_BtnSave").disabled = true;
                        Query = 'I';
                        $.ajax({
                            url: "MilkatMaster.asmx/MilkatMasterAddUpdateDelete",
                            //data: "{ 'Query':'" + Query + "', 'NID':'" + NID + "','cMilkatNos':'" + parseFloat(document.getElementById("ctl00_ContentPlaceHolder1_TxtcMilkatNos").value) + "','CHouseOwnersName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").value + "','CHouseKeepersName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseKeepersName").value + "','cHouseKabjedarName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcHouseKabjedarName").value + "','NSocietyId':'" + parseFloat(document.getElementById("ctl00_ContentPlaceHolder1_DDLNSocietyId").value) + "','cWardName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcWardName").value + "','CHouseNo':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseNo").value + "','nLoan':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnLoan").value + "','NTypeOfBuilding':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value + "','NHouseValue':'" + parseFloat(document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value) + "','nHouseArea':'" + parseFloat(document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value) + "','nPipeLineID':'" + parseFloat(document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value) + "','CDescription':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCDescription").value + "','TaxAmounts':'" + TaxAmounts + "','cNarration':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcNarration").value + "' }",
                            data: "{'Query':'" + Query + "', 'NID':'" + NID + "','cMilkatNos':'" + parseFloat(document.getElementById("ctl00_ContentPlaceHolder1_TxtcMilkatNos").value) + "','CHouseOwnersName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").value + "','CHouseKeepersName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseKeepersName").value + "','cHouseKabjedarName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcHouseKabjedarName").value + "','NSocietyId':'" + SocietyID + "','cWardName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcWardName").value + "','CHouseNo':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseNo").value + "','nLoan':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnLoan").value + "','NTypeOfBuilding':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value + "','NHouseValue':'" + parseFloat(document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value) + "','nHouseArea':'" + parseFloat(document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value) + "','nPipeLineID':'" + parseFloat(document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value) + "','CDescription':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCDescription").value + "','TaxAmounts':'" + TaxAmounts + "','cNarration':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcNarration").value + "','cBojoRemarks':'','cBlockNo':'" + $('#ctl00_ContentPlaceHolder1_TxtcBlockNo').val() + "','cTharavNo':'" + $('#ctl00_ContentPlaceHolder1_TxtcTharavNo').val() + "','dTharavDate':'" + $('#ctl00_ContentPlaceHolder1_TxtdTharavDate').val() + "','AadharCard':'" + $('#ctl00_ContentPlaceHolder1_HFAdhar').val() + "','PanCard':'" + $('#ctl00_ContentPlaceHolder1_TxtPanCardNo').val() + "','RationCard':'" + $('#ctl00_ContentPlaceHolder1_TxtRationCardNo').val() + "','MobileNo':'" + $('#ctl00_ContentPlaceHolder1_TxtMobileNo').val() + "','cSurveyType' : '" + cSurveyType + "','nSurveyNo':'" + $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').val() + "','cSurveyNo':'" + $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').val() + "','cCityOffice':'" + $('#ctl00_ContentPlaceHolder1_DDLCityOffice').val() + "','cCityWard':'" + $('#ctl00_ContentPlaceHolder1_DDLCityWard').val() + "','cCitySheet':'" + $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').val() + "','cCitySurveNo':'" + $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').val() + "','cCitySurveyPanchayat':'" + $('#ctl00_ContentPlaceHolder1_DDLPanchayat').val() + "','nTxtCurrAmt1':'" + nTxtCurrAmt1 + "','nTxtCurrAmt2':'" + nTxtCurrAmt2 + "','nTxtCurrAmt3':'" + nTxtCurrAmt3 + "','nTxtCurrAmt4':'" + nTxtCurrAmt4 + "','nTxtCurrAmt5':'" + nTxtCurrAmt5 + "','nTxtCurrAmt6':'" + nTxtCurrAmt6 + "','nTxtCurrAmt7':'" + nTxtCurrAmt7 + "','nTxtCurrAmt8':'" + nTxtCurrAmt8 + "','nTxtCurrAmt9':'" + nTxtCurrAmt9 + "','nTxtCurrAmt10':'" + nTxtCurrAmt10 + "','nTxtCurrAmt11':'" + nTxtCurrAmt11 + "','nTxtCurrAmt12':'" + nTxtCurrAmt12 + "','nTxtCurrAmt13':'" + nTxtCurrAmt13 + "','nTxtPreAmt1':'" + nTxtPreAmt1 + "','nTxtPreAmt2':'" + nTxtPreAmt2 + "','nTxtPreAmt3':'" + nTxtPreAmt3 + "','nTxtPreAmt4':'" + nTxtPreAmt4 + "','nTxtPreAmt5':'" + nTxtPreAmt5 + "','nTxtPreAmt6':'" + nTxtPreAmt6 + "','nTxtPreAmt7':'" + nTxtPreAmt7 + "','nTxtPreAmt8':'" + nTxtPreAmt8 + "','nTxtPreAmt9':'" + nTxtPreAmt9 + "','nTxtPreAmt10':'" + nTxtPreAmt10 + "','nTxtPreAmt11':'" + nTxtPreAmt11 + "','nTxtPreAmt12':'" + nTxtPreAmt12 + "','nTxtPreAmt13':'" + nTxtPreAmt13 + "'}",
                            dataType: "json",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            success: function(data) {
                                document.getElementById("ctl00_ContentPlaceHolder1_BtnSave").disabled = false;
                                if (data.d.cType == false) {
                                    alert(data.d.Msg);
                                    return;
                                } else {
                                    alert(data.d.Msg + " અને  મિલકત નંબર [ " + data.d.cMilkatNos + " ] છે!");
                                    if (data.d.Msg != "આ મિલકત પહેલેથી ઉમેરેલ છે.") {
                                        location.href = "MasterMilkatPV.aspx";
                                    }
                                }
                            }
                        });
                    } else {
                        NID = ID;
                        if (E == 'kEUY7+XbbAk') {
                            document.getElementById("ctl00_ContentPlaceHolder1_BtnSave").disabled = true;
                            Query = 'U';
                            $.ajax({
                                url: "MilkatMaster.asmx/MilkatMasterAddUpdateDelete",
                                //data: "{ 'Query':'" + Query + "', 'NID':'" + NID + "','cMilkatNos':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcMilkatNos").value + "','CHouseOwnersName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").value + "','CHouseKeepersName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseKeepersName").value + "','cHouseKabjedarName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcHouseKabjedarName").value + "','NSocietyId':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNSocietyId").value + "','cWardName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcWardName").value + "','CHouseNo':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseNo").value + "','nLoan':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnLoan").value + "','NTypeOfBuilding':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value + "','NHouseValue':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value + "','nHouseArea':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value + "','nPipeLineID':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value + "','CDescription':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCDescription").value + "','TaxAmounts':'" + TaxAmounts + "','cNarration':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcNarration").value + "' }",
                                data: "{'Query':'" + Query + "', 'NID':'" + NID + "','cMilkatNos':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcMilkatNos").value + "','CHouseOwnersName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").value + "','CHouseKeepersName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseKeepersName").value + "','cHouseKabjedarName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcHouseKabjedarName").value + "','NSocietyId':'" + SocietyID + "','cWardName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcWardName").value + "','CHouseNo':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseNo").value + "','nLoan':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnLoan").value + "','NTypeOfBuilding':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value + "','NHouseValue':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value + "','nHouseArea':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value + "','nPipeLineID':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value + "','CDescription':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCDescription").value + "','TaxAmounts':'" + TaxAmounts + "','cNarration':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcNarration").value + "','cBojoRemarks':'','cBlockNo':'" + $('#ctl00_ContentPlaceHolder1_TxtcBlockNo').val() + "','cTharavNo':'" + $('#ctl00_ContentPlaceHolder1_TxtcTharavNo').val() + "','dTharavDate':'" + $('#ctl00_ContentPlaceHolder1_TxtdTharavDate').val() + "','AadharCard':'" + $('#ctl00_ContentPlaceHolder1_HFAdhar').val() + "','PanCard':'" + $('#ctl00_ContentPlaceHolder1_TxtPanCardNo').val() + "','RationCard':'" + $('#ctl00_ContentPlaceHolder1_TxtRationCardNo').val() + "','MobileNo':'" + $('#ctl00_ContentPlaceHolder1_TxtMobileNo').val() + "','cSurveyType' : '" + cSurveyType + "','nSurveyNo':'" + $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').val() + "','cSurveyNo':'" + $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').val() + "','cCityOffice':'" + $('#ctl00_ContentPlaceHolder1_DDLCityOffice').val() + "','cCityWard':'" + $('#ctl00_ContentPlaceHolder1_DDLCityWard').val() + "','cCitySheet':'" + $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').val() + "','cCitySurveNo':'" + $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').val() + "','cCitySurveyPanchayat':'" + $('#ctl00_ContentPlaceHolder1_DDLPanchayat').val() + "','nTxtCurrAmt1':'" + nTxtCurrAmt1 + "','nTxtCurrAmt2':'" + nTxtCurrAmt2 + "','nTxtCurrAmt3':'" + nTxtCurrAmt3 + "','nTxtCurrAmt4':'" + nTxtCurrAmt4 + "','nTxtCurrAmt5':'" + nTxtCurrAmt5 + "','nTxtCurrAmt6':'" + nTxtCurrAmt6 + "','nTxtCurrAmt7':'" + nTxtCurrAmt7 + "','nTxtCurrAmt8':'" + nTxtCurrAmt8 + "','nTxtCurrAmt9':'" + nTxtCurrAmt9 + "','nTxtCurrAmt10':'" + nTxtCurrAmt10 + "','nTxtCurrAmt11':'" + nTxtCurrAmt11 + "','nTxtCurrAmt12':'" + nTxtCurrAmt12 + "','nTxtCurrAmt13':'" + nTxtCurrAmt13 + "','nTxtPreAmt1':'" + nTxtPreAmt1 + "','nTxtPreAmt2':'" + nTxtPreAmt2 + "','nTxtPreAmt3':'" + nTxtPreAmt3 + "','nTxtPreAmt4':'" + nTxtPreAmt4 + "','nTxtPreAmt5':'" + nTxtPreAmt5 + "','nTxtPreAmt6':'" + nTxtPreAmt6 + "','nTxtPreAmt7':'" + nTxtPreAmt7 + "','nTxtPreAmt8':'" + nTxtPreAmt8 + "','nTxtPreAmt9':'" + nTxtPreAmt9 + "','nTxtPreAmt10':'" + nTxtPreAmt10 + "','nTxtPreAmt11':'" + nTxtPreAmt11 + "','nTxtPreAmt12':'" + nTxtPreAmt12 + "','nTxtPreAmt13':'" + nTxtPreAmt13 + "'}",
                                dataType: "json",
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                success: function(data) {
                                    alert(data.d.Msg);
                                    document.getElementById("ctl00_ContentPlaceHolder1_BtnSave").disabled = false;
                                    if (data.d.cType == false) {
                                        return;
                                    } else {
                                        location.href = "ListMasterMilkatPV.aspx";
                                    }
                                }
                            });
                        } else if (D == 'kEUY7+XbbAk') {
                            notify("Delete?", "તમે આ માહિતી રદ કરવા માગો છો?");

                        }
                    }
                }
            }

            function notifyNo() {
                location.href = "ListMasterMilkatPV.aspx";
                $('#myModel').modal('hide');
            }
            function notifyYes() {
                $('#myModel').modal('hide');
                function GetParameterValues(param) {
                    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0] == param) {
                            return urlparam[1];
                        }
                    }
                }
                //add by drp 08072023
                var grid = document.getElementById("ctl00_ContentPlaceHolder1_GVTax");
                var TxtCurrAmt = $("input[id*=TxtCurrAmt]");
                var TxtPreAmt = $("input[id*=TxtPreAmt]");
                var nTxtCurrAmt1 = TxtCurrAmt[0].value;
                var nTxtCurrAmt2 = TxtCurrAmt[1].value;
                var nTxtCurrAmt3 = TxtCurrAmt[2].value;
                var nTxtCurrAmt4 = TxtCurrAmt[3].value;
                var nTxtCurrAmt5 = TxtCurrAmt[4].value;
                var nTxtCurrAmt6 = TxtCurrAmt[5].value;
                var nTxtCurrAmt7 = TxtCurrAmt[6].value;
                var nTxtCurrAmt8 = TxtCurrAmt[7].value;
                var nTxtCurrAmt9 = TxtCurrAmt[8].value;
                var nTxtCurrAmt10 = TxtCurrAmt[9].value;
                var nTxtCurrAmt11 = TxtCurrAmt[10].value;
                var nTxtCurrAmt12 = TxtCurrAmt[11].value;
                var nTxtCurrAmt13 = TxtCurrAmt[12].value;
                var nTxtPreAmt1 = TxtPreAmt[0].value;
                var nTxtPreAmt2 = TxtPreAmt[1].value;
                var nTxtPreAmt3 = TxtPreAmt[2].value;
                var nTxtPreAmt4 = TxtPreAmt[3].value;
                var nTxtPreAmt5 = TxtPreAmt[4].value;
                var nTxtPreAmt6 = TxtPreAmt[5].value;
                var nTxtPreAmt7 = TxtPreAmt[6].value;
                var nTxtPreAmt8 = TxtPreAmt[7].value;
                var nTxtPreAmt9 = TxtPreAmt[8].value;
                var nTxtPreAmt10 = TxtPreAmt[9].value;
                var nTxtPreAmt11 = TxtPreAmt[10].value;
                var nTxtPreAmt12 = TxtPreAmt[11].value;
                var nTxtPreAmt13 = TxtPreAmt[12].value;
                var ID = GetParameterValues('ID');
                var E = GetParameterValues('E');
                var D = GetParameterValues('D');
                var Query = '';
                var NID = '';
                var TaxAmounts = "";
                var SocietyID = '';
                NID = ID;
                Query = 'D';
                $.ajax({
                    url: "MilkatMaster.asmx/MilkatMasterAddUpdateDelete",
                    data: "{'Query':'" + Query + "', 'NID':'" + NID + "','cMilkatNos':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcMilkatNos").value + "','CHouseOwnersName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").value + "','CHouseKeepersName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseKeepersName").value + "','cHouseKabjedarName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcHouseKabjedarName").value + "','NSocietyId':'" + SocietyID + "','cWardName':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcWardName").value + "','CHouseNo':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseNo").value + "','nLoan':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnLoan").value + "','NTypeOfBuilding':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value + "','NHouseValue':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value + "','nHouseArea':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value + "','nPipeLineID':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value + "','CDescription':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCDescription").value + "','TaxAmounts':'" + TaxAmounts + "','cNarration':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcNarration").value + "','cBojoRemarks':'" + ($('#ctl00_ContentPlaceHolder1_TxtcBojoRemarks').val()) + "','cBlockNo':'" + $('#ctl00_ContentPlaceHolder1_TxtcBlockNo').val() + "','cTharavNo':'" + $('#ctl00_ContentPlaceHolder1_TxtcTharavNo').val() + "','dTharavDate':'" + $('#ctl00_ContentPlaceHolder1_TxtdTharavDate').val() + "','AadharCard':'" + $('#ctl00_ContentPlaceHolder1_HFAdhar').val() + "','PanCard':'" + $('#ctl00_ContentPlaceHolder1_TxtPanCardNo').val() + "','RationCard':'" + $('#ctl00_ContentPlaceHolder1_TxtRationCardNo').val() + "','MobileNo':'" + $('#ctl00_ContentPlaceHolder1_TxtMobileNo').val() + "','cSurveyType' : '','nSurveyNo':'" + $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').val() + "','cSurveyNo':'" + $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').val() + "','cCityOffice':'" + $('#ctl00_ContentPlaceHolder1_DDLCityOffice').val() + "','cCityWard':'" + $('#ctl00_ContentPlaceHolder1_DDLCityWard').val() + "','cCitySheet':'" + $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').val() + "','cCitySurveNo':'" + $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').val() + "','cCitySurveyPanchayat':'" + $('#ctl00_ContentPlaceHolder1_DDLPanchayat').val() + "','nTxtCurrAmt1':'" + nTxtCurrAmt1 + "','nTxtCurrAmt2':'" + nTxtCurrAmt2 + "','nTxtCurrAmt3':'" + nTxtCurrAmt3 + "','nTxtCurrAmt4':'" + nTxtCurrAmt4 + "','nTxtCurrAmt5':'" + nTxtCurrAmt5 + "','nTxtCurrAmt6':'" + nTxtCurrAmt6 + "','nTxtCurrAmt7':'" + nTxtCurrAmt7 + "','nTxtCurrAmt8':'" + nTxtCurrAmt8 + "','nTxtCurrAmt9':'" + nTxtCurrAmt9 + "','nTxtCurrAmt10':'" + nTxtCurrAmt10 + "','nTxtCurrAmt11':'" + nTxtCurrAmt11 + "','nTxtCurrAmt12':'" + nTxtCurrAmt12 + "','nTxtCurrAmt13':'" + nTxtCurrAmt13 + "','nTxtPreAmt1':'" + nTxtPreAmt1 + "','nTxtPreAmt2':'" + nTxtPreAmt2 + "','nTxtPreAmt3':'" + nTxtPreAmt3 + "','nTxtPreAmt4':'" + nTxtPreAmt4 + "','nTxtPreAmt5':'" + nTxtPreAmt5 + "','nTxtPreAmt6':'" + nTxtPreAmt6 + "','nTxtPreAmt7':'" + nTxtPreAmt7 + "','nTxtPreAmt8':'" + nTxtPreAmt8 + "','nTxtPreAmt9':'" + nTxtPreAmt9 + "','nTxtPreAmt10':'" + nTxtPreAmt10 + "','nTxtPreAmt11':'" + nTxtPreAmt11 + "','nTxtPreAmt12':'" + nTxtPreAmt12 + "','nTxtPreAmt13':'" + nTxtPreAmt13 + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        alert(data.d.Msg);
                        location.href = "ListMasterMilkatPV.aspx";
                    }
                });
            }

            function notify(head, body) {
                document.getElementById("ctl00_ContentPlaceHolder1_lblHeading").innerHTML = head;
                document.getElementById("ctl00_ContentPlaceHolder1_lblBody").innerHTML = body;
                $('#myModel').modal('show');
                document.getElementById('btnNo').focus();
            }
            function CheckData() {
                var HFAdhar = document.getElementById("ctl00_ContentPlaceHolder1_HFAdhar");
                var TxtAadharCardNo = document.getElementById("ctl00_ContentPlaceHolder1_TxtAadharCardNo");
                $.ajax({
                    url: "MilkatMaster.asmx/ReturnData",
                    data: "{ 'Ano':'" + HFAdhar.value + "'}",
                    dataType: "json",
                    async: false,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        TxtAadharCardNo.value = data.d.cAadharcardNo;

                        $('#ctl00_ContentPlaceHolder1_TxtAadharCardNoMask').val(TxtAadharCardNo.value.substring(0, 8).replace(/\d/g, "X") + TxtAadharCardNo.value.substring(8));
                    }
                });
            }
            function CheckEnData() {
                var HFAdhar = document.getElementById("ctl00_ContentPlaceHolder1_HFAdhar");
                var TxtAadharCardNo = document.getElementById("ctl00_ContentPlaceHolder1_TxtAadharCardNo");
                $.ajax({
                    url: "MilkatMaster.asmx/ReturnEnData",
                    data: "{ 'Ano':'" + TxtAadharCardNo.value + "'}",
                    dataType: "json",
                    async: false,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        HFAdhar.value = data.d.cAadharcardNo;
                    }
                });
            }
            function SearchMilkatMaster() { 
 

                var ID = GetParameterValues('ID');
                var E = GetParameterValues('E');
                var D = GetParameterValues('D');
                var Query = '';
                var NID = '';

                function GetParameterValues(param) {
                    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0] == param) {
                            return urlparam[1];
                        }
                    }
                }

                var nEdit = document.getElementById("ctl00_ContentPlaceHolder1_HFEditUserRights");
                var nDelete = document.getElementById("ctl00_ContentPlaceHolder1_HFDeleteUserRights");

                //if (nEdit.value != "1" && E == "kEUY7+XbbAk") {
                //    alert("તમને આ મિલ્કતને સુધારવની પરવાનગી નથી");
                //    location.href = "ListMasterMilkatPV.aspx";
                //    return false;
                //}
                if (nDelete.value != "1" && D == "kEUY7+XbbAk") {
                    alert("તમને આ મિલ્કતને રદ કરવાની પરવાનગી નથી");
                    location.href = "ListMasterMilkatPV.aspx";
                    return false;
                }
                $.ajax({
                    url: "MilkatMaster.asmx/SearchMilkatMaster",
                    data: "{ 'NID':'" + ID + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {

                        $.ajax({
                            url: "MilkatMaster.asmx/SearchMilkatBillaster",
                            data: "{ 'NID':'" + ID + "'}",
                            dataType: "json",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            success: function(data) {
                                var count = 0;

                                if (data.d[0].Msg == "1") {
                                    for (var i = 0; i < data.d.length; i++) {
                                        if (i == 0) {
                                            $('#ctl00_ContentPlaceHolder1_HFExists').val('1');
                                        }
                                        $('body').append('<input type="hidden" id="HFnNetTaxPaid_' + count + '" value="' + data.d[i].nNetTaxPaid + '"></input>');
                                        count += 1;
                                        $('body').append('<input type="hidden" id="HFnBalancePaid_' + count + '" value="' + data.d[i].nBalancePaid + '"></input>');
                                        count += 1;
                                        $('body').append('<input type="hidden" id="HFnPaidRs_' + count + '" value="' + data.d[i].nPaidRs + '"></input>');
                                    }
                                }
                            },
                            failure: function() {
                                alert("Search Time Error!");
                            }
                        });

                        var cMilkatNo = data.d.cMilkatNos;

                        document.getElementById("ctl00_ContentPlaceHolder1_TxtcMilkatNos").value = parseFloat(cMilkatNo);
                        document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").value = data.d.CHouseOwnersName;
                        document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseKeepersName").value = data.d.CHouseKeepersName;
                        document.getElementById("ctl00_ContentPlaceHolder1_TxtcHouseKabjedarName").value = data.d.cHouseKabjedarName;
                        //document.getElementById("ctl00_ContentPlaceHolder1_DDLNSocietyId").value = data.d.NSocietyId;
                        $('#ctl00_ContentPlaceHolder1_HFnSocietyID').val(data.d.NSocietyId);
                        //DXSociety.SetValue(data.d.NSocietyId);
                        document.getElementById("ctl00_ContentPlaceHolder1_DDLSociety").value = data.d.NSocietyId;

                        document.getElementById("ctl00_ContentPlaceHolder1_TxtcWardName").value = data.d.cWardName;
                        document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseNo").value = data.d.CHouseNo;
                        document.getElementById("ctl00_ContentPlaceHolder1_DDLnLoan").value = data.d.nLoan;
                        if (data.d.nLoan == "1") {
                            $('#ctl00_ContentPlaceHolder1_TxtcBojoRemarks').removeAttr('disabled');
                        } else {
                            $('#ctl00_ContentPlaceHolder1_TxtcBojoRemarks').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_TxtcBojoRemarks').val('');
                        }
                        document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").value = data.d.NTypeOfBuilding;
                        document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").value = data.d.NHouseValue;
                        document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value = data.d.nHouseArea;
                        document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").value = data.d.nPipeLineID;
                        document.getElementById("ctl00_ContentPlaceHolder1_TxtCDescription").value = data.d.CDescription;
                        document.getElementById("ctl00_ContentPlaceHolder1_TxtcNarration").value = data.d.cNarration;
                        document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseNo").value = data.d.CHouseNo;
                        document.getElementById("ctl00_ContentPlaceHolder1_TxtcBojoRemarks").value = data.d.cBojoRemarks;
                        $('#ctl00_ContentPlaceHolder1_TxtcBlockNo').val(data.d.cBlockNo);
                        $('#ctl00_ContentPlaceHolder1_TxtcTharavNo').val(data.d.cTharavNo);

                        $('#ctl00_ContentPlaceHolder1_HFAdhar').val(data.d.cAadharcardNo);

                        CheckData();
                        $('#ctl00_ContentPlaceHolder1_TxtPanCardNo').val(data.d.cPancardNo);
                        $('#ctl00_ContentPlaceHolder1_TxtRationCardNo').val(data.d.cRationcardNo);
                        $('#ctl00_ContentPlaceHolder1_TxtMobileNo').val(data.d.cMobileNo);

                        if (data.d.dTharavDate != "") {
                            var CalendarExtenderBehavior = $find("CalendarExtender");
                            CalendarExtenderBehavior.set_selectedDate(getDateDJ(data.d.dTharavDate, 'MM/dd/yyyy', 'dd/MM/yyyy'));
                        }

                        //DXSociety.SetText(data.d.cSocietyName);
                        //if (data.d.nBillNo > 0)
                        //{
                        if (nEdit.value == "0") {
                            document.getElementById("ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding").disabled = true;
                            document.getElementById("ctl00_ContentPlaceHolder1_TxtNHouseValue").disabled = true;
                            document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").disabled = true;
                            document.getElementById("ctl00_ContentPlaceHolder1_DDLnPipeLineID").disabled = true;
                            document.getElementById("ctl00_ContentPlaceHolder1_DDLSociety").disabled = true;
                            document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseOwnersName").disabled = true;
                        }
                        //}

                        var grid = document.getElementById("ctl00_ContentPlaceHolder1_GVTax");
                        var inputs = grid.getElementsByTagName("input");

                        var split = data.d.TaxAmounts.split('¶');

                        for (var i = 0; i < split.length - 1; i++) {
                            if (nEdit.value == "0") {
                                inputs[i].disabled = true;
                            }
                            inputs[i].value = split[i];

                        }

                        calcTotal();

                        if (D != undefined) {
                            MilkatMaster();
                        }

                        var csurvey = data.d.cSurveyType;
                        if (csurvey == "0") {
                            $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_DDLCityOffice').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_DDLCityWard').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_DDLPanchayat').val(data.d.cSurveyPanchayat);
                        } else if (csurvey == "1") {
                            document.getElementById("ctl00_ContentPlaceHolder1_RBSurveyNo").checked = true;
                            $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').val(data.d.cSurveyNo);
                            $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').val(data.d.nSurveyNo);
                            $('#ctl00_ContentPlaceHolder1_DDLCityOffice').val('');
                            $('#ctl00_ContentPlaceHolder1_DDLCityWard').val('00000000-0000-0000-0000-000000000000');
                            $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').val('');
                            $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').val('');
                            $('#ctl00_ContentPlaceHolder1_DDLCityOffice').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_DDLCityWard').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_DDLPanchayat').val(data.d.cSurveyPanchayat);
                        } else if (csurvey == "2") {
                            $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').val('');
                            $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').val('');
                            $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').attr('disabled', 'disabled');
                            $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').attr('disabled', 'disabled');
                            document.getElementById("ctl00_ContentPlaceHolder1_RBCitySurveyNo").checked = true;
                            $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').val(data.d.cCitySurveyNo);
                            $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').val(data.d.cCitySheetNo);
                            $('#ctl00_ContentPlaceHolder1_DDLPanchayat').val(data.d.cSurveyPanchayat);
                            $('#ctl00_ContentPlaceHolder1_DDLCityOffice').val(data.d.cCityOffice);
                            //__doPostBack("ctl00$ContentPlaceHolder1$DDLCityOffice", "");
                            $('#ctl00_ContentPlaceHolder1_DDLCityWard').val(data.d.cCityWard);
                        }
                    }
                });
            }

            function DXSocietyChange(Society) {

                $('#ctl00_ContentPlaceHolder1_HFnSocietyID').val(DXSociety.GetValue());
                $('#ctl00_ContentPlaceHolder1_TxtcWardName').val(Society.GetSelectedItem().texts[1]);
            }

            function validateMilkatNo(currObj) {
                $.ajax({
                    url: "MilkatMaster.asmx/validateMilkatNo",
                    data: "{ 'cMilkatNo':'" + currObj.value + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        if (data.d.Msg == "1") {
                            alert("આ મિલકત નંબર પહેલા નખાઈ ચુકાયો છે!");
                            currObj.value = "";
                            currObj.focus();
                        }
                    },
                    failure: function() {
                        alert("Search Time Error!");
                    }
                });
            }

            function BojoChange(currObj) {
                if (currObj.value == "1") {
                    $('#ctl00_ContentPlaceHolder1_TxtcBojoRemarks').removeAttr('disabled');
                    //$('#ctl00_ContentPlaceHolder1_TxtcBojoRemarks').attr('style', 'width:300px;');
                    $('#ctl00_ContentPlaceHolder1_TxtcBojoRemarks').val($('#ctl00_ContentPlaceHolder1_HFBojoRemarks').val());
                } else {
                    $('#ctl00_ContentPlaceHolder1_TxtcBojoRemarks').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_TxtcBojoRemarks').val('');
                }
            }

            function BojoRemarksChange(currObj) {
                $('#ctl00_ContentPlaceHolder1_HFBojoRemarks').val(currObj.value);
            }

            function validateDateFormat(DateValue) {
                if (DateValue.value != '') {
                    var regExDate = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
                    if (!regExDate.test(DateValue.value)) {
                        var todatedate = new Date();

                        var mm = todatedate.getMonth() + 1;
                        var dd = todatedate.getDate();
                        var yy = todatedate.getFullYear();

                        //alert(dd + '/' + mm + '/' + yy);
                        if (dd < 10) {
                            var dd = "0" + dd;
                        }
                        if (mm < 10) {
                            var mm = "0" + mm;
                        }
                        var dates = dd + "/" + mm + "/" + yy;
                        DateValue.value = dates;
                        //DateValue.value = '';
                        alert("Invalid Date");
                        DateValue.focus();
                    }
                } else {
                    return true;
                }
            }

            function FnSocietyName() {
                var S_id = document.getElementById("ctl00_ContentPlaceHolder1_DDLSociety").value;
                var DDLPanchayat = document.getElementById("ctl00_ContentPlaceHolder1_DDLPanchayat");
                $('#ctl00_ContentPlaceHolder1_HFnSocietyID').val(S_id);

                $.ajax({
                    type: "POST",
                    url: "MilkatMaster.asmx/SearchDTVCode",
                    data: "{'nSociety':'" + S_id + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(response) {
                        if (response.d.Msg == "") {
                            DDLPanchayat.value = response.d.cSurveyPanchayat;
                        }
                    }
                });
                calcTax();
            }

            function ApplyDate() {
                if (document.getElementById("ctl00_ContentPlaceHolder1_TxtcTharavNo").value != "") {
                    var CalendarExtenderBehavior = $find("CalendarExtender");
                    CalendarExtenderBehavior.set_selectedDate(getDateDJ(new Date().format('dd/MM/yyyy'), 'MM/dd/yyyy', 'dd/MM/yyyy'));
                } else {
                    document.getElementById("ctl00_ContentPlaceHolder1_TxtdTharavDate").value = "";
                }
            }

            function checkhouseno() {
                $.ajax({
                    url: "MilkatMaster.asmx/checkHouse",
                    data: "{ 'nSociety':'" + document.getElementById("ctl00_ContentPlaceHolder1_DDLSociety").value + "','cHouse':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseNo").value + "','cBlockNo':'" + document.getElementById("ctl00_ContentPlaceHolder1_TxtcBlockNo").value + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        if (data.d.cCount == "1") {
                            alert("આ સોસાયટીમાં આ ઘર નંબર અને બ્લોક નંબર પહેલા નખાઈ ચુકાયો છે!");
                            document.getElementById("ctl00_ContentPlaceHolder1_TxtcBlockNo").value = "";
                            document.getElementById("ctl00_ContentPlaceHolder1_TxtcBlockNo").focus();
                        }
                    },
                    failure: function() {
                        alert("Search Time Error!");
                    }
                });
            }

            function SurveyChange(Type) {
                if (Type == "1") {
                    $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').removeAttr('disabled');
                    $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').removeAttr('disabled');
                    $('#ctl00_ContentPlaceHolder1_DDLCityOffice').val('');
                    $('#ctl00_ContentPlaceHolder1_DDLCityWard').val('00000000-0000-0000-0000-000000000000');
                    $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').val('');
                    $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').val('');
                    $('#ctl00_ContentPlaceHolder1_DDLCityOffice').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_DDLCityWard').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').attr('disabled', 'disabled');
                } else if (Type == "2") {
                    $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').val('');
                    $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').val('');
                    $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_DDLCityOffice').removeAttr('disabled');
                    $('#ctl00_ContentPlaceHolder1_DDLCityWard').removeAttr('disabled');
                    $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').removeAttr('disabled');
                    $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').removeAttr('disabled');
                } else {
                    $('#ctl00_ContentPlaceHolder1_txtSurveyNo1').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_txtSurveyNo2').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_DDLCityOffice').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_DDLCityWard').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_txtCitySheetNo').attr('disabled', 'disabled');
                    $('#ctl00_ContentPlaceHolder1_txtCitySurveyNo').attr('disabled', 'disabled');
                }
            }
            //function hideCardValue(val) {

            //    var len = val.length;
            //    if (len > 1) {
            //        const regex = /\d(?=\d{4})/g;
            //        const substr = "X";
            //        var maskedVal = val.replace(regex, substr);
            //        maskedVal = "XXXX XXXX " + maskedVal.slice(4); // Mask first 6 digits
            //        document.getElementById("txtadhaarno").value = maskedVal;

            //    }
            //}
            $(document).ready(function() {

                $('#ctl00_ContentPlaceHolder1_TxtAadharCardNoMask').on('blur', function() {
                    var TxtAadharCardNoMask = $('#ctl00_ContentPlaceHolder1_TxtAadharCardNoMask').val();
                    var TxtAadharCardNo = $('#ctl00_ContentPlaceHolder1_TxtAadharCardNo');
                    TxtAadharCardNo.val(TxtAadharCardNoMask);
                    $('#ctl00_ContentPlaceHolder1_TxtAadharCardNoMask').val(TxtAadharCardNoMask.substring(0, 8).replace(/\d/g, "X") + TxtAadharCardNoMask.substring(8));
                    CheckEnData();
                });
            });

            function clearData() {
                $('#ctl00_ContentPlaceHolder1_TxtAadharCardNoMask').val('');
            }
        </script>
        <style>
            .LMG-Arun {
                font-family: LMG-Arun;
                font-size: 16px;
            }

            .Shruti {
                font-family: Shruti;
                font-size: 13px;
            }
        </style>
        <script type="text/javascript">
            function MyFont(Fn) {
                $("textarea.Gujarati").each(function() {

                    //                if (Fn == "LMG-Arun") {

                    //                    $(this).removeClass("Shruti");
                    //                }
                    //                if (Fn == "Shruti") {
                    //                    $(this).removeClass("LMG-Arun");
                    //                }

                    //                $(this).addClass(Fn);
                    $(this).css("font-family", Fn);

                });
                $("input.Gujarati").each(function() {

                    //                if (Fn == "LMG-Arun") {
                    //                    $(this).removeClass("Shruti");
                    //                }
                    //                if (Fn == "Shruti") {
                    //                    $(this).removeClass("LMG-Arun");
                    //                }

                    //                $(this).addClass(Fn);
                    $(this).css("font-family", Fn);

                });

                $("select.Gujarati").each(function() {

                    //                if (Fn == "LMG-Arun") {
                    //                    $(this).removeClass("Shruti");

                    //                }
                    //                if (Fn == "Shruti") {
                    //                    $(this).removeClass("LMG-Arun");
                    //                }

                    //                $(this).addClass(Fn);

                    //$(this).style.fontsize = "16px";
                    $(this).attr("style", "font-size:16px");
                    $(this).css("font-family", Fn);

                });
                $("select.Gujarati").each(function() {

                    //                if (Fn == "LMG-Arun") {
                    //                    $(this).removeClass("Shruti");

                    //                }
                    //                if (Fn == "Shruti") {
                    //                    $(this).removeClass("LMG-Arun");
                    //                }

                    //                $(this).addClass(Fn);
                    $(this).attr("style", "font-size:16px");
                    $(this).css("font-family", Fn);
                });
                $("Label.Gujarati").each(function() {

                    //                if (Fn == "LMG-Arun") {
                    //                    $(this).removeClass("Shruti");

                    //                }
                    //                if (Fn == "Shruti") {
                    //                    $(this).removeClass("LMG-Arun");
                    //                }

                    //                $(this).addClass(Fn);
                    $(this).style.fontsize = "16px";
                    $(this).css("font-family", Fn);

                });

            }
        </script>
        <script type="text/javascript">
            var Nochar = '';
            var validNums = '0123456789.';
            var validInt = '0123456789';
            var validDt = '0123456789/';
            var validLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var validMobile = '0123456789+';
            var validnot = '/\<>'
            var validNums1 = '0123456789.-';
            var validNums2 = '0123456789-';

            function validateKeyPress(e, validSet) {
                var key;
                var keychar;

                if (window.event || !e.which)
                    // IE 
                    key = e.keyCode;
                    // IE 
                else if (e)
                    key = e.which;
                    // Netscape 
                else
                    return true;
                // no validation 

                keychar = String.fromCharCode(key);
                validSet += String.fromCharCode(8);

                if (validSet.indexOf(keychar) < 0)
                    return false;

                return true;
            }

            function getDateDJ(sDate, fromFormat, toFormat) {
                var aDate = sDate.split('/');
                if (fromFormat.toLowerCase() == "dd/mm/yyyy") {
                    if (toFormat.toLowerCase() == "mm/dd/yyyy") {
                        return aDate[1] + '/' + aDate[0] + '/' + aDate[2];
                    } else if (toFormat.toLowerCase() == "yyyy/mm/dd") {
                        return aDate[2] + '/' + aDate[1] + '/' + aDate[0];
                    } else if (toFormat.toLowerCase() == "yyyy/dd/mm") {
                        return aDate[2] + '/' + aDate[0] + '/' + aDate[1];
                    }
                } else if (fromFormat.toLowerCase() == "mm/dd/yyyy") {
                    if (toFormat.toLowerCase() == "dd/mm/yyyy") {
                        return aDate[1] + '/' + aDate[0] + '/' + aDate[2];
                    } else if (toFormat.toLowerCase() == "yyyy/mm/dd") {
                        return aDate[2] + '/' + aDate[0] + '/' + aDate[1];
                    } else if (toFormat.toLowerCase() == "yyyy/dd/mm") {
                        return aDate[2] + '/' + aDate[1] + '/' + aDate[0];
                    }
                } else if (fromFormat.toLowerCase() == "yyyy/mm/dd") {
                    if (toFormat.toLowerCase() == "dd/mm/yyyy") {
                        return aDate[2] + '/' + aDate[1] + '/' + aDate[0];
                    } else if (toFormat.toLowerCase() == "mm/dd/yyyy") {
                        return aDate[1] + '/' + aDate[2] + '/' + aDate[0];
                    } else if (toFormat.toLowerCase() == "yyyy/dd/mm") {
                        return aDate[0] + '/' + aDate[2] + '/' + aDate[1];
                    }
                } else if (fromFormat.toLowerCase() == "yyyy/dd/mm") {
                    if (toFormat.toLowerCase() == "dd/mm/yyyy") {
                        return aDate[1] + '/' + aDate[2] + '/' + aDate[1];
                    } else if (toFormat.toLowerCase() == "mm/dd/yyyy") {
                        return aDate[2] + '/' + aDate[1] + '/' + aDate[0];
                    } else if (toFormat.toLowerCase() == "yyyy/mm/dd") {
                        return aDate[0] + '/' + aDate[2] + '/' + aDate[1];
                    }
                } else {
                    return "Invalid Format";
                }
            }
            function myCopyEmail() {
                navigator.clipboard.writeText("help.gramsuvidha@gmail.com");
                alert('Email ID Copy Done');
            }
        </script>
        <script src="../js/ExportToPDF.js" type="text/javascript"></script>
        <script src="../js/jQuery.print.js" type="text/javascript"></script>
        <script src="../js/html5csv.js" type="text/javascript"></script>
        <link href="/WebResource.axd?d=oSHwVqmuwQqjxC_-60Nkv7MZMFb13WeL9a3RNzv77vUHfPPvZaKoEW3r_-C5k2AOgVDPXcyDpGLmmWz9HCJg8gdvILNRPk3slKn_xsOppq-DL__GEHbNQj6vh1VyslXSHVBhAMx4ZStw49u-nQ2yYEt_ZwMJYJ2JeDF9913fWpo1&amp;t=637265133240000000" type="text/css" rel="stylesheet"/>
    </head>
    <body oncontextmenu="return false" class="nav-md">
        <form name="aspnetForm" method="post" action="./MasterMilkatPV.aspx?ID=iXDufC4rzmTzyizoGMBhTZ1OqgnWEW73J2z3CJYc5CeRtH%2ftmnf9aA%3d%3d&amp;E=kEUY7+XbbAk%3d" id="aspnetForm">
            <div>
                <input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value=""/>
                <input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value=""/>
                <input type="hidden" name="__LASTFOCUS" id="__LASTFOCUS" value=""/>
                <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="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"/>
            </div>
            <script type="text/javascript">
                //<![CDATA[
                var theForm = document.forms['aspnetForm'];
                if (!theForm) {
                    theForm = document.aspnetForm;
                }
                function __doPostBack(eventTarget, eventArgument) {
                    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
                        theForm.__EVENTTARGET.value = eventTarget;
                        theForm.__EVENTARGUMENT.value = eventArgument;
                        theForm.submit();
                    }
                }
                //]]>
            </script>
            <script src="/WebResource.axd?d=5x0K1k3kfGTcLlWvLvSfeids9GQIhx49zPCvN9c2YHtGQqHLMk3d4gFSo4FwcUNPLcj29HOsjqTl5m2GoCaXjGRurawid41wGLmsMflBWVc1&amp;t=638942408805310136" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=5hfjq6N8B8uDh0myWoxC_kGofTFodHQUEJGAOzT9kUMpAB8wfPypc3OBdKITVm7LPyZy3i79TYxjIDso3NsUKDSpUzyf6r6hT0zLNwZ67zkzmbvLf2rQFN5LBbrHXDG2VGZcFZ0QcvZy4FAx7YEVNxA0ue0amqUYN1szx1RgTow1&amp;t=32e5dfca" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=ZnIyHn3uBE8hqr-xUCM8SJQP71amDCrVjV5sAwbdRz76ugsdqxp3HWSdftighSHXZ0Ihi91rkRwmGIz7fTy3zm91B7OHWRrV5hBKUzT61tMbd4rx7GOLcxWO5P3KKqGCLRg2JcF4LeEK5CS70gj9stvRKvPsgOqnQ-8BPgLqZuB44TpD_AR7OTTBcqZJdDeB0&amp;t=32e5dfca" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=-4Ds9rF7fAdTGu7kiGsbD_HsKZDhnpNewNTYVCjPlo-yJWLKHv4nmb47BNUZRjzIpzTvxF1tvIOyB2qQK0rhmg82st7FEr-0e42SUFWEvLuzb22KKDuFmljTyui3tk6OoZMAwGPrQffVGxc9vub_ZDeB8Z3eDsiFyvOyN1g2bhY1&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=NVqsDR5ayXH3bkZX6uXPq85e9D6pCeOJIKDE4zEl9Wgz45XJmn9s8ShKU7Xlgjpk_EGnvNWQK1I8j8HFEy1V0n-DSEU9WgeKZWZBel4HeyrTRmpSvp41vB6O4zclLRcVdjrGRv4ueG0lCZbDMFsfx0IY0RfCLRZ_oW4beRzoFDM1&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=OdivcfoliCOrwWrPR1r5CPeE0vjfMTnkRYMAm0Kr1o9MVBAhkmqJCnb3FRLvTMoRurPeRnHxzyAqSO6ek9Q41z7eLa1r035cO1xi9yPO1z8JJ12sy9Z5iJ3Q6vVWvuOgALzApzznjYINapiZXkoiNBfqPsaiLRm7JfGBmVmm76U1&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=3clw9Xo1zoxP2ikIEgmSRcUnWI3qGCDNwvsZGGsP7jNzcGI1s4qU3fW7a93CVpqYibwy36wFlyFfrHA7sWPU3IxIWDSaUdg9ho_jhZBRPEP9ag5_FrUJ_lKIcYNSO_74M12lBzj8cLZB7qpI95ESXp1VGWLxb4yI2yeJD_lcr4g1&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=2S273cBEp3NaViTIDz38c07EMb3ehQ1M26vHkheeRZEud9GTgeixnafodhvT3ZAR2YW83VNDMmrWql7bdjuE5gn8TXsJ1dKCpOAlKJUZDZssPqR23wJGRSbuU9349YEkPf0yuGAobrG5WL8qjop3ujxhn3dCW7KenvXGrM3muFA1&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=GhPUoCPqT0GU-eSJI3kbw5hViCbLwgdfUBZWrkepy7Pk0n1_-qzweo9minAt6e6xX58bDd7jC7ZxjeU2yGSL0pdpTawdaOZRbyy4yDtuzi_6QqhPGAvG0O-gtjL_UjpDd6f-anFVnzUe5U_5abTL8vWJXJyJ9raPJ69ZPs24-uE1&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=DIocoCfG5RFfkPVt3dv3rbAmoRif0Kr7spi8wDp8zhy_dkiRe89ooolY0D7AmnR-udhsjvflYrNfRC5qV-RYKNDXC96snip3pa0xvemrc8uh07BTr_e6BiaauvNxSpOtOkRsU4K6srbBjSQckxTeMQetrHUUX1PZyJ89M7DSxUM1&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=YlB7BbyJnDWm3JdQwJrxDNu4Bn7OXL7czrY-v6FaalS8IrqCRFalKjMCewWWnwQl4BWWenZ-vGedphtcONqvYEcNOh8C56u81eORj0_zo6NwpVAWwci-bD9VHZ5Vj0Rao0deH6Dky2ze7qnM1uEyqd_T1ZqWwr6cpwglclvkMJ81&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=S0lS7y5hngJU9hJJ9r1XxobDgfJ15jv-hs31128NC5heApUplu7M6AON-jKhZvH_h-wPEJgZ7wMwwdDv7Fj-OJL-SsJrOo3ltqXaNySYiUAnalGvmH0crZhzik02WDAZ98CQQagtqTYIbULKhVoHKUr7GCCNfq6nixFNd5RJJwQ1&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=2kMyiHoTPHdBnZBhgFu40ADuksmIGiHBJmeGztwSiexEaAaTtLl-WC4jk9ahSvuesCLBbQlJLQ1gYGaGNvMTbNKvnSIRUR8DXX4UTDGWH9WbRrHIRQBYh0hCFka5g0_doSosyjjrflhmSgRY1FmE1ADP80-0ZvSdgj1jjyWBNB5n8vc8KriOj0oWTyvLXHsO0&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=SwxONd0waBy5SdZp0yaOgRubgRHaM7PgC8wBW5qJ3lNPlBnPRrLdGfLhZcJaTLPMSHUpnlbQ_QCEuhcJyswr8S6bt_vHroYpsNYqa9qbz-EuuotFNYcU6FeJuJoEJFbjI2WlKb9VukS9JqCVD_YId35wCgq-Rt7q-H86Yruw7hdzdNGfBTmM05-QkC9-l_qp0&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=wmRe7ajQPoJwhc_1EvAyC4FLCPhHwiHNoKkdvVmh-Al5Q322p0jPNDuq1WKvxL2qRvNPLtbWJXPmtVZoQTn8rQClk1y3jbsOO14wahS83fjUZrrwr_LRZ5RNa5fNiO-IEfTxpLSQbgSUDGZnQ69Fpf3b3Nh7ZRhhNo7NVQV3_W9JQBpkav4AuT6sZ804l9yZ0&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=uumezLrkaYxABhPMmvQHdel0DMAIebdKWF4WiG5xWMa_J-Zek1XncCkXHcQq6x-wHnYCgYSceOQIgLXXryZHZJwEcDk2ZWyw1megTCH3WSt2Vu061ZePJI_G43ckHU9XZiOl1GJMYsKTeE_0gBc3LEgtuUWnlV_MNgXVOkeEX18-lBrR8kiMIgjpLMg3MczD0&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=yH_yJXn43_tYgEp9cQs_wbicdYMhKHa4t-mj9OynxY5hEKmyeyosy4ZF6IKkoTQcHnZgEiB-22F7IAP2sl1iw7TOXMxYOLFl9QciD7E5mi41VCQYvr7NuhfUf4aRD6l2zaQ4PtMmKXP-r2wFEA-Ka9m6gwgIEfWFHMnqL0B2E9c1&amp;t=3128732" type="text/javascript"></script>
            <script src="/ScriptResource.axd?d=IPd_3VtLgYEDXLYj7AbAg8JQvIoc6tF6gWScskxO7fM57Ol-LY-w-PFZ6V2uyB6HfpN3K3or0oOUNiomMMauubY0GP6oHO6sKBCL7sqUUNJ33Rwm---JFlJI4A-G_qJmAzyGsBfiZP_nX-SafqZsbgcIHng-TYKaJT044ffLBSX5LUU6gQk4_thoprzROxZ60&amp;t=3128732" type="text/javascript"></script>
            <div>
                <input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="22A096A5"/>
                <input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value=""/>
                <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="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"/>
            </div>
            <script type="text/javascript">
                //<![CDATA[
                Sys.WebForms.PageRequestManager._initialize('ctl00$ScriptManager1', 'aspnetForm', ['tctl00$ContentPlaceHolder1$UP1', '', 'tctl00$ContentPlaceHolder1$UpdatePanel1', ''], ['ctl00$ContentPlaceHolder1$TxtAadharCardNoMask', '', 'ctl00$ContentPlaceHolder1$DDLCityOffice', ''], [], 90, 'ctl00');
                //]]>
            </script>
            <div class="container body">
                <div class="main_container">
                    <div class="col-md-3 left_col">
                        <div class="left_col scroll-view" tabindex="5000" style="overflow: hidden; outline: none; cursor: -webkit-grab;">
                            <div class="navbar nav_title" style="border: 0;">
                                <div class="profile" style="padding-top: 5px; padding-left: 5px">
                                    <div class="profile_info">
                                        <h2>
                                            <select name="ctl00$ddlLanguage" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$ddlLanguage\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_ddlLanguage" class="BGcolorBlueDDLBig" style="background-color:White;">
                                                <option selected="selected" value="gu">Gujarati</option>
                                                <option value="en-us">English</option>
                                            </select>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" name="ctl00$forgeryToken" id="ctl00_forgeryToken" value="5b4a4924-236d-4dd4-9bba-d4a7c05b3e19"/>
                            <div class="clearfix"></div>
                            <!-- menu prile quick info -->
                            <!-- /menu prile quick info -->
                            <br/>
                            <!-- sidebar menu -->
                            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                                <div class="menu_section">
                                    <span id="ctl00_lblMenu">
                                        <div class="menu_section main_menu_side hidden-print main_menu">
                                            <div class="menu_section">
                                                <a>
                                                    <h3 style="font-size: 15px;">Site ID : 23994</h3>
                                                </a>
                                                <a href="DashBoardPVNew.aspx">
                                                    <h3 style="font-size: 15px;">મુખ્ય પેઈજ</h3>
                                                </a>
                                                <a href="ListGarviMilkatMutationMaster.aspx?cType=aNAsjxvdgw/kaLAoy8Q0Eg==">
                                                    <h3 style="font-size: 15px;">ગરવી મિલકત માહિતી</h3>
                                                </a>
                                                <ul class="nav side-menu">
                                                    <li>
                                                        <a href="PanchayatDetails.aspx">
                                                            <i class="fa fa-bank"></i>
                                                            ગામ ની માહિતી<span></span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <i class="fa fa-desktop"></i>
                                                            માસ્ટર્સ<span class="fa fa-chevron-down"></span>
                                                        </a>
                                                        <ul class="nav child_menu">
                                                            <li>
                                                                <a href="MasterTaxPV.aspx">ટેક્ષ માસ્ટર</a>
                                                            </li>
                                                            <li>
                                                                <a href="MasterSocietyPV.aspx">સોસાયટી માસ્ટર</a>
                                                            </li>
                                                            <li>
                                                                <a href="UpdateMasterSocietyPV.aspx">સોસાયટી વેરો ઉમેરો/બાદ કરવો</a>
                                                            </li>
                                                            <li>
                                                                <a href="MasterConstructionPermission.aspx">બાંધકામ પરવાનગી</a>
                                                            </li>
                                                            <li>
                                                                <a href="MasterMilkatPV.aspx">મિલકત માસ્ટર</a>
                                                            </li>
                                                            <li>
                                                                <a href="ListMasterGroupPV.aspx">ગ્રુપ માસ્ટર</a>
                                                            </li>
                                                            <li>
                                                                <a href="MasterAccountPV.aspx">એકાઉન્ટ માસ્ટર</a>
                                                            </li>
                                                            <li>
                                                                <a href="MasterBudget.aspx">બજેટ માસ્ટર</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <i class="fa fa-exchange"></i>
                                                            વ્યવહાર<span class="fa fa-chevron-down"></span>
                                                        </a>
                                                        <ul class="nav child_menu">
                                                            <li>
                                                                <a href="TranBillPrintPV.aspx">બીલ બનાવવા / પ્રિન્ટ કરવા</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranTaxReceiptPV.aspx">કરની પહોંચ</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranTaxOtherReceiptPV.aspx">અન્ય પહોંચ</a>
                                                            </li>
                                                            <li>
                                                                <a href="NoticeFeeprint.aspx">નોટીસ ફી ઉમેરવા</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranExpancePV.aspx">જાવક / ખર્ચા</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranCashBankPV.aspx">બેંક / રોકડ વ્યવહાર</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranReturnChequePV.aspx">પરત ચેક રજીસ્ટર</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranMakanTransfarRegPV.aspx">મકાન ટ્રાન્સફર રજીસ્ટર</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranInwardRegisterPV.aspx">આવક પત્રક</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranOutwardRegisterPV.aspx">જાવક પત્રક</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranAaVkNoDakhloPV.aspx">આવકનો દાખલો</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranRahethanDakhloPV.aspx">રહેઠાણનો દાખલો</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranOnlyDakhloPV.aspx">દાખલો</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranFamilySurvey.aspx">પરિવાર ની માહિતી</a>
                                                            </li>
                                                            <li>
                                                                <a href="TranDeadStock.aspx">સર-સમાન</a>
                                                            </li>
                                                            <li>
                                                                <a href="MasterAssets.aspx">પંચાયતની મિલકત</a>
                                                            </li>
                                                            <li>
                                                                <a href="GrantTransactionPV.aspx">ગ્રાન્ટ</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <i class="fa fa-exchange"></i>
                                                            દબાણ રજીસ્ટર<span class="fa fa-chevron-down"></span>
                                                        </a>
                                                        <ul class="nav child_menu">
                                                            <li>
                                                                <a href="../PanchayatVero/MasterDabanRegistrationPV.aspx">દબાણ રજીસ્ટર</a>
                                                            </li>
                                                            <li>
                                                                <a href="../PanchayatVero/ReportOptionsPVNew.aspx?Rpt=S3rzHLXoi69GtG6zCg6+Hg==">દબાણ રજીસ્ટર રિપોર્ટ</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <i class="fa fa-exchange"></i>
                                                            પાણી સમિતિ<span class="fa fa-chevron-down"></span>
                                                        </a>
                                                        <ul class="nav child_menu">
                                                            <li>
                                                                <a href="../PanchayatVero/MasterSamitiRachanaPV.aspx">સમિતિ ની રચના</a>
                                                            </li>
                                                            <li>
                                                                <a href="../PanchayatVero/MasterSamitiniKamgiriPV.aspx">સમિતિ ની કરેલ કામગીરી</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <i class="fa fa-exchange"></i>
                                                            પરચુરણ માંગણું<span class="fa fa-chevron-down"></span>
                                                        </a>
                                                        <ul class="nav child_menu">
                                                            <li>
                                                                <a href="../PanchayatVero/MasterManganuPV.aspx">માંગણું</a>
                                                            </li>
                                                            <li>
                                                                <a href="../PanchayatVero/MasterVasulatPV.aspx">વસુલાત</a>
                                                            </li>
                                                            <li>
                                                                <a>
                                                                    <i class="fa fa-exchange"></i>
                                                                    રીપોર્ટસ<span class="fa fa-chevron-down"></span>
                                                                </a>
                                                                <ul class="nav child_menu">
                                                                    <li>
                                                                        <a href="../PanchayatVero/ReportOptionsPVNew.aspx?Rpt=6M1cITWl6oU=">માંગણા રજીસ્ટર</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="../PanchayatVero/ReportOptionsPVNew.aspx?Rpt=R5JkisEH54Q=">વસુલાત રજીસ્ટર</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="../PanchayatVero/ReportOptionsPVNew.aspx?Rpt=pttjc4JnMP4=">બાકી રજીસ્ટર</a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <div class="menu_section">
                                                        <!-- <h3 style="font-size: 15px;">રીપોર્ટસ</h3> -->
                                                        <ul class="nav side-menu">
                                                            <li class="vn">
                                                                <a>
                                                                    <i class="fa fa-file"></i>
                                                                    કરના રીપોર્ટસ <span class="fa fa-chevron-down"></span>
                                                                </a>
                                                                <ul class="nav child_menu" style="display: none;">
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=XSrv64fxTPvKZsgG2MK20lphSfHU9VdVngSvZOhT0sI=">માંગણા-વસુલાત-બાકી  રજીસ્ટર</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=PFeKdMxkGrs3zt18pOqJ+SRst763CVHS">આકારણી રજીસ્ટર</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=PFeKdMxkGrs3zt18pOqJ+dkqulUryYiC">આકારણી પત્રક</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=+lGNmhapW02VpgMt2P85iW1anGQdfhL9">માંગણા રજીસ્ટર</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=q7MdfEaOSLZKqsrkQKV2XdiGgo3P6egC">વસુલાત રજીસ્ટર</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=wZPkJLhmPaEkxuVtFlkIPQ==">બાકી રજીસ્ટર</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=wZPkJLhmPaFunDQIB3Xy3ixDFW/rAZpV">બાકી રજીસ્ટર (રકમ)</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=h/F8ufswkE9FbDHgZ1Ahsg==">માસીક પત્રક</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=6DXJG0/20VxDuexLgFeh6g==">મકાન ટ્રાન્સફર રજીસ્ટર </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="rptallmilkatlist.aspx">નામ મુજબ મિલકત</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="printviewerNew.aspx?Rpt=xoTe22BmhGjclHhZcgSr9jw98lW00K7U">
                                                                            મિલ્કત નં. મુજબ મોબાઈલ નં રિપોર્ટ<span></span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <a>
                                                                    <i class="fa fa-file"></i>
                                                                    એકાઉન્ટ રીપોર્ટસ<span class="fa fa-chevron-down"></span>
                                                                </a>
                                                                <ul class="nav child_menu">
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=dFKZBIR1Uht0zyri6LyspJ8LmFieJJh4">જાવક/ખર્ચા રજીસ્ટર </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=ZGUZiZe+dlQ=">રોજમેળ </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=XrmNIosKsIpHSZRdrAPjtw==">વસુલાત રજીસ્ટર </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=T2CBZRY42lSTpIQ/XeTBdQ==">નાણાનું વાર્ષીક વર્ગીકરણ </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=qXY/DZ0SP5j0GMOwjKTsOQ==">આવક/જાવક રજીસ્ટર </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=tZhwXRu7MBw=">રેવન્યુ રજીસ્ટર</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=Jn3KVJUWc20=">બેંક રજીસ્ટર </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=AhTLVE8iT3MWwQ/29h0jqA==">આવક તારીજ</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="BudgetReportPV.aspx">બજેટ રીપોર્ટ</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=5eKDD0+JFaRNJ9PTFmGAtA==">ગ્રાન્ટ રીપોર્ટ</a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <a>
                                                                    <i class="fa fa-file"></i>
                                                                    આવક જાવક પત્રક<span class="fa fa-chevron-down"></span>
                                                                </a>
                                                                <ul class="nav child_menu">
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=n9BWp6EivvpC5GvknmEjLQ==">આવક પત્રક</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="ReportOptionsPV.aspx?Rpt=rOOTr0APYGgUAVZayxUq/A==">જાવક પત્રક</a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <a>
                                                                    <i class="fa fa-file"></i>
                                                                    રદ વિગતો<span class="fa fa-chevron-down"></span>
                                                                </a>
                                                                <ul class="nav child_menu">
                                                                    <li>
                                                                        <a href="TranNewPropertyDeletedPanRptPV.aspx">
                                                                            <h3 style="font-size: 12px;">રદ કરેલ મિલ્કતની </h3>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="TranRecieptPanRptPV.aspx">
                                                                            <h3 style="font-size: 12px;">રદ કરેલ કરની પહોંચ </h3>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="TranOtherReceiptPanRptPV.aspx">
                                                                            <h3 style="font-size: 12px;">રદ કરેલ અન્ય પહોંચ </h3>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="TrancashbankPanRptPV.aspx">
                                                                            <h3 style="font-size: 12px;">રદ રોકડ/બેંક વ્યવહાર </h3>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <a>
                                                                    <i class="fa fa-file"></i>
                                                                    સિસ્ટમ સેટીંગ<span class="fa fa-chevron-down"></span>
                                                                </a>
                                                                <ul class="nav child_menu">
                                                                    <li>
                                                                        <a href="CreateNewYear.aspx">નવું વર્ષ બનાવવા</a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <a>Help Desk : 95583 84767</a>
                                                            </li>
                                                            <li>
                                                                <a>help.gramsuvidha@gmail.com</a>
                                                            </li>
                                                            <li>
                                                                <a class="btn btn-dark" onclick="myCopyEmail()">Copy Email ID</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <!-- /sidebar menu -->
                            <!-- /menu footer buttons -->
                            <!-- /menu footer buttons -->
                        </div>
                    </div>
                    <!-- top navigation -->
                    <div class="top_nav">
                        <div class="nav_menu">
                            <nav class="" role="navigation">
                                <div class="nav toggle" style="width:85%;">
                                    <a id="menu_toggle">
                                        <i class="fa fa-bars">
                                            <strong style="font-size:18px;"></strong>
                                        </i>
                                    </a>
                                    <strong style="font-size:18px;color:lightgray;">
                                        <span id="ctl00_lblAccYear">Panchayat : GHOBAPATI, Ta : Savarkundla, Dist : AMRELI. Year : 2025-2026</span>
                                    </strong>
                                </div>
                                <ul class="nav navbar-nav navbar-right" style="width:15%;">
                                    <li class="">
                                        <a href="../javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                            <i class="fa fa-user"></i>
                                            &nbsp;<span id="ctl00_LblUser" class="Gujarati" style="font-family:;">ગ્રામપંચાયત</span>
                                            <span class=" fa fa-angle-down"></span>
                                        </a>
                                        <ul class="dropdown-menu dropdown-usermenu animated fadeInDown pull-right">
                                            <li>
                                                <a href="ChangePasswordPV.aspx">Change Password</a>
                                            </li>
                                            <li>
                                                <a href='../LogOff.aspx'>
                                                    <i class='fa fa-sign-out pull-right'></i>
                                                    Log Out
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <!-- /top navigation -->
                    <div class="right_col" role="main" id="_MyTarget">
                        <div class="x_content bs-example-popovers"></div>
                        <div class="x_panel">
                            <div class="x_title">
                                <h2 style="padding-top: 2px;">
                                    <i class="fa fa-desktop"></i>
                                    &nbsp;મિલકત માસ્ટર
            
                                </h2>
                                <ul class="nav navbar-right panel_toolbox">
                                    <li>
                                        <h2>
                                            <input name="ctl00$ContentPlaceHolder1$BtnAddNew" type="button" id="ctl00_ContentPlaceHolder1_BtnAddNew" class="btn btn-round btn-success" onclick="location.href = &#39;MasterMilkatPV.aspx&#39;" tabindex="35" value="ઉમેરવુ"/>
                                        </h2>
                                    </li>
                                    <li>
                                        <h2>
                                            <input name="ctl00$ContentPlaceHolder1$BtnList" type="button" id="ctl00_ContentPlaceHolder1_BtnList" class="btn btn-round btn-info" onclick="location.href = &#39;ListMasterMilkatPV.aspx&#39;" tabindex="36" value="યાદી"/>
                                        </h2>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            <div class="x_content">
                                <table class="mytable" style="width: 95%">
                                    <tr>
                                        <td>મિલકત નંબર
                    </td>
                                        <td colspan="3">
                                            <input name="ctl00$ContentPlaceHolder1$TxtcMilkatNos" type="text" id="ctl00_ContentPlaceHolder1_TxtcMilkatNos" disabled="disabled" tabindex="1" class="form-control BGcolorRED " required="required" onkeypress="return validateKeyPress(event,validNums)" onchange="validateMilkatNo(this)" style="width: 100px;"/>
                                        </td>
                                        <td style="display:none;">બોજો છે?
                    </td>
                                        <td style="display:none;">
                                            <select name="ctl00$ContentPlaceHolder1$DDLnLoan" id="ctl00_ContentPlaceHolder1_DDLnLoan" tabindex="11" class="form-control BGcolorBlueDDL2" onchange="BojoChange(this)" style="width: 50px; height: 25px;">
                                                <option value=""></option>
                                                <option value="1">હા</option>
                                                <option selected="selected" value="0">ના</option>
                                            </select>
                                            <input name="ctl00$ContentPlaceHolder1$TxtcBojoRemarks" type="text" id="ctl00_ContentPlaceHolder1_TxtcBojoRemarks" disabled="disabled" tabindex="12" class="form-control BGcolorBlue " onchange="BojoRemarksChange(this)" style="width: 270px;"/>
                                            <input type="hidden" name="ctl00$ContentPlaceHolder1$HFBojoRemarks" id="ctl00_ContentPlaceHolder1_HFBojoRemarks"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>મકાન માલીકનું નામ
                    </td>
                                        <td colspan="3">
                                            <input name="ctl00$ContentPlaceHolder1$TxtCHouseOwnersName" type="text" id="ctl00_ContentPlaceHolder1_TxtCHouseOwnersName" tabindex="2" class="form-control BGcolorBlue "/>
                                        </td>
                                        <td>મકાનની ટાઈપ
                    </td>
                                        <td>
                                            <select name="ctl00$ContentPlaceHolder1$DDLNTypeOfBuilding" id="ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding" tabindex="13" class="form-control BGcolorBlueDDL2 " onchange="calcTax()" style="width: 120px;">
                                                <option value="0"></option>
                                                <option value="18">બિન રહેઠાણ</option>
                                                <option value="23">કોમન પ્લોટ</option>
                                                <option value="22">પ્લોટ</option>
                                                <option value="17">રહેઠાણ</option>
                                                <option value="20056">સરકારી મિલ્કત</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>મૂલ્યાંકન વર્ષ
                    </td>
                                        <td colspan="3">
                                            <input name="ctl00$ContentPlaceHolder1$TxtCHouseKeepersName" type="text" id="ctl00_ContentPlaceHolder1_TxtCHouseKeepersName" tabindex="3" class="form-control BGcolorBlue " style="width: 100px;"/>
                                        </td>
                                        <td>મકાનની કીમત
                    </td>
                                        <td>
                                            <input name="ctl00$ContentPlaceHolder1$TxtNHouseValue" type="text" id="ctl00_ContentPlaceHolder1_TxtNHouseValue" tabindex="14" class="form-control BGcolorRED " onkeypress="return validateKeyPress(event,validNums)" onchange="calcTax()" style="width: 100px;"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>કબ્જેદારનું નામ
                    </td>
                                        <td colspan="3">
                                            <input name="ctl00$ContentPlaceHolder1$TxtcHouseKabjedarName" type="text" id="ctl00_ContentPlaceHolder1_TxtcHouseKabjedarName" tabindex="4" class="form-control BGcolorBlue "/>
                                        </td>
                                        <td>મકાનનો વિસ્તાર
                    </td>
                                        <td>
                                            <input name="ctl00$ContentPlaceHolder1$TxtnHouseArea" type="text" id="ctl00_ContentPlaceHolder1_TxtnHouseArea" tabindex="15" class="form-control BGcolorRED " onkeypress="return validateKeyPress(event,validNums)" onchange="calcTax()" style="width: 100px;"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>સોસાયટીનું નામ
                    </td>
                                        <td style="display: none;">
                                            <select name="ctl00$ContentPlaceHolder1$DDLNSocietyId" id="ctl00_ContentPlaceHolder1_DDLNSocietyId" class="form-control BGcolorBlue " onchange="calcTax()" style="display: none;"></select>
                                        </td>
                                        <td colspan="3">
                                            <select name="ctl00$ContentPlaceHolder1$DDLSociety" id="ctl00_ContentPlaceHolder1_DDLSociety" tabindex="5" class="form-control BGcolorBlue " onchange="FnSocietyName();">
                                                <option value="00000000-0000-0000-0000-000000000000"></option>
                                                <option value="91614D1C-61CE-4403-8089-14612760D2E3">ચોરા વાળી શેરી</option>
                                                <option value="3A4BC790-5528-478B-BD30-5DF3539C9307">પંચાયત શેરી</option>
                                                <option value="F05C3A7D-D978-4D9A-A0F5-BAA2893AB780">પાદર વિસ્‍તાર</option>
                                                <option value="DFAC1907-5077-4319-9E57-312B26570ACB">ભરવાડ શેરી</option>
                                                <option value="52A9700B-BF33-457C-A037-33015F6D3B6E">મઢી વાળી શેરી</option>
                                                <option value="13BBB413-F187-4914-8DD8-CA5EBEC4E94A">રામ શેરી</option>
                                                <option value="0AEA3386-9252-4884-B581-6202245286E9">વણકર વાસ</option>
                                            </select>
                                        </td>
                                        <td>નળ કનેક્શન?
                    </td>
                                        <td>
                                            <select name="ctl00$ContentPlaceHolder1$DDLnPipeLineID" id="ctl00_ContentPlaceHolder1_DDLnPipeLineID" tabindex="16" class="form-control BGcolorBlueDDL2 " onchange="calcTax()" style="width: 100px;">
                                                <option value="0"></option>
                                                <option value="52">૧ લાઇન</option>
                                                <option value="51">૧/૨ લાઇન</option>
                                                <option value="53">૩/૪ લાઇન</option>
                                                <option value="50">નથી</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="display: none;">ટી. પી. સ્કીમ
                    </td>
                                        <td style="display: none;">
                                            <input name="ctl00$ContentPlaceHolder1$TxtcWardName" type="text" id="ctl00_ContentPlaceHolder1_TxtcWardName" class="form-control BGcolorBlue " style="width: 100px;"/>
                                        </td>
                                        <td>ઘર નંબર
                    </td>
                                        <td colspan="3">
                                            <input name="ctl00$ContentPlaceHolder1$TxtCHouseNo" type="text" id="ctl00_ContentPlaceHolder1_TxtCHouseNo" tabindex="6" class="form-control BGcolorBlue " onchange="checkhouseno()" style="width: 100px;"/>
                                        </td>
                                        <td>મિલકતનું વર્ણન
                    </td>
                                        <td>
                                            <input name="ctl00$ContentPlaceHolder1$TxtCDescription" type="text" id="ctl00_ContentPlaceHolder1_TxtCDescription" tabindex="17" class="form-control BGcolorBlue " style="width: 250px;"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>જુનો મિલકત નંબર 
                    </td>
                                        <td>
                                            <input name="ctl00$ContentPlaceHolder1$TxtcBlockNo" type="text" id="ctl00_ContentPlaceHolder1_TxtcBlockNo" tabindex="7" class="form-control BGcolorBlue " onchange="checkhouseno()" style="width: 100px;"/>
                                        </td>
                                        <td>ઠરાવ નં.
                    </td>
                                        <td>
                                            <input name="ctl00$ContentPlaceHolder1$TxtcTharavNo" type="text" id="ctl00_ContentPlaceHolder1_TxtcTharavNo" tabindex="8" class="form-control BGcolorBlue " onchange="ApplyDate()" style="width: 100px;"/>
                                        </td>
                                        <td>ઠરાવ તારીખ
                    </td>
                                        <td>
                                            <input name="ctl00$ContentPlaceHolder1$TxtdTharavDate" type="text" value="02-12-2025" maxlength="10" id="ctl00_ContentPlaceHolder1_TxtdTharavDate" tabindex="18" class="date_picker" onkeypress="return validateKeyPress(event,validDt)" onchange="validateDateFormat(this)" style="width:120px;"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>આધાર કાર્ડ
                    </td>
                                        <td colspan="3">
                                            <div id="ctl00_ContentPlaceHolder1_UP1">
                                                <input name="ctl00$ContentPlaceHolder1$TxtAadharCardNoMask" type="text" id="ctl00_ContentPlaceHolder1_TxtAadharCardNoMask" tabindex="9" class="form-control BGcolorBlue" onfocus="clearData();" style="width: 200px;"/>
                                                <input name="ctl00$ContentPlaceHolder1$TxtAadharCardNo" type="text" id="ctl00_ContentPlaceHolder1_TxtAadharCardNo" tabindex="9" class="form-control BGcolorBlue" style="width: 200px; display: none"/>
                                                <input type="hidden" name="ctl00$ContentPlaceHolder1$HFAdhar" id="ctl00_ContentPlaceHolder1_HFAdhar"/>
                                            </div>
                                        </td>
                                        <td>પાનકાર્ડ
                    </td>
                                        <td>
                                            <input name="ctl00$ContentPlaceHolder1$TxtPanCardNo" type="text" id="ctl00_ContentPlaceHolder1_TxtPanCardNo" tabindex="19" class="form-control BGcolorBlue" style="width: 200px;"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>રેશન કાર્ડ
                    </td>
                                        <td colspan="3">
                                            <input name="ctl00$ContentPlaceHolder1$TxtRationCardNo" type="text" id="ctl00_ContentPlaceHolder1_TxtRationCardNo" tabindex="10" class="form-control BGcolorBlue" style="width: 200px;"/>
                                        </td>
                                        <td>મોબાઈલ નંબર
                    </td>
                                        <td>
                                            <input name="ctl00$ContentPlaceHolder1$TxtMobileNo" type="text" maxlength="10" id="ctl00_ContentPlaceHolder1_TxtMobileNo" tabindex="20" class="form-control BGcolorRED " onkeypress="return validateKeyPress(event,validInt)" style="width: 200px;"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span onchange="SurveyChange(1)">
                                                <input id="ctl00_ContentPlaceHolder1_RBSurveyNo" type="radio" name="ctl00$ContentPlaceHolder1$SurveyNo" value="RBSurveyNo" tabindex="21"/>
                                            </span>
                                            સર્વે નંબર
                    
                                        </td>
                                        <td colspan="4">
                                            <input name="ctl00$ContentPlaceHolder1$txtSurveyNo1" type="text" maxlength="10" id="ctl00_ContentPlaceHolder1_txtSurveyNo1" tabindex="22" class="form-control BGcolorRED " onkeypress="return validateKeyPress(event,validMobile)" style="width: 50px;"/>
                                            <input name="ctl00$ContentPlaceHolder1$txtSurveyNo2" type="text" id="ctl00_ContentPlaceHolder1_txtSurveyNo2" tabindex="23" class="form-control BGcolorBlue" style="width: 150px;"/>
                                            <span id="ctl00_ContentPlaceHolder1_lblsurvey">નવો સર્વે નંબર જ આપવો.</span>
                                        </td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span onchange="SurveyChange(2)">
                                                <input id="ctl00_ContentPlaceHolder1_RBCitySurveyNo" type="radio" name="ctl00$ContentPlaceHolder1$SurveyNo" value="RBCitySurveyNo" tabindex="24"/>
                                            </span>
                                            સીટી સર્વે નંબર
                    
                                        </td>
                                        <td colspan="5">
                                            <div id="ctl00_ContentPlaceHolder1_UpdatePanel1">
                                                ઓફીસ
                                
                                                <select name="ctl00$ContentPlaceHolder1$DDLCityOffice" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$ContentPlaceHolder1$DDLCityOffice\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_ContentPlaceHolder1_DDLCityOffice" tabindex="25" class="BGcolorBlueDDL" style="width: 120px; height: 27px;">
                                                    <option selected="selected" value="0"></option>
                                                    <option value="61">અમરેલી</option>
                                                </select>
                                                વોર્ડ
                                <select name="ctl00$ContentPlaceHolder1$DDLCityWard" id="ctl00_ContentPlaceHolder1_DDLCityWard" tabindex="26" class="BGcolorBlueDDL" style="width: 100px; height: 27px;"></select>
                                                સીટ નંબર
                                <input name="ctl00$ContentPlaceHolder1$txtCitySheetNo" type="text" id="ctl00_ContentPlaceHolder1_txtCitySheetNo" tabindex="27" class="form-control BGcolorBlue" style="width: 100px;"/>
                                                સીટી સર્વે નંબર
                                <input name="ctl00$ContentPlaceHolder1$txtCitySurveyNo" type="text" id="ctl00_ContentPlaceHolder1_txtCitySurveyNo" tabindex="28" class="form-control BGcolorBlue" style="width: 150px;"/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>સર્વે / સીટી સર્વે પંચાયત  
                    </td>
                                        <td colspan="3">
                                            <select name="ctl00$ContentPlaceHolder1$DDLPanchayat" id="ctl00_ContentPlaceHolder1_DDLPanchayat" tabindex="29" class="BGcolorBlueDDL" style="width: 200px; height: 27px;">
                                                <option value="00000000-0000-0000-0000-000000000000">Select</option>
                                                <option value="F6122DF4-2F4B-412E-B2E9-E8E0B085B1F5">Abhrampara - SAVERKUNDLA</option>
                                                <option value="50DE2841-BFD7-4716-8398-54EFF7E4D25B">Adpur - BAGASARA</option>
                                                <option value="632A4AC0-9476-40D9-875D-F55F400F23FD">Adsang - SAVERKUNDLA</option>
                                                <option value="CAFECC54-B3FB-4523-81B3-567FDE75D83F">Adtala - LATHI</option>
                                                <option value="E8BA3A24-728C-4F55-8B69-83BC159A60F4">Agariya Dhudiya - RAJULA</option>
                                                <option value="8F0E980C-8B90-45CE-AC7A-A9B586D40C0B">Agariya Mota - RAJULA</option>
                                                <option value="37C49A24-F1FF-4D17-AB3A-0FA5F70EB7FB">Agariya Nava - RAJULA</option>
                                                <option value="B2C3FE6F-63D9-48B5-82B7-6B1EFD2B3468">Akala              C - LATHI</option>
                                                <option value="64E0412D-D5E6-458E-A546-1C69AC906655">Aliudepur - LATHI</option>
                                                <option value="B40F5A84-993E-4A9F-9ABF-EBBBE65CF0C8">Amarapara - BABRA</option>
                                                <option value="AC494854-7CC3-4DED-80E1-01F4C40996AF">Amaratpur - DHARI</option>
                                                <option value="1EB9CC67-DAAD-49A9-BEB3-37BC05A62380">Amarpur(Varudi) - AMRELI</option>
                                                <option value="B7FD97DE-5C8B-43CC-9850-F10E9A149879">Amarvalpar - BABRA</option>
                                                <option value="9067B585-783C-45CE-A71B-BF6E5E24AA5A">Amba - LILIA</option>
                                                <option value="7629240F-553B-4257-8FB2-6C715418E73C">Ambaliyala - KHAMBHA</option>
                                                <option value="43E66205-A2DE-4DDA-A0B6-2DD687A7503A">Ambardi - SAVERKUNDLA</option>
                                                <option value="5619EEB1-F1F7-4F70-B03D-62A98AF68C81">Ambardi - LATHI</option>
                                                <option value="5E778833-82FA-405F-8130-3AB1FCC4C9B1">Ambardi - DHARI</option>
                                                <option value="60DCCFCB-ECF1-4B83-BBB2-0048D9BBC5AC">Amrapur - KUNKAVAV VADIA</option>
                                                <option value="88143649-405B-4387-A441-253A579EB080">amreli - AMRELI</option>
                                                <option value="E9BA2C7E-BDCF-45F7-BF89-0E8F8B833D10">Amrutvel - SAVERKUNDLA</option>
                                                <option value="55F96B3A-8794-4F81-B335-F031B438BC31">Amuli - RAJULA</option>
                                                <option value="014843A1-4B79-4625-AEE3-381E900224B8">Anida - KUNKAVAV VADIA</option>
                                                <option value="0907D7A9-3936-4482-B414-FA3BE1315DD9">Anida - KHAMBHA</option>
                                                <option value="8D9C7A6F-1A0B-4426-B8E5-6A0E95214FB9">Ankadiya Mota - AMRELI</option>
                                                <option value="2EA5B181-582B-4480-91A6-F4C8B083F954">Ankadiya Nana - AMRELI</option>
                                                <option value="1F3E48FD-EE6B-4C43-BD69-3CC76EC25AA0">Ankolada - SAVERKUNDLA</option>
                                                <option value="5C849EAC-F14B-492E-B899-BD6212FE9E01">Ansodar - LATHI</option>
                                                <option value="D0B334C8-4E00-429F-889B-02EE14FAD543">Antaliya - LILIA</option>
                                                <option value="5CFB99EF-EA05-4F8D-9A26-616278550CE0">Arjansukh - KUNKAVAV VADIA</option>
                                                <option value="C8896341-C1FD-476F-B7CE-185A8EA88CDE">Babapur - AMRELI</option>
                                                <option value="176DA9C6-B6D0-496F-BB43-5D9A2F3D6618">Babariyadhar - RAJULA</option>
                                                <option value="17070050-2D75-42AC-8144-E1FC8AEE2133">Babarkot - JAFRABAD</option>
                                                <option value="9B1E1399-FDBF-4CE6-AB5D-644B7ED6E05B">Babarpur - KHAMBHA</option>
                                                <option value="0831B7D0-EA4F-4255-89EC-D13904D7A071">BABRA - BABRA</option>
                                                <option value="A3339434-D25A-43CD-90C4-3A3D8ED96AED">BADANPUR JUNA - KUNKAVAV VADIA</option>
                                                <option value="111E36D6-61DB-4821-995F-CD992467D4EC">Badanpur Nava - KUNKAVAV VADIA</option>
                                                <option value="DF5DBF0C-5E68-4D15-AA47-B6237D2F84BE">Badhada - SAVERKUNDLA</option>
                                                <option value="EF0E66F8-892C-4DA7-B958-3D564D2B0A78">Bagasara - BAGASARA</option>
                                                <option value="2F0A7529-B82C-4143-B03E-C42AA2BECD2E">Bagoya - SAVERKUNDLA</option>
                                                <option value="F8E7F9FE-23E6-4129-9C65-7359EA616A77">Balana - JAFRABAD</option>
                                                <option value="710EB158-2155-4AC3-A03A-E33A62BE9E12">Balanivav - JAFRABAD</option>
                                                <option value="032F60CB-3BFE-43D1-9568-EE2EA85F8645">Balapar - RAJULA</option>
                                                <option value="CE8C9486-C55D-4BF1-ADCC-B33C5D3D80DB">Balapur - BAGASARA</option>
                                                <option value="2737B9AD-1D4E-4DCF-8F2F-734E92DE56C8">Balel Pipariya - BABRA</option>
                                                <option value="C1E05160-8C20-408D-82C8-AEA4B695E0CE">Bambhaniya - KUNKAVAV VADIA</option>
                                                <option value="45D4BCD7-8BFC-4ADD-972F-BC144D1BBD07">Bantwa-Devli - KUNKAVAV VADIA</option>
                                                <option value="4E08B9C8-67CA-486D-9238-357DC38ECE3C">Barbatana - RAJULA</option>
                                                <option value="2959B84D-E459-442B-BD1C-589BE0BB2F6F">Barman Mota - KHAMBHA</option>
                                                <option value="293331CE-19FA-479A-858A-99877C748E13">Barman Nana - KHAMBHA</option>
                                                <option value="11D6C167-A77E-4C2D-8999-C9CC6395DED4">Barpatoli - RAJULA</option>
                                                <option value="B7EBEF5E-06B8-422C-8D3B-E387F3219934">Barvala - BABRA</option>
                                                <option value="EA768383-AC13-4158-AE49-C74344376FD4">Barvala Baval - KUNKAVAV VADIA</option>
                                                <option value="95C12927-233E-480A-B61B-255FEB5C91BB">Barvala Bavishi - KUNKAVAV VADIA</option>
                                                <option value="DE3241A8-2349-402C-9938-B971B12DF9CF">Bavada - LILIA</option>
                                                <option value="6555A468-9EF1-4BA9-A0B2-841AD84B4BCF">Bavadi - LILIA</option>
                                                <option value="18D03D76-80F2-4572-BFC5-09B5F6E2348D">Baxipur - AMRELI</option>
                                                <option value="C023FA57-7385-474E-8AD8-DBC8BE3A4904">Bhachadar - RAJULA</option>
                                                <option value="4E0C0BA0-2FCD-4FE1-8984-7F1E44F58A3F">Bhad - KHAMBHA</option>
                                                <option value="A3650B7B-C124-4307-A010-FB841AB74A6D">Bhada - JAFRABAD</option>
                                                <option value="31C2D575-1CB6-4F4B-871A-A7C32EAE37DA">Bhader - DHARI</option>
                                                <option value="0C484131-4CF7-46F7-A3BC-48CE31D74DB1">Bhakshi - RAJULA</option>
                                                <option value="953FE766-8392-4D2F-8ABA-1D30FCB7B595">Bhalvav - LATHI</option>
                                                <option value="A8557F88-88DC-49D3-9399-012107D8CE34">Bhamar - SAVERKUNDLA</option>
                                                <option value="065ECBA7-EB51-4FB5-93E5-3B35EF0AE078">Bhandariya Mota - AMRELI</option>
                                                <option value="554B3D6F-90D5-45EB-A075-49433D560C03">Bhandariya Nana - AMRELI</option>
                                                <option value="AD0D948E-BF1C-401D-B943-26BC3CC644D9">Bhaniya - KHAMBHA</option>
                                                <option value="74431998-570E-40A5-B6FD-097E31CCE13A">Bhankodar - JAFRABAD</option>
                                                <option value="6B0301EE-F5E8-4EE0-A69C-DACE850EE6F6">Bharad - DHARI</option>
                                                <option value="6E018CE9-6E29-4334-B9F6-DA7281CCB31B">Bhatvadar - JAFRABAD</option>
                                                <option value="AACD7957-46FF-4118-BEBA-5986D27450C3">Bhatvadar - LATHI</option>
                                                <option value="8E21E38D-468E-4221-AF91-1DC2740F3CC8">Bhavardi - KHAMBHA</option>
                                                <option value="78C902C4-C6ED-46D1-A164-040CF8ECE5DA">Bhayavadar - DHARI</option>
                                                <option value="AE32193E-652D-4414-AE3A-47419C78DB60">Bhayavadar - KUNKAVAV VADIA</option>
                                                <option value="2D17BFD3-8859-481B-857C-B05910F0E9BC">Bhenkra - SAVERKUNDLA</option>
                                                <option value="D8A1A810-6C0A-4D5C-A5D4-CEC7C2479E2C">Bhensan - LILIA</option>
                                                <option value="319CB61B-8527-4AF5-9ED8-7D98706ABB74">Bhensvadi - LILIA</option>
                                                <option value="47896990-3A18-4665-804C-8F9361D60409">Bherai - RAJULA</option>
                                                <option value="446EFD40-DA44-40E2-8DE8-578539CFFD8B">Bhila - BABRA</option>
                                                <option value="019B5D5F-84C9-43F9-9DAA-A1343A7EFC01">Bhildi - BABRA</option>
                                                <option value="12569C57-26BB-4B12-A77C-8FD5AF1F8C91">Bhingrad - LATHI</option>
                                                <option value="199EAD06-8F64-4E06-AF9E-A63520681A58">Bhonkarva - SAVERKUNDLA</option>
                                                <option value="3E48B8BB-F7C7-478B-8C7C-652293C09418">Bhoringda - LILIA</option>
                                                <option value="A36460BE-0FAC-449D-9EC3-596B46963874">Bhukhli-Santhali - KUNKAVAV VADIA</option>
                                                <option value="47D4002C-5E70-4A43-BBD0-2EF9B4E76221">Bhundani - KHAMBHA</option>
                                                <option value="7BCB5EC4-257A-4E4D-A3E7-985780553E35">Bhurakhiya - LATHI</option>
                                                <option value="5F4CCBDE-C0A6-4F69-8B34-218B44C9C201">Bhuva - SAVERKUNDLA</option>
                                                <option value="DA9150E2-367C-47FF-8CB5-85F16E9AB57F">Bodiya - LILIA</option>
                                                <option value="76159598-F0B8-4707-821C-66E7CAAEEE88">Borala - SAVERKUNDLA</option>
                                                <option value="78F96E93-2941-49F8-B007-40D4B813238F">Borala - KHAMBHA</option>
                                                <option value="A520B8C7-1191-48C7-BB74-AABD7D9A23F5">Bordi - DHARI</option>
                                                <option value="EE3AD282-562A-4A2E-B980-5D298F389D72">Chadiya - AMRELI</option>
                                                <option value="CDB6A661-4562-4170-93E1-571A5B63D89B">Chakkargadh - AMRELI</option>
                                                <option value="10099D9A-66CC-4D08-98B9-54C95B133842">Chakrava - KHAMBHA</option>
                                                <option value="081E0954-D794-4AB9-ADA7-E91CF80D7246">CHALALA - DHARI</option>
                                                <option value="F00D5CC9-C5C2-4E7C-B036-657CE4B15C58">Chamardi - BABRA</option>
                                                <option value="343FFE5B-B765-4C7C-82B4-AFB475E273E2">Champathal - AMRELI</option>
                                                <option value="B316B0F6-8105-4567-86AF-D68FE8725365">Chanch - RAJULA</option>
                                                <option value="FFB3AA6C-6D42-4755-A01E-1E2502715EDF">CHANCHAI - DHARI</option>
                                                <option value="B5AAC467-8A40-430A-BD62-5115B7F5B1FD">Chandgadh - AMRELI</option>
                                                <option value="CFBA6D49-2DC5-46F1-A709-751E64B39740">Charan pipali - BAGASARA</option>
                                                <option value="67B2E785-398B-4F61-8B16-1CCA44415448">Charkha - BABRA</option>
                                                <option value="50488AC9-E9B8-4B98-B345-EDE8F89BD212">Charkhadiya - SAVERKUNDLA</option>
                                                <option value="B991B476-783A-46BA-8CBF-589B768E17B0">Charodiya - RAJULA</option>
                                                <option value="BEC3F075-C260-41D8-BF11-AE824FA0E157">Chavand - LATHI</option>
                                                <option value="F1CF0DD4-F127-44A0-B325-C2FF4C3B7E6D">Chhabhadiya - LATHI</option>
                                                <option value="4E14681B-F438-4BDF-BF64-E6A91B945B3C">Chhapri - SAVERKUNDLA</option>
                                                <option value="E62657E9-7D68-4529-B9E8-4A45F7298E26">Chhapri - RAJULA</option>
                                                <option value="C2FFDAB6-0B91-4AA1-A8C4-1B257A42AE8C">Chhatadiya - RAJULA</option>
                                                <option value="BFFAD9EF-D4E4-45FB-BD5D-6723F3ECC0B7">Chhatradiya - DHARI</option>
                                                <option value="B2B8C87C-D480-4CF1-AE1E-95C598D57886">Chhelana - JAFRABAD</option>
                                                <option value="1B058157-A902-485B-AE48-D8C9D6C72D01">Chikhali - SAVERKUNDLA</option>
                                                <option value="B165A7B9-DA74-42D2-9A2D-35C7BCC99126">Chital - AMRELI</option>
                                                <option value="B56F8262-61AB-42DB-91DA-3377C1EFA7D5">Chitrasar - JAFRABAD</option>
                                                <option value="29DDB00D-F361-44B2-89DD-1F703CE44DAB">Chotra - RAJULA</option>
                                                <option value="FFE8B7B8-D3C7-4830-980C-FAC7C3F5266E">DABHALI - DHARI</option>
                                                <option value="8A9127E8-9429-4F85-8080-081C19264C7B">Dadhiya - SAVERKUNDLA</option>
                                                <option value="9029F093-1621-4689-AF1D-EF9691CB294D">Dadhiyali - KHAMBHA</option>
                                                <option value="5F931844-4EA7-4893-8A12-0FB7A5FDC0BC">Dadli - KHAMBHA</option>
                                                <option value="5F277417-3ACB-436F-B183-056B70637C79">Dadva(Randal) - KUNKAVAV VADIA</option>
                                                <option value="29800380-D7C0-47A9-8D7F-005DE1216DF6">Dahida - DHARI</option>
                                                <option value="BF6B92A6-0178-4E24-81B5-887A25823EC1">Dahida - AMRELI</option>
                                                <option value="19232AF4-B988-4B39-9D8C-8502323C036E">Dahinthara - LATHI</option>
                                                <option value="39DB337A-6B4B-485A-8E1A-C0A553955E5D">Dalkhaniya - DHARI</option>
                                                <option value="8B5E1875-3FF9-422A-8528-1438564A624B">Damnagar - LATHI</option>
                                                <option value="1514536D-9633-4E58-A65C-61F1505EEDB9">Dangavadar - DHARI</option>
                                                <option value="50ED5308-A953-43D4-BD96-6F3F996FCD58">Dantardi - RAJULA</option>
                                                <option value="D7C45FD8-B4F0-4B4A-8AB4-C92F85C2D5A6">Dared - BABRA</option>
                                                <option value="F7399DE0-56B6-4DEB-9D32-E7CD3946ED1A">Dedan - KHAMBHA</option>
                                                <option value="2EDB66E0-2F69-48B7-8FF0-51F30B08413A">Dedkadi - SAVERKUNDLA</option>
                                                <option value="5E476F29-005E-45D3-ABA4-83D17250190B">Derdi-Janbai - LATHI</option>
                                                <option value="94B526D3-B61B-460D-A63E-D9C3A1AF9A1E">Deri Pipaliya - BAGASARA</option>
                                                <option value="17CF5785-49A7-4B24-B1CD-D327C83A878E">Detad - SAVERKUNDLA</option>
                                                <option value="33A6A8B2-23B8-4BAB-83C0-50C4D7668190">Devaliya - AMRELI</option>
                                                <option value="42A343F8-E30C-400D-B55D-B5C4A30D4ECB">Devaliya Mota - BABRA</option>
                                                <option value="41493BEE-DFCA-4D82-9BCD-FA8855F55418">Devalki - KUNKAVAV VADIA</option>
                                                <option value="9C2724DA-16DF-42F6-8173-E1F8D1DE9DF4">Devgam - KUNKAVAV VADIA</option>
                                                <option value="668E4D57-71F8-4187-BB92-FE60CD6AF33E">Devka - RAJULA</option>
                                                <option value="343C2B66-1B2F-4C3F-A022-C4A1CDCD3701">Devla - DHARI</option>
                                                <option value="54B7FD23-16E7-4045-91DC-BA20FBB23859">Devrajiya - AMRELI</option>
                                                <option value="BE394198-9D5A-4EFD-ACDC-628C1EEBCD59">Dhajdi - SAVERKUNDLA</option>
                                                <option value="1DCF19CA-F935-4282-9DC2-C1FE470E6E1B">Dhamel - LATHI</option>
                                                <option value="997935AB-A77B-45BF-BA94-163740C07BE7">Dhangla - LILIA</option>
                                                <option value="402D2BE9-588C-4D68-B4D1-4D563BD8838B">Dhar - SAVERKUNDLA</option>
                                                <option value="20CDD055-3958-4D29-968A-9B02BAB329EA">Dharabandar - JAFRABAD</option>
                                                <option value="A8EC2F07-BD5E-488F-956B-542FFCFA1B92">Dharai - BABRA</option>
                                                <option value="80EFF8EE-ABCF-406B-BABD-698BBED9AE7B">Dharano Nes - RAJULA</option>
                                                <option value="4A322382-65AE-4C30-BEC7-C956F62E20D4">Dhareshvar - RAJULA</option>
                                                <option value="8D904AAD-E921-4E3B-BE7A-6B819A3B23C5">Dhargani - DHARI</option>
                                                <option value="E25FEE4C-9ADE-44A8-998D-1EF0F07455DF">dhari - DHARI</option>
                                                <option value="326D2D50-A24B-42C3-B76B-71E2E14467AF">Dhari Nani - KHAMBHA</option>
                                                <option value="763C0791-2ACB-4AB0-8159-AFB138C5F220">Dhavadiya - KHAMBHA</option>
                                                <option value="4992BE0D-4408-4422-8184-5DC641D78696">Dholadri - JAFRABAD</option>
                                                <option value="A54DB39F-A9B1-40A9-9011-7ABC89CB4658">Dholarva - AMRELI</option>
                                                <option value="CD6AD887-4258-4708-BDE5-57A1F020988D">Dholarva - DHARI</option>
                                                <option value="C2B813F1-6B43-4EF8-97EA-E064C3DE0D69">Dhrufania - LATHI</option>
                                                <option value="985B9F3C-B3F6-4BF5-9CCD-326C8676D0BA">Dhundhavana - KHAMBHA</option>
                                                <option value="2C35BCF8-E2A4-4225-9705-F8EEE55067E4">Dipadiya - RAJULA</option>
                                                <option value="D1832D0B-48EE-4FBB-9727-BDA6B6A305C2">Ditla - DHARI</option>
                                                <option value="F9601C0E-D6CC-449F-9FA7-8F03BE87D4D1">Doliya - RAJULA</option>
                                                <option value="C7BD0429-D3B4-4369-9E78-E2DAB065E31D">Dolti - SAVERKUNDLA</option>
                                                <option value="29DD38B9-DEEE-40DF-8E56-3F3275C6F8B8">Dudhala - DHARI</option>
                                                <option value="9F6D92DA-043F-4316-95AE-B0340F3F7B99">Dudhala - JAFRABAD</option>
                                                <option value="ABF13A31-E53F-499A-B901-1C1501BB0F5A">Dudhala Bai - LATHI</option>
                                                <option value="348A7CD4-9D69-48D8-949D-014DEFEFCEFD">Dudhala Lathi - LATHI</option>
                                                <option value="29CCB8AE-D38E-433B-BC10-E6B5E3534876">DUNGAR - RAJULA</option>
                                                <option value="83C76A95-FB6B-4153-B794-83AD2AE481BF">Dungarparda - RAJULA</option>
                                                <option value="508A448C-2A9F-478E-B181-971CB4541B4E">Ebhalvad - JAFRABAD</option>
                                                <option value="36D1B2F0-3538-4D61-97F7-61DAA36FF004">Eklera - LILIA</option>
                                                <option value="C7F85C01-5A5C-45C6-A0D5-13518F76D9C0">Facharia - DHARI</option>
                                                <option value="34C667AF-F6FA-41ED-A431-1B471A20C6D2">Fachariya - SAVERKUNDLA</option>
                                                <option value="FCF56485-88BF-40DA-8121-FD64E5E90AD3">Fachariya - JAFRABAD</option>
                                                <option value="6FE83288-2009-4C5C-A1F1-0081103C46C3">Fategadh - DHARI</option>
                                                <option value="4BE28FD3-330A-428C-A7FB-14D874BED686">Fatterpur - AMRELI</option>
                                                <option value="6F4CD846-24A6-436C-A1F0-3910F234ABE1">Fifad - SAVERKUNDLA</option>
                                                <option value="A33B8D41-B580-40FF-B357-28709E5E9EDE">Fuljhar - BABRA</option>
                                                <option value="6D736AD5-49AE-4275-AAEE-C0BAAC332320">Gadhakda - SAVERKUNDLA</option>
                                                <option value="5EAB91F5-63E0-41DF-843B-7B4D18A0D5FB">Gadhiya - DHARI</option>
                                                <option value="064DDBFD-0727-4E1A-B968-2AF41904C5CB">Gadhiya Chavand - DHARI</option>
                                                <option value="5C8B1CE0-DF47-443C-A6E0-6B40A4A84C5B">Galkotdi - BABRA</option>
                                                <option value="291A6789-0E8C-490A-A94F-389EA44EBB44">Gamapipaliya - BABRA</option>
                                                <option value="4931260C-7125-4243-BAB1-E8981672DA54">Ganjavadar - RAJULA</option>
                                                <option value="72744BC8-2ED1-438E-AEA3-A2326087F368">Garamali Moti - DHARI</option>
                                                <option value="135FC3A8-AB2B-4852-AFE4-F735087FDF62">Garamali Nani - DHARI</option>
                                                <option value="84AE4506-8C95-495E-AC8D-7BD52376E9CA">Garamli - DHARI</option>
                                                <option value="4ED9F48F-C7BC-4037-AC38-DCC9217DAEE9">Garni - BABRA</option>
                                                <option value="4172FD1B-AA75-42BE-AF17-A0E6516BAD63">Gavadka - AMRELI</option>
                                                <option value="D4B6F6B1-597B-475B-9EAB-4E9D12C1707E">Ghandla - SAVERKUNDLA</option>
                                                <option value="E7309E39-ECBD-4946-A1CC-FDC986FA5CC0">Ghantiyan - BAGASARA</option>
                                                <option value="AFA2E01E-C482-4E0E-B26D-296AA795F295">Ghenspur - JAFRABAD</option>
                                                <option value="54FE29F3-3E53-4081-98E9-9BE22293406B">Ghoba - SAVERKUNDLA</option>
                                                <option value="33D18781-8222-42E0-A63B-7F797A9F3A4F">Ghughrala - BABRA</option>
                                                <option value="3F42FAAD-851B-4407-BB71-87745BE2B7E6">Gidardi - KHAMBHA</option>
                                                <option value="7E7E9850-1A8D-4A30-8D21-3A45C7573229">Gigasan - DHARI</option>
                                                <option value="45C54C00-9204-4221-B6A8-417AD2E09E98">Giniya - SAVERKUNDLA</option>
                                                <option value="7DA44E09-149C-437F-8934-893375326386">Giriya - AMRELI</option>
                                                <option value="A28195B3-0BFC-4506-97D0-6FBA02A8AFFE">Godhavadar - LILIA</option>
                                                <option value="FDB270FE-356F-40B8-BC76-C98D460FE8BD">Gokharvala Mota - AMRELI</option>
                                                <option value="D5D23983-130D-4E36-8DD3-D989BDF5C601">Gokharvala Nana - AMRELI</option>
                                                <option value="63F08CC2-841D-4AB0-8B9B-315E70B0C3DD">Gopalgram - DHARI</option>
                                                <option value="E889126F-6A88-41DF-BC3C-C309B1E32658">Goradka - SAVERKUNDLA</option>
                                                <option value="5DEA3CD3-3D0E-499B-A651-9AAE126A0F87">Gorana - KHAMBHA</option>
                                                <option value="F9EAA455-5E52-430A-987F-E8937824D361">Govindpur - DHARI</option>
                                                <option value="82B3F894-492C-43DC-B52D-BE6FB134DA23">Gundran - LILIA</option>
                                                <option value="587B0AB8-B2D6-4E60-902B-5ABD757A41D1">Hadala - BAGASARA</option>
                                                <option value="B02714AF-2D9A-49CD-8A7A-B5AA4069DA83">Hadida - SAVERKUNDLA</option>
                                                <option value="B2621BA9-3A10-43DB-928D-44028CB3DBC7">Hadmatiya - RAJULA</option>
                                                <option value="C335D462-0478-4D16-9642-A5F4D72AF4C8">Hajiradhar - LATHI</option>
                                                <option value="39EB8C42-C014-495D-A9F9-4842F165D6B4">Halariya - BAGASARA</option>
                                                <option value="A3246CDB-625D-4FA2-A549-47B58FC94573">Haliyad Juni - BAGASARA</option>
                                                <option value="B5BB946C-DDF8-4909-8666-72EEC79784F1">Haliyad Navi - BAGASARA</option>
                                                <option value="2F1AF5F8-B838-4197-B8B2-AB7BB501C418">Hamapur - BAGASARA</option>
                                                <option value="E3A03874-54A0-4E8F-B0CB-9C355476048D">Hanumanpur - KHAMBHA</option>
                                                <option value="669A13CB-94EA-4D73-A77B-28C584E47658">Haripur - LILIA</option>
                                                <option value="2A7C8735-103B-4F27-8763-D7214166AB65">Haripura - AMRELI</option>
                                                <option value="21069FCA-7182-4FC9-BBCD-6E1F9FB9A182">Harsurpur - LATHI</option>
                                                <option value="D35912DC-26A5-4A84-B812-5A35D3FD13D4">Hathasani - SAVERKUNDLA</option>
                                                <option value="6D948F65-E8F2-4E35-9FA0-BC5B15AD9579">Hathigadh - LILIA</option>
                                                <option value="B0FD5A4E-4754-4543-90AC-FC0C49E3CA37">Hathigadh - BABRA</option>
                                                <option value="9E1C1481-D453-4C52-B643-52FFE3F4636D">Havtad - LATHI</option>
                                                <option value="FDD93F53-BD2C-4A1E-80ED-5A7B4746F6C7">Hemal - JAFRABAD</option>
                                                <option value="5C41AE2E-EE20-4F58-BBA3-3D3EB52E7C29">Hindorna - RAJULA</option>
                                                <option value="8F29C83B-BC10-4701-BECC-E0BAAA31CB20">Hirana - LATHI</option>
                                                <option value="921E3873-283F-4ED2-9336-1394B93CDAA3">Hirava - DHARI</option>
                                                <option value="4888A46F-F020-40F6-9A61-1E8E811FDB09">Hudli - DHARI</option>
                                                <option value="2593D762-8420-4F32-98ED-EAE16094D4E1">Hulariya - BAGASARA</option>
                                                <option value="42602730-2F4E-40E6-8C6A-59D52DF86833">Ingorala - BABRA</option>
                                                <option value="97BC9E35-D5DB-4637-9013-099704820350">Ingorala - LILIA</option>
                                                <option value="A9D2008A-69CE-4B01-8912-40A7EB26D55E">Ingorala - LATHI</option>
                                                <option value="F5674526-0FC9-4927-91ED-91528A17ED0A">Ingorala - KHAMBHA</option>
                                                <option value="9D21FD51-7DB5-4ABD-9E08-F389D1756B48">Ingorala(Dungri) - DHARI</option>
                                                <option value="86E9128B-8AEE-46F3-8FBD-E47460EEBA2C">Isapar - BABRA</option>
                                                <option value="607F1984-414F-4B65-A15F-8258EFF69C40">Ishvariya - BABRA</option>
                                                <option value="670B2FAA-2DDA-4538-ACD9-B1304C62E7D9">Ishvariya - KUNKAVAV VADIA</option>
                                                <option value="FACD6E85-791E-4FF3-94B9-A50A043B2158">Ishvariya - AMRELI</option>
                                                <option value="8D2394D2-AB47-4B3A-8575-9E277BCBF497">Jabal - SAVERKUNDLA</option>
                                                <option value="29CD9F2A-9D63-4B70-975E-FD9AB81433E0">JAFRABAD - JAFRABAD</option>
                                                <option value="FDC98273-8265-46D9-8D14-6E15ADADADA5">Jaliya - AMRELI</option>
                                                <option value="19781259-A9CE-41F2-B24E-888237A68F39">Jaljivadi - DHARI</option>
                                                <option value="9F395BFC-C8EF-4DA2-B87C-CD692694485C">jambuda - SAVERKUNDLA</option>
                                                <option value="EDBE50D0-9B2F-41D3-A42F-B0B1F9FE7B00">Jamka - BAGASARA</option>
                                                <option value="F23732F3-4093-4BE3-8A8A-35848771FB3C">Jamka - KHAMBHA</option>
                                                <option value="46C5CE3E-C9BF-4364-B5F1-32B21CAA489E">Jarakhiya - LATHI</option>
                                                <option value="8F9D2526-3197-49FE-8256-A07700D8F35C">Jasvantgadh - AMRELI</option>
                                                <option value="6DB6CA70-B91B-4635-9624-5732C3850570">Jatroda - LILIA</option>
                                                <option value="807F3410-6730-465F-8B56-38169FA8934E">Jejad - SAVERKUNDLA</option>
                                                <option value="C00087C0-71E2-481F-B1FC-ED7902EC8263">Jethiavadar - BAGASARA</option>
                                                <option value="B139DF6F-53B1-4024-9BB6-D27B47CE0102">Jholapar - RAJULA</option>
                                                <option value="63A9AA12-0B70-446D-9BC2-EC9755565B84">Jikadri Juni - JAFRABAD</option>
                                                <option value="9B531B3E-DDEC-49E1-967F-D7397A6EB6A5">Jikadri Navi - JAFRABAD</option>
                                                <option value="A614DC3D-151A-4E4B-B0ED-A1EF400F5AD9">Jikiyali - KHAMBHA</option>
                                                <option value="37C98F65-9681-45D4-9A0E-9EBBEE63DB9E">Jira - SAVERKUNDLA</option>
                                                <option value="DDCF0305-350A-4708-A413-F3D631527FA6">Jira - DHARI</option>
                                                <option value="F8B8919F-9097-4E46-9CC3-C60FBFFB48B0">Jithudi - KUNKAVAV VADIA</option>
                                                <option value="8803D23F-DDC7-4447-86F1-B2FDEF703F55">Jivapar - KHAMBHA</option>
                                                <option value="9D5F6985-B67B-46B6-A3A1-766C05C17DD3">Jivapar - BABRA</option>
                                                <option value="780CD61E-EDED-4FDD-BC90-E1D0D944B5C2">Juna Charkha - DHARI</option>
                                                <option value="5C29ADB2-A169-4F7D-8535-D647645E811D">Juna Malaknes - KHAMBHA</option>
                                                <option value="E8318926-FF1F-42A4-B73B-0ACBC49AB929">Juna Savar - SAVERKUNDLA</option>
                                                <option value="5A72D042-D78F-4BC5-BBBF-37294E77A63D">Jungar - KUNKAVAV VADIA</option>
                                                <option value="CA919162-27E5-43B7-9392-4F4521F60ACF">Kadaya - BAGASARA</option>
                                                <option value="97724357-A70B-4A56-9333-A15520DB0AB0">Kadiyali - RAJULA</option>
                                                <option value="9963F6AD-5180-43B9-9E61-14B19A393300">Kadiyali - JAFRABAD</option>
                                                <option value="7488C144-B690-48DE-A59E-7359E3CF082F">Kagdadi - BAGASARA</option>
                                                <option value="A1685156-A712-4CD0-9929-678076FD7FA4">Kagvadar - JAFRABAD</option>
                                                <option value="55147847-3F72-416E-9BB5-13702FC83498">Kalorana - BABRA</option>
                                                <option value="F5A4065C-3B4A-472C-B028-7327D397A4B9">Kalyanpar - LILIA</option>
                                                <option value="4C314248-AD6D-4E56-896F-D5D468533AD9">Kami - DHARI</option>
                                                <option value="3B91591D-A6D0-43B8-9D90-5FDA4D3F7625">Kamigadh - AMRELI</option>
                                                <option value="13128598-53DC-44F7-972D-D1B1F89C91F6">Kanatalav - SAVERKUNDLA</option>
                                                <option value="345137DD-A1AA-4B01-BE25-C115DD855C77">Kanchardi - LATHI</option>
                                                <option value="8B299DFF-DE5D-46B1-B745-0EE6610F19A6">Kankot Mota - LILIA</option>
                                                <option value="B9EBD14E-1217-45C1-A7B7-4621AA09CBF9">Kankot Nana - LILIA</option>
                                                <option value="DC6BC16B-4B02-4A58-ADD9-54BD2A6F9B41">Kantala - KHAMBHA</option>
                                                <option value="CE0AD8A3-5A2E-49A6-91CA-47C6AA590483">Kanthariya Khalsa - JAFRABAD</option>
                                                <option value="313F17B0-1A5C-405E-9E48-04F8FDEDFB2E">Kanthariya Koli - JAFRABAD</option>
                                                <option value="3E462F78-4D94-4AE4-B20A-CEEE7422BC8E">Kariyana - BABRA</option>
                                                <option value="75E88E4B-84A9-4D76-8604-286B52FFE468">Karjala - SAVERKUNDLA</option>
                                                <option value="8315EBA9-1D2A-446C-BED9-08B5CB0933F3">Karkoliya - LATHI</option>
                                                <option value="8FEFF42E-5C57-49A8-BB74-12FB21CDD0A5">Karmdadi - DHARI</option>
                                                <option value="E1AF85FA-332F-4175-B98C-9451CC0899D8">Karnuki - BABRA</option>
                                                <option value="99B0589D-40D4-4EDF-BA5A-85E35448771F">Katar - RAJULA</option>
                                                <option value="FF1AA502-8EB9-486C-9951-27FDC80F2665">Katar - KHAMBHA</option>
                                                <option value="89A6018D-7934-483F-A1E6-26C33987E6A0">Kathirvadar - DHARI</option>
                                                <option value="E4ACF43B-16E7-488E-8D78-70D5DC206CA9">Kathivadar - RAJULA</option>
                                                <option value="76E4D768-1300-4F64-9831-66F2C7DE92B5">Kathma - AMRELI</option>
                                                <option value="67FA3284-B799-41DD-8DFC-0895427A2A5D">Kathrota - DHARI</option>
                                                <option value="F1F0E621-4D93-4825-A83F-22CD11637773">Kedariya - SAVERKUNDLA</option>
                                                <option value="495729A1-E056-40B9-A24B-1F8B1552DE62">kenar - DHARI</option>
                                                <option value="07C631F1-C57E-4391-A8E0-7B15BC68337F">Kerala - LATHI</option>
                                                <option value="1493D451-CFDE-44AB-89A8-C81B4F95CEA0">Kerala - AMRELI</option>
                                                <option value="411EF8D7-7BAC-4ED5-B04E-9BB3D091E02A">kerala - JAFRABAD</option>
                                                <option value="8845A16C-1930-4F57-8711-7A6DF02103F8">Kerala - SAVERKUNDLA</option>
                                                <option value="D6415E21-72A3-4411-AA9E-5C54318F6C42">Kerala - DHARI</option>
                                                <option value="D170CE6A-C3C6-4A9F-B14A-231053852054">Keriya - LATHI</option>
                                                <option value="87590AC8-2440-4188-AE4A-C18646FC6CF9">Keriyanagas - AMRELI</option>
                                                <option value="3CD8B8D8-AC65-4024-B42C-27E22E8E8AD3">Khad Khambhaliya - AMRELI</option>
                                                <option value="16863240-23BD-479B-A92D-2588408F64CE">Khadadhar - KHAMBHA</option>
                                                <option value="3F215558-8C38-459F-8C74-4D4E1E3C0BC8">Khadkala - SAVERKUNDLA</option>
                                                <option value="A4C5AF7F-E8A7-4148-AF8B-D38EB6DBF96F">Khadkhad - KUNKAVAV VADIA</option>
                                                <option value="9728793C-BF13-41A2-BF50-C4FC9D77BF69">Khadsali - SAVERKUNDLA</option>
                                                <option value="6A85B230-9B86-4079-8FF0-FD60AE2D4D51">Khajuri - KUNKAVAV VADIA</option>
                                                <option value="33CB6C11-EA19-4EAE-9258-9DD6E67E3843">Khajuri-Pipaliya - KUNKAVAV VADIA</option>
                                                <option value="324F6A9F-DB54-411B-BACB-1709E19A4EE2">Khakhariya - BABRA</option>
                                                <option value="803E89FC-6796-4ECE-ABE2-99992C171337">Khakhariya - KUNKAVAV VADIA</option>
                                                <option value="873E8F08-30F2-4A3F-B31E-57BC0152546C">Khakhbai - RAJULA</option>
                                                <option value="EACCF394-61E1-4767-8E78-506246A17834">Khalpar - SAVERKUNDLA</option>
                                                <option value="555426F0-AE1E-4A20-B044-1201E8C3FF63">Khambha - KHAMBHA</option>
                                                <option value="100E6457-B41F-4375-BF52-A49175E5B516">Khambhala - BABRA</option>
                                                <option value="61C49584-739C-4671-9CD4-F8B689161438">Khambhaliya - DHARI</option>
                                                <option value="BD9E66D2-DB50-45ED-9A59-B8C0A8713822">Khambhaliya - RAJULA</option>
                                                <option value="D26739FF-AD86-4779-A6ED-DF9D22B009AC">Khanpar - BABRA</option>
                                                <option value="C813B945-63CA-4D61-9593-3D985B0F2480">Khara - LILIA</option>
                                                <option value="2DA34B63-2D26-4241-9608-9DA420DCE3CF">Khari - RAJULA</option>
                                                <option value="EB6B54ED-B324-4105-B8F8-91B1ED35B4D6">Khari - BAGASARA</option>
                                                <option value="736AA91B-91D0-492A-9978-6393C942A8E8">khera - RAJULA</option>
                                                <option value="072D81B1-40AD-4EDE-90D0-6B9E546D973E">Kherali Moti - RAJULA</option>
                                                <option value="CEE4EBD4-F364-46A0-960D-12E787030E65">Kherali Nani - RAJULA</option>
                                                <option value="30CCFDE5-0B6C-41D7-A1E7-B15789881CF4">Khicha - DHARI</option>
                                                <option value="9AE1B606-8182-47FA-A859-00CFE124DB57">Khijadiya - BAGASARA</option>
                                                <option value="930C458F-F299-4FB8-8972-E28307AC6518">Khijadiya Hanuman - KUNKAVAV VADIA</option>
                                                <option value="F458C782-6BBE-4540-BC2E-24565AE67B84">Khijadiya Khari - AMRELI</option>
                                                <option value="6FCACFB5-0C0D-4344-810C-3232F97A4198">Khijadiya Radadiya - AMRELI</option>
                                                <option value="33FA01AE-CC06-461A-AED8-135376E2DCF8">khijadya-khan - KUNKAVAV VADIA</option>
                                                <option value="C246C7C1-A343-421E-97F8-FC5DDA63FCF7">khijidiya Kotda - BABRA</option>
                                                <option value="1436208F-A43C-4095-94A6-8B695EEFC504">Khisri - DHARI</option>
                                                <option value="866CDC20-8B33-4E53-B8D0-4F79735893ED">Khodiyana - SAVERKUNDLA</option>
                                                <option value="341A27CC-B639-4353-B8AC-AB8B3C9611D4">Kidi - BABRA</option>
                                                <option value="E20731C6-8B44-4CA1-8022-B2BB87FD9373">Kkeriyachand - AMRELI</option>
                                                <option value="0A024A24-79C2-4111-9B1A-290B8316C58C">Kodiya - KHAMBHA</option>
                                                <option value="54982E40-DC5A-4A43-81E2-AF37990D69D4">Kolda - KUNKAVAV VADIA</option>
                                                <option value="5D717748-CCF7-4DF4-9F68-66694B445423">Kotda - DHARI</option>
                                                <option value="9F97DE00-DA12-424A-BA75-AFC799B04B0D">Kotda - KHAMBHA</option>
                                                <option value="7B86F9E5-68ED-40F5-A776-A90F47FF6E09">Kotda Pitha - BABRA</option>
                                                <option value="5DF66395-9BDF-43C0-BA60-CBC0E282A515">Kotdi - RAJULA</option>
                                                <option value="0F10A540-A8BA-4C6C-97B9-9F6BDFABB064">Kotha Pipariya - DHARI</option>
                                                <option value="97DE8639-6ACB-44FB-A6B6-690BC1E94239">Kovaya - RAJULA</option>
                                                <option value="16863D58-A6E6-4188-81E9-56BBEEB9DB14">Krangsa - DHARI</option>
                                                <option value="A8AAB2BE-DE7B-4742-8D34-4F81C0E51988">Krankach - LILIA</option>
                                                <option value="4C2070B6-847C-4967-A85F-D36F64CF7601">Krishna gadh - LATHI</option>
                                                <option value="C7F8FF12-959F-4EB8-9937-B8D982866D01">Kubda - DHARI</option>
                                                <option value="4ED02172-2929-4D6A-89AF-8C5C2A8B6A81">Kumbhariya - RAJULA</option>
                                                <option value="FD631055-7AA4-4D8A-8F8E-538B60A99421">Kundal Nani - BABRA</option>
                                                <option value="5066BFC5-7657-4C36-842F-ABFD551DE1BA">Kundaliyala - RAJULA</option>
                                                <option value="B7B0F6CB-56AA-41D2-9CC0-9CFB8A62B633">KUNDLA - SAVERKUNDLA</option>
                                                <option value="DEF3985B-08F4-4D0F-B61A-2F892E808B34">Kunkavav - SAVERKUNDLA</option>
                                                <option value="B6B712C0-33CE-4BEF-A9BF-DF7F15C2FC83">Kunkavav Moti - KUNKAVAV VADIA</option>
                                                <option value="F4E23152-AD11-4774-BC42-52B885106AF7">Kunkavav Nani - KUNKAVAV VADIA</option>
                                                <option value="45C43BC4-7329-4736-8557-F6CA263B5DDA">Kuntana - LILIA</option>
                                                <option value="8D05F019-2D4A-46C1-8F9F-5C116360C9DE">Kunvargadh - BABRA</option>
                                                <option value="73E68FA6-6C72-45A2-A803-71F8A9B22714">Lakhapadar - DHARI</option>
                                                <option value="7FADF590-53B0-444C-A6A3-BBCB60010F26">Lakhapadar - KUNKAVAV VADIA</option>
                                                <option value="700E3409-6289-4265-AA31-794DE9AF741A">Lalavadar - AMRELI</option>
                                                <option value="23DFF9B6-2A35-480A-8710-8F9176702D8F">Lalka - BABRA</option>
                                                <option value="19B95959-0C07-40F1-91F9-315B23F3CB6D">Lapaliya - AMRELI</option>
                                                <option value="1FE37987-19FA-4135-B664-959BF56D98A8">Lasa - KHAMBHA</option>
                                                <option value="9221B713-2230-4B84-B591-1B4BA76787D9">Lathi - LATHI</option>
                                                <option value="0B51A37B-110A-4E47-B0F0-7D8897ED1280">Likhala - SAVERKUNDLA</option>
                                                <option value="F7280BB3-FE76-4B85-B045-A3720961DCC5">lilia - LILIA</option>
                                                <option value="6601E95A-FC4B-417A-9552-E2B5AC1493F1">Lilia Nana - LILIA</option>
                                                <option value="0AC56AD5-EAC4-45F9-88D6-0D403538D585">Lomkotda - BABRA</option>
                                                <option value="9D487387-B4E5-45A1-8D6D-ACB7E7E6D9AF">Lonka - LILIA</option>
                                                <option value="6119DD4D-A9AD-42F5-AB3E-4AE2ECD59466">Lonki - LILIA</option>
                                                <option value="47F86951-32F4-40B4-B1B3-A3ED9D88BCC4">lor - JAFRABAD</option>
                                                <option value="CD14AC87-36A2-4C3B-B55E-4A3FD7B8982E">Lothpur - JAFRABAD</option>
                                                <option value="83DF12AB-F68B-4B2B-8281-37022C0DCD2C">Lunghiya - BAGASARA</option>
                                                <option value="EB3C076D-759C-4161-8745-14EE15F7964A">Luni-Dhar - KUNKAVAV VADIA</option>
                                                <option value="C070D1BE-0E60-44C4-BA16-BEE3D188F25F">Lunki - BABRA</option>
                                                <option value="0F318872-3E10-4284-98C6-D08933B54F32">Lunsapur - JAFRABAD</option>
                                                <option value="30C082B1-CE6E-42AC-A046-3338BACBB4ED">Luvara - SAVERKUNDLA</option>
                                                <option value="CC3A5449-7A0A-4E05-9CC6-A8D7DA0DCE74">Luvariya - LATHI</option>
                                                <option value="A644EC71-0E91-4CF0-970B-4B4930791C86">Machiyala  Mota - AMRELI</option>
                                                <option value="77F1574C-1EEE-434D-BD95-44D55889C637">Machiyala Nana - AMRELI</option>
                                                <option value="B009DAEF-65FD-4AB2-B32F-7EA6D4F877E4">Madhada - SAVERKUNDLA</option>
                                                <option value="0686456E-A1F4-4192-91B9-3BCF1E7A147B">Madhupur - DHARI</option>
                                                <option value="872ECBC6-7435-4A2F-B4FE-75C8E7847DA6">Majdar - RAJULA</option>
                                                <option value="00F6B969-025E-4C79-AC36-C147F656E79E">Malaviya Pipariya - LATHI</option>
                                                <option value="78A54DD2-5E6B-457E-86D1-2BDB0E18047D">Malila - AMRELI</option>
                                                <option value="3FB5A23D-2439-4077-9B50-8344A60C397C">Malvan - AMRELI</option>
                                                <option value="9E491774-F1A8-4BF8-A684-4EB7259719BC">Manavav - DHARI</option>
                                                <option value="E98C7B38-844B-4B8E-AB5F-8E92F639A328">Mandal - RAJULA</option>
                                                <option value="BF2FC37D-0358-445D-A1A0-67CA7BDA6698">Mandardi Navi-Juni - RAJULA</option>
                                                <option value="A6A99898-FBF3-4BCE-891E-2C238AAA1722">Mandavda Mota - AMRELI</option>
                                                <option value="6697B97C-F981-4C02-A339-4F5AB9905B28">Mandavla Nana - AMRELI</option>
                                                <option value="468030B9-C097-45EB-94C8-78A5F8F4BFBF">Manekvada - BAGASARA</option>
                                                <option value="98C0FA9C-5172-4296-B5F1-DE0D65708478">Mangvapal - AMRELI</option>
                                                <option value="FF2A1180-CBBC-449D-A72B-3464F3AEBF2C">Mashika - DHARI</option>
                                                <option value="0D5684E3-4AC4-418F-B951-51BAB2EFF80E">Masundada Nana- Mota - RAJULA</option>
                                                <option value="7A9A5DDE-FABB-4C25-97C9-C5F3E93AD147">Matan Mala - DHARI</option>
                                                <option value="10319AE3-4019-43AB-877D-69221277DA24">Matirala - LATHI</option>
                                                <option value="306A64E9-38FE-417F-812D-352A6D5984C1">Mavjinjva - BAGASARA</option>
                                                <option value="237D7E3C-6481-4336-B799-62F0D7C9BD96">Maya padar - KUNKAVAV VADIA</option>
                                                <option value="445420C2-32DE-4B75-A01A-6BF572D68700">Medi - AMRELI</option>
                                                <option value="F6826F24-36CF-4169-96D7-596255C4C0BF">Megha-pipaliya - KUNKAVAV VADIA</option>
                                                <option value="6EA04D16-C6EA-4710-A4DA-C86BF7A1597A">Mekda - SAVERKUNDLA</option>
                                                <option value="82324FC2-E4E7-4157-9AA9-55624EEA70F9">Memda - LATHI</option>
                                                <option value="F6423724-48A9-4D05-99C2-D11FA5EBD5DF">Meriyana - SAVERKUNDLA</option>
                                                <option value="07CEE0C6-E9BB-437C-9DAD-51D7666AA366">Methli - LATHI</option>
                                                <option value="58115E20-DA2D-4695-A372-AAE0C4503CE4">Mevasa - SAVERKUNDLA</option>
                                                <option value="277B2853-9248-463F-8B7B-B93A160D9348">Mithapur - JAFRABAD</option>
                                                <option value="6D0A6C1F-A1EF-4F82-AD9C-F3EDF6C45484">Mithapur Nakki - DHARI</option>
                                                <option value="C54CE968-0B7F-4366-ADB3-174975452A56">Mithapur(Dungri) - DHARI</option>
                                                <option value="850173A2-FE66-427C-A3DE-7213322D6D0E">Mitiyala - JAFRABAD</option>
                                                <option value="DFA5E987-FA47-4CC3-A1A7-75F283005BDD">Mitiyala - SAVERKUNDLA</option>
                                                <option value="ADEA11A4-9B13-4084-A467-12CE5A26E7F8">Miya Khijadiya - BABRA</option>
                                                <option value="51CDEE4C-7437-4320-982E-EAEF86F6500F">Mobhiyana Mota - RAJULA</option>
                                                <option value="690D5331-F00F-4F0C-A4D2-00E34517FD21">Mobhiyana Nava - RAJULA</option>
                                                <option value="9E2CE464-BA98-4D1B-8D99-B055D5499624">Moldi - SAVERKUNDLA</option>
                                                <option value="19766438-64CC-4589-A294-3570F93166B2">Monpur - AMRELI</option>
                                                <option value="59E2F6D4-AECB-47CB-9330-0BFB84273DE6">Monvel - DHARI</option>
                                                <option value="807A5AFB-ED26-4EBE-82AA-25E3EC0D5079">Morangi - RAJULA</option>
                                                <option value="9BE2DB36-E3D3-423D-ABBF-82F3456B42BA">Morvada - KUNKAVAV VADIA</option>
                                                <option value="131F7374-E959-49A7-9FE3-6EF14684D01F">Morzar - DHARI</option>
                                                <option value="72C3E821-EC8D-40FA-AED0-13479AB1E0FE">Mota Bhamodra - SAVERKUNDLA</option>
                                                <option value="234FE70A-69D5-44EE-A4E3-A331C6A6F5A0">Mota Mansa - JAFRABAD</option>
                                                <option value="03F3A184-EB6C-41DA-AAEE-5DF2F7CE78E9">Mota Zinzuda - SAVERKUNDLA</option>
                                                <option value="8FA802C5-879D-4591-9695-E5DEE14A5D42">Muliyapat - LATHI</option>
                                                <option value="61A79D72-B5E1-4BF8-ACF7-7813EE0FBE69">Munjiyasar - KHAMBHA</option>
                                                <option value="C889AA60-25D9-40B9-A8B0-03025D8CE474">Munjiyasar Mota - BAGASARA</option>
                                                <option value="838B6C37-97B5-4AB4-846A-63965A977E2D">Munjiyasar Nana - BAGASARA</option>
                                                <option value="CECB0B52-60D4-43BA-BFF3-280CB13A2A5A">Nadala - BABRA</option>
                                                <option value="5A9CE298-E5C1-4CDB-99E8-2728DFC2E225">Nagadhra - DHARI</option>
                                                <option value="D71EB893-4D47-4BF4-B5A9-8252E44B7224">Nageshri - JAFRABAD</option>
                                                <option value="38BAFEC8-9A4F-4AB3-8FB4-28F873E14190">Najapur - KUNKAVAV VADIA</option>
                                                <option value="4BCDB045-F814-4C29-9DA3-1980182E16BA">Nal - SAVERKUNDLA</option>
                                                <option value="CB3B8362-0DA2-4A74-91AD-DF249B2EA4DC">Nana Bhamodra - SAVERKUNDLA</option>
                                                <option value="CC04072C-CDA5-4A50-B942-7DF4DF0C9F28">Nana Visavadar - KHAMBHA</option>
                                                <option value="40B9D785-425C-4BEC-AB24-43BF2955C5FD">Nana Zinzuda - SAVERKUNDLA</option>
                                                <option value="C5AEA42A-CE07-4755-A171-3CEFA03A412B">Nani Vadal - SAVERKUNDLA</option>
                                                <option value="EC9457B1-053C-4D0F-BE4E-45AAB301D7A5">Nanudi - KHAMBHA</option>
                                                <option value="DB583AA4-F396-415A-9C02-B07BE8ED0CC3">Narangadh - LATHI</option>
                                                <option value="7A6E864E-8772-4EDD-A5D2-0D8FCA8763D9">Natvarnagar - BAGASARA</option>
                                                <option value="50862071-9DAA-4CEC-8874-05ECA43FD40C">Nava Charkha - DHARI</option>
                                                <option value="99F753FB-B487-47A1-AA18-E6B6E2B38EA4">Nava Malaknes - KHAMBHA</option>
                                                <option value="EBE48D07-027F-47A2-BA47-D4E2C43AF81A">Nava Pipariya - BAGASARA</option>
                                                <option value="FE55AF39-4B90-4F95-8A9C-1D0F57775761">Navagam(Mariana) - RAJULA</option>
                                                <option value="FBEE334F-52A4-4B81-B30E-254045649469">Navakhijadiya - AMRELI</option>
                                                <option value="7396D6E6-4181-4AB6-BEC3-9F11B895F4A9">Navaniya - BABRA</option>
                                                <option value="8C339F5E-3C65-4F42-816F-341AED9980A5">Nesdi - SAVERKUNDLA</option>
                                                <option value="41A9FF08-D1C8-4D42-AB50-EB62E69B0268">Nesdi  No -1 - RAJULA</option>
                                                <option value="9895BA6D-0C70-42AA-9DEE-37013486C5C8">Nesdi No-2 - KHAMBHA</option>
                                                <option value="45FC81F4-B76A-4B29-90E9-49BF8E75C6B9">Nilavala - BABRA</option>
                                                <option value="89CEFB32-C14F-402F-B2D9-1B4520D59417">Ningala No-1 - RAJULA</option>
                                                <option value="83D1C27F-F110-43FA-B070-3938302E0F34">Ningala No-2 - KHAMBHA</option>
                                                <option value="A5F8B5D2-361C-42C9-B9FA-CCFEC251AE7D">Nonghanvadar - BABRA</option>
                                                <option value="05B4E0F2-CB40-4BBA-875E-8D6D7C7C1E11">Oliya - SAVERKUNDLA</option>
                                                <option value="455DAACB-EB3A-4173-AC47-4401231CBD62">Pachapachiya - KHAMBHA</option>
                                                <option value="6D2F57F7-A3E5-4462-ADAF-36D8FFF7CDA4">Padargadh - DHARI</option>
                                                <option value="7DAC11BE-FE7E-4174-960B-1796A2B1BB8E">Padarshinga - LATHI</option>
                                                <option value="04F7EEA8-4693-4134-9CC7-F54142CD3295">Panch Talavda - LILIA</option>
                                                <option value="1A1DC6EC-5541-4B96-BEE8-8B9EB8495423">Paniya - AMRELI</option>
                                                <option value="6B4C9F94-8C22-47BA-914E-A34B0DF74EF0">Paniya Dungri - DHARI</option>
                                                <option value="8DAB7EB7-A6DE-45F9-B35A-A443FAAE0679">Paniya(Devasthan) - DHARI</option>
                                                <option value="261327B9-DBC4-461B-9718-E2D83AE9883B">Pansada - BABRA</option>
                                                <option value="D6EEB4C5-966F-4B67-8A23-61119D4B39E2">Parbadi - DHARI</option>
                                                <option value="297FAA40-E11D-4536-B1D3-7A3A8606642C">Pati - KHAMBHA</option>
                                                <option value="3A697441-B17B-4CCC-939B-CD4C4F4ADB00">PATI - SAVERKUNDLA</option>
                                                <option value="DD598229-2C77-4B41-B210-96C3B6EE9FFD">Pati Mansa (Nana) - JAFRABAD</option>
                                                <option value="AD6F098A-95C5-4C77-9C48-64BA74CA6038">Patla - DHARI</option>
                                                <option value="81E473CC-316E-4F4C-9ACB-6F8C9C6B190C">Patva - RAJULA</option>
                                                <option value="519EF299-B0C0-4249-9883-10F288334473">Pichhadi - JAFRABAD</option>
                                                <option value="F4489127-0B4D-4ADB-86FE-08F44BD3AEED">Pipalava - KHAMBHA</option>
                                                <option value="839EB48E-6032-4F59-88F5-26B7F4F4424F">Pipaliya Dhundhiya - KUNKAVAV VADIA</option>
                                                <option value="05830E9A-FE9E-41C0-A5BE-49430822C431">Pipalva - LILIA</option>
                                                <option value="5CEBBFC5-5AEB-43E9-B7CB-643B7666FEFF">Pipalva - LATHI</option>
                                                <option value="98E38049-6ABB-46B2-9B29-36F7138B1D4E">Pipariya - KHAMBHA</option>
                                                <option value="964DF4A6-C102-4276-BAB3-8AA2B1F4128D">Pipavav            n - RAJULA</option>
                                                <option value="59981716-FF3E-4840-8C72-B5CB6FA9E1C6">Pipllag - AMRELI</option>
                                                <option value="27331C75-1860-4D33-B96C-89A6910595A1">Pir Khijadiya - BABRA</option>
                                                <option value="4E30E071-D5A4-4FD3-94C2-CE41027475BE">Pithadiya - BAGASARA</option>
                                                <option value="7DE74BFF-7123-40A8-A048-6FAED505E3C0">Pithavajal - AMRELI</option>
                                                <option value="E3F527AB-AFE2-4A23-B169-03BBB014D390">Pithvadi - SAVERKUNDLA</option>
                                                <option value="095D2B7B-74C0-4332-8B50-B335214DFB8C">Piyava - SAVERKUNDLA</option>
                                                <option value="C3C04569-41BC-4B56-958B-D1980BA02592">Pratapgadh - LATHI</option>
                                                <option value="CAD8FD2F-C6CE-46AC-A0D8-EDB6522D0EAB">Pratappara - AMRELI</option>
                                                <option value="457130C9-A94C-4626-8249-DEAA531F398A">Punjapadar - LILIA</option>
                                                <option value="9688A863-71D8-40CF-9818-23F6AF1BE4CC">Punjapar - LATHI</option>
                                                <option value="E4D63994-1B70-480B-B8D0-2440BF226D4B">Putaliya - LILIA</option>
                                                <option value="2C54DDD7-57B9-46AE-AAB2-249A4CFC04DD">Rabarika - KHAMBHA</option>
                                                <option value="7066C997-BB5A-4F9D-A249-FAAF5169170C">Rabhda - RAJULA</option>
                                                <option value="E0E41A74-69A8-4B91-AF40-AA468FDE4828">Rabhda - LATHI</option>
                                                <option value="4BEE1F8F-68B7-4B79-A27E-7DBC965F655F">Rafala - BAGASARA</option>
                                                <option value="D5DD3807-6EBF-46F1-AC61-AE0C4AEC5A6E">Rajasthali - AMRELI</option>
                                                <option value="486F7EB8-CEE9-44C8-9848-F90BD9FCE6F9">Rajkot Nana - LILIA</option>
                                                <option value="844F20F2-5C33-43A6-B955-53038BF00EB5">Rajkot Nana - LATHI</option>
                                                <option value="ED0E166C-62EA-467E-B408-A6CEB1136EEF">Rajparda - RAJULA</option>
                                                <option value="56C1A694-2EB1-4124-978E-5540601AA4A4">Rajsthali - DHARI</option>
                                                <option value="2022C3BD-1A5B-4882-A9C6-294290BE2243">RAJULA - RAJULA</option>
                                                <option value="6AE93D19-790F-4414-8306-B437E36A3F61">Ramgadh - SAVERKUNDLA</option>
                                                <option value="8D2268E5-46A1-455D-978E-C0CD8E7531C9">Rampar - LATHI</option>
                                                <option value="AF7739B9-D2B7-4E50-918F-4FAFC3AA459D">Rampara No-1 - RAJULA</option>
                                                <option value="B2E0FA0D-9095-4292-88DF-89C0864D870A">Rampara No-2 - RAJULA</option>
                                                <option value="2B50113E-0BA7-4288-A2EF-7D45730B2A57">Rampur - KUNKAVAV VADIA</option>
                                                <option value="85B85914-7D48-455B-AB7A-9A8639245F8C">Rampur - DHARI</option>
                                                <option value="C8A91522-90CF-4768-BA19-DEAFA9A849F5">Randhiya - AMRELI</option>
                                                <option value="0B12EE5D-0FEE-47B0-BB71-5FEEF8B58BDC">Rangpur - AMRELI</option>
                                                <option value="8C5CEBE1-66F4-42E7-9B30-30F01636B156">Ranpar - BABRA</option>
                                                <option value="CBFBCF1B-D419-4008-A3EB-3BDA4F7346B2">Ravna - DHARI</option>
                                                <option value="0BA13578-41F5-4C6B-B766-CD2C5AD85280">Raydi - KHAMBHA</option>
                                                <option value="DF053EB4-5D8F-458E-8A45-CC5853278AD3">Raypar - BABRA</option>
                                                <option value="5E2B46C9-AC55-4D67-8CE4-6637C78E1F03">Rikadiya - AMRELI</option>
                                                <option value="3D217D53-7818-41AE-95FE-76F886B9239B">Ringaniyala Mota - RAJULA</option>
                                                <option value="DB26A44D-9BCA-4706-A56B-DAB5B15368D2">Ringaniyala Nana - RAJULA</option>
                                                <option value="2D5FBFC7-0A5D-4485-8239-AAC1366EF11C">Rohisa - JAFRABAD</option>
                                                <option value="FFFC2840-7695-46CA-A5DD-A2B88CE9DB79">Rugnathpur - KHAMBHA</option>
                                                <option value="9C01A19E-1847-428A-969A-76CCF06A908B">Sajanavav - RAJULA</option>
                                                <option value="C2D29B17-2AB4-4F03-B3B1-9CF8B53ADD57">Sajiyavadar - AMRELI</option>
                                                <option value="A7E6721B-6931-42E5-A85E-849BA98D6BF9">Sakariya Mota - JAFRABAD</option>
                                                <option value="8BD15C21-E59D-423B-A2BC-0B85033746AD">Sakariya Nana - JAFRABAD</option>
                                                <option value="6B7EE332-7C80-4593-9974-5811B10F061F">Sakhpur - LATHI</option>
                                                <option value="E001E185-B383-4326-AFB8-D234B74B2D93">Saldi - LILIA</option>
                                                <option value="2213115A-B856-4E43-B197-A83C7CFC1955">Salva - KHAMBHA</option>
                                                <option value="90D0DC57-D758-4076-848A-E0AD7BBF95BD">Samadhiyala - BAGASARA</option>
                                                <option value="ED4A9E17-E40D-444D-B4A8-B0BBA6A1B90B">Samadhiyala - BABRA</option>
                                                <option value="423E0677-1A0F-485B-994D-113B19344FF7">Samadhiyala  N0-1 - RAJULA</option>
                                                <option value="CD40D001-A9CE-4409-BC87-9E011F7FB377">Samadhiyala Mota - KHAMBHA</option>
                                                <option value="2CBF6801-7BBA-46FE-A1DB-B2802EBA13A6">Samadhiyala Nana - DHARI</option>
                                                <option value="F0FB7893-2319-4E54-8CFE-F946C1DC1E30">Samadhiyala No-2 - KHAMBHA</option>
                                                <option value="24B1957D-A5A8-4972-910F-5E2E0360A620">Sanala - KUNKAVAV VADIA</option>
                                                <option value="1AC628D4-DD71-4BDF-8425-530AD28F7260">Sanali - KUNKAVAV VADIA</option>
                                                <option value="71CE6F97-E25F-4DDC-8AFC-AB0DD6B8A573">Sanaliya - BAGASARA</option>
                                                <option value="F72F7CA4-CA20-448D-A136-52D4D35100F1">sanaliya - LILIA</option>
                                                <option value="97E3ADDD-4382-478B-B7E1-6A9EB7D0B036">Sangaderi - AMRELI</option>
                                                <option value="56D0BE9F-9B3E-410D-87DD-EEB08A5FE471">Sanjantimba - LILIA</option>
                                                <option value="C84D345C-1EF2-4E8F-BBB0-791C7E89752E">Sanosra - AMRELI</option>
                                                <option value="B7E5A3F6-DA0A-4625-AEB6-BD0CC6DAFE5E">Sarakadiya (Diwan) - KHAMBHA</option>
                                                <option value="DFC11819-16B4-4052-85D0-6A6F41AB0767">Sarakadiya Mota - KHAMBHA</option>
                                                <option value="67C45FE6-2482-4B46-88BD-EE5B27B56927">Sarambhda - AMRELI</option>
                                                <option value="37657493-859A-4282-B3B4-64B1D2135B03">Sarangpur - KUNKAVAV VADIA</option>
                                                <option value="5941BE9D-DBBD-4D9F-A1F1-7E67B1C7179B">Sarasiya - DHARI</option>
                                                <option value="7CFEEB1C-78A1-4C55-BB86-6FE84387ED41">Sarovada - JAFRABAD</option>
                                                <option value="9000C8EF-51FB-45CE-9FE6-3F24A5FB1270">SAVAR SAMAPADAR - SAVERKUNDLA</option>
                                                <option value="4A95424A-B4F8-4633-889A-BEC7F95DB979">Sedhavadar - LILIA</option>
                                                <option value="2F6DABFF-C356-4638-BAE6-136F22FC867B">Senjal - SAVERKUNDLA</option>
                                                <option value="092F2866-1176-4B6D-AC38-06696A4F7163">Shambhupura - AMRELI</option>
                                                <option value="DB0DBDAA-4B2D-4CFA-BBB4-F0BA24D7293F">Shapar - BAGASARA</option>
                                                <option value="52243D6D-FBDE-4BA6-A94D-634E0824F6F3">Shedubhar - AMRELI</option>
                                                <option value="6BA27D69-AE1E-4B75-812D-CD4327940022">Shekhpipariya - LATHI</option>
                                                <option value="7D0A46C9-1033-41F2-A44A-96855C9A5A51">Shelana - SAVERKUNDLA</option>
                                                <option value="6AF1F28F-2D49-4ED5-9CBC-2B21606283FA">Shemardi - DHARI</option>
                                                <option value="A4049E1F-A133-4EB8-B258-58BA3B6E50B8">Shilana - BAGASARA</option>
                                                <option value="CDA28B7E-851D-4D80-9EC8-B6F259AF65CA">Shivad - DHARI</option>
                                                <option value="C75DC586-0A11-40C0-99B8-F469F58F5E78">Shiyalbet - JAFRABAD</option>
                                                <option value="41D39ABB-77EA-4CE7-8C8F-0EA02CC445DE">simaran - SAVERKUNDLA</option>
                                                <option value="8B99E301-64A1-4019-956A-56240F199F57">Sirvaniya - BABRA</option>
                                                <option value="BFD0970C-34AA-42C8-A16C-3987128755AE">Sokhda - JAFRABAD</option>
                                                <option value="95D5CBEB-D46D-413B-B102-5EBE30BBF96F">Sonariya - AMRELI</option>
                                                <option value="597F4F39-4E62-430D-979F-0825FCB99CCB">Sudavad - BAGASARA</option>
                                                <option value="265CC5EC-5B44-40D7-888A-81456A3AB7A7">Sukavala - BABRA</option>
                                                <option value="CE7FC5D9-0237-4C8A-9B43-852311D6FCC6">Sukhpar - BABRA</option>
                                                <option value="B5C47CE4-847D-49CA-9F4D-B64DAB1A5378">sukhpur - DHARI</option>
                                                <option value="7F58EDA3-96DF-4A9E-8F7F-D6A547E0F3D7">Suragpur - AMRELI</option>
                                                <option value="CA52CE42-810D-4056-A805-CDD6B3A202C9">Surya Pratapgadh - KUNKAVAV VADIA</option>
                                                <option value="04945B9B-9D40-4512-95FD-DB4132BDC2C7">Suvagadh - LATHI</option>
                                                <option value="E38C51C9-4D55-43C0-AF6A-DBFFE2266803">Taivadar - BABRA</option>
                                                <option value="513AA861-EF5A-4CA1-970C-EECC036470C6">Tajpar - LATHI</option>
                                                <option value="0DFFDF9E-AA54-42D5-B2BD-9DA4F5ADCE15">Talali - KUNKAVAV VADIA</option>
                                                <option value="862D241F-8E8D-4608-B725-97B564D08ABF">Talda - KHAMBHA</option>
                                                <option value="29D26384-7E69-40BE-88A8-66C5690F5216">Tantaniya - KHAMBHA</option>
                                                <option value="EEDE1DB3-1330-435A-9990-F13162D0A2F9">Taraktalav - AMRELI</option>
                                                <option value="5B250588-4445-4731-959E-4CD0BB3FB3B2">Taravda - AMRELI</option>
                                                <option value="844EB390-6654-479C-9D3D-BC2ACDA4547D">Targhari - KUNKAVAV VADIA</option>
                                                <option value="145F1690-4697-4A5F-859F-EB684E0D4C71">Tarsingada - DHARI</option>
                                                <option value="090190A2-B1F3-4B0F-9F23-49CE0093F0F2">Thansa - LATHI</option>
                                                <option value="07AF16B3-D7E6-4159-BAF7-448C5137F9DB">Thavi - SAVERKUNDLA</option>
                                                <option value="30D0BB55-F055-4726-BF7F-679C91E5F836">Thordi - SAVERKUNDLA</option>
                                                <option value="AAC60E30-E8F0-4341-89AA-90B21C8D1066">Thordi - AMRELI</option>
                                                <option value="1157F71A-7046-4DFA-A5C9-E10EF752C211">Thorkhan - BABRA</option>
                                                <option value="1D8BCFBB-505F-4BDF-B156-768EC5CA63F3">Timba - AMRELI</option>
                                                <option value="4D6B56A2-2EDF-4396-BE5B-3C5E3070926A">Timbdi - LILIA</option>
                                                <option value="9311402E-F8B7-4C6A-A635-F9809BD3A62A">Timbi - JAFRABAD</option>
                                                <option value="2A36B1C9-FD25-414F-B749-3C2937295108">Timbla - AMRELI</option>
                                                <option value="BD29A5E7-A5D7-4B5C-B729-2CFA572488A8">Toda - LATHI</option>
                                                <option value="4B65E31E-4726-496D-928A-13C94C8567D7">Tori - KUNKAVAV VADIA</option>
                                                <option value="83DC039D-06AF-4B67-83CB-276F12A81BEB">Trakuda - KHAMBHA</option>
                                                <option value="D9F3E90F-DF25-44AF-9C15-51CFD222D613">Trambakpur - DHARI</option>
                                                <option value="3AC6E340-E5F8-4807-9065-896330CFF27B">Tramboda - BABRA</option>
                                                <option value="C83CA9A4-C653-479F-B914-7D69A744A1C4">Uchaiya - RAJULA</option>
                                                <option value="3673CFDC-33A8-4C0E-80C7-B99E07A82C19">Ujala-Mota - KUNKAVAV VADIA</option>
                                                <option value="925549F6-5BFE-4341-97B1-6A9A8E821D01">Ujala-Nava - KUNKAVAV VADIA</option>
                                                <option value="F0319EEF-2058-412B-9B28-B05DD412878E">Umariya - KHAMBHA</option>
                                                <option value="10737E72-6A30-4DFC-9190-D7E0348BF773">Untiya - RAJULA</option>
                                                <option value="FA1C6ADD-8A1E-4139-B7CF-10BAC3831B35">Untvad - BABRA</option>
                                                <option value="212B0A50-3B7B-4FBC-9CA2-C4F84B24D8F9">Vad - RAJULA</option>
                                                <option value="E48D04C0-EFEA-4D26-8D0C-97DBBCF1AF31">Vadera - AMRELI</option>
                                                <option value="A8A2B8A8-7D58-44AC-AC41-9F5D20507AE9">Vadhera - JAFRABAD</option>
                                                <option value="F4F85BBA-A6A9-4803-BB96-293F74A79BB0">vadia - KUNKAVAV VADIA</option>
                                                <option value="05115341-EBD3-4EFD-94D0-36C7FB7193E2">Vadli - JAFRABAD</option>
                                                <option value="8598C4A0-4F21-4C10-B367-382D688BE399">Vadli - RAJULA</option>
                                                <option value="BCBC2E4E-4942-42C4-B9D4-02CA19DA7D54">Vaghaniya - LILIA</option>
                                                <option value="651C153C-D671-407C-91C0-1B8537A2D0F7">Vaghaniya Juna - BAGASARA</option>
                                                <option value="0E35C20A-3C8B-4B31-90B9-B873E3AC2791">Vaghaniya Nava - BAGASARA</option>
                                                <option value="0BC546C0-E354-482C-B473-9EC5317AD889">Vaghvadi - DHARI</option>
                                                <option value="CF7B7733-EE2D-454B-AE4F-BB9B1202F997">Valardi - BABRA</option>
                                                <option value="3594D25F-A3B8-4B66-94DA-12E806C952B9">Vanda - SAVERKUNDLA</option>
                                                <option value="C9AA2E49-8DFA-4FD2-AC01-FD590072207D">Vandaliya - BABRA</option>
                                                <option value="23FC48AB-0969-4D00-9700-E836C2B12BFD">Vandh - JAFRABAD</option>
                                                <option value="B3FE872D-7AA4-44C3-8578-2C8F7C77DA66">Vangadhara - KHAMBHA</option>
                                                <option value="827E38C0-D7DB-4B8F-9517-42A7304028B0">Vankiya - AMRELI</option>
                                                <option value="9D2D0269-69AA-497E-AD65-0BEBFAE1FAD4">Vankiya - BABRA</option>
                                                <option value="EFB7BE31-2CF1-47FC-812D-3DC6AAA5F692">Vankiya - KHAMBHA</option>
                                                <option value="06E3D236-A7CC-4884-80C0-7A5C9956EBBE">Vanot - SAVERKUNDLA</option>
                                                <option value="0ACA902A-A6DC-4993-A6D2-0810CCC56E21">Vanshiyali - SAVERKUNDLA</option>
                                                <option value="E4C54E04-23A9-403A-89DD-47056EA89CB7">Varahsvarup - JAFRABAD</option>
                                                <option value="6A64106B-7960-4EF0-BF49-071BFE5EF0A6">Varasda - AMRELI</option>
                                                <option value="64C03DF1-F144-4D5E-9F1F-7D263F93F144">Vavda - BABRA</option>
                                                <option value="97537B9A-A8A1-4A6A-9F84-2FFF92CC8F9C">Vavdi - RAJULA</option>
                                                <option value="B0DB0920-29FE-4EA1-9F9C-1DA6D7A59FF3">Vavdi - DHARI</option>
                                                <option value="BA40ADDF-EE45-48E8-98CB-B71D9B842A37">Vavdi - BABRA</option>
                                                <option value="C3420CEA-15DA-488A-A452-A5559E4F6D4C">Vavdi - KUNKAVAV VADIA</option>
                                                <option value="46ACCDCD-2FE3-4346-8B8A-06DF1FEAA04C">Vavera - RAJULA</option>
                                                <option value="934484B8-242E-4AF8-830E-1BB9E044B6A3">Venivadar - AMRELI</option>
                                                <option value="4CD6FC1B-555D-42D1-A880-738C8474D444">Vijapdi - SAVERKUNDLA</option>
                                                <option value="AF185C53-7113-42BC-B984-D02F0AE7B847">Vijayanagar - SAVERKUNDLA</option>
                                                <option value="49D03F9A-DC63-4753-B913-A1597DE07273">Virdi - SAVERKUNDLA</option>
                                                <option value="566FA0D4-8132-466E-87F0-9007FF79D274">Virpur - LATHI</option>
                                                <option value="73CEA58E-993E-4E5C-BFEA-228831FF39F1">Virpur - DHARI</option>
                                                <option value="EF24C2CA-33A8-4EAF-86F2-A48E1F4FE144">Visaliya - RAJULA</option>
                                                <option value="2D03AFCB-C9BB-470C-A9E2-99586872842B">Vithalpur - AMRELI</option>
                                                <option value="09F2148A-15EE-426E-A852-F83F3746022C">Zampodar - RAJULA</option>
                                                <option value="D1253778-8DA4-4849-B3EB-3A6C0284A9EE">Zanzarda - RAJULA</option>
                                                <option value="19270C94-06B8-4CFE-93EB-A7F4ACF83CBE">Zanzariya Juna - BAGASARA</option>
                                                <option value="AE0C6307-FE3A-43B7-9F42-DE7B7D5D1300">Zanzariya Nava - BAGASARA</option>
                                                <option value="418CB19C-E228-44F1-8AB9-6B8CC3F645C0">Zar - DHARI</option>
                                                <option value="0ABEF7B0-AF1A-4237-9026-861820E6ED33">Zinzka - RAJULA</option>
                                            </select>
                                        </td>
                                        <td>&nbsp;</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colspan="6">
                                            <div>
                                                <table cellspacing="0" rules="all" class="mytable table-bordered" border="1" id="ctl00_ContentPlaceHolder1_GVTax" style="width:100%;border-collapse:collapse;">
                                                    <tr>
                                                        <th scope="col">કરનું નામ</th>
                                                        <th scope="col">ચાલુ બાકી</th>
                                                        <th scope="col">પાછલી બાકી</th>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl02_LblTax">ઘર વેરો</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl02$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl02_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl02$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl02_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl03_LblTax">સા.પાણી વેરો</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl03$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl03_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl03$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl03_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl04_LblTax">ખા.પાણી વેરો</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl04$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl04_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl04$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl04_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl05_LblTax">લાઈટ વેરો</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl05$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl05_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl05$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl05_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl06_LblTax">સફાઈ વેરો</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl06$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl06_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl06$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl06_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl07_LblTax">ગટર વેરો</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl07$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl07_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl07$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl07_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl08_LblTax">નોટીસ</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl08$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl08_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl08$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl08_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl09_LblTax">એડવાન્સ</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl09$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl09_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl09$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl09_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl10_LblTax">અન્ય</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl10$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl10_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl10$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl10_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl11_LblTax">અન્ય૨</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl11$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl11_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl11$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl11_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl12_LblTax">અન્ય૩</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl12$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl12_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl12$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl12_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl13_LblTax">અન્ય૪</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl13$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl13_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl13$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl13_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl14_LblTax">અન્ય૫</span>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl14$TxtCurrAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl14_TxtCurrAmt" tabindex="30" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                        <td style="width:150px;">
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl14$TxtPreAmt" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl14_TxtPreAmt" tabindex="31" class="form-control BGcolorRED" onchange="calcTotal()" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl15_LblTaxtotal" style="float: right;">સરવાળો</span>
                                                            <br/>
                                                            <br/>
                                                            <br/>
                                                        </td>
                                                        <td>
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl15$TxtCurrAmtTotal" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl15_TxtCurrAmtTotal" disabled="disabled" class="form-control BGcolorRED" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                            <br/>
                                                            <span id="ctl00_ContentPlaceHolder1_GVTax_ctl15_LblTaxtotal1" style="float: right;">કુલ કર રૂ.</span>
                                                        </td>
                                                        <td>
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl15$TxtPreAmtTotal" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl15_TxtPreAmtTotal" disabled="disabled" class="form-control BGcolorRED" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                            <br/>
                                                            <input name="ctl00$ContentPlaceHolder1$GVTax$ctl15$TextBox1" type="text" id="ctl00_ContentPlaceHolder1_GVTax_ctl15_TextBox1" disabled="disabled" class="form-control BGcolorRED" onkeypress="return validateKeyPress(event,validNums2)" style="width:100px;text-align: right"/>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>માસ્ટર સુધારની વિગત 
                    </td>
                                        <td colspan="5">
                                            <input name="ctl00$ContentPlaceHolder1$TxtcNarration" type="text" id="ctl00_ContentPlaceHolder1_TxtcNarration" tabindex="32" class="form-control BGcolorBlue "/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                </table>
                                <div class="ln_solid"></div>
                                <div class="form-group">
                                    <div>
                                        <input name="ctl00$ContentPlaceHolder1$BtnSave" type="button" id="ctl00_ContentPlaceHolder1_BtnSave" class="btn btn-success" onclick="MilkatMaster()" tabindex="33" value="સંગ્રહ"/>
                                        <input name="ctl00$ContentPlaceHolder1$BtnCancel" type="button" id="ctl00_ContentPlaceHolder1_BtnCancel" class="btn btn-primary" onclick="location.href = &#39;MasterMilkatPV.aspx&#39;" tabindex="34" value="રદ કરવું"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal" id="myModel" role="dialog" style="width: 35%; align-content: center; height: 150px;">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-sm-7">
                                            <h2>
                                                <span id="ctl00_ContentPlaceHolder1_lblHeading">Delete</span>
                                            </h2>
                                        </div>
                                        <div class="col-sm-2">
                                            <button class="btn btn-primary" onclick="notifyNo()" style="width: 60px;" id="btnNo" type="button">ના</button>
                                        </div>
                                        <div class="col-sm-2">
                                            <button class="btn btn-default" onclick="notifyYes()" style="width: 60px;" id="btnYes" type="button">હા</button>
                                        </div>
                                    </div>
                                    <br/>
                                    <p>
                                        <span id="ctl00_ContentPlaceHolder1_lblBody">Do you want to delete?</span>
                                    </p>
                                    <br/>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="ctl00$ContentPlaceHolder1$HFExists" id="ctl00_ContentPlaceHolder1_HFExists"/>
                        <input type="hidden" name="ctl00$ContentPlaceHolder1$HFnSocietyID" id="ctl00_ContentPlaceHolder1_HFnSocietyID"/>
                        <input type="hidden" name="ctl00$ContentPlaceHolder1$HFEditUserRights" id="ctl00_ContentPlaceHolder1_HFEditUserRights" value="1"/>
                        <input type="hidden" name="ctl00$ContentPlaceHolder1$HFDeleteUserRights" id="ctl00_ContentPlaceHolder1_HFDeleteUserRights" value="1"/>
                        <input type="hidden" name="ctl00$ContentPlaceHolder1$HFRecDone" id="ctl00_ContentPlaceHolder1_HFRecDone"/>
                        <input type="hidden" name="ctl00$ContentPlaceHolder1$HFMaxYearCnt" id="ctl00_ContentPlaceHolder1_HFMaxYearCnt" value="0"/>
                    </div>
                </div>
            </div>
            <div id="custom_notifications" class="custom-notifications dsp_none">
                <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group"></ul>
                <div class="clearfix"></div>
                <div id="notif-group" class="tabbed_notifications"></div>
            </div>
            <script src="../js/bootstrap.min.js"></script>
            <!-- gauge js -->
            <!-- chart js -->
            <!-- bootstrap progress js -->
            <script src="../js/progressbar/bootstrap-progressbar.min.js"></script>
            <script src="../js/nicescroll/jquery.nicescroll.min.js"></script>
            <!-- icheck -->
            <script src="../js/icheck/icheck.min.js"></script>
            <!-- daterangepicker -->
            <script type="text/javascript" src="../js/moment.min.js"></script>
            <script type="text/javascript" src="../js/datepicker/daterangepicker.js"></script>
            <script src="../js/custom.js"></script>
            <!-- flot js -->
            <!--[if lte IE 8]><script type="text/javascript" src="../js/excanvas.min.js"></script><![endif]-->
            <script type="text/javascript" src="../js/flot/jquery.flot.js"></script>
            <script type="text/javascript" src="../js/flot/jquery.flot.pie.js"></script>
            <script type="text/javascript" src="../js/flot/jquery.flot.orderBars.js"></script>
            <script type="text/javascript" src="../js/flot/jquery.flot.time.min.js"></script>
            <script type="text/javascript" src="../js/flot/date.js"></script>
            <script type="text/javascript" src="../js/flot/jquery.flot.spline.js"></script>
            <script type="text/javascript" src="../js/flot/jquery.flot.stack.js"></script>
            <script type="text/javascript" src="../js/flot/curvedLines.js"></script>
            <script type="text/javascript" src="../js/flot/jquery.flot.resize.js"></script>
            <script>
                $(document).ready(function() {
                    // [17, 74, 6, 39, 20, 85, 7]
                    //[82, 23, 66, 9, 99, 6, 2]
                    var data1 = [[gd(2012, 1, 1), 17], [gd(2012, 1, 2), 74], [gd(2012, 1, 3), 6], [gd(2012, 1, 4), 39], [gd(2012, 1, 5), 20], [gd(2012, 1, 6), 85], [gd(2012, 1, 7), 7]];

                    var data2 = [[gd(2012, 1, 1), 82], [gd(2012, 1, 2), 23], [gd(2012, 1, 3), 66], [gd(2012, 1, 4), 9], [gd(2012, 1, 5), 119], [gd(2012, 1, 6), 6], [gd(2012, 1, 7), 9]];
                    $("#canvas_dahs").length && $.plot($("#canvas_dahs"), [data1, data2], {
                        series: {
                            lines: {
                                show: false,
                                fill: true
                            },
                            splines: {
                                show: true,
                                tension: 0.4,
                                lineWidth: 1,
                                fill: 0.4
                            },
                            points: {
                                radius: 0,
                                show: true
                            },
                            shadowSize: 2
                        },
                        grid: {
                            verticalLines: true,
                            hoverable: true,
                            clickable: true,
                            tickColor: "#d5d5d5",
                            borderWidth: 1,
                            color: '#fff'
                        },
                        colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
                        xaxis: {
                            tickColor: "rgba(51, 51, 51, 0.06)",
                            mode: "time",
                            tickSize: [1, "day"],
                            //tickLength: 10,
                            axisLabel: "Date",
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Verdana, Arial',
                            axisLabelPadding: 10 //mode: "time", timeformat: "%m/%d/%y", minTickSize: [1, "day"]
                        },
                        yaxis: {
                            ticks: 8,
                            tickColor: "rgba(51, 51, 51, 0.06)",
                        },
                        tooltip: false
                    });

                    function gd(year, month, day) {
                        return new Date(year,month - 1,day).getTime();
                    }
                });
            </script>
            <!-- worldmap -->
            <!-- skycons -->
            <script src="../js/skycons/skycons.js"></script>
            <script>
                var icons = new Skycons({
                    "color": "#73879C"
                }), list = ["clear-day", "clear-night", "partly-cloudy-day", "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"], i;

                for (i = list.length; i--; )
                    icons.set(list[i], list[i]);

                icons.play();
            </script>
            <!-- dashbord linegraph -->
            <script>
                var doughnutData = [{
                    value: 30,
                    color: "#455C73"
                }, {
                    value: 30,
                    color: "#9B59B6"
                }, {
                    value: 60,
                    color: "#BDC3C7"
                }, {
                    value: 100,
                    color: "#26B99A"
                }, {
                    value: 120,
                    color: "#3498DB"
                }];
                //comment by drp 27122019 for remove in console error
                //var myDoughnut = new Chart(document.getElementById("canvas1").getContext("2d")).Doughnut(doughnutData);

                function OpenModel() {
                    $('#GetLoginModal').modal();
                }
                function login() {
                    $.ajax({
                        url: "../WebService.asmx/updateLogin",
                        data: "{ 'Query':'SS','txtPass':'" + document.getElementById("ctl00_TxtPassword").value + "'}",
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {

                            if (data.d.cMsg == "1") {
                                $('#GetLoginModal').hide();
                                return true;
                            } else {
                                return false;
                                alert("Password is Wronge!!");
                            }
                        }
                    });
                }
            </script>
            <!-- /dashbord linegraph -->
            <!-- datepicker -->
            <script type="text/javascript">
                $(document).ready(function() {

                    var cb = function(start, end, label) {
                        console.log(start.toISOString(), end.toISOString(), label);
                        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                        //alert("Callback has fired: [" + start.format('MMMM D, YYYY') + " to " + end.format('MMMM D, YYYY') + ", label = " + label + "]");
                    }

                    var optionSet1 = {
                        startDate: moment().subtract(29, 'days'),
                        endDate: moment(),
                        minDate: '01/01/2012',
                        maxDate: '12/31/2015',
                        dateLimit: {
                            days: 60
                        },
                        showDropdowns: true,
                        showWeekNumbers: true,
                        timePicker: false,
                        timePickerIncrement: 1,
                        timePicker12Hour: true,
                        ranges: {
                            'Today': [moment(), moment()],
                            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        },
                        opens: 'left',
                        buttonClasses: ['btn btn-default'],
                        applyClass: 'btn-small btn-primary',
                        cancelClass: 'btn-small',
                        format: 'MM/DD/YYYY',
                        separator: ' to ',
                        locale: {
                            applyLabel: 'Submit',
                            cancelLabel: 'Clear',
                            fromLabel: 'From',
                            toLabel: 'To',
                            customRangeLabel: 'Custom',
                            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            firstDay: 1
                        }
                    };
                    $('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
                    $('#reportrange').daterangepicker(optionSet1, cb);
                    $('#reportrange').on('show.daterangepicker', function() {
                        console.log("show event fired");
                    });
                    $('#reportrange').on('hide.daterangepicker', function() {
                        console.log("hide event fired");
                    });
                    $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
                        console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
                    });
                    $('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
                        console.log("cancel event fired");
                    });
                    $('#options1').click(function() {
                        $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
                    });
                    $('#options2').click(function() {
                        $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
                    });
                    $('#destroy').click(function() {
                        $('#reportrange').data('daterangepicker').remove();
                    });
                });
            </script>
            <!-- /datepicker -->
            <!-- /footer content -->
            <!-- Old -->
            <!-- End Site Wrapper -->
            <div class="modal fade" id="GetLoginModal" aria-hidden="false" aria-labelledby="GetBarcodeHelpModalLabel" role="dialog" data-backdrop="static" style="z-index: 999;">
                <div class="modal-dialog" style="width: 40%;">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="GetLoginModalLabel" style="text-align: center;">Login</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <table style="width: 100%;">
                                <tr style="height: 22px; background: #990000">
                                    <td style="color: White;">
                                        <strong>&nbsp;&nbsp;Sign in</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr style="height: 25px;">
                                    <td style="vertical-align: bottom;">
                                        Login ID :
                                <span id="ctl00_LblUserID" style="Font-family:;">ગ્રામપંચાયત</span>
                                    </td>
                                </tr>
                                <tr style="height: 25px;">
                                    <td style="vertical-align: bottom;">
                                        Password :
                                <input name="ctl00$TxtPassword" type="password" id="ctl00_TxtPassword"/>
                                    </td>
                                </tr>
                                <tr style="height: 70px; text-align: center;">
                                    <td style="vertical-align: bottom;">
                                        <input name="ctl00$btnlogin" type="button" id="ctl00_btnlogin" class="btn btn-success" value="Login" onclick="return login();" tabindex="7"/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <script type="text/javascript">
                //<![CDATA[
                SearchMilkatMaster();
                MyFont('');
                Sys.Application.add_init(function() {
                    $create(AjaxControlToolkit.CalendarBehavior, {
                        "button": $get("ImageButton1"),
                        "cssClass": "cal_Theme1",
                        "format": "dd/MM/yyyy",
                        "id": "CalendarExtender"
                    }, null, null, $get("ctl00_ContentPlaceHolder1_TxtdTharavDate"));
                });
                //]]>
            </script>
        </form>
    </body>
</html>
