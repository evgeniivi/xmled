from bottle import route, view, post, request, get, response
from bottle import static_file
import json

import xmled.export
import xmled.orders
import xmled.imps

@route('/catalog/')
@view('catalog')
def catalog(name='World'):
    return dict(name=name)

@route('/catalog/in/')
@view('imports')
def imports():
    return dict()

@post('/catalog/out/')
def catalog_out():
    return xmled.export.all()

@post('/catalog/in/')
def catalog_in():
    if (request.forms.get('file')):
        return xmled.imps.imp(request.forms.get('file'))
    elif(request.forms.get('filerun')):
        l = xmled.imps.imprun(request.forms.allitems())
        return '{"finished": ' + str(l).lower() + '}'

@get('/catalog/order/<ids>')
def catalog_order(ids):
    return '{"status": "ok", "orderId": ' + str(xmled.orders.make(ids)).lower() + '}'

# ...

@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')
