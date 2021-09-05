import mysql.connector


class Controller():

    def __init__(self):
        self.mydb = mysql.connector.connect(host='sql6.freemysqlhosting.net', user='sql6434713', password='Heblw1KjB2', database='sql6434713')

    def enter_user(self,name):
        myCursor = self.mydb.cursor()
        myCursor.execute('insert into temporary_table values ("{}")'.format(name))
        self.mydb.commit()
        self.mydb.close()
