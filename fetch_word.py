import urllib.request,json


def find_nth(haystack, needle, n): #a helper function
    start = haystack.find(needle)
    while start >= 0 and n > 1:
        start = haystack.find(needle, start+len(needle))
        n -= 1
    return start

def give_definition(name):

    wordType = "Noun" #what can sometimes be assumed
    link = "https://en.wiktionary.org/w/api.php?action=parse&page="+name+"&format=json"
    my_request = urllib.request.urlopen(link)
    data = my_request.read()
    info = json.loads(data)

    try:
        text = info["parse"]["text"]["*"] #finds whether 

    except: 
        link="https://en.wiktionary.org/w/index.php?search="+name
        my_request = urllib.request.urlopen(link)
        data = my_request.read()
        #info = json.loads(data)
        #return data
        text=data.decode('UTF-8')
        #return text
    good_site = text.find(">Contents</h2>") #finds whether the correct site was found
    if good_site == -1: #-1 means correct website wasn't found
        if text.find("mw-search-results-container") != -1: 
            index=find_nth(text,"mw-search-results-container",1) #finds whether there are similar results
            text=text[index:]
            index=find_nth(text,'href="',1) + 6 #
            text=text[index:]
            #return text[index:index+50]
            end_index=find_nth(text,'"',1)
            #return str(index) + " " + str(end_index)
            link=text[:end_index]
            # this creates a link in the form of /wiki/ruoanlaitto
            link="https://en.wiktionary.org"+link
            #return "linkki " + link
            my_request = urllib.request.urlopen(link)
            data = my_request.read()
            #info = json.loads(data)
            #text=info.decode('UTF-8')
            #return data
            text=data.decode('UTF-8')
        else:
            indexWordType = find_nth(text,name+"</strong>",1) #finds if the word comes from a conjugation/declension
            indexWordType = indexWordType - 100 #Before the conjugated word comes the type of word
            if text.find("Noun") != -1:         #Setting the word type
                wordType = "Noun"
            elif text.find("Verb") != -1:
                wordType = "Verb"
            elif text.find("Numeral") != -1:
                wordType = "Numeral"
            elif text.find("Adverb") != -1:
                wordType = "Adverb"
            
            index=find_nth(text,"use-with-mention",1) #find the link to the original form of a word
            text=text[index:]
            index=find_nth(text,'href="',1) + 6 #
            text=text[index:]
            end_index=find_nth(text,'"',1)
            link=text[:end_index]       # this creates a link in the form of /wiki/ruoanlaitto
            link="https://en.wiktionary.org"+link
            my_request = urllib.request.urlopen(link)
            data = my_request.read()
            text=data.decode('UTF-8') #imperfect type for some finnish words.

    
    index=find_nth(text,"Finnish",4) #Here and below: finding the definition
    text=text[index:]
    index=find_nth(text,wordType,1) #wordType is needed because below it is the correct definition of a word
    text=text[index:]
    index=find_nth(text,"<ol>",1)
    end_index=find_nth(text,"</ol>",1)+5
    text=text[index:end_index]
    text2=text.replace('"',"'")
    return text2

#if __name__=="__main__":   #test script
#    print(give_definition("menen"))
