from bottle import route, view
from bottle import static_file

import xmled.export
import xmled.orders

@route('/catalog/')
@view('catalog')
def catalog(name='World'):
    return dict(name=name)

@route('/catalog/out/')
def catalog_out():
    return xmled.export.all()

@route('/catalog/order/<ids>')
def catalog_order(ids):
    return '{"status": "ok", "orderId": ' + str(xmled.orders.make(ids)).lower() + '}'

# ...

@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')
