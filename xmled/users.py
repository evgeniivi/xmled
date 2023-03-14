import random

import xmled.xml
import xmled.base

def createuser(formitems):
    u = dict()
    for key, value in formitems:
        u[key] = value
    u["id"] = random.randint(1000000, 9999999)
    userxmlstr = xmled.xml.object_to_xmlstr(u, "user")
    xmled.xml.writefile(xmled.base.userspath + str(u["id"]) + ".xml", userxmlstr)
    return u
