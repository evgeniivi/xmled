from bottle import route, view, post, request, get, response, auth_basic
from bottle import static_file
import json

import xmled.export
import xmled.orders
import xmled.imps
import xmled.users

def is_authenticated_user(user, password):
    return False

@route('/catalog/')
# @auth_basic(is_authenticated_user)
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

@post('/user/in/')
def user_in():
    user = xmled.users.createuser(request.forms.allitems())
    return '{"id": ' + str(user["id"]) + '}'

@post('/catalog/in/')
def catalog_in():
    if (request.forms.get('file')):
        return xmled.imps.imp(request.forms.get('file'))
    elif(request.forms.get('filerun')):
        l = xmled.imps.imprun(request.forms.allitems())
        return '{"finished": ' + str(l).lower() + '}'

@post('/catalog/order/')
def catalog_order():
    opts = dict()
    for key, value in request.forms.allitems():
        opts[key] = value
    return '{"status": "ok", "orderId": ' + str(xmled.orders.make(opts["ids"], opts["userid"])).lower() + '}'

# ...

@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')
