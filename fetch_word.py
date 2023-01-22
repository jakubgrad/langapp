import urllib.request,json


def find_nth(haystack, needle, n):
    start = haystack.find(needle)
    while start >= 0 and n > 1:
        start = haystack.find(needle, start+len(needle))
        n -= 1
    return start

def give_definition(name):

    #name="muki"
    link = "https://en.wiktionary.org/w/api.php?action=parse&page="+name+"&format=json"

    my_request = urllib.request.urlopen(link)
    data = my_request.read()
    info = json.loads(data)
    try:
        text = info["parse"]["text"]["*"]
    except: 
        link="https://en.wiktionary.org/w/index.php?search="+link+"&title=Special%3ASearch&profile=advanced&fulltext=1&ns0=1"
        my_request = urllib.request.urlopen(link)
        data = my_request.read()
        info = json.loads(data)
        return info
    good_site = text.find(">Contents</h2>")
    if good_site == -1:
        if text.find("mw-search-results-container") != -1:
            index=find_nth(text,"mw-search-results-container",1)
            text=text[index:]
            index=find_nth(text,'href="',1)
            end_index=find_nth(text[index:],'"',1)
            link=text[index:end_index]
            return "link " + link
    index=find_nth(text,"Finnish",4)
    text=text[index:]
    index=find_nth(text,"Noun",1)
    text=text[index:]
    index=find_nth(text,"<ol>",1)
    end_index=find_nth(text,"</ol>",1)+5
    text=text[index:end_index]
    text2=text.replace('"',"'")
    #print(text)
    return text2

if __name__=="__main__":
    print(give_definition("ruoanlaittoa"))
