import os.path
import os
import shutil
import random

import xmled.base

def make(ids, userId):
    opts = dict()
    opts["userid"] = userId
    orderUserId = userId
    products = ids.split("-")
    opts["orderid"] = str(random.sample(range(100000, 999999), 1)[0])
    full = True
    for product in products:
        full = full and orderProduct(product, opts)
    if (full):
        return opts["orderid"]
    else:
        return False

def orderProduct(id, opts):
    file = id + ".xml"
    if (os.path.isfile(xmled.base.productspath + file)):
        moveToOrder(file, opts)
        return True
    else:
        return False

def moveToOrder(file, opts):
    path = xmled.base.orderspath + opts["orderid"] + "/"
    if (os.path.isdir(path)):
        shutil.move(xmled.base.productspath + file, path + "user" + str(opts["userid"]) + "-product"  + file)
    else:
        os.mkdir(path)
        shutil.move(xmled.base.productspath + file, path + "user" + str(opts["userid"]) + "-product"  + file)
