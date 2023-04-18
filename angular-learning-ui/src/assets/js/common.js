function Search(th, grdid) {
    if ($(".highlight").length > 0) {
        var reh = new RegExp("<span class=\"highlight\">" + $(".highlight")[0].innerHTML + "</span>", "ig");

        var htm = $(grdid).html();
        var matchArray;
        var resultString = "";
        var first = 0; var last = 0;

        while ((matchArray = reh.exec(htm)) != null) {
            last = matchArray.index;
            // get all of string up to match, concatenate
            resultString += htm.substring(first, last);

            // add matched, with class
            resultString += $(matchArray[0]).text();
            first = reh.lastIndex;
        }

        // finish off string
        resultString += htm.substring(first, htm.length);
        $(grdid).html(resultString);
    }

    if (th.value.length > 0) {
        var re = new RegExp(th.value, "ig");
        var tr = $("tr", grdid);

        for (var i = 1; i < tr.length; i++) {

            var isExist = false;
            $("td", tr[i]).each(function () {
                var htm = "";
                var matchArray;
                var resultString = "";
                var first = 0; var last = 0;

                if (this.children.length > 0) {
                    htm = this.children[0].innerText;

                    // find each match
                    while ((matchArray = re.exec(htm)) != null) {
                        isExist = true;
                        last = matchArray.index;
                        // get all of string up to match, concatenate
                        resultString += htm.substring(first, last);

                        // add matched, with class
                        resultString += "<span class='highlight'>" + matchArray[0] + "</span>";
                        first = re.lastIndex;
                    }

                    // finish off string
                    resultString += htm.substring(first, htm.length);
                    $(this.children[0]).html(resultString);
                }
                else {
                    htm = this.innerText;

                    // find each match
                    while ((matchArray = re.exec(htm)) != null) {
                        isExist = true;
                        last = matchArray.index;
                        // get all of string up to match, concatenate
                        resultString += htm.substring(first, last);

                        // add matched, with class
                        resultString += "<span class='highlight'>" + matchArray[0] + "</span>";
                        first = re.lastIndex;
                    }

                    // finish off string
                    resultString += htm.substring(first, htm.length);
                    $(this).html(resultString);
                }
            });

            if (isExist == true) {
                $(tr[i]).css("display", "");
            }
            else {
                $(tr[i]).css("display", "none");
            }
        }
    }
    else {
        $("tr", grdid).css("display", "");
    }
}
function mergeRows(grdid, cellIdx) {
    var rows = $("tr", grdid); //"#grdpreprod"

    for (var i = 1; i < rows.length - 1; i++) {
        if (rows[i].cells[cellIdx].innerText == rows[i + 1].cells[cellIdx].innerText) {
            $(rows[i].cells[cellIdx]).prop("rowspan", "2");
            $(rows[i + 1].cells[cellIdx]).remove();
        }
    }
}