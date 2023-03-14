import json
import os

import xmled.base
import xmled.xml

def all():
    jsonstr = '{ "products": ['
    count = 0
    for file in os.listdir(xmled.base.productspath):
        xmlfile = xmled.xml.xmlfile(xmled.base.productspath + file)
        l = xmled.xml.xml_to_dict(xmlfile, "product")
        if (count != 0):
            jsonstr += ","
        jsonstr += json.dumps(l)
        count += 1

    config = xmled.xml.browseconfig(True)
    jsonstr += '], "config": ' + json.dumps(config) + '}'
    return jsonstr

# def xml():
#     xmlstr = '<pre ><products>'
#     for file in os.listdir(xmled.base.productspath):
#         xmlfile = xmled.xml.xmlfile(xmled.base.productspath + file)
#         # dump = str(ET.tostring(root))
#         xmlstr += dump
#     xmlstr += '</products></pre>'
#     return xmlstr
