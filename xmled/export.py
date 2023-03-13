import json, xmljson
import os

import xml.etree.ElementTree as ET
from lxml.etree import fromstring, tostring
from xml.etree.ElementTree import Element,tostring

from xml.dom import minidom

import xmled.imps

def all():
    jsonstr = '{ "products": ['
    count = 0
    for file in os.listdir("./products/"):
        tree = ET.parse("./products/" + file)
        root = tree.getroot()
        l = xmled.product.xml_to_dict(root, "product")
        if (count != 0):
            jsonstr += ","
        jsonstr += json.dumps(l)
        count += 1

    config = xmled.imps.browseconfig(True)
    jsonstr += '], "config": ' + json.dumps(config) + '}'
    return jsonstr

def xml():
    xmlstr = '<pre ><products>'
    for file in os.listdir("./products/"):
        tree = ET.parse("./products/" + file)
        root = tree.getroot()
        dump = str(ET.tostring(root))
        xmlstr += dump
    xmlstr += '</products></pre>'
    return xmlstr
