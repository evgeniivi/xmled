import xml.etree.ElementTree as ET
import json, xmljson
import os
from lxml.etree import fromstring, tostring

def all():
    jsonstr = "["
    count = 0

    for file in os.listdir("./products/"):
        tree = ET.parse("./products/" + file)
        root = tree.getroot()

        if (count != 0):
            jsonstr += ","

        jsonstr += json.dumps(xmljson.badgerfish.data(root))
        count += 1

    return jsonstr + "]"
