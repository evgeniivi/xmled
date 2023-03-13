from typing import Union
import xml.etree.ElementTree as ET

import json
import shutil

from xml.dom import minidom


def object_to_xml(data: Union[dict, bool], root='object'):
    xml = f'<{root}>'
    if isinstance(data, dict):
        for key, value in data.items():
            xml += object_to_xml(value, key)
    elif isinstance(data, (list, tuple, set)):
        for item in data:
            xml += object_to_xml(item, 'item')
    else:
        xml += str(data)

    xml += f'</{root}>'
    return xml

def xml_to_dict(child, tag):
    objs = []
    if (child.tag == tag):
        return treevalues(child)
    else:
        for chi in child:
            objs.append(xml_to_dict(chi, tag))
    return objs

def treevalues(child):
    o = dict()
    for chi in child:
        o[chi.tag] = pretext(chi.text)
    return o

def pretext(text):
    return text.replace("\n","").strip()

def fieldsofsetting(objs, setting):
    newobjs = []
    for o in objs:
        newo = dict()
        for k,v in o.items():
            if k in setting:
                newo[setting[k]] = v
        newobjs.append(newo)
    return newobjs

def xmlout(product):
    xml = object_to_xml(product, "product")
    xmlstr = minidom.parseString(xml).toprettyxml(indent="   ")
    return xmlstr
