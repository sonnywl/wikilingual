
function onWikiDataReceived(data, languages) {
    var result = {};
    if (data.entities !== undefined) {
        languages.forEach(function (language) {
            for (var id in data.entities) {
                var wikiSite = language + "wiki";
                if (data.entities[id].sitelinks !== undefined &&
                    wikiSite in data.entities[id].sitelinks) {
                    result[language] = {
                        'title': data.entities[id].sitelinks[wikiSite].title,
                    };
                } else {
                    result[language] = {};
                }
            }
        });
    }
    return result;
}

function getWikiLinks(languages, wikiData, query) {
    var wikiLinks = {};
    for (var pos in languages) {
        for (var wikiLangs in wikiData) {
            var lang = languages[pos];
            if (wikiData[lang].title !== undefined) {
                wikiLinks[lang] = {
                    "wiki_link": getWikiArticleLink(lang, wikiData[lang].title)
                };
            } else {
                wikiLinks[lang] = {
                    "wiki_link": getWikiArticleLink(lang, query)
                };
            }
        }
    }
    return wikiLinks;
}

function getWikiData(languages, query, callback) {
    var region_query = languages.join("|");
    var request_url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&titles=' + query +
        "&sites=" + languages[0] + "wiki&languages=" + region_query + "&callback=?";
    $.getJSON(request_url, callback);
}

function getWikiArticleLink(region, query) {
    return "https://" + region + ".wikipedia.org/w/index.php?title=" + query;
}

function getWikiSearchLink(region, query) {
    return "https://" + region + ".wikipedia.org/wiki/Special:Search?search=sodia&profile=default&fulltext=Search&search=" + query;
}

