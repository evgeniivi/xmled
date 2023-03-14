def fieldsofsetting(objs, setting):
    newobjs = []
    for o in objs:
        newo = dict()
        for k,v in o.items():
            if k in setting:
                newo[setting[k]] = v
        newobjs.append(newo)
    return newobjs
