import xml.etree.ElementTree as ET

import json
import shutil

from xml.dom import minidom

import xmled.product
import xmled.export

pathToConfig = "./config/catalog.xml"


########################################### PRE IMPORT ########################################

def imp(file):
    tree = ET.parse(file)
    root = tree.getroot()
    l = browse(root, "product")
    m = browseconfig()
    return '{"fields-file": ' + json.dumps(l) + ', "fields-config": ' + json.dumps(m) + '}'

def browse(child, tag):
    if (child.tag == tag):
        return tree(child)
    else:
        for chi in child:
            b = browse(chi, tag)
            if (b):
                return b
    return False

def browseconfig(attrib = False):
    tree = ET.parse(pathToConfig)
    root = tree.getroot()
    fields = []
    attribs = dict()

    for chi in root:
        if (chi.attrib and chi.attrib["client-path"]):
            if attrib:
                attribs[chi.attrib["client-path"]] = chi.text
            else:
                fields.append(chi.text)

    if attrib:
        return attribs

    return fields

def tree(child):
    fields = []
    for chi in child:
        fields.append(chi.tag)
    return fields

####################################### IMPORT #######################################3

def imprun(formitems):
    setting = dict()
    for key, value in formitems:
        setting[key] = value
    file = setting['filerun']
    tree = ET.parse(file)
    root = tree.getroot()
    objs = xmled.product.xml_to_dict(root, "product")
    if len(setting) > 1:
        objs = xmled.product.fieldsofsetting(objs, setting)
    for p in objs:
        printxml(p)
    return True

def copyimgs(product, num):
    istr = ""
    for i in range(1, int(num) + 1 ):
        if i != 1:
            istr = "." + str(i)
        else:
            istr = ""
        shutil.copyfile(f'./imports/pics/{product["id"]}{istr}.png', f'./static/pics/{product["id"]}{istr}.png')

def printxml(product):
    xml = xmled.product.xmlout(product)
    file = "./products/" + product["id"] + ".xml"
    with open(file, "w") as f:
        f.write(xml)
    copyimgs(product, product["pics"])
