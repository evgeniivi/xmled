import json
import shutil

import xmled.product
import xmled.export
import xmled.xml
import xmled.base

####################################### PRE IMPORT ########################################

def imp(file):
    xmlfile = xmled.xml.xmlfile(file)
    l = xmled.xml.browsefields(xmlfile, "product")
    m = xmled.xml.browseconfig()
    return '{"fields-file": ' + json.dumps(l) + ', "fields-config": ' + json.dumps(m) + '}'


####################################### IMPORT #######################################3

def imprun(formitems):
    setting = dict()
    for key, value in formitems:
        setting[key] = value
    file = setting['filerun']
    xmlfile = xmled.xml.xmlfile(file)
    objs = xmled.xml.xml_to_dict(xmlfile, "product")
    if len(setting) > 1:
        objs = xmled.product.fieldsofsetting(objs, setting)
    for p in objs:
        file = xmled.base.productspath + p["id"] + ".xml"
        xmlstr = xmled.xml.object_to_xmlstr(p, "product")
        xmled.xml.writefile(file, xmlstr)
        copyimgs(p, p["pics"])
    return True

def copyimgs(product, num):
    istr = ""
    for i in range(1, int(num) + 1 ):
        if i != 1:
            istr = "." + str(i)
        else:
            istr = ""
        shutil.copyfile(f'./imports/pics/{product["id"]}{istr}.png', f'./static/pics/{product["id"]}{istr}.png')
