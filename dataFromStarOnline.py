import requests
import urllib.request
import json
import numpy as np
from numpy import savetxt
from datetime import datetime
import locale

def parseFlourishTable(inputStr):
    jsonRaw = json.loads(inputStr)['rows']
    nRows = len(jsonRaw)
    matrix = []
    if(nRows == 1):
        matrix.append(jsonRaw['columns'])
    else:
        for i in range(nRows):
            matrix.append(jsonRaw[i]['columns'])
    return matrix

def monthStrToMonth(monthStr):
    try:
        if monthStr == "Sept":
            monthStr = "Sep"
        month = datetime.strptime(monthStr, '%b').month
    except ValueError:
        try:
            month = datetime.strptime(monthStr, '%B').month
        except ValueError:
            raise ValueError("Cannot parse month string: " + monthStr)
    return month

# start here to fetch data from a website
url = "https://flo.uri.sh/visualisation/1641110/embed"
page = urllib.request.Request(url, headers = {'User-Agent': 'Mozilla/5.0'})

# fetch table data
loadColumnNames = False
loadBody = False
for lineBytes in urllib.request.urlopen(page):
    line = lineBytes.decode("utf-8")
    if "_Flourish_data_column_names = " in line and loadColumnNames == False:
        columnNames = line[line.find('{"rows":'):(line.find(']}}')+3)]
        loadColumnNames = True
    if "_Flourish_data = " in line and loadBody == False:
        body = line[line.find('{"rows":'):(line.find(']}]}')+4)]
        loadBody = True
    if loadColumnNames and loadBody: break

tableHeader = parseFlourishTable(columnNames)
tableHeaderNp = np.array(tableHeader)
tableBody = parseFlourishTable(body)
tableBody.reverse()
# 1) convert date DD/MMM to DD/MM/YYYY format
# 2) make sure that no comma containing number. it will screw up csv file.
#  example: 3,211 in csv file could be interpolated as 3 and 211 in two columns
year = 2020
month_last = 0
locale.setlocale(locale.LC_ALL, 'en_US.UTF8')
for i in range(len(tableBody)):
    dateRaw = tableBody[i][0]
    dateNumberElements = 0
    if "-" in dateRaw:
        dateNumberElements = dateRaw.count('-')
    elif " " in dateRaw:
        dateNumberElements = dateRaw.count(' ')

    if dateNumberElements == 1:
        if "-" in dateRaw:
            day, monthStr = dateRaw.split("-")
        elif " " in dateRaw:
            day, monthStr = dateRaw.split(" ")
        else:
            raise ValueError("Cannot parse date string: " + dateRaw)
        month = monthStrToMonth(monthStr)
        if month == 1 and month_last == 12:
            year += 1
        dateStr = str(year) + "-" + str(month).zfill(2) + "-" + str(day).zfill(2)
    elif dateNumberElements == 2:
        if "-" in dateRaw:
            day, monthStr, yearStr = dateRaw.split("-")
        elif " " in dateRaw:
            day, monthStr, yearStr = dateRaw.split(" ")
        else:
            raise ValueError("Cannot parse date string: " + dateRaw)
        month = monthStrToMonth(monthStr)
        year = 2000 + int(yearStr)
        dateStr = str(year) + "-" + str(month).zfill(2) + "-" + str(day).zfill(2)
    else:
        raise ValueError("DateRaw is in a wrong format: " + dateRaw)

    if dateStr == "2020-08-19":
        tableBody[i][4] = '8925'
    tableBody[i][0] = dateStr
    tableBody[i][1] = str(locale.atoi(tableBody[i][1]))
    tableBody[i][2] = str(locale.atoi(tableBody[i][2]))
    tableBody[i][3] = str(locale.atoi(tableBody[i][3]))
    tableBody[i][4] = str(locale.atoi(tableBody[i][4]))
    month_last = month

tableBodyNp = np.array(tableBody)
table = np.append(tableHeaderNp, tableBodyNp, axis = 0)

# save a total number file
savetxt('./data/totalRaw.csv', table, delimiter = ',', fmt = '%s')

# Date, total cases, new cases, total death, total recovered --> Date, total cases, total death, total recovered, active cases
table[0][2] = table[0][3]
table[0][3] = table[0][4]
table[0][4] = 'Active cases'

for i in range(1, len(table)):
    totalDeath = table[i][3]
    totalRecovered = table[i][4]
    activeCases = str(int(table[i][1]) - int(table[i][3]) - int(table[i][4]))
    table[i][2] = totalDeath
    table[i][3] = totalRecovered
    table[i][4] = activeCases

# save a total number file with active cases instead of new cases
savetxt('./data/dailyTotal.csv', table, delimiter = ',', fmt = '%s')

# the latest date, total death, total recovered, active cases
lastIdx = len(table) - 1
latestTotalTable =np.array([['name', 'value'],
                            [table[0][0], table[lastIdx][0]], # date
                            [table[0][1], table[lastIdx][1]], # total
                            [table[0][2], table[lastIdx][2]], # death
                            [table[0][3], table[lastIdx][3]], # recovered
                            [table[0][4], table[lastIdx][4]]]) # active
savetxt('./data/latestTotal.csv', latestTotalTable, delimiter = ',', fmt = '%s')

# Date, total change of cases, death, recovered, active cases
tableChange =np.copy(table)
for i in range(2, len(table)):
    for j in range(1, len(table[0])):
        tableChange[i][j] = str(int(table[i][j]) - int(table[i-1][j]))
savetxt('./data/dailyTotalChange.csv', tableChange, delimiter = ',', fmt = '%s')

# dynamics table (x=cumulative cases, y = new cases per day, z = date just for tooltip)
dynamicsTableOriginal = np.append(tableHeaderNp, tableBodyNp, axis = 0)
dynamicsTable = []
dynamicsTableHeader = ["Total cases", "New cases per day", "Date"]
dynamicsTable.append(dynamicsTableHeader)
dynamicsTableRow = [table[1][1], table[1][1], table[1][0]]
dynamicsTable.append(dynamicsTableRow)
for i in range(2, len(table)):
    dynamicsTableRow = [table[i][1], int(table[i][1]) - int(table[i-1][1]), table[i][0]]
    dynamicsTable.append(dynamicsTableRow)

savetxt('./data/dailyTotalDynamics.csv', dynamicsTable, delimiter = ',', fmt = '%s')

print("Finished")

