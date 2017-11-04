# encoding=utf-8
import sys
import requests
import re
from bs4 import BeautifulSoup

def getWeibo(user_id, maxPages=5):
    texts = []
    cookie = {
        "Cookie": "SCF=AiRAchUSpkqXd7eCfjSUvWDx7x-SA9m6ggC3JdCT7hdfRHpypezI9uy25nmdGHBxazqHJrWZpiCuPNI1XskQMBU.; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9W5Yu6VdSKJ9vm8rP7elu0UM5JpX5K-hUgL.Fo-N1h271h-ESK22dJLoI7DGdsvEwH8fqgLj; _T_WM=b5bc6005f2a81fa5f26c0ee44ec80293; SUB=_2A250-QacDeRhGeNJ41MR-CvOzj2IHXVUBarUrDV6PUJbkdBeLRfwkW1-pSi5PQl5M2o0HYB9FzSzrezpvg..; SUHB=0nluE29Qcq629A; SSOLoginState=1509783244"}
    pages = maxPages
    for page in range(pages):
        url = 'http://weibo.cn/u/%s?page=%d&filter=0' % (str(user_id), page)
        path = str(user_id)
        html = requests.get(url, cookies=cookie)

        Soup = BeautifulSoup(html.text, 'html.parser')

        alla = Soup.find_all("div", class_="c")  # 所有的微博

        for a in alla:
            per = a.find("span", class_="ctt")  # 每条微博

            if per:
                for a_tag in per("a"):
                    a_tag.extract()
                texts.append(per.text)
                f = open(path + '.txt', 'a+', encoding='utf-8')
                f.write(per.text + "\n")
    return '\n'.join(texts)
            #    regular1=re.compile(r"\d+")
            #    pgs = regular1.findall(per.text)  #每条微博对应的评论数

            #    href=per['href']  #每条微博对应的评论链接
            #    comments = requests.get(href,cookies=cookie)
            #    soup = BeautifulSoup(comments.text, 'lxml')
            #    comment = soup.find_all("div",class_="c")#评论链接里评论的div


            #    for cmt in comment:

            #      content = cmt.find("span",class_="ctt")   #评论内容

            #      time = cmt.find("span",class_="ct")
            #      if (content):
            #          name="comment"
            #          f = open(name+'.txt', 'a+',encoding="utf-8")
            #          f.write(time.text[:19]+"     "+content.text+"\n")
            #         #print(content.text,time.text[:19])

            #    if(int(pgs[0])>10):              #一条微博的评论数大于10，即有多页
            #       regular2=re.compile(r"\d+")
            #       pg=soup.find("div",class_="pa").find("div")

            #       pagenum=regular2.findall(pg.text)[1]   #抓取页数
            #       for i in range(2,int(pagenum)+1):
            #          newhref=per['href'][:-7]+"&page=%d"%(i)    #第i页的url
            #          newcomments = requests.get(newhref,cookies=cookie)
            #          newsoup = BeautifulSoup(newcomments.text, 'lxml')
            #          newcomment = newsoup.find_all("div",class_="c")

            #          for newcmt in newcomment:

            #             newcontent = newcmt.find("span",class_="ctt")

            #             newtime = newcmt.find("span",class_="ct")
            #             if (newcontent):
            #               name="comment"
            #               f = open(name+'.txt', 'a+',encoding="utf-8")
            #               f.write(newtime.text[:19]+"     "+newcontent.text+"\n")

if __name__ == '__main__':
    userID = sys.argv[1]
    getWeibo(userID)
