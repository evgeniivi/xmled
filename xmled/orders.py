import os.path
import os
import shutil
import random

def make(ids):
    products = ids.split("-")
    orderId = str(random.sample(range(100000, 999999), 1)[0])
    full = True

    for product in products:
        full = full and orderProduct(product, orderId)

    if (full):
        return orderId
    else:
        return False

def orderProduct(id, orderId):
    file = id + ".xml"

    if (os.path.isfile("./products/" + file)):
        moveToOrder(file, orderId)
        return True
    else:
        return False

def moveToOrder(file, orderId):
    path = "./orders/" + orderId + "/"

    if (os.path.isdir(path)):
        shutil.move("./products/" + file, path + file)
    else:
        os.mkdir(path)
        shutil.move("./products/" + file, path + file)
