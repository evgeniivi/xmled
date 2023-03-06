class FieldSet(object):
    def __init__(self, arg):
        super(FieldSet, self).__init__()
        self.array = arg

def mustFields():
    return FieldSet(["price", "name", "weight"])
