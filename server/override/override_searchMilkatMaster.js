function SearchMilkatMaster() {
  var ID = GetParameterValues("ID");
  var D = GetParameterValues("D");

  function GetParameterValues(param) {
    var url = window.location.href
      .slice(window.location.href.indexOf("?") + 1)
      .split("&");
    for (var i = 0; i < url.length; i++) {
      var urlparam = url[i].split("=");
      if (urlparam[0] == param) {
        return urlparam[1];
      }
    }
  }

  $.ajax({
    url: "MilkatMaster.asmx/SearchMilkatMaster",
    data: "{ 'NID':'" + ID + "'}",
    dataType: "json",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      $.ajax({
        url: "MilkatMaster.asmx/SearchMilkatBillaster",
        data: "{ 'NID':'" + ID + "'}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          var count = 0;

          if (data.d[0].Msg == "1") {
            for (var i = 0; i < data.d.length; i++) {
              if (i == 0) {
                $("#ctl00_ContentPlaceHolder1_HFExists").val("1");
              }
              $("body").append(
                '<input type="hidden" id="HFnNetTaxPaid_' +
                  count +
                  '" value="' +
                  data.d[i].nNetTaxPaid +
                  '"></input>'
              );
              count += 1;
              $("body").append(
                '<input type="hidden" id="HFnBalancePaid_' +
                  count +
                  '" value="' +
                  data.d[i].nBalancePaid +
                  '"></input>'
              );
              count += 1;
              $("body").append(
                '<input type="hidden" id="HFnPaidRs_' +
                  count +
                  '" value="' +
                  data.d[i].nPaidRs +
                  '"></input>'
              );
            }
          }
        },
        failure: function () {
          alert("Search Time Error!");
        },
      });

      var cMilkatNo = data.d.cMilkatNos;

      document.getElementById("ctl00_ContentPlaceHolder1_TxtcMilkatNos").value =
        parseFloat(cMilkatNo);
      document.getElementById(
        "ctl00_ContentPlaceHolder1_TxtCHouseOwnersName"
      ).value = data.d.CHouseOwnersName;
      document.getElementById(
        "ctl00_ContentPlaceHolder1_TxtCHouseKeepersName"
      ).value = data.d.CHouseKeepersName;
      document.getElementById(
        "ctl00_ContentPlaceHolder1_TxtcHouseKabjedarName"
      ).value = data.d.cHouseKabjedarName;
      //document.getElementById("ctl00_ContentPlaceHolder1_DDLNSocietyId").value = data.d.NSocietyId;
      $("#ctl00_ContentPlaceHolder1_HFnSocietyID").val(data.d.NSocietyId);
      //DXSociety.SetValue(data.d.NSocietyId);
      document.getElementById("ctl00_ContentPlaceHolder1_DDLSociety").value =
        data.d.NSocietyId;

      document.getElementById("ctl00_ContentPlaceHolder1_TxtcWardName").value =
        data.d.cWardName;
      document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseNo").value =
        data.d.CHouseNo;
      document.getElementById("ctl00_ContentPlaceHolder1_DDLnLoan").value =
        data.d.nLoan;
      if (data.d.nLoan == "1") {
        $("#ctl00_ContentPlaceHolder1_TxtcBojoRemarks").removeAttr("disabled");
      } else {
        $("#ctl00_ContentPlaceHolder1_TxtcBojoRemarks").attr(
          "disabled",
          "disabled"
        );
        $("#ctl00_ContentPlaceHolder1_TxtcBojoRemarks").val("");
      }
      document.getElementById(
        "ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding"
      ).value = data.d.NTypeOfBuilding;
      document.getElementById(
        "ctl00_ContentPlaceHolder1_TxtNHouseValue"
      ).value = data.d.NHouseValue;
      document.getElementById("ctl00_ContentPlaceHolder1_TxtnHouseArea").value =
        data.d.nHouseArea;
      document.getElementById(
        "ctl00_ContentPlaceHolder1_DDLnPipeLineID"
      ).value = data.d.nPipeLineID;
      document.getElementById(
        "ctl00_ContentPlaceHolder1_TxtCDescription"
      ).value = data.d.CDescription;
      document.getElementById("ctl00_ContentPlaceHolder1_TxtcNarration").value =
        data.d.cNarration;
      document.getElementById("ctl00_ContentPlaceHolder1_TxtCHouseNo").value =
        data.d.CHouseNo;
      document.getElementById(
        "ctl00_ContentPlaceHolder1_TxtcBojoRemarks"
      ).value = data.d.cBojoRemarks;
      $("#ctl00_ContentPlaceHolder1_TxtcBlockNo").val(data.d.cBlockNo);
      $("#ctl00_ContentPlaceHolder1_TxtcTharavNo").val(data.d.cTharavNo);

      $("#ctl00_ContentPlaceHolder1_HFAdhar").val(data.d.cAadharcardNo);

      CheckData();
      $("#ctl00_ContentPlaceHolder1_TxtPanCardNo").val(data.d.cPancardNo);
      $("#ctl00_ContentPlaceHolder1_TxtRationCardNo").val(data.d.cRationcardNo);
      $("#ctl00_ContentPlaceHolder1_TxtMobileNo").val(data.d.cMobileNo);

      if (data.d.dTharavDate != "") {
        var CalendarExtenderBehavior = $find("CalendarExtender");
        CalendarExtenderBehavior.set_selectedDate(
          getDateDJ(data.d.dTharavDate, "MM/dd/yyyy", "dd/MM/yyyy")
        );
      }

      //DXSociety.SetText(data.d.cSocietyName);
      //if (data.d.nBillNo > 0)
      //{
      if (nEdit.value == "0") {
        document.getElementById(
          "ctl00_ContentPlaceHolder1_DDLNTypeOfBuilding"
        ).disabled = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_TxtNHouseValue"
        ).disabled = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_TxtnHouseArea"
        ).disabled = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_DDLnPipeLineID"
        ).disabled = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_DDLSociety"
        ).disabled = true;
        document.getElementById(
          "ctl00_ContentPlaceHolder1_TxtCHouseOwnersName"
        ).disabled = true;
      }
      //}

      var grid = document.getElementById("ctl00_ContentPlaceHolder1_GVTax");
      var inputs = grid.getElementsByTagName("input");

      var split = data.d.TaxAmounts.split("¶");

      for (var i = 0; i < split.length - 1; i++) {
        if (nEdit.value == "0") {
          inputs[i].disabled = true;
        }
        inputs[i].value = split[i];
      }

      //   calc
    },
  });
}
