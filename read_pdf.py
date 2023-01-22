import PyPDF2


def find_nth2(haystack, needle, n):
    start = haystack.find(needle)
    while start >= 0 and n > 1:
        start = haystack.find(needle, start+len(needle))
        n -= 1
    return start

def pdftojson():
    pdffileobj=open('1.pdf','rb')
    pdfreader=PyPDF2.PdfReader(pdffileobj)
    x=len(pdfreader.pages)
    data = ""

    #file1=open("1.txt","a")
    for i in range(0,x):
        pageobj=pdfreader.pages[i]
        text=pageobj.extract_text()    
        data = data+text.replace("\n","")
        
   
    prejson = []
    
    while find_nth2(data, ".", 2) != -1:
        prejson.append(data[find_nth2(data, ".", 1) : find_nth2(data, ".", 2)].replace(".","").split(" "))
        data=data[find_nth2(data, ".", 2):]                                                                


    return prejson

if __name__=="__main__":
    print(str(pdftojson()).replace("'",'"'))
    #file1=open("1.txt","a")
    #for i in range(0,x):
    #    pageobj=pdfreader.pages[i]
    #    text=pageobj.extract_text()    
    #    file1.writelines(text)

    #file1=open("1.txt","a")
    #for i in range(0,x):
    #    pageobj=pdfreader.pages[i]
    #    text=pageobj.extract_text()    
    #    file1.writelines(text)
