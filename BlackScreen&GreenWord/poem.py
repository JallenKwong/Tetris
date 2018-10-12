#encoding:utf-8

import re

sentenseRegex = re.compile(r'^(\D*)\n', re.DOTALL)
titleRegex = re.compile(r'^(\d{3})(.*)\n', re.DOTALL)


resultFile = open('result.txt','w')

onePoemMode = 0 #0首次 1中间 2结尾

poemFile = open('poem.txt')
lines = poemFile.readlines()


result = ''

for line in lines:    

    titleMo = titleRegex.search(line)
    sentenseMo = sentenseRegex.search(line)
    
    if titleMo is not None:
        if onePoemMode == 0:
            result += '"'
            result += titleMo.group(2)
            result += '||'
            onePoemMode = 1
        elif onePoemMode == 1:
            result += '",'
            result += '\n'
            result += '"'
            result += titleMo.group(2)
            result += '||'
    
    if sentenseMo is not None:
        result += sentenseMo.group(1)
        #print sentenseMo.group(1)

result += '"'

#print result
resultFile.write(result)
resultFile.close()
