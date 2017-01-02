$(document).ready(function () {
    var localeLang = navigator.language;
    if (localeLang.indexOf("-") > 0) {
        localeLang = localeLang.substring(0, localeLang.indexOf("-"));
    }
    createTable(localeLang);
    addLanguage(localeLang, languages[localeLang]['eng']);
    $("#lang_menu tr #" + localeLang).toggleClass("selected");

    $("#lang_menu").find("td").click(function () {
        var languageSelection = $(this).attr("id");

        if (!languageIds.includes(languageSelection)) {
            $(this).toggleClass("selected");
            addLanguage(languageSelection, $(this).find("span").text());
        } else {
            // TODO add click to remove item?
            // removeFrame(languageSelection);
            // $.grep(languageIds, function(value){
            //     return value != languageSelection;
            // });
        }
        $("#lang_menu").toggle();
    });
    $('html').click(function () {
        $("#lang_menu").hide();
    });
    $("#lang_menu").toggle();
    $("#btn_add_lang").click(function (event) {
        event.stopPropagation();
        $("#lang_menu").toggle();
        var leftMenuLoc = $(".container-fluid").width() - $("#lang_menu > tbody").outerWidth();
        var topMenuLoc = $("#btn_add_lang").offset().top + $("#input_search_group").height();

        $("#lang_menu_container").css({
            "top": topMenuLoc, "left": leftMenuLoc
        });
    });
    $("#btn_remove_lang").click(removeLanguage);
    $("#btn_search").click(submitQuery);
    $("#input_search").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btn_search").click();
        }
    });
});

var languageIds = [];
var query;
function submitQuery() {
    query = $("#input_search").val();
    console.log("Query submitted " + query);
    getWikiData(languageIds, query, onWikiDataCompleted);
}

function onWikiDataCompleted(data) {
    var results = onWikiDataReceived(data, languageIds);
    var wiki_links = getWikiLinks(languageIds, results, query);
    console.log(wiki_links);

    for (var langPos in languageIds) {
        var language = languageIds[langPos];
        var langContent = $("#content_container").find("#" + language);
        langContent.empty();
        langContent.append("<iframe class='content_wiki' src=" +
            wiki_links[language].wiki_link + "></iframe>");
    }
}


function addLanguage(languageId, languageName) {
    languageIds.push(languageId);
    $("#content_container").append("<div id='" + languageId + "' class='content_panel panel-body'><h2>"
        + languages[languageId].eng + "<br>" + languages[languageId].local+ "</h2></div>");
    updateContentFrames();
}

function removeLanguage() {
    if (languageIds.length > 0) {
        removeFrame(languageIds.pop());
    }
}

function removeFrame(removeLanguage) {
    $("#content_container").find("#" + removeLanguage).remove();
    $("#lang_menu tr #" + removeLanguage).toggleClass("selected");
    updateContentFrames();
}

function updateContentFrames() {
    var maxWidth = 1 / languageIds.length * 100;
    var contentContainer = $("#content_container");

    languageIds.forEach(function (id) {
        contentContainer.find("#" + id).css({
            display: "inline-block",
            width: maxWidth + "%"
        });
    });
}

function createTable(mainLocale) {
    var table = $("#lang_menu");
    var cnt = 0;

    var builder = "<tr>";
    if (languages[mainLocale] !== undefined) {
        cnt += 1;
        builder += "<td id='" + mainLocale + "'><span>" + languages[mainLocale].eng + "</span></td>";
        // delete languagues[mainLocale];
    }
    var sorted = Object.keys(languages);
    sorted.sort(function (a, b) {
        return languages[a]['eng'].charAt(0) > languages[b]['eng'].charAt(0);
    });
    for (var langKey in sorted) {
        var lang = languages[sorted[langKey]];
        if (mainLocale !== sorted[langKey]) {
            if (cnt === 0) {
                builder += "<tr>";
            }
            builder += "<td id='" + sorted[langKey] + "'><span>" + lang.eng + "</span></td>";
            if (cnt > 4) {
                builder += "</tr>";
            }
            cnt += 1;
            if (cnt > 4) {
                cnt = 0;
            }
        }
    }
    table.append(builder);
}

var languages = { 'eo': { 'eng': 'Esperanto', 'local': 'Esperanto' }, 'sr': { 'eng': 'Serbian', 'local': 'српски / srpski' }, 'id': { 'eng': 'Indonesian', 'local': 'Bahasa Indonesia' }, 'be': { 'eng': 'Belarusian', 'local': 'беларуская' }, 'bg': { 'eng': 'Bulgarian', 'local': 'български' }, 'fi': { 'eng': 'Finnish', 'local': 'suomi' }, 'ceb': { 'eng': 'Cebuano', 'local': 'Cebuano' }, 'nn': { 'eng': 'Norwegian (Nynorsk)', 'local': 'norsk nynorsk' }, 'pl': { 'eng': 'Polish', 'local': 'polski' }, 'ro': { 'eng': 'Romanian', 'local': 'română' }, 'ja': { 'eng': 'Japanese', 'local': '日本語' }, 'la': { 'eng': 'Latin', 'local': 'Latina' }, 'ar': { 'eng': 'Arabic', 'local': 'العربية' }, 'es': { 'eng': 'Spanish', 'local': 'español' }, 'sh': { 'eng': 'Serbo-Croatian', 'local': 'srpskohrvatski / српскохрватски' }, 'et': { 'eng': 'Estonian', 'local': 'eesti' }, 'de': { 'eng': 'German', 'local': 'Deutsch' }, 'hr': { 'eng': 'Croatian', 'local': 'hrvatski' }, 'hy': { 'eng': 'Armenian', 'local': 'Հայերեն' }, 'sv': { 'eng': 'Swedish', 'local': 'svenska' }, 'ms': { 'eng': 'Malay', 'local': 'Bahasa Melayu' }, 'fr': { 'eng': 'French', 'local': 'français' }, 'ca': { 'eng': 'Catalan', 'local': 'català' }, 'zh': { 'eng': 'Chinese', 'local': '中文' }, 'uk': { 'eng': 'Ukrainian', 'local': 'українська' }, 'el': { 'eng': 'Greek', 'local': 'Ελληνικά' }, 'kk': { 'eng': 'Kazakh', 'local': 'қазақша' }, 'ru': { 'eng': 'Russian', 'local': 'русский' }, 'lt': { 'eng': 'Lithuanian', 'local': 'lietuvių' }, 'gl': { 'eng': 'Galician', 'local': 'galego' }, 'he': { 'eng': 'Hebrew', 'local': 'עברית' }, 'eu': { 'eng': 'Basque', 'local': 'euskara' }, 'tr': { 'eng': 'Turkish', 'local': 'Türkçe' }, 'war': { 'eng': 'Waray', 'local': 'Winaray' }, 'vo': { 'eng': 'Volapük', 'local': 'Volapük' }, 'min': { 'eng': 'Minangkabau', 'local': 'Baso Minangkabau' }, 'pt': { 'eng': 'Portuguese', 'local': 'português' }, 'it': { 'eng': 'Italian', 'local': 'italiano' }, 'no': { 'eng': 'Norwegian (Bokmål)', 'local': 'norsk bokmål' }, 'ce': { 'eng': 'Chechen', 'local': 'нохчийн' }, 'ko': { 'eng': 'Korean', 'local': '한국어' }, 'cs': { 'eng': 'Czech', 'local': 'čeština' }, 'da': { 'eng': 'Danish', 'local': 'dansk' }, 'simple': { 'eng': 'Simple English', 'local': 'Simple English' }, 'vi': { 'eng': 'Vietnamese', 'local': 'Tiếng Việt' }, 'uz': { 'eng': 'Uzbek', 'local': 'oʻzbekcha/ўзбекча' }, 'fa': { 'eng': 'Persian', 'local': 'فارسی' }, 'en': { 'eng': 'English', 'local': 'English' }, 'nl': { 'eng': 'Dutch', 'local': 'Nederlands' }, 'sl': { 'eng': 'Slovenian', 'local': 'slovenščina' }, 'hu': { 'eng': 'Hungarian', 'local': 'magyar' }, 'sk': { 'eng': 'Slovak', 'local': 'slovenčina' } };
